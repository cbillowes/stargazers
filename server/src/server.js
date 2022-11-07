import express from 'express';
import cors from 'cors';
import { openConnection as openMongoDbConnection } from './db.js';
import { firebaseAdmin as firebaseInitializeAdminApp } from './firebase.js';
import {
  commentOnReview,
  getAllReviews,
  getReviewBySlug,
  rateReview,
} from './reviews.js';
import { PORT, ENABLE_CORS_FOR_ORIGIN } from './constants.js';

const firebaseAdmin = firebaseInitializeAdminApp();

const app = express();
app.use(
  cors({
    origin: ENABLE_CORS_FOR_ORIGIN,
  }),
);
app.use(express.json());
app.use(async (req, res, next) => {
  const { authtoken } = req.headers;
  if (authtoken) {
    try {
      req.user = await firebaseAdmin.auth().verifyIdToken(authtoken);
    } catch (e) {
      res.status(400).json({
        error: e.message,
      });
      return;
    }
  }
  next();
});

app.get('/api/reviews', async (_, res) => {
  const reviews = await getAllReviews();
  res.json(reviews);
});

app.get('/api/reviews/:slug', async (req, res) => {
  const { slug } = req.params;
  const review = await getReviewBySlug(slug);
  if (review) {
    delete review.ratings;
    res.json(review);
  } else {
    res.status(404).json({
      query: req.params,
      error: `Review could not be found in the database.`,
    });
  }
});

app.put('/api/review/:slug/rate/:rating', async (req, res) => {
  const { slug, rating } = req.params;
  const { uid } = req.user || {};
  try {
    await rateReview(slug, uid, rating);
  } catch (e) {
    res.status(403).json({
      error: e.message,
    });
    return;
  }
  const review = await getReviewBySlug(slug);
  if (review) {
    delete review.ratings;
    res.json(review);
  } else {
    res.status(404).json({
      query: req.params,
      error: `Review could not be rated because it cannot be found in the database.`,
    });
  }
});

app.post('/api/review/:slug/comment', async (req, res) => {
  const { slug } = req.params;
  try {
    await commentOnReview(slug, req.body);
  } catch (e) {
    res.status(400).json({
      query: req.params,
      error: e.message,
    });
    return;
  }

  const review = await getReviewBySlug(slug);
  if (review) {
    res.json(review);
  } else {
    res.status(404).json({
      query: req.params,
      error: `Review could not be commented on because it cannot be found in the database.`,
    });
  }
});

app.listen(PORT, async () => {
  console.log(`Listening on http://localhost:${PORT}`);
  await openMongoDbConnection();
});

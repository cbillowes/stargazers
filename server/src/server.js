import express from 'express';
import cors from 'cors';
import { openConnection as openMongoDbConnection } from './db.js';
import {
  commentOnReview,
  getAllReviews,
  getReviewBySlug,
  rateReview,
} from './reviews.js';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(express.json());

app.get('/api/reviews', async (_, res) => {
  const reviews = await getAllReviews();
  res.json(reviews);
});

app.get('/api/reviews/:slug', async (req, res) => {
  const { slug } = req.params;
  const review = await getReviewBySlug(slug);
  if (review) {
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
  await rateReview(slug, rating);
  const review = await getReviewBySlug(slug);
  if (review) {
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

app.listen('3001', async () => {
  console.log('Listening on http://localhost:3001');
  await openMongoDbConnection();
});

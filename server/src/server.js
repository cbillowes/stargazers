import express from 'express';
import cors from 'cors';
import { withCollection } from './db.js';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(express.json());

app.get('/api/reviews', async (_, res) => {
  withCollection('reviews', async (collection) => {
    const reviews = await collection.find({}).toArray();
    res.json(reviews);
  });
});

app.get('/api/reviews/:id', async (req, res) => {
  const { id } = req.params;

  withCollection('reviews', async (collection) => {
    const review = await collection.findOne({ id });
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({
        query: req.params,
        error: `Review could not be found in the database.`,
      });
    }
  });
});

app.put('/api/review/:id/rate/:rating', async (req, res) => {
  const { id, rating } = req.params;

  withCollection('reviews', async (collection) => {
    await collection.updateOne(
      { id },
      {
        $inc: {
          rating: parseFloat(rating),
        },
      },
    );

    const item = await collection.findOne({ id });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({
        query: req.params,
        error: `Review could not be rated because it cannot be found in the database.`,
      });
    }
  });
});

app.post('/api/review/:id/comment', async (req, res) => {
  const { id } = req.params;
  const { name, email, comment } = req.body;

  withCollection('reviews', async (collection) => {
    await collection.updateOne(
      { id },
      {
        $push: {
          comments: {
            name,
            email,
            comment,
            timestamp: new Date().getTime(),
          },
        },
      },
    );

    const item = await collection.findOne({ id });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({
        query: req.params,
        error: `Review could not be commented on because it cannot be found in the database.`,
      });
    }
  });
});

app.listen('3001', () => {
  console.log('Listening on http://localhost:3001');
});

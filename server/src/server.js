import express from 'express';

// This in-memory structure be replaced by real database later on.
const inMemRatings = [
  { id: 1, rating: 0 },
  { id: 2, rating: 0 },
  { id: 3, rating: 0 },
];

const app = express();

// A built-in middleware function that parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());

// A PUT verb on the following endpoint to update the rating and respond to the client accordingly.
app.put('/api/review/:id/rate/:rating', (req, res) => {
  const { id, rating } = req.params;
  const item = inMemRatings.find((r) => r.id === parseInt(id, 10));
  if (item) {
    item.rating += parseFloat(rating);
    res.send(item);
  } else {
    res.send('Not Found');
  }
});

app.listen('3001', () => {
  console.log('Listening on http://localhost:3001');
});

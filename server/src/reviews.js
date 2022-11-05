import { withCollection } from './db.js';

const collectionName = 'reviews';

const calculateAverage = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;

  const total = ratings.reduce((acc, { total }) => {
    return acc + parseFloat(total);
  }, 0);

  const average = total / ratings.length;
  if (average % 0.5 === 0) {
    return average;
  }

  return Math.floor((average % 1) * 10) >= 5
    ? average - (average % 0.5)
    : Math.floor(average);
};

const getReviewBySlug = (slug) => {
  return withCollection(collectionName, async (collection) => {
    return await collection.findOne({ slug });
  });
};

const getAllReviews = () => {
  return withCollection(collectionName, async (collection) => {
    return await collection.find({}).toArray();
  });
};

const rateReview = (slug, rating) => {
  return withCollection(collectionName, async (collection) => {
    const total = parseFloat(rating, 0);
    const review = await getReviewBySlug(slug);
    const average = calculateAverage([...(review?.ratings || []), { total }]);
    return await collection.updateOne(
      {
        slug,
      },
      {
        $set: {
          rating: average,
        },
        $push: {
          ratings: {
            total,
          },
        },
      },
    );
  });
};

const commentOnReview = (slug, { name, email, comment }) => {
  const requiredFields = [
    { field: 'Name', value: name },
    { field: 'Comment', value: comment },
  ];

  const isValid = requiredFields.every((field) => field.value);
  if (!isValid) {
    const fields = requiredFields
      .reduce((acc, prev) => {
        return `${acc} ${prev.value ? '' : `[${prev.field}]`}`;
      }, '')
      .trim();
    throw new Error(`We are missing values for ${fields}.`);
  }

  return withCollection(collectionName, async (collection) => {
    return await collection.updateOne(
      { slug },
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
  });
};

export { getReviewBySlug, getAllReviews, rateReview, commentOnReview };

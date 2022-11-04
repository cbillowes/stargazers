import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from './NotFound';
import Comments from '../components/Comments';
import Rating from '../components/Rating';

const ReviewPage = () => {
  const { id } = useParams();
  const [review, setReview] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/reviews/${id}`,
      );
      setReview(response.data);
    };
    fetch();
  }, [id]);

  if (review) {
    const { title, abstract, rating, comments } = review;
    return (
      <div>
        <h1>
          {title} / {rating} ✨
        </h1>
        <div>
          Rate now:{' '}
          <Rating
            value={rating}
            handleSave={async (rating) => {
              const result = await axios.put(
                `http://localhost:3001/api/review/${id}/rate/${rating}`,
              );
              setReview(result.data);
            }}
          />
        </div>
        <div>{abstract}</div>
        <h2>Comments</h2>
        <Comments data={comments} />
      </div>
    );
  }

  return <NotFoundPage />;
};

export default ReviewPage;

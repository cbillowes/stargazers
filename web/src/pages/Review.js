import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from './NotFound';

const ReviewPage = () => {
  const { id } = useParams();
  const [review, setReview] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`http://localhost:3001/api/reviews/${id}`);
      setReview(response.data);
    };
    fetch();
  }, [id]);

  if (review) {
    return (
      <div>
        Review page <pre>{JSON.stringify(review, null, 2)}</pre>
      </div>
    );
  }

  return <NotFoundPage />;
};

export default ReviewPage;

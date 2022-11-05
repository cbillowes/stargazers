import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_ENDPOINT } from '../constants';
import axios from 'axios';
import NotFoundPage from './NotFound';
import Comment from '../components/Comment';
import Comments from '../components/Comments';
import Rating from '../components/Rating';

const ReviewPage = () => {
  const { slug } = useParams();
  const [review, setReview] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${API_ENDPOINT}/api/reviews/${slug}`);
      setReview(response.data);
    };
    fetch();
  }, [slug]);

  if (review) {
    const { title, abstract, rating, comments } = review;
    return (
      <div>
        <h1 className="text-2xl mb-1">
          {title}
          {rating && <span className="ml-2">⭐ {rating}</span>}
        </h1>
        <div className="mb-5">{abstract}</div>
        <Rating
          title="Your rating"
          max={5}
          value={rating}
          onRated={async (rating) => {
            const result = await axios.put(
              `${API_ENDPOINT}/api/review/${slug}/rate/${rating}`,
            );
            setReview(result.data);
          }}
        />
        <Comment
          commentOn={title}
          onSave={async (data) => {
            const result = await axios.post(
              `${API_ENDPOINT}/api/review/${slug}/comment`,
              data,
            );
            setReview(result.data);
          }}
        />
        <Comments data={comments} />
      </div>
    );
  }

  return <NotFoundPage />;
};

export default ReviewPage;

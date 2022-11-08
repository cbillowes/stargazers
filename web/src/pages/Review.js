import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_ENDPOINT } from '../constants';
import useUser from '../hooks/useUser';
import axios from 'axios';
import NotFoundPage from './NotFound';
import Comment from '../components/Comment';
import Comments from '../components/Comments';
import Rating from '../components/Rating';

const ReviewPage = () => {
  const { slug } = useParams();
  const [review, setReview] = useState();
  const { user } = useUser();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${API_ENDPOINT}/api/reviews/${slug}`);
      setReview(response.data);
    };
    fetch();
  }, [slug]);

  if (review) {
    const { title, abstract, rating, totalRatings, comments } = review;
    return (
      <div>
        <h1 className="text-2xl mb-1">
          {title}
          {rating > 0 && <span className="ml-2">⭐ {rating}</span>}
        </h1>
        {totalRatings > 0 && (
          <div className="text-xs">
            {totalRatings === 1
              ? 'There has been 1 rating'
              : `${totalRatings} ratings`}{' '}
            so far.
          </div>
        )}
        <div className="mt-4 mb-5">{abstract}</div>
        {!user && (
          <Link
            to="/login"
            className="bg-slate-500 py-1 px-2 mb-4 inline-block rounded-md hover:bg-green-500 hover:text-green-800"
          >
            Log in to give your feedback
          </Link>
        )}
        {user && (
          <>
            <Rating
              title="Your rating"
              max={5}
              value={rating}
              onRated={async (rating) => {
                const token = user && (await user.getIdToken());
                const result = await axios.put(
                  `${API_ENDPOINT}/api/review/${slug}/rate/${rating}`,
                  {},
                  {
                    headers: { authtoken: token },
                  },
                );
                setReview(result.data);
              }}
            />
            <Comment
              commentOn={title}
              onSave={async (data) => {
                const token = user && (await user.getIdToken());
                const result = await axios.post(
                  `${API_ENDPOINT}/api/review/${slug}/comment`,
                  data,
                  { headers: { authtoken: token } },
                );
                setReview(result.data);
              }}
            />
          </>
        )}
        <Comments data={comments} />
      </div>
    );
  }

  return <NotFoundPage />;
};

export default ReviewPage;

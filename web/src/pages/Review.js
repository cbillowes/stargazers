import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFound';
import data from '../data/reviews.json';

const ReviewPage = () => {
  const { id } = useParams();
  const reviews = data.filter((i) => i.id === id);
  if (reviews.length > 0) {
    const review = reviews[0];
    return (
      <div>
        Review page <pre>{JSON.stringify(review, null, 2)}</pre>
      </div>
    );
  }

  return <NotFoundPage />;
};

export default ReviewPage;

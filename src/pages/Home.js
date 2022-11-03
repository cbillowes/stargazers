import { Link } from 'react-router-dom';
import data from '../data/reviews.json';

const HomePage = () => {
  return data.map(({ id, title, description, rating }) => {
    return (
      <div key={id}>
        <h2>
          <Link to={`/review/${id}`}>{title}</Link> / {rating} ✨
        </h2>
        <p>{description}</p>
      </div>
    );
  });
};

export default HomePage;

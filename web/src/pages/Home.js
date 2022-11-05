import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`http://localhost:3001/api/reviews`);
      setReviews(response.data);
    };
    fetch();
  }, []);

  if (reviews && reviews.length === 0) {
    return <div>No results</div>;
  }

  return reviews.map(({ slug, title, abstract, rating }) => {
    return (
      <div key={slug} className="mb-10">
        <h1 className="text-2xl mb-1">
          <Link to={`/review/${slug}`}>{title}</Link>
          {rating && <span className="ml-2">⭐ {rating}</span>}
        </h1>
        <p>{abstract}</p>
      </div>
    );
  });
};

export default HomePage;

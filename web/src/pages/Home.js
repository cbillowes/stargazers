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

  if (reviews.length === 0) {
    return <div>No results</div>
  }

  return reviews.map(({ id, title, abstract, rating }) => {
    return (
      <div key={id}>
        <h2>
          <Link to={`/review/${id}`}>{title}</Link> / {rating} ✨
        </h2>
        <p>{abstract}</p>
      </div>
    );
  });
};

export default HomePage;

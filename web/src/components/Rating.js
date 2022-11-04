import React, { useState } from 'react';
import { Rating as SimpleStarRating } from 'react-simple-star-rating';

const Rating = ({ value, handleSave }) => {
  const [rating, setRating] = useState(value);

  const handleRating = (rate) => {
    handleSave && handleSave(rating);
    setRating(rate);
  };
  const handleReset = () => {
    handleSave && handleSave(-rating);
    setRating(0);
  };

  return (
    <div>
      <SimpleStarRating
        initialValue={rating}
        onClick={handleRating}
        allowFraction={true}
      />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Rating;

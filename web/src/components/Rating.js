import { useRef, useState } from 'react';
import { Form } from './Controls';

const LeftStar = ({ value, isHover, isActive, onHover, onRated }) => {
  const leftStar = useRef();
  return (
    <path
      ref={leftStar}
      className={`cursor-pointer ${
        isHover
          ? 'fill-green-500'
          : isActive
          ? 'fill-yellow-500'
          : 'fill-slate-500'
      }`}
      d="M256.024,391.104L97.4,512l60.592-195.608L0,196.032h195.264L256.024,0"
      onClick={() => onRated(value)}
      onMouseEnter={() => onHover(value)}
    />
  );
};

const RightStar = ({ value, isHover, isActive, onHover, onRated }) => {
  const rightStar = useRef();
  return (
    <path
      ref={rightStar}
      className={`cursor-pointer ${
        isHover
          ? 'fill-green-600'
          : isActive
          ? 'fill-yellow-600'
          : 'fill-slate-600'
      }`}
      d="M414.616,512L256.024,391.104L97.4,512l60.592-195.608L0,196.032h195.264L256.024,0l60.736,196.032 H512l-157.968,120.36L414.616,512z"
      onClick={() => onRated(value)}
      onMouseEnter={() => onHover(value)}
    />
  );
};

const Stars = ({ size, value, stars, onRated }) => {
  const [hoverValue, onHover] = useState(0);
  const [hovering, toggleHovering] = useState(false);

  return (
    <div className="flex gap-2 my-2.5">
      {stars.map((rating) => {
        return (
          <div className="inline-block" key={rating}>
            <svg
              height={size}
              width={size}
              viewBox="0 0 512 512"
              onMouseEnter={() => toggleHovering(true)}
              onMouseLeave={() => toggleHovering(false)}
            >
              <g>
                <RightStar
                  value={rating}
                  selected={value}
                  isActive={value >= rating}
                  isHover={hovering && hoverValue >= rating}
                  onHover={onHover}
                  onRated={onRated}
                />
                <LeftStar
                  value={rating - 0.5}
                  selected={value}
                  isActive={value >= rating - 0.5}
                  isHover={hovering && hoverValue >= rating - 0.5}
                  onHover={onHover}
                  onRated={onRated}
                />
              </g>
            </svg>
          </div>
        );
      })}
    </div>
  );
};

const Rating = ({ title, value, max, onRated }) => {
  const [rating, setRating] = useState(value || 0);
  const stars = Array.from(Array(max).keys()).map((i) => i + 1);

  const handleRated = (value) => {
    setRating(value);
    onRated && onRated(value);
  };

  const handleReset = () => {
    setRating(0);
    onRated && onRated(0);
  };

  return (
    <Form
      title={
        <span>
          {title}: <strong className="text-yellow-500">{rating} ⭐</strong>
        </span>
      }
    >
      <Stars size="42" value={rating} stars={stars} onRated={handleRated} />
      <button
        onClick={handleReset}
        className="text-xs uppercase text-slate-500 hover:text-red-500"
      >
        reset my rating
      </button>
    </Form>
  );
};

export default Rating;

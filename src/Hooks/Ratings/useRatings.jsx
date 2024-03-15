import React, { useState } from 'react';
import './ratings.css';

const useRatings = (config = {}) => {
  const { totalStars = 5, disableClick = false } = config;
  const [totalLength] = useState(totalStars);
  const [filledStarLength, setFilledStarLength] = useState(0);
  const [halfStarLength, setHalfStarLength] = useState(0);

  const resetter = () => {
    setFilledStarLength(0);
    setHalfStarLength(0);
  };

  const ratingsComp = (
    <>
      {Array.from({ length: filledStarLength }, () => 2)?.map((item, i) => {
        return (
          <i
            key={i + 1}
            className="fa-solid fa-star fa-2xl fade-in-fwd m-1 ratActiveStar"
            onClick={() => {
              if (disableClick) return;
              if (i + 1 === filledStarLength) {
                setFilledStarLength(prev => prev - 1);
                return;
              }
              setFilledStarLength(totalLength - (totalLength - (i + 1)));
            }}
          />
        );
      })}
      {Array.from({ length: halfStarLength }, () => 2)?.map((item, i) => {
        return (
          <i
            key={i + 1}
            className="fa-regular fa-star-half-stroke fa-2xl fade-in-fwd m-1"
            style={{ color: '#eea811', cursor: 'pointer' }}
            onClick={() => {
              if (disableClick) return;
              if (i + 1 === filledStarLength) {
                setFilledStarLength(prev => prev - 1);
                return;
              }
              setFilledStarLength(totalLength - (totalLength - (i + 1)));
            }}
          />
        );
      })}

      {Array.from({ length: +totalLength - (+filledStarLength + +halfStarLength) }, () => 2)?.map((item, i) => {
        return (
          <i
            key={i + 1}
            onClick={() => {
              if (disableClick) return;
              setFilledStarLength(prev => +prev + (i + 1));
            }}
            className="fa-regular fa-star fa-2xl fade-in-fwd m-1 ratStarAccr"
          />
        );
      })}
      {!disableClick && (
        <span className='ratAccrSpan'>{filledStarLength}</span>
      )}
    </>
  );

  const data = { ratingsComp, finalRating: filledStarLength, resetter, setFilledStarLength, setHalfStarLength };
  return data;
};

export default useRatings;

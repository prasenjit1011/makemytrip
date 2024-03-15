import React from 'react'
import { useState } from 'react';
import "./ReadMore.css"

const ReadMoreLess = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="read-more-text">
        {isReadMore ? text.slice(0, 30) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };

export default ReadMoreLess
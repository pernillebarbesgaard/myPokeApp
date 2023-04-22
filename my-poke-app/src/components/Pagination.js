import React from 'react';

function Pagination({ offset, limit, min, max, responsiveLimit, setOffset, setLimit }) {
  const handlePrevClick = () => {
    setLimit(5*responsiveLimit);
    const newOffset = offset - (5 * responsiveLimit);
    setOffset(newOffset);
  };

  const handleNextClick = () => {
    const remaining = max - (offset + limit) + 1;
    const newLimit = remaining < limit ? remaining : limit;

    const newOffset = offset + (5 * responsiveLimit);
    console.log(newOffset);
    setOffset(newOffset);
    setLimit(newLimit);
    console.log("offset: " + offset + " limit: " + limit + " responsiveLimit: " + responsiveLimit + "min: " + min + " max: " + max);
  };

  return (
    <div className="pagination">
      <button className="pagebutton" disabled={offset === min} onClick={handlePrevClick}>
        Previous
      </button>
      <button className="pagebutton" disabled={offset + limit > max} onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
import React from 'react';

const FlightsList = ({priceRange, sortType, oneSegmentOnly}) => {
  return (
    <div className="list">
      <h6>{`Price range: ${priceRange}`}</h6>
      <h6>{`Sort type: ${sortType}`}</h6>
      <h6>{`One segment only: ${oneSegmentOnly.toString()}`}</h6>
    </div>
  )
};

export default FlightsList;
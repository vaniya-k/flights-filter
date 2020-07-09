import React, {useState} from 'react';
import FlightsFilterControls from './FlightsFilterControls.jsx';
import FlightsList from './FlightsList.jsx';

const SORT_TYPES = {
  'PRICE_ASCENDING': 0,
  'PRICE_DESCENDING': 1,
  'DURATION_ASCENDING': 2
}

const FlightsPageContainer = () => {
  const [priceRange, setPriceRange] = useState([0, ``]);
  const [sortType, setSortType] = useState(SORT_TYPES[`PRICE_ASCENDING`]);
  const [oneSegmentOnly, setOneSegmentOnly] = useState(false);

  const handlePriceRangeChange = val => {
    if (val[0] !== priceRange[0] || val[1] !== priceRange[1]) {
      setPriceRange(val)
    }
  };

  const handleSortTypeChange = val => {
    if (val !== sortType) {
      setSortType(val)
    }
  };

  const handleOneSegmentOnlyToggle = () => {
    setOneSegmentOnly(!oneSegmentOnly)
  };

 return(
   <div className="container">
      <FlightsFilterControls
        priceRange={priceRange}
        sortType={sortType}
        oneSegmentOnly={oneSegmentOnly}
        onPriceRangeChange={handlePriceRangeChange}
        onSortTypeChange={handleSortTypeChange}
        onOneSegmentOnlyToggle={handleOneSegmentOnlyToggle}
      />
      <FlightsList
        priceRange={priceRange}
        sortType={sortType}
        oneSegmentOnly={oneSegmentOnly}
      />
   </div>
 )
};

export default FlightsPageContainer;
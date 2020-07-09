import React, {useState, useEffect} from 'react';
import FlightsFilterAndSortControls from './FlightsFilterAndSortControls.jsx';
import FlightsList from './FlightsList.jsx';
import flightsAdapter from '../utils/flightsAdapter.js';

const SORT_TYPES = {
  'PRICE_ASCENDING': 0,
  'PRICE_DESCENDING': 1,
  'DURATION_ASCENDING': 2
}

const API_URL = `http://localhost:7070/flights`

const FlightsPageContainer = () => {
  const [priceRange, setPriceRange] = useState([``, ``]);
  const [sortType, setSortType] = useState(SORT_TYPES[`PRICE_ASCENDING`]);
  const [oneSegmentOnly, setOneSegmentOnly] = useState(false);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [errorLoadingFlights, setErrorLoadingFlights] = useState(null);
  const [flights, setFlights] = useState(null);
  const [itemsToRender, setItemsToRender] = useState(null);

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

  useEffect (() => {
    let tempItemsToRender = flights;

    if(flights !== null && oneSegmentOnly === true) {
      tempItemsToRender = tempItemsToRender.filter(flight => flight.segments.length === 1)
    }

    if(flights !== null && priceRange[0] !== 0 && priceRange[0] !== ``) {
      tempItemsToRender = tempItemsToRender.filter(flight => flight.price > priceRange[0])
    }

    if(flights !== null && priceRange[1] !== ``) {
      tempItemsToRender = tempItemsToRender.filter(flight => flight.price < priceRange[1])
    }

    setItemsToRender(tempItemsToRender);
  }, [flights, priceRange, oneSegmentOnly]);

  useEffect(() => {
    setLoadingFlights(true);

    fetch(API_URL)
      .then(response => response.json())
      .then(result => setFlights(flightsAdapter(result)))
      .catch(error => setErrorLoadingFlights(error))
      .finally(() => setLoadingFlights(false))
  }, []);

 return(
   <div className="container">
      <FlightsFilterAndSortControls
        priceRange={priceRange}
        sortType={sortType}
        oneSegmentOnly={oneSegmentOnly}
        onPriceRangeChange={handlePriceRangeChange}
        onSortTypeChange={handleSortTypeChange}
        onOneSegmentOnlyToggle={handleOneSegmentOnlyToggle}
      />
      <FlightsList
        flights={itemsToRender}
        sortType={sortType}
        loadingFlights={loadingFlights}
        errorLoadingFlights={errorLoadingFlights}
      />
   </div>
 )
};

export default FlightsPageContainer;
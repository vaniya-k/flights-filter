import React, {useState, useEffect} from 'react';

const PRICE_REGEXP = /^([+-]?[1-9]\d*|0)$/;

const FlightsFilterControls = ({sortType, onSortTypeChange, oneSegmentOnly, onOneSegmentOnlyToggle, priceRange, onPriceRangeChange}) => {
  const [isMinPriceValid, setIsMinPriceValid] = useState(true);
  const [isMaxPriceValid, setIsMaxPriceValid] = useState(true);
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);


  useEffect(() => {
    (PRICE_REGEXP.test(minPrice) || minPrice === ``) ? setIsMinPriceValid(true) : setIsMinPriceValid(false);
    (PRICE_REGEXP.test(maxPrice) || maxPrice === ``) ? setIsMaxPriceValid(true) : setIsMaxPriceValid(false);

    if(parseInt(maxPrice) < parseInt(minPrice)) {
      setIsMaxPriceValid(false)
    };
  }, [minPrice, maxPrice]);


  const handlePriceRangeEnter = (evt) => {
    if(evt.keyCode === 13) {
      evt.preventDefault();

      console.log([minPrice, maxPrice])

      if(isMinPriceValid && isMaxPriceValid) {
        onPriceRangeChange([minPrice, maxPrice])
      };
    }
  };

  const handleMinPriceChange = (evt) => {
    setMinPrice(evt.target.value)
  };

  const handleMaxPriceChange = (evt) => {
    setMaxPrice(evt.target.value)
  };

  return (
    <div className="controls">
      <h4>Сортировать</h4>
      <form>
        <div>
          <label>
            <input type="radio" onChange={() => onSortTypeChange(0)} checked={sortType === 0}/>
            - по возрастанию цены
          </label>
        </div>
        <div>
          <label>
            <input type="radio" onChange={() => onSortTypeChange(1)} checked={sortType === 1}/>
            - по убыванию цены
          </label>
        </div>
        <div>
          <label>
            <input type="radio" onChange={() => onSortTypeChange(2)} checked={sortType === 2}/>
            - по времени в пути
          </label>
        </div>
      </form>

      <h4>Фильтровать</h4>
      <form>
        <div>
          <label>
            <input type="checkbox" onChange={onOneSegmentOnlyToggle} checked={oneSegmentOnly === true}/>
            - без пересадок
          </label>
        </div>
      </form>

      <h4>Цена</h4>
      <form>
        <div>
          <label>
            От:&nbsp;
            <input className={!isMinPriceValid ? `price-input-wrong` : null} value={minPrice} onChange={handleMinPriceChange} onKeyUp={handlePriceRangeEnter} type="text"/>
          </label>
        </div>
        <div>
          <label>
            До:&nbsp;
            <input className={!isMaxPriceValid ? `price-input-wrong` : null} value={maxPrice} onChange={handleMaxPriceChange} onKeyUp={handlePriceRangeEnter} type="text"/>
          </label>
        </div>
      </form>
    </div>
  )
}

export default FlightsFilterControls;
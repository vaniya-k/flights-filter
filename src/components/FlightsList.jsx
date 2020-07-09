import React from 'react';

const FlightCard = ({flight}) => {
  return(
    <div className="card">
      <div className="card-top">
        <span>
          {`Вылет: ${flight.segments[0].departureDate} ${flight.segments[0].departureTime}  / Прилет: ${flight.segments[flight.segments.length - 1].arrivalDate} ${flight.segments[flight.segments.length - 1].arrivalTime} / Время в пути: ${flight.durationStr}`}
        </span>
      </div>
      <div className="card-connections">
        {flight.segments.map((segment, i) => <p key={i}>
          {`${segment.departureCity}, ${segment.departureAirport} (${segment.departureAirportCode})  >> ${segment.arrivalCity}, ${segment.arrivalAirport} (${segment.arrivalAirportCode})`}
        </p>)}
      </div>
      <div className="card-bottom">
        <span>
          {`Цена: ${flight.priceStr}`}
        </span>
      </div>
    </div>
  )
}

const FlightsList = ({flights, sortType, loadingFlights, errorLoadingFlights}) => {
  const decideWhatToRender = () => {
    if(flights === null && loadingFlights === true) {return <div className="service-message"><h4>Идет загрузка...</h4></div>};

    if(flights === null && errorLoadingFlights !== null) {return <div className="service-message"><h4>Ошибка загрузки!</h4></div>};

    if(flights.length === 0) {return <div className="service-message"><h4>Не найдено подходящих полетов</h4></div>};

    let tempFlights = flights;

    switch(sortType) {
      case 0:
        tempFlights.sort((a, b) => (a.price < b.price) ? -1 : 1);
        break;
      case 1:
        tempFlights.sort((a, b) => (a.price > b.price) ? -1 : 1);
        break;
      case 2:
        tempFlights.sort((a, b) => (a.duration < b.duration) ? -1 : 1);
        break;
    }

    return tempFlights.map((flight, i) => <FlightCard key={flight.price + flight.duration} flight={flights[i]}/>)
  }


  return (
    <div className="list">
      {decideWhatToRender()}
    </div>
  )
};

export default FlightsList;

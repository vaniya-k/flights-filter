const AIRLINES = {
  'AF': 'Air France',
  'AZ': 'Alitalia',
  'LH': 'Lufthansa',
  'KL': 'KLM Royal Dutch Airlines',
  'LX': 'Swiss International Air Lines',
  'LO': 'Polish Airlines',
  'TP': 'TAP Portugal',
  'SU': 'Aeroflot',
  'IB': 'Iberia',
  'BT': 'Air Baltic',
  'UX': 'Air Europa',
  'TK': 'Turkish Airlines',
  'S7': 'S7 Airlines',
  'BA': 'British Airways'
};

const CITIES = {
  'MOW': 'Москва',
  'PAR': 'Париж',
  'LON': 'Лондон',
  'ROM': 'Рим',
  'FRA': 'Франкфурт-на-Майне',
  'AMS': 'Амстердам',
  'ZRH': 'Цюрих',
  'WAW': 'Варшава',
  'LIS': 'Лиссабон',
  'LED': 'Cанкт-Петербург',
  'BCN': 'Барселона',
  'RIX': 'Рига',
  'MAD': 'Мадрид',
  'IST': 'Стамбул',
  'DUS': 'Дюссельдорф'
};

const AIRPORTS = {
  'CDG': 'Шарль-де-Голль',
  'SVO': 'Шереметьево',
  'LHR': 'Хитроу',
  'FCO': 'Фьюмичино',
  'FRA': 'Аэропорт Франкфурта-на-Майне',
  'DME': 'Домодедово',
  'AMS': 'Схипхол',
  'ZRH': 'Аэропорт Цюриха',
  'LCY': 'Лондон-Сити',
  'WAW': 'Аэропорт имени Ф.Шопена',
  'LIS': 'Портела',
  'LED': 'Пулково',
  'LGW': 'Гатвик',
  'BCN': 'Эль-Прат',
  'RIX': 'Аэропорт Риги',
  'MAD': 'Барахас',
  'IST': 'Аэропорт Стамбула',
  'VKO': 'Внуково',
  'DUS': 'Аэропорт Дюссельдорфа',
};

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'откября', 'ноября', 'декабря']

const createSchrinkedObj = (flight) => {
  return {
    priceStr: `${flight.price.total.amount} руб.`,
    price: parseInt(flight.price.total.amount),
    durationStr: `${Math.floor(flight.legs[0].duration / 60)} часов ${flight.legs[0].duration % 60} минут`,
    duration: flight.legs[0].duration,
    segments: flight.legs[0].segments.map(segment => createShrinkedSegment(segment))
  }
};

const createShrinkedSegment = (segment) => {
  return {
    departureCity: CITIES[segment.departureCity.uid],
    departureAirport: AIRPORTS[segment.departureAirport.uid],
    departureAirportCode: segment.departureAirport.uid,
    arrivalCity: CITIES[segment.arrivalCity.uid],
    arrivalAirport: AIRPORTS[segment.arrivalAirport.uid],
    arrivalAirportCode: segment.arrivalAirport.uid,
    airline: AIRLINES[segment.airline.uid],
    arrivalDate: `${segment.arrivalDate.slice(8,10)} ${MONTHS[parseInt(segment.arrivalDate.slice(5,7) - 1)]}`,
    arrivalTime: `${segment.arrivalDate.slice(11,16)}`,
    departureDate: `${segment.departureDate.slice(8,10)} ${MONTHS[parseInt(segment.departureDate.slice(5,7) - 1)]}`,
    departureTime: `${segment.departureDate.slice(11,16)}`
  }
}

const flightsAdapter = (apiResponse) => {
  const flights = apiResponse.result.flights.map(flight => flight.flight)

  const finalArr = flights.map(flight => createSchrinkedObj(flight))

  return finalArr;
};

export default flightsAdapter;
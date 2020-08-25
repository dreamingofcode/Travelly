const getData = () => {
  const FETCH_URL = localStorage.getItem('hotelSearch_API_URL');
  
  console.log(FETCH_URL.split('&'));
  if (FETCH_URL) {
    let data = {
      locationID: FETCH_URL.split('&')[10],
      checkin: FETCH_URL.split('&')[12].split('=')[1],
      checkout: FETCH_URL.split('&')[12].split('=')[1],
      nights: FETCH_URL.split('&')[14].split('-')[1],
      adults: FETCH_URL.split('&')[11].split('=')[1],
      rooms: FETCH_URL.split('&')[13].split('=')[1],
      pricesMAX: FETCH_URL.split('&')[3].split('=')[1],
      hotelClass: FETCH_URL.split('&')[4].split('=')[1],
      subcatergory: FETCH_URL.split('&')[2],
    };
    return data;
  }
};
const initialState = getData();
export default function setHotelSearchParameters(state = initialState, action) {
  switch (action.type) {
    case 'GET_HOTEL_RESULTS_PARAMETERS':
      return initialState;

    default:
      return state;
  }
}

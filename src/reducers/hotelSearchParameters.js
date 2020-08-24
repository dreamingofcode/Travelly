const getData = () => {
  const FETCH_URL = localStorage.getItem('hotelSearch_API_URL');
  //   const FETCH_URL = `https://tripadvisor1.p.rapidapi.com/hotels/list?pricesmin=0&offset=0&pricesmax=547&hotel_class=1&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended&location_id=35805&adults=2&checkin=2020-08-26&rooms=3&nights=-3`
  //   const FETCH_URL =
  //     ' https://tripadvisor1.p.rapidapi.com/hotels/list?pricesmin=0&offset=0&subcategory=hotel&pricesmax=295&hotel_class=3&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended&location_id=35805&adults=3&checkin=2020-08-27&rooms=3&nights=-2';
  //0: " https://tripadvisor1.p.rapidapi.com/hotels/list?pricesmin=0"
  // 1: "offset=0"
  // 2: "subcategory=hotel"
  // 3: "pricesmax=295"
  // 4: "hotel_class=3"
  // 5: "currency=USD"
  // 6: "limit=30"
  // 7: "order=asc"
  // 8: "lang=en_US"
  // 9: "sort=recommended"
  // 10: "location_id=35805"
  // 11: "adults=3"
  // 12: "checkin=2020-08-27"
  // 13: "rooms=3"
  // 14: "nights=-2"
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

const determineData = () => {
  const hotelFetchURL = localStorage.getItem('HOTEL_SEARCH_URL');
  let data = {}
  if (hotelFetchURL && hotelFetchURL.split("&").length === 15) {
     data = {
      locationID: hotelFetchURL.split('&')[10].split('=')[1],
      checkin: hotelFetchURL.split('&')[12].split('=')[1],
      nights: hotelFetchURL.split('&')[14].split('-')[1],
      adults: hotelFetchURL.split('&')[11].split('=')[1],
      rooms: hotelFetchURL.split('&')[13].split('=')[1],
      pricesMax: hotelFetchURL.split('&')[3].split('=')[1],
      hotelClass: hotelFetchURL.split('&')[4].split('=')[1],
      subcatergory: hotelFetchURL.split('&')[2].split('=')[1],
    };
    return data;
  } else if ( hotelFetchURL && hotelFetchURL.split("&").length ===14) {
    ///when no price max
    console.log("up inside detrmineDATa()",hotelFetchURL.length)

     data = {
      locationID: hotelFetchURL.split('&')[9].split('=')[1],
      checkin: hotelFetchURL.split('&')[11].split('=')[1],
      nights: hotelFetchURL.split('&')[13].split('-')[1],
      adults: hotelFetchURL.split('&')[10].split('=')[1],
      rooms: hotelFetchURL.split('&')[12].split('=')[1],
      hotelClass: hotelFetchURL.split('&')[3].split('=')[1],
      subcatergory: hotelFetchURL.split('&')[2].split('=')[1],
    };
    return data;
    
  }else return null
};

export const getHotelSearchData = () => {
  const data= determineData()
  return (dispatch) => {
    dispatch(hotelSeachDataSuccess(data));
  };
};
    const userLoaded = () => ({
      type: 'USER_LOADED',
    });
const hotelSeachDataSuccess = (data) => ({
  type: 'SET_HOTEL_SEARCH_DATA',
  hotelSearchData: data,
});

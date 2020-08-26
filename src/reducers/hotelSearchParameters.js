const initialState = null;
export default function hotelSeachDataSuccess(state = initialState, action) {
  switch (action.type) {
    case 'SET_HOTEL_SEARCH_DATA':
      return action.hotelSearchData;

    default:
      return state;
  }
}

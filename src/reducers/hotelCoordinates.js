const initialState = null;
export default function hotelCoordinates(state = initialState, action) {
  switch (action.type) {
    case 'SET_HOTEL_COORDINATES':
      return action.hotelCoordinates;

    default:
      return state;
  }
}

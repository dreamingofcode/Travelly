const initialState = null;
export default function restaurants(state = initialState, action) {
  switch (action.type) {
    case 'SET_RESTAURANTS':
      return action.restaurants;

    default:
      return state;
  }
}

const initialState = null;
export default function attractions(state = initialState, action) {
  switch (action.type) {
    case 'SET_ATTRACTIONS':
      return action.attractions;

    default:
      return state;
  }
}

const initialState = null;

export default function userData(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_USER_DATA':
      return action.userData;
    default:
      return state;
  }
}
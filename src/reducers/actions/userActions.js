export const getProfileFetch = () => {
  return (dispatch) => {
    const token = localStorage.token;
    if (token) {
      fetch('https://travelly-server.herokuapp.com/api/v1/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            // An error will occur if the token is invalid.
            // If this happens, you may want to remove the invalid token.
            localStorage.removeItem('token');
          } else {
            dispatch(loginSuccess(data.user));
            dispatch(userLoaded());
          }
        });
    }
  };

};
const loginSuccess = (data) => ({
  type: 'FETCH_USER_DATA',
  userData: data,
});
const userLoaded = () => ({
  type: 'USER_LOADED'
});

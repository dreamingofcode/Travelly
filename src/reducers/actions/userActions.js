export const getProfileFetch = () => {
  return (dispatch) => {
    
    const token = localStorage.token;
    console.log('ssssss',token)
    if (token) {
      fetch('http://localhost:3000/api/v1/profile', {
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
           dispatch(loginSuccess(data));}})
  }}


  
// export function userAuthSuccess(user){
//   return {type: "USER_AUTH", user}
// }

// export function signInUser(email, password){
//   return function(dispatch){
//     return fetch('http://localhost:3000/api/v1/profile', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer <token>`,
//       },
//     }).then(resp=>resp.json())
//     .then(user => dispatch(userAuthSuccess(user)))
//     .catch(error => {
//       throw error
//     })
//   }
}
const loginSuccess = (data) => ({
  type: 'FETCH_USER_DATA',
  userData: data,
});
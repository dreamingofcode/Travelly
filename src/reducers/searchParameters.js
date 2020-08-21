
let date = new Date();
const dd = String(date.getDate()).padStart(2, '0');
const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = date.getFullYear();
const today= yyyy +'-' + mm + '-' + dd
const initialState= [
    '78658dd993msha58b4f039c6c59ep11289djsn173e61927b34',
//   '039c7bbc36mshb41e9e4e1101941p10e3a0jsnbe89e383bb9f',
// "890754252dmshd7f6591796d3387p13f676jsn2e0b793fc271",
    'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',today]
export default function searchParameters(state= initialState, action){
    switch (action.type){
        // case "SET_RETURN_FLIGHT_RESULTS":
        //     return action.results
            
        default:
            return state
    }
}
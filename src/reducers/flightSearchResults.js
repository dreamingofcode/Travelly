const initialState= null

export default function flightSearchResults(state= initialState, action){
    switch (action.type){
        case "SET_FLIGHT_RESULTS":
            return action.results
            
        default:
            return state
    }
}
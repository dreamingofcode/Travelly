const initialState= null

export default function returnFlightSearchResults(state= initialState, action){
    switch (action.type){
        case "SET_RETURN_FLIGHT_RESULTS":
            return action.results
            
        default:
            return state
    }
}
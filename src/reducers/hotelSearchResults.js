const initialState= null

export default function hotelSearchResults(state= initialState, action){
    switch (action.type){
        case "SET_HOTEL_RESULTS":
            return action.results
            
        default:
            return state
    }
}
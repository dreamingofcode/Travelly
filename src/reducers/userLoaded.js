const initialState= false

export default function userLoaded(state= initialState, action){
    switch (action.type){
        case "USER_LOADED":
            return true
            
        default:
            return state
    }
}
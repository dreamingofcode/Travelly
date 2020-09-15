const initialState= null
export default function userAuth(state= initialState, action){
    switch (action.type){
        case "USER_AUTH":
            return action.userAuth
            
        default:
            return state
    }
}
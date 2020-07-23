const initialState= null

export default function userAuth(state= initialState, action){
    switch (action.type){
        case "CHANGE_USER_TYPE":
            return action.userType
           
        default:
            return state
    }
}
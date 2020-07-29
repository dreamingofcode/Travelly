const initialState= null

export default function userCreate(state= initialState, action){
    switch (action.userData){
        case "USER_CREATE":
            return action.userCreate
            
        default:
            return state
    }
}
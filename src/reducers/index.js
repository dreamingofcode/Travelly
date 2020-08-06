import {combineReducers} from 'redux'
import userAuth from './userAuth'
import userLoaded from './userLoaded'
import userData from './userData'
const allReducers= combineReducers({
   userAuth: userAuth,
   userLoaded:userLoaded,
   userData:userData
 })
 export default allReducers
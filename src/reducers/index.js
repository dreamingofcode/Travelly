import {combineReducers} from 'redux'
import userAuth from './userAuth'
import userType from './userType'
import userLoaded from './userLoaded'
import userData from './userData'
const allReducers= combineReducers({
   userAuth: userAuth,
   userType:userType,
   userLoaded:userLoaded,
   userData:userData
 })
 export default allReducers
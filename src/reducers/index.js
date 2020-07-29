import {combineReducers} from 'redux'
import userAuth from './userAuth'
import userType from './userType'
import userCreate from './userCreate'
import userData from './userData'
const allReducers= combineReducers({
   userAuth: userAuth,
   userType:userType,
   userCreate:userCreate,
   userData:userData
 })
 export default allReducers
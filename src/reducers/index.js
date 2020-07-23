import {combineReducers} from 'redux'
import userAuth from './userAuth'
import userType from './userType'
const allReducers= combineReducers({
   userAuth: userAuth,
   userType:userType
 })
 export default allReducers
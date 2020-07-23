import {combineReducers} from 'redux'
import userAuth from './userAuth'
const allReducers= combineReducers({
   userAuth: userAuth
 })
 export default allReducers
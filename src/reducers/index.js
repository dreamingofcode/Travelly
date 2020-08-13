import {combineReducers} from 'redux'
import userAuth from './userAuth'
import userLoaded from './userLoaded'
import userData from './userData'
import flightSearchResults from './flightSearchResults'
const allReducers= combineReducers({
   userAuth: userAuth,
   userLoaded:userLoaded,
   userData:userData,
flightSearchResults:flightSearchResults
 })
 export default allReducers
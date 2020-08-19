import {combineReducers} from 'redux'
import userAuth from './userAuth'
import userLoaded from './userLoaded'
import userData from './userData'
import flightSearchResults from './flightSearchResults'
import returnFlightSearchResults from './returnFlightSearchResults'
import searchParamters from './searchParameters'
const allReducers= combineReducers({
   userAuth: userAuth,
   userLoaded:userLoaded,
   userData:userData,
flightSearchResults:flightSearchResults,
returnFlightSearchResults: returnFlightSearchResults,
searchParamters:searchParamters
 })
 export default allReducers
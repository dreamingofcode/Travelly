import {combineReducers} from 'redux'
import userAuth from './userAuth'
import userLoaded from './userLoaded'
import userData from './userData'
import flightSearchResults from './flightSearchResults'
import returnFlightSearchResults from './returnFlightSearchResults'
import searchParameters from './searchParameters'
import   hotelSearchDataSuccess from "./hotelSearchParameters";
const allReducers= combineReducers({
   userAuth: userAuth,
   userLoaded:userLoaded,
   userData:userData,
flightSearchResults:flightSearchResults,
returnFlightSearchResults: returnFlightSearchResults,
searchParameters:searchParameters,
hotelSearchDataSuccess: hotelSearchDataSuccess
 })
 export default allReducers
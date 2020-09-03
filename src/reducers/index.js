import {combineReducers} from 'redux'
import userAuth from './userAuth'
import userLoaded from './userLoaded'
import userData from './userData'
import flightSearchResults from './flightSearchResults'
import returnFlightSearchResults from './returnFlightSearchResults'
import searchParameters from './searchParameters'
import hotelSearchResults from './hotelSearchResults'
import   hotelSearchDataSuccess from "./hotelSearchParameters"
import attractions from './attractions'
import restaurants from "./restaurants";
const allReducers= combineReducers({
   userAuth: userAuth,
   userLoaded:userLoaded,
   userData:userData,
flightSearchResults:flightSearchResults,
returnFlightSearchResults: returnFlightSearchResults,
searchParameters:searchParameters,
hotelSearchResults: hotelSearchResults,
hotelSearchDataSuccess: hotelSearchDataSuccess,
attractions: attractions,
restaurants:restaurants
 })
 export default allReducers
import {combineReducers} from 'redux'
import userAuth from './userAuth'
import userLoaded from './userLoaded'
import userData from './userData'
import flightSearchResults from './flightSearchResults'
import returnFlightSearchResults from './returnFlightSearchResults'
import searchParameters from './searchParameters'
import   hotelSearchResults from "./hotelSearchResults";
import setHotelSearchParameters from './hotelSearchParameters'
const allReducers= combineReducers({
   userAuth: userAuth,
   userLoaded:userLoaded,
   userData:userData,
flightSearchResults:flightSearchResults,
returnFlightSearchResults: returnFlightSearchResults,
searchParameters:searchParameters,
hotelSearchResults: hotelSearchResults,
setHotelSearchParameters:setHotelSearchParameters
 })
 export default allReducers
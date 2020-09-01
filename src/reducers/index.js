import {combineReducers} from 'redux'
import userAuth from './userAuth'
import userLoaded from './userLoaded'
import userData from './userData'
import flightSearchResults from './flightSearchResults'
import returnFlightSearchResults from './returnFlightSearchResults'
import searchParameters from './searchParameters'
import hotelSearchResults from './hotelSearchResults'
import   hotelSearchDataSuccess from "./hotelSearchParameters"
import hotelCoordinates from './hotelCoordinates'
const allReducers= combineReducers({
   userAuth: userAuth,
   userLoaded:userLoaded,
   userData:userData,
flightSearchResults:flightSearchResults,
returnFlightSearchResults: returnFlightSearchResults,
searchParameters:searchParameters,
hotelSearchResults: hotelSearchResults,
hotelSearchDataSuccess: hotelSearchDataSuccess,
hotelCoordinates: hotelCoordinates
 })
 export default allReducers
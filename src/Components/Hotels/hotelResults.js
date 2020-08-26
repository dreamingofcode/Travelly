import React, { useState } from 'react';
import { connect } from 'react-redux';
import './hotelResults.css';
import HotelDetailCards from './hotelDetailsCard';
import AmenitiesInput from './amenitiesInput'
////Todo: error handling for when there is not locastorage set url/////////////////
function HotelResults(props) {
  const { searchParameters, setReturnFlightSearchResults,hotelSearchDataSucess } = props;
  const API_KEY = searchParameters[0];
  const API_HOST = searchParameters[1];
  console.log("checkin", props.hotelSearchDataSucess,props.userLoaded)
  let FETCH_URL = localStorage.getItem('HOTEL_SEARCH_URL'); ///api url from initial search here
  const [searchData, setSearchData] = useState({
    locationID: hotelSearchDataSucess,
    checkin: FETCH_URL.split('&')[12].split('=')[1],
    checkout: FETCH_URL.split('&')[12].split('=')[1],
    // nights: FETCH_URL.split('&')[14].split('-')[1],
    adults: FETCH_URL.split('&')[11].split('=')[1],
    // rooms: FETCH_URL.split('&')[13].split('=')[1],
    pricesMAX: FETCH_URL.split('&')[3].split('=')[1],
    hotelClass: FETCH_URL.split('&')[4].split('=')[1],
    subcatergory: FETCH_URL.split('&')[2],
    priceRange: 'true',
  });
  const [hotelSelected, setHotelSelected] = useState({
    boolean: false,
    id: '',
  });

  const {
    priceRange,
    rooms,
    subcatergory,
    hotelClass,
    pricesMAX,
    adults,
    checkout,
    checkin,
    locationID,
  } = searchData;
  const { history, hotelSearchResults } = props;

  // if (hotelSearchResults === null || hotelSearchResults.message ||hotelSearchResults.data.length === 0)
  //   history.push('/hotel-search');
  // else {

  const setTripData = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setSearchData({ ...searchData, [key]: value });
  };
  const sendSearch = (e) => {
  //   const { origin, destination } = searchData;

  //   e.preventDefault();

  //   FETCH_URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/`;

  //   fetch(FETCH_URL, {
  //     method: 'GET',
  //     headers: {
  //       'x-rapidapi-host': API_HOST,
  //       'x-rapidapi-key': API_KEY,
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((response) => {
  //       localStorage.setItem('hotelSearch_API_URL', FETCH_URL);
  //       props.setHotelSearchResults(response);
  //       response.message || response.Quotes.length <= 0
  //         ? alert('No Avialable Flights available please try')
  //         : this.props.history.push('/hotel-results');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  };
  const setToggleButtonDisplay = (id, toggleButtonStyle) => {
    if (toggleButtonStyle === 'Select')
      setHotelSelected({ boolean: true, id: id });
    if (toggleButtonStyle === 'Remove')
      setHotelSelected({ boolean: false, id: '' });
  };
  return (
    <div className="hotel-search-results-page">
      <div className="results-header">
        <h1>Hotel Search Results</h1>

        <form>
          <hr />
    
          <div>
            <label htmlFor="city">CITY: </label>
            <input
              type="text"
              id="city"
              name="city"
              defaultValue={"looj"}
              onChange={(e) => setTripData(e)}
            />

            <label htmlFor="checkin">CHECK-IN: </label>
            <input
              type="date"
              name="checkin"
              id="checkin"
              min={searchParameters[2]}
              defaultValue={checkin}
              onChange={(e) => setTripData(e)}
            />

            <label htmlFor="checkout">CHECK-OUT: </label>
            <input
              type="date"
              name="checkout"
              id="checkout"
              min={checkin}
              defaultValue={checkout || ''}
              onChange={(e) => setTripData(e)}
            />
          </div>
          <AmenitiesInput/>
          {priceRange === 'true' ? (
            <React.Fragment>
              <label for="formControlRange">
                PRICE RANGE $0-${searchData.pricesMax}
              </label>
              <input
                type="range"
                class="form-control-range"
                id="formControlRange"
                name="pricesMax"
                min="0"
                max="1000"
                onChange={(e) => {
                  this.setTripData(e);
                }}
              />
            </React.Fragment>
          ) : null}
          <div id="price-range">
            <div className="info-box">
              <input
                type="radio"
                name="priceRange"
                value="true"
                defaultChecked="true"
                onClick={(e) => setTripData(e)}
              />
              <label htmlFor="roundtrip">SET PRICE RANGE</label>
            </div>
            <div className="info-box">
              <input
                type="radio"
                name="priceRange"
                value="false"
                onClick={(e) => setTripData(e)}
              />
              <label>NO PRICE RANGE</label>
            </div>
          </div>
          <button onClick={(e) => sendSearch(e)}>Search</button>
        </form>
      </div>
      <section>
        <HotelDetailCards
          id={1}
          setToggleButtonDisplay={setToggleButtonDisplay}
          setHotelSelected={setHotelSelected}
          hotelSelected={hotelSelected}
          
        />
        <HotelDetailCards
          id={2}
          setToggleButtonDisplay={setToggleButtonDisplay}
          setHotelSelected={setHotelSelected}
          hotelSelected={hotelSelected}
          
        />
        <HotelDetailCards
          id={3}
          setToggleButtonDisplay={setToggleButtonDisplay}
          setHotelSelected={setHotelSelected}
          hotelSelected={hotelSelected}
          
        />
        <HotelDetailCards
          id={4}
          setToggleButtonDisplay={setToggleButtonDisplay}
          setHotelSelected={setHotelSelected}
          hotelSelected={hotelSelected}
          
        />

        {/* {hotelSearchResults !== null && !hotelSearchResults.message ? (
          <div>{' '}
          {hotelSearchResults.data.map((hotel) => {
                return (
                  <HotelDetailCards
                    id={hotel.name}
                    hotel={hotel}
          
                    // setFlightSelected={setDepartureFlightSelected}
                    // flightSelected={departureFlightSelected}
                    // setToggleButtonDisplay={setToggleButtonDisplay}
                  />
                );
              })}
            </div>
          ) : null} */}
      </section>
      {hotelSelected.boolean ? (
        <button className="continue-button">Continue</button>
      ) : null}
    </div>
  );
  // }
  // return null;
}
const mapStateToProps = (state) => {
  return {
    hotelSearchResults: state.hotelSearchResults,
    returnFlightSearchResults: state.returnFlightSearchResults,
    searchParameters: state.searchParameters,
    hotelSearchDataSucess: state.hotelSearchDataSucess,
    userLoaded: state.userLoaded
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setFlightSearchResults: (results) => {
      const action = {
        type: 'SET_FLIGHT_RESULTS',
        results: results,
      };
      dispatch(action);
    },
    setReturnFlightSearchResults: (results) => {
      const action = {
        type: 'SET_RETURN_FLIGHT_RESULTS',
        results: results,
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HotelResults);

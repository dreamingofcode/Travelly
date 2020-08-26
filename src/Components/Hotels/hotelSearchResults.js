import React, { useState } from 'react';
import { connect } from 'react-redux';
import './hotelSearchResults.css';
import HotelDetailCards from '../Hotels/hotelDetailsCard';
////Todo: airport options will remain here , airport options saved to redux store,
function HotelSearchResults(props) {
  const { searchParameters, setReturnFlightSearchResults } = props;
  const API_KEY = searchParameters[0];
  const API_HOST = searchParameters[1];
  let FETCH_URL = localStorage.getItem('hotelSearch_API_URL'); ///api url from initial search here
  const [searchData, setSearchData] = useState({
    locationID: FETCH_URL.split('&')[10],
    checkin: FETCH_URL.split('&')[12].split('=')[1],
    checkout: FETCH_URL.split('&')[12].split('=')[1],
    nights: FETCH_URL.split('&')[14].split('-')[1],
    adults: FETCH_URL.split('&')[11].split('=')[1],
    rooms: FETCH_URL.split('&')[13].split('=')[1],
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
    const { origin, destination } = searchData;

    e.preventDefault();

    FETCH_URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/`;

    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY,
      },
    })
      .then((resp) => resp.json())
      .then((response) => {
        localStorage.setItem('hotelSearch_API_URL', FETCH_URL);
        props.setHotelSearchResults(response);
        response.message || response.Quotes.length <= 0
          ? alert('No Avialable Flights available please try')
          : this.props.history.push('/hotel-results');
      })
      .catch((err) => {
        console.log(err);
      });
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
          <label>CITY: </label>
          <input
            type="text"
            name="city"
            defaultValue={''}
            onChange={(e) => setTripData(e)}
          />

          <label>CHECK-IN: </label>
          <input
            type="date"
            name="checkin"
            min={searchParameters[2]}
            defaultValue={checkin}
            onChange={(e) => setTripData(e)}
          />

          <label>CHECK-OUT: </label>
          <input
            type="date"
            name="checkout"
            min={checkin}
            defaultValue={checkout || ''}
            onChange={(e) => setTripData(e)}
          />
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
                max="1500"
                onChange={(e) => {
                  this.setTripData(e);
                }}
              />
            </React.Fragment>
          ) : null}
          <div id="hotel-type">
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
export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchResults);

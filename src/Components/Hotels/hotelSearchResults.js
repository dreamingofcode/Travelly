import React, { useState } from 'react';
import { connect } from 'react-redux';
import './hotelSearchResults.css';
import HotelDetailCards from '../Hotels/hotelDetailsCard';
////Todo: airport options will remain here , airport options saved to redux store,
function HotelSearchResults(props) {
  const { searchParameters, setReturnFlightSearchResults } = props;
  const API_KEY = searchParameters[0];
  const API_HOST = searchParameters[1];
  let HOTEL_FETCH_URL = localStorage.getItem('hotelSearch_API_URL'); ///api url from initial search here
  const [searchData, setSearchData] = useState({
    locationId: HOTEL_FETCH_URL.split('/')[9],
    checkin: HOTEL_FETCH_URL.split('/')[10],
    nights: HOTEL_FETCH_URL.split('/')[10],
    rooms: HOTEL_FETCH_URL.split('/')[11].split('?')[0],
    adults: HOTEL_FETCH_URL.split('/').pop().split('=')[1],
  });
  // const [departureFlightSelected, setDepartureFlightSelected] = useState({
  //   boolean: false,
  //   id: '',
  // });
  // const [returnFlightSelected, setReturnFlightSelected] = useState({
  //   boolean: false,
  //   id: '',
  // });
  const { departureDate, returnDate, tripType } = searchData;
  const { history, hotelSearchResults } = props;

  if (hotelSearchResults === null || hotelSearchResults.Data.length === 0)
    history.push('/hotel-search');
  else {
    // const destination = hotelSearchResults.Data[0].Name;
    // const origin = hotelSearchResults.Data[1].Name;

    const setTripData = (event) => {
      const key = event.target.name;
      const value = event.target.value;
      setSearchData({ ...searchData, [key]: value });
    };
    const sendSearch = (e) => {
      const { origin, destination } = searchData;

      e.preventDefault();
      let setTripType = '';
      tripType === 'roundtrip'
        ? (setTripType = `?inboundpartialdate=${returnDate}`)
        : setReturnFlightSearchResults(null);
      HOTEL_FETCH_URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${origin}/${destination}/${departureDate}${setTripType}`;

      fetch(HOTEL_FETCH_URL, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': API_HOST,
          'x-rapidapi-key': API_KEY,
        },
      })
        .then((resp) => resp.json())
        .then((response) => {
          localStorage.setItem('hotelSearch_API_URL', HOTEL_FETCH_URL);
          props.setHotelSearchResults(response);
          response.message || response.Quotes.length <= 0
            ? alert('No Avialable Flights available please try')
            : this.props.history.push('/hotel-results');
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const setToggleButtonDisplay = (tripType, id, toggleButtonStyle) => {
      //user should pick one ticket from departure and one ticket from return
      //my code should be aware if one of each has been selected
      //once one of each is seleceted, the continue button becomes apparent
      // if i unselect a ticket  all ticket select buttons appear/enabled again .departure and returns are handled seperately
      // if (tripType === 'departure') {
      //   if (toggleButtonStyle === 'Select')
      //     setDepartureFlightSelected({ boolean: true, id: id });
      //   if (toggleButtonStyle === 'Remove')
      //     setDepartureFlightSelected({ boolean: false, id: '' });
      // }
      // if (tripType === 'return') {
      //   if (toggleButtonStyle === 'Select')
      //     setReturnFlightSelected({ boolean: true, id: id });
      //   if (toggleButtonStyle === 'Remove')
      //     setReturnFlightSelected({ boolean: false, id: '' });
      // }
      // console.log(
      //   'depTTERTWGRTG',
      //   departureFlightSelected,
      //   returnFlightSelected
      // );
      // document.getElementById(id).disabled = true;
    };
    return (
      <div className="flight-search-results-page">
        <div className="results-header">
          <h1>Hotel Search Results</h1>

          <form>
            <hr />
            <label>city: </label>
            <input
              type="text"
              name="city"
              defaultValue={''}
              onChange={(e) => setTripData(e)}
            />

            {/* <label>: </label>
            <input
              type="text"
              name="destination"
              defaultValue={destination || ''}
              onChange={(e) => setTripData(e)}
            />
            <br /> */}
            <label>checkin: </label>
            <input
              type="date"
              name="checkin"
              min={searchParameters[2]}
              defaultValue={searchData.checkin}
              onChange={(e) => setTripData(e)}
            />

            <label>Return: </label>
            <input
              type="date"
              name="checkout"
              min={searchData.checkin}
              defaultValue={searchData.checkout || ''}
              onChange={(e) => setTripData(e)}
            />

            <div id="flight-type">
              <div className="info-box">
                <input
                  type="radio"
                  name="priceRange"
                  value="roundtrip"
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
          {hotelSearchResults !== null ? (
            <div>
              {' '}
              {hotelSearchResults.Data.map((result) => {
                return (
                  <HotelDetailCards
                    // id={result.QuoteId}
                    // setToggleButtonDisplay={setToggleButtonDisplay}
                    // result={result}
                    // tripType={'departure'}
                    // setFlightSelected={setDepartureFlightSelected}
                    // flightSelected={departureFlightSelected}
                    // departureDate={departureDate}
                    // places={hotelSearchResults.Places}
                  />
                );
              })}
            </div>
          ) : null}
        </section>
        {/* {departureFlightSelected.boolean && returnFlightSelected.boolean ? (
          <button className="continue-button">Continue</button>
        ) : null} */}
      </div>
    );
  }
  return null;
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

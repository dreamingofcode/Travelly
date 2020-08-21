import React, { useState } from 'react';
import { connect } from 'react-redux';
import './flightSearchResults.css';
import FlightDetailCards from './flightDetailsCard';
////Todo: airport options will remain here , airport options saved to redux store,
function FlightSearchResults(props) {
  const { searchParameters, setReturnFlightSearchResults } = props;
  const API_KEY = searchParameters[0];
  const API_HOST = searchParameters[1];
  let API_URL = localStorage.getItem('flightSearch_API_URL'); ///api url from initial search here
  let RETURN_API_URL = localStorage.getItem('flightSearch_RETURN_API_URL'); ///////////
  const [searchData, setSearchData] = useState({
    origin: API_URL.split('/')[9],
    destination: API_URL.split('/')[10],
    tripType: 'roundtrip',
    departureDate: API_URL.split('/')[11].split('?')[0],
    returnDate: API_URL.split('/').pop().split('=')[1],
  });
  const [departureFlightSelected, setDepartureFlightSelected] = useState({
    boolean: false,
    id: '',
  });
  const [returnFlightSelected, setReturnFlightSelected] = useState({
    boolean: false,
    id: '',
  });
  const { departureDate, returnDate, tripType } = searchData;
  const { history, flightSearchResults, returnFlightSearchResults } = props;
  // useEffect(() => {}, []);

  if (flightSearchResults === null || flightSearchResults.Quotes.length === 0)
    history.push('/flightSearch');
  else {
    const destination = flightSearchResults.Places[0].Name;
    const origin = flightSearchResults.Places[1].Name;

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
    API_URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${origin}/${destination}/${departureDate}${setTripType}`;
    RETURN_API_URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${destination}/${origin}/${returnDate}`;
    tripType === 'roundtrip'
      ? fetch(RETURN_API_URL, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': API_HOST,
            'x-rapidapi-key': API_KEY,
          },
        })
          .then((resp) => resp.json())
          .then((response) => {
            console.log('returnsearch', response);
            localStorage.setItem('flightSearch_RETURN_API_URL', RETURN_API_URL);
            props.setReturnFlightSearchResults(response);
            response.message || response.Quotes.length <= 0
              ? alert('No Avialable Flights available please try')
              : this.props.history.push('/flightSearch-results');
          })
          .catch((err) => {
            console.log(err);
          })
      : console.log('oneway');
    fetch(API_URL, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY,
      },
    })
      .then((resp) => resp.json())
      .then((response) => {
        localStorage.setItem('flightSearch_API_URL', API_URL);
        props.setFlightSearchResults(response);
        response.message || response.Quotes.length <= 0
          ? alert('No Avialable Flights available please try')
          : this.props.history.push('/flightSearch-results');
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
      if (tripType === 'departure') {
        if (toggleButtonStyle === 'Select')
          setDepartureFlightSelected({ boolean: true, id: id });
        if (toggleButtonStyle === 'Remove')
          setDepartureFlightSelected({ boolean: false, id: '' });
      }
      if (tripType === 'return') {
        if (toggleButtonStyle === 'Select')
          setReturnFlightSelected({ boolean: true, id: id });
        if (toggleButtonStyle === 'Remove')
          setReturnFlightSelected({ boolean: false, id: '' });
      }
      console.log(
        'depTTERTWGRTG',
        departureFlightSelected,
        returnFlightSelected
      );
      // document.getElementById(id).disabled = true;
    };
    return (
      <div className="flight-search-results-page">
        <div className="results-header">
          <h1>Flight Search Results</h1>

          <form>
            <hr />
            <label>Origin: </label>
            <input
              type="text"
              name="origin"
              defaultValue={origin || ''}
              onChange={(e) => setTripData(e)}
            />

            <label>Destination: </label>
            <input
              type="text"
              name="destination"
              defaultValue={destination || ''}
              onChange={(e) => setTripData(e)}
            />
            <br />
            <label>Departure: </label>
            <input
              type="date"
              name="departureDate"
              min={searchParameters[2]}
              defaultValue={departureDate}
              onChange={(e) => setTripData(e)}
            />

            {searchData.tripType === 'roundtrip' ? (
              <React.Fragment>
                <label>Return: </label>
                <input
                  type="date"
                  name="returnDate"
                  min={departureDate}
                  defaultValue={searchData.returnDate || ''}
                  onChange={(e) => setTripData(e)}
                />
              </React.Fragment>
            ) : null}
            <div id="flight-type">
              <div className="info-box">
                <input
                  type="radio"
                  name="tripType"
                  value="roundtrip"
                  defaultChecked="true"
                  id="roundtrip"
                  onClick={(e) => setTripData(e)}
                />
                <label htmlFor="roundtrip">ROUND TRIP</label>
              </div>
              <div className="info-box">
                <input
                  type="radio"
                  name="tripType"
                  value="oneway"
                  id="one-way"
                  onClick={(e) => setTripData(e)}
                />
                <label htmlFor="one-way">ONE WAY</label>
              </div>
            </div>
            <button onClick={(e) => sendSearch(e)}>Search</button>
          </form>
        </div>
        <section>
          {flightSearchResults !== null ? (
            <div>
              {' '}
              <h5>DEPARTURES</h5>
              {flightSearchResults.Quotes.map((result) => {
                return (
                  <FlightDetailCards
                    id={result.QuoteId}
                    setToggleButtonDisplay={setToggleButtonDisplay}

                    result={result}
                    tripType={'departure'}
                    setFlightSelected={setDepartureFlightSelected}
                    flightSelected={departureFlightSelected}
                    departureDate={departureDate}
                    places={flightSearchResults.Places}
                  />
                );
              })}
            </div>
          ) : null}

          {returnFlightSearchResults !== null ? (
            <div>
              {' '}
              <h5>RETURNS</h5>
              {returnFlightSearchResults.Quotes.length === 0 ? (
                <h2>NO AVAILABLE FLIGHTS</h2>
              ) : null}
              {returnFlightSearchResults.Quotes.map((result) => {
                return (
                  <FlightDetailCards
                    id={result.QuoteId + flightSearchResults.Quotes.length}
                    setToggleButtonDisplay={setToggleButtonDisplay}
                    tripType={'return'}
                    setFlightSelected={setReturnFlightSelected}
                    flightSelected={returnFlightSelected}
                    result={result}
                    returnDate={searchData.returnDate}
                    departureDate={returnDate}
                    places={returnFlightSearchResults.Places}
                  />
                );
              })}
            </div>
          ) : null}
        </section>
        {departureFlightSelected.boolean && returnFlightSelected.boolean ? (
          <button className="continue-button">Continue</button>
        ) : null}
      </div>
    );
  }
  return null;
}
const mapStateToProps = (state) => {
  return {
    flightSearchResults: state.flightSearchResults,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightSearchResults);

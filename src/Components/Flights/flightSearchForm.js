import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './flightSearchForm.css';

import cloud from '../../images/cloud.png';
import plane from '../../icons/planeicon.svg';
////////////////SHOULD BE REFACTORED///////struggle to set globally using searchparams redux state due to need of initalitaztion 
const API_KEY = '78658dd993msha58b4f039c6c59ep11289djsn173e61927b34';
const API_HOST = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';

class FlightSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();

    const { searchParameters } = props;
    this.state = {
      today: searchParameters[2],
      tripType: 'roundtrip',
      origin: 'ATLA-sky',
      destination: 'LASA-sky',
      departureDate: '',
      returnDate: '2021-08-31',
      adults: 1,
      children: 0,
      tripClass: 'economy',
      locationResult: false,
      locationDestinationResult: false,
    };
  }
  
  setTripData = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ ...this.state, [key]: value });
  };
  locationSearch = (event) => {
    const string = event.target.value;
    const locationType = event.target.name;
    string !== ''
      ? fetch(
          `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${string}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': API_HOST,
              'x-rapidapi-key': API_KEY,
            },
          }
        )
          .then((resp) => resp.json())
          .then((resp) => {
            locationType === 'origin'
              ? this.setState({ ...this.state, locationResult: resp })
              : this.setState({
                  ...this.state,
                  locationDestinationResult: resp,
                });
          })
          .catch((err) => {
            console.log(err);
          })
      : console.log('hi');
  };

  sendSearch(event) {
    const {
      tripType,
      departureDate,
      returnDate,
      origin,
      destination,
    } = this.state;
    event.preventDefault();
    let setTripType = '';
    tripType === 'roundtrip'
      ? (setTripType = `?inboundpartialdate=${returnDate}`)
      : (setTripType = '');
    const API_URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${origin}/${destination}/${departureDate}${setTripType}`;
    const TEMP_API_URL =
      'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/ATLA-sky/LASA-sky/2020-08-28?inboundpartialdate=2020-08-31';
    fetch(API_URL, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY,
      },
    })
      .then((resp) => resp.json())
      .then((response) => {
        localStorage.setItem('flightSearch_API_URL', TEMP_API_URL);

        this.props.flightSearchResults(response);
        response.message || response.Quotes.length <= 0
          ? alert('No Avialable Flights available please try')
          : this.sendReturnSearch();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
      
  }
  sendReturnSearch() {
    const { returnDate, origin, destination } = this.state;
    const RETURN_API_URL = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${destination}/${origin}/${returnDate}`;
    fetch(RETURN_API_URL, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY,
      },
    })
      .then((resp) => resp.json())
      .then((response) => {
        localStorage.setItem('flightSearch_RETURN_API_URL', RETURN_API_URL);
        this.props.returnFlightSearchResults(response);
        response.message || response.Quotes.length <= 0
          ? alert('No Avialable Flights available please try')
          : this.props.history.push('/flightSearch-results');
      })
      .catch((err) => {
        alert(err);
      });
  }
  render() {
    return (
      <div className="booking-page">
        <header>
          <h1>Catch Your FLight</h1>
          <img className="plane1 " src={plane} alt="animated-plane" />
          <img
            className="cloud moving-cloud-2"
            src={cloud}
            alt="animated-cloud"
          />
          <img
            className="cloud3 moving-cloud-3"
            src={cloud}
            alt="animated-cloud"
          />
        </header>
        <div className="body1">
          <body>
            <div id="search-form">
              <div id="header"></div>
              <section>
                <div className="flight" id="flightbox">
                  <form id="flight-form">
                    {/* <!-- TRIP TYPE --> */}
                    <div id="flight-type">
                      <div className="info-box">
                        <input
                          type="radio"
                          name="tripType"
                          value="roundtrip"
                          defaultChecked="true"
                          id="return"
                          onClick={(e) => this.setTripData(e)}
                        />
                        <label htmlFor="roundtrip">ROUND TRIP</label>
                      </div>
                      <div className="info-box">
                        <input
                          type="radio"
                          name="tripType"
                          value="oneway"
                          id="one-way"
                          onClick={(e) => this.setTripData(e)}
                        />
                        <label htmlFor="one-way">ONE WAY</label>
                      </div>
                    </div>

                    {/* <!-- FROM/TO --> */}
                    <div id="flight-depart">
                      <div className="info-box">
                        <label htmlFor="">LEAVING FROM</label>
                        <input
                          placeholder="Search by city"
                          type="text"
                          id="dep-from"
                          name="origin"
                          onChange={(e) => {
                            // this.setTripData(e);
                            this.locationSearch(e);
                          }}
                        />

                        <select
                          name="origin"
                          onChange={(e) => this.setTripData(e)}
                        >
                          <option value="none">Select Airport</option>
                          {this.state.locationResult
                            ? this.state.locationResult.Places.map((result) => (
                                <option value={result.PlaceId}>
                                  {result.PlaceName}
                                </option>
                              ))
                            : null}
                        </select>

                        <div id="depart-res"></div>
                      </div>
                      <div className="info-box" id="arrive-box">
                        <label htmlFor="">ARRIVING AT</label>
                        <input
                          type="text"
                          id="dep-to"
                          placeholder="Search by city"
                          name="destination"
                          onChange={(e) => {
                            // this.setTripData(e);
                            this.locationSearch(e);
                          }}
                        />
                        <select
                          name="destination"
                          onChange={(e) => this.setTripData(e)}
                        >
                          <option value="none">Select Airport</option>
                          {this.state.locationDestinationResult
                            ? this.state.locationDestinationResult.Places.map(
                                (result) => (
                                  <option
                                    value={result.PlaceId}
                                    id={result.PlaceId}
                                  >
                                    {result.PlaceName}
                                  </option>
                                )
                              )
                            : null}
                        </select>
                        <div id="arrive-res"></div>
                      </div>
                    </div>

                    {/* <!-- FROM/TO --> */}
                    <div id="flight-dates">
                      <div className="info-box">
                        <label htmlFor="">LEAVING ON</label>
                        <input
                          type="date"
                          id="leave-date"
                          name="departureDate"
                          min={this.state.today}
                          onChange={(e) => this.setTripData(e)}
                        />
                      </div>
                      {this.state.tripType === 'roundtrip' ? (
                        <div className="info-box" id="return-box">
                          <label htmlFor="">RETURNING ON</label>
                          <input
                            type="date"
                            min={this.state.departureDate}
                            id="return-date"
                            name="returnDate"
                            onChange={(e) => this.setTripData(e)}
                          />
                        </div>
                      ) : null}
                    </div>

                    {/* <!-- PASSENGER INFO --> */}
                    <div id="flight-info">
                      <div className="info-box">
                        <label htmlFor="adults">ADULTS</label>
                        <select
                          name="adults"
                          id="adults"
                          name="adults"
                          onChange={(e) => this.setTripData(e)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>
                      <div className="info-box">
                        <label htmlFor="children">CHILDREN</label>
                        <select
                          name="children"
                          id="children"
                          onChange={(e) => this.setTripData(e)}
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="0">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                      <div className="info-box">
                        <label htmlFor="class-type">CLASS</label>
                        <select
                          name="class-type"
                          id="class-type"
                          name="tripClass"
                          onChange={(e) => this.setTripData(e)}
                        >
                          <option value="Economy">ECONOMY</option>
                          <option value="Business">BUSINESS</option>
                          <option value="First">FIRST CLASS</option>
                        </select>
                      </div>
                    </div>

                    {/* <!-- SEARCH BUTTON --> */}
                    <div id="flight-search">
                      <div className="info-box">
                        <input
                          type="submit"
                          id="search-flight"
                          value="SEARCH FLIGHTS"
                          onClick={(e) => this.sendSearch(e)}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </section>
            </div>
            <div id="confirm"></div>
          </body>
        </div>
      </div>
    );
  }
}
const mapsStateToProps = (state) => {
  return {
    searchParameters: state.searchParameters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    flightSearchResults: (results) => {
      const action = {
        type: 'SET_FLIGHT_RESULTS',
        results: results,
      };
      dispatch(action);
    },
    returnFlightSearchResults: (results) => {
      const action = {
        type: 'SET_RETURN_FLIGHT_RESULTS',
        results: results,
      };
      dispatch(action);
    },
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(FlightSearchForm);

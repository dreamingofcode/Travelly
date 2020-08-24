import React, { useEffect } from 'react';
// import Slider from 'bootstrap-slider'
import { connect } from 'react-redux';
import './hotelSearchForm.css';
import { detectOverflow } from '@popperjs/core';

class HotelSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    const { searchParameters } = props;
    const today = searchParameters[2];

    this.state = {
      today: searchParameters[2],
      city: '',
      locationId: '', //will be located by users location initially
      checkin: today.toString(),
      checkout: '',
      nights: 1,
      adults: 1,
      rooms: 1,
      priceRange: 'true',
      pricesMin: 0,
      pricesMax: 200,
      hotelClass: "3.0",
      subCategory: '',
    };
  }

  determineNights = (event) => {
    // 2020-08-23
    const checkin = this.state.checkin;
    const checkout = event.target.value;
    console.log(checkout);

    // function convert(time) {
    //   const year = time.split('-')[0].toString();
    //   let monthDate1 = time.split('-').splice(1, 2).join().toString();
    // } MUST REFACTOR
    const year1 = checkin.split('-')[0].toString();
    const year2 = checkout.split('-')[0].toString();

    let monthDate1 = checkin.split('-').splice(1, 2).join().toString();
    let monthDate2 = checkout.split('-').splice(1, 2).join().toString();
    monthDate1 = (monthDate1 + ',' + year1).replace(/,/g, '/');
    monthDate2 = (monthDate2 + ',' + year2).replace(/,/g, '/');

    var date1 = new Date(monthDate1);
    var date2 = new Date(monthDate2);
    const Difference_In_Time = date1.getTime() - date2.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(monthDate1, '----', monthDate2, Difference_In_Days);
    this.setState({ nights: Difference_In_Days });
    // Difference_In_Days.toString().split("-")[1].toString()
  };
  setTripData = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ ...this.state, [key]: value });
    console.log('00000000', this.state);
  };
  locationSearch = (event) => {
    const string = event.target.value;
    string !== ''
      ? fetch(
          `https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=${string}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
              'x-rapidapi-key':
                '78658dd993msha58b4f039c6c59ep11289djsn173e61927b34',
            },
          }
        )
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            console.log('sss', response.data[0].result_object.location_id);
            this.setState({
              ////error handling, icase no location ID is sent , or wait until full location city string has been fully typed
              city: response.data[0].result_object.name,
              locationId: response.data[0].result_object.location_id,
            });
          })
          .catch((err) => {
            console.log(err);
          })
      : console.log('hi');
  };

  sendSearch(event) {
    const {
      hotelClass,
      locationId,
      checkin,
      nights,
      adults,
      rooms,
      pricesMin,
      pricesMax,
      subCategory,
      priceRange,
    } = this.state;
    event.preventDefault();
    let pricesMaxselected = '';
    priceRange === 'true'
      ? (pricesMaxselected = `&pricesmax=${pricesMax}`)
      : (pricesMaxselected = '');
    const HOTEL_FETCH_URL = ` https://tripadvisor1.p.rapidapi.com/hotels/list?pricesmin=${pricesMin}&offset=0&subcategory=${subCategory}${pricesMaxselected}&hotel_class=${hotelClass}&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended&location_id=${locationId}&adults=${adults}&checkin=${checkin}&rooms=${rooms}&nights=${nights}`;
    const FETCH_URL =
"      https://tripadvisor1.p.rapidapi.com/hotels/list?pricesmin=0&offset=0&subcategory=hotel&pricesmax=419&hotel_class=3.0&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended&location_id=35805&adults=4&checkin=2020-08-27&rooms=3&nights=1"
  fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': '78658dd993msha58b4f039c6c59ep11289djsn173e61927b34',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('saa', response);
        localStorage.removeItem('hotelSearch_API_URL')
        localStorage.setItem('hotelSearch_API_URL', HOTEL_FETCH_URL);
        this.props.setHotelSearchResults(response);
       this.props.setHotelSearchParameters(response)
        console.log(localStorage.getItem('hotelSearch_API_URL'));
        // this.props.history.push("./hotel-results")
        const test = ` https://tripadvisor1.p.rapidapi.com/hotels/list?pricesmin=undefined&offset=0&pricesmax=260ALL&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended&location_id=35805&adults=3&checkin=2020-08-26&rooms=2&nights=-7`;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      hotelClass,
      locationId,
      checkin,
      nights,
      adults,
      rooms,
      pricesMin,
      pricesMax,
      subCategory,
      priceRange,
    } = this.state;
    return (
      <div className="hotel-search-page">
        <header>
          <h1>Check right in!</h1>
        </header>
        <div className="body1">
          <body>
            <div id="search-form">
              <div id="header"></div>
              <section>
                <div className="flight" id="flightbox">
                  <form id="flight-form">
                    <div id="flight-depart">
                      <div className="info-box">
                        <label htmlFor="">CITY</label>
                        <input
                          placeholder="Search by city"
                          type="text"
                          id="dep-from"
                          name="city"
                          onChange={(e) => {
                            // this.setTripData(e);
                            this.locationSearch(e);
                          }}
                        />

                        <select
                          name="city"
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
                      </div>
                    </div>
                    {/* <!-- FROM/TO --> */}
                    <div id="flight-dates">
                      <div className="info-box">
                        <label htmlFor="">Check IN</label>
                        <input
                          type="date"
                          id="leave-date"
                          name="checkin"
                          min={this.state.today}
                          onChange={(e) => this.setTripData(e)}
                        />
                      </div>

                      <div className="info-box" id="return-box">
                        <label htmlFor="">Check OUT</label>
                        <input
                          type="date"
                          min={this.state.checkin}
                          id="return-date"
                          name="checkout"
                          onChange={(e) => {
                            this.setTripData(e);
                            this.determineNights(e);
                          }}
                        />
                      </div>
                      <label htmlFor="children">
                        NIGHTS:{this.state.nights}
                        {/* NIGHTS:{this.state.nights.toString().split("-")[1]} */}
                      </label>
                    </div>
                    <div id="flight-info">
                      <div className="info-box">
                        <label htmlFor="adults">ADULTS</label>
                        <select
                          name="adults"
                          name="adults"
                          onChange={(e) => this.setTripData(e)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="info-box">
                        <label htmlFor="rooms">ROOMS</label>
                        <select
                          name="rooms"
                          name="rooms"
                          onChange={(e) => this.setTripData(e)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="info-box">
                        <label>STAR RATING</label>
                        <select
                          name="hotelClass"
                          onChange={(e) => this.setTripData(e)}
                          // defaultValue="3"
                        >
                          {' '}
                          <option value=""></option>
                          <option value="1.0">1</option>
                          <option value="2.0">2</option>
                          <option value="3.0">3</option>
                          <option value="4.0">4</option>
                          <option value="5.0">5</option>
                        </select>
                      </div>
                      <div className="info-box">
                        <label>CATEGORY</label>
                        <select
                          name="subCategory"
                          // defaultValue='hotel'
                          onChange={(e) => this.setTripData(e)}
                        >
                          {' '}
                          <option value=""></option>
                          <option value="hotel">Hotel</option>
                          <option value="resort">Resort</option>
                          <option value="bb">Bed + Breakfast</option>
                          <option value="specialty">Specialty</option>
                        </select>
                      </div>
                    </div>
                    {priceRange === 'true' ? (
                      <React.Fragment>
                        <label for="formControlRange">
                          PRICE RANGE $0-${this.state.pricesMax}
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

                    <label>SET PRICE LIMIT</label>
                    <input
                      type="radio"
                      //   class="form-control-range"
                      //   id="formControlRange"
                      name="priceRange"
                      value={true}
                      defaultChecked
                      onChange={(e) => {
                        this.setTripData(e);
                      }}
                    />

                    <label>NO PRICE LIMIT </label>
                    <input
                      type="radio"
                      //   class="form-control-range"
                      //   id="formControlRange"
                      name="priceRange"
                      value={false}
                      onChange={(e) => {
                        this.setTripData(e);
                      }}
                    />
                    {/* <!-- SEARCH BUTTON --> */}
                    <div id="flight-search">
                      <div className="info-box">
                        <input
                          type="submit"
                          id="search-flight"
                          value="SEARCH ROOMS"
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
    setHotelSearchResults: (results) => {
      const action = {
        type: 'SET_HOTEL_RESULTS',
        results: results,
      };
      dispatch(action);
    },
    setHotelSearchParameters: (results) => {
      console.log("she made uir")
      const action = {
        type: 'GET_HOTEL_RESULTS_PARAMETERS',
        results:results
      };
      dispatch(action);
    },
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(HotelSearchForm);
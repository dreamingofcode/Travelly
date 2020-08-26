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
      checkin: today,
      checkout: '',
      nights: 1,
      adults: 1,
      rooms: 1,
      priceRange: 'true',
      pricesMin: 0,
      pricesMax: 200,
      hotelClass: 'all',
      subCategory: 'all',
      amenities: [],
    };
  }

  determineNights = (event) => {
    const checkin = convert(this.state.checkin);
    const checkout = convert(event.target.value);
    function convert(time) {
      const year = time.split('-')[0].toString();
      let monthDate = time.split('-').splice(1, 2).join().toString();
      monthDate = (monthDate + ',' + year).replace(/,/g, '/')
      return monthDate
    } 
    var date1 = new Date(checkin);
    var date2 = new Date(checkout);
    const Difference_In_Time = date1.getTime() - date2.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(checkin, '----', checkout, Difference_In_Days);
    this.setState({ nights: Difference_In_Days });
  };
  setTripData = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    const {amenities}=this.state
    if (key === 'amenities') {
    amenities.includes(value)?
this.setState({amenities: amenities.filter(a=>a!==value)}):
      this.setState({
        ...this.state,
        amenities: [...amenities, value],
      });
    } else this.setState({ ...this.state, [key]: value });
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
      amenities
    } = this.state;
    event.preventDefault();
    let pricesMaxselected = '';
    priceRange === 'true'
      ? (pricesMaxselected = `&pricesmax=${pricesMax}`)
      : (pricesMaxselected = '');
    const URL = ` https://tripadvisor1.p.rapidapi.com/hotels/list?pricesmin=${pricesMin}&offset=0${subCategory}${pricesMaxselected}${hotelClass}&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended&location_id=${locationId}&adults=${adults}&checkin=${checkin}&rooms=${rooms}&nights=${nights}`;
    fetch(URL, {
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
        this.props.setHotelSearchResults(response);
        this.props.history.push('./hotel-results');
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
                <div className="hotel" id="flightbox">
                  <form id="hotel-form">
                    {/* <div id="hotel-depart"> */}
                    <p>Nights: {this.state.nights.toString().split('-')}</p>
                    <div className="info-box">
                      <label>CITY</label>
                      <input
                        placeholder="Search by city"
                        type="text"
                        name="city"
                        onChange={(e) => {
                          // this.setTripData(e);
                          this.locationSearch(e);
                        }}
                      />
                    </div>
                    {/* </div> */}
                    {/* <!-- FROM/TO --> */}
                    <div id="hotel-dates">
                      <div className="info-box">
                        <label>Check IN</label>
                        <input
                          type="date"
                          id="leave-date"
                          name="checkin"
                          min={this.state.today}
                          onChange={(e) => this.setTripData(e)}
                        />
                      </div>

                      <div className="info-box" id="return-box">
                        <label>Check OUT</label>
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
                    </div>
                    <div id="hotel-info">
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
                        >
                          <option value="all">ALL</option>
                          <option value="&hotel_class=1">1</option>
                          <option value="&hotel_class=2">2</option>
                          <option value="&hotel_class=3">3</option>
                          <option value="&hotel_class=4">4</option>
                          <option value="&hotel_class=5">5</option>
                        </select>
                      </div>
                      <div className="info-box">
                        <label htmlFor="subcategory">CATEGORY</label>
                        <select
                          name="subcategory"
                          id="subcategory"
                          onChange={(e) => this.setTripData(e)}
                        >
                          <option value="all">ALL</option>
                          <option value="&subcategory=hotel">Hotel</option>
                          <option value="&subcategory=resort">Resort</option>
                          <option value="&subcategory=bb">
                            Bed + Breakfast
                          </option>
                          <option value="&subcategory=specialty">
                            Specialty
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="amenities">
                      <label
                        class="btn btn-link"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <label>AMENITIES</label>
                      </label>

                      <div
                        id="collapseOne"
                        class="collapse hide"
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div class="card-body">
                          <input
                            type="checkbox"
                            name="amenities"
                            value="airport_transportation"
                            onChange={(event) => this.setTripData(event)}
                          />
                          <p>Airport-Shuttle</p>
                          <input
                            type="checkbox"
                            name="amenities"
                            value="smoking_rooms"
                            onChange={(event) => this.setTripData(event)}
                          />
                          <p>Smoking-room</p>
                          <input
                            type="checkbox"
                            name="amenities"
                            value="free-internet"
                            onChange={(event) => this.setTripData(event)}
                          />
                          <p>Free-Wifi</p>
                          <br />
                          <input
                            type="checkbox"
                            name="amenities"
                            value="free_breakfast"
                            onChange={(event) => this.setTripData(event)}
                          />
                          <p>Free-Breakfast</p>
                          <input
                            type="checkbox"
                            name="amenities"
                            value="pets_allowed"
                            onChange={(event) => this.setTripData(event)}
                          />
                          <p>Pets-Allowed</p>
                          <input
                            type="checkbox"
                            name="amenities"
                            value="swimming_pool"
                            onChange={(event) => this.setTripData(event)}
                          />
                          <p>Swimming-Pool</p>
                          <input
                            type="checkbox"
                            name="amenities"
                            value="fitness_center"
                            onChange={(event) => this.setTripData(event)}
                          />
                          <p>Fitness-Center</p>
                        </div>
                      </div>
                    </div>
                    <div className="price-range">
                      {priceRange === 'true' ? (
                        <React.Fragment>
                          <label for="formControlRange">
                            Price Range $0-${this.state.pricesMax} Per Night
                          </label>
                          <input
                            type="range"
                            class="form-control-range"
                            id="formControlRange"
                            name="pricesMax"
                            min="0"
                            max="700"
                            onChange={(e) => {
                              this.setTripData(e);
                            }}
                          />
                        </React.Fragment>
                      ) : null}

                      <label>Set Price Range</label>
                      <input
                        type="radio"
                        name="priceRange"
                        value={true}
                        defaultChecked
                        onChange={(e) => {
                          this.setTripData(e);
                        }}
                      />

                      <label>NO Price Limit </label>
                      <input
                        type="radio"
                        name="priceRange"
                        value={false}
                        onChange={(e) => {
                          this.setTripData(e);
                        }}
                      />
                    </div>
                    {/* <!-- SEARCH BUTTON --> */}
                    <div id="hotel-search">
                      <div className="info-box">
                        <input
                          type="submit"
                          id="search-hotel"
                          value="SEARCH ROOMS"
                          onClick={(e) => this.sendSearch(e)}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </section>
              <div id="confirm"></div>
            </div>
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
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(HotelSearchForm);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './hotelResults.css';
import Map from '../map';
import HotelDetailCards from './hotelDetailsCard';
import AmenitiesInput from './amenitiesInput';
////Todo: error handling for when there is not locastorage set url/////////////////
function HotelResults(props) {
  const {
    searchParameters,
    hotelSearchDataSuccess,
    setHotelSearchResults,
    hotelSearchResults,
    history,
  } = props;

  const API_KEY = searchParameters[0];
  const API_HOST = searchParameters[1];
  let FETCH_URL = localStorage.getItem('HOTEL_SEARCH_URL'); ///api url from initial search here
  const [hotelSelected, setHotelSelected] = useState({
    boolean: false,
    id: '',
  });
  const [searchData, setSearchData] = useState({
    locationID: props.hotelSearchDataSuccess.locationID,
    checkin: hotelSearchDataSuccess.checkin,
    checkout: hotelSearchDataSuccess.checkout,
    nights: 1,
    adults: hotelSearchDataSuccess.adults,
    rooms: hotelSearchDataSuccess.rooms,
    pricesMAX: hotelSearchDataSuccess.pricesMax,
    hotelClass: hotelSearchDataSuccess.hotelClass,
    subcatergory: hotelSearchDataSuccess.subCategory,
    priceRange: 'true',
    pricesMin: 0,
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

  // if (hotelSearchResults === null || hotelSearchResults.message ||hotelSearchResults.data.length === 0)
  //   history.push('/hotel-search');
  // else {

  const setTripData = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setSearchData({ ...searchData, [key]: value });
  };

  function sendSearch(event) {
    const {
      hotelClass,
      locationID,
      checkin,
      nights,
      adults,
      rooms,
      pricesMin,
      pricesMax,
      subCategory,
      priceRange,
      amenities,
    } = searchData;

    event.preventDefault();
    let pricesMaxselected = '';
    priceRange === 'true'
      ? (pricesMaxselected = `&pricesmax=${pricesMax}`)
      : (pricesMaxselected = '');
    const temp =
      'https://tripadvisor1.p.rapidapi.com/hotels/list?pricesmin=0&offset=0&subcategory=all&pricesmax=200&hotel_class=all&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended&location_id=35805&adults=1&checkin=2020-09-03&rooms=1&nights=1';
    const URL = ` https://tripadvisor1.p.rapidapi.com/hotels/list?pricesmin=${pricesMin}&offset=0&subcategory=${subCategory}${pricesMaxselected}&hotel_class=${hotelClass}&currency=USD&limit=30&order=asc&lang=en_US&sort=recommended&location_id=${locationID}&adults=${adults}&checkin=${checkin}&rooms=${rooms}&nights=${nights}`;
    console.log('dfe', URL, searchData);

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
        setHotelSearchResults(response);
      })
      .catch((err) => {
        console.log(err);
        alert('Please Try again or check input fields');
      });
  }
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
              // defaultValue={hotelSearchResults.status.doubleClickZone.split(".").pop()}
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
          <AmenitiesInput />
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
        {hotelSearchResults ? (
          <Map hotelSearchResults={props.hotelSearchResults} />
        ) : (
          <div className="loader"></div>
        )}

        {/* <HotelDetailCards
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
          
        /> */}

        {hotelSearchResults !== null && !hotelSearchResults.message ? (
          <div>
            {' '}
            {hotelSearchResults.data.map((hotel) => {
              return (
                <HotelDetailCards
                  id={hotel.name}
                  hotel={hotel}
                  setToggleButtonDisplay={setToggleButtonDisplay}
                  setHotelSelected={setHotelSelected}
                  hotelSelected={hotelSelected}
                />
              );
            })}
          </div>
        ) : (
          <div className="loader"></div>
        )}
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
    searchParameters: state.searchParameters,
    hotelSearchDataSuccess: state.hotelSearchDataSuccess,
    hotelSearchResults: state.hotelSearchResults,
    userLoaded: state.userLoaded,
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
export default connect(mapStateToProps, mapDispatchToProps)(HotelResults);

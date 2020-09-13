import React, { useState } from 'react';
import { connect } from 'react-redux';
import './tripCreator.css';
import AutoComplete from "./autoComplete"
import userLoaded from '../reducers/userLoaded';
function TripCreator(props) {
  const { searchParameters, userData, userLoaded } = props;
  const token = localStorage.getItem('token');
  let id = '';
  userLoaded ? (id = userData.id) : (id = '');
  const [searchModel, setSearchModel] = useState({
    tripName: '',
    tripDestination: '',
    tripStart: searchParameters.today,
    tripEnd: '',
    flight: false,
    hotel: false,
    todo: false,
    user_id: 2,
  });
  const setTripData = (event) => {
    event.preventDefault();
    const key = event.target.name;
    const value = event.target.value;

    setSearchModel({
      ...searchModel,
      [key]: value,
    });
    console.log('updat', searchModel);
  };

  const createTripModel = (event) => {
    event.preventDefault();
    console.log(searchModel);
    const configObj = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        trip: searchModel,
      }),
    };
    fetch("http://localhost:3000/api/v1/user_trips", configObj)
    .then(resp=>resp.json())
    .then(resp=>{
        if (resp.error) {
            alert(resp.error);
          }
          console.log( resp);
        //   history.push("/account-page/:id")
    })
  };
  return (
    <div className="trip-creator-page">
      <header>
        <h1>This is the Beginning of Something New.</h1>
        {token ? (
          <div>
            <p>
              Thank you for being a valued user; use the trip creator to save
              your search results for future reference.
            </p>{' '}
          </div>
        ) : (
          <div>
            <p>
              In order to better serve you, it is recommended that you{' '}
              <a href="/signup">create an account</a> or{' '}
              <a href="/signin">sign in</a>.{' '}
            </p>{' '}
          </div>
        )}
      </header>
      <div className="trip-creator-container">
        <form>
          <p>Name your Trip</p>{' '}
          <input
            type="text"
            name="tripName"
            value={searchModel.tripName}
            placeholder="ie. Family Trip"
            onChange={(event) => {
              setTripData(event);
            }}
            required
          />
          <p>Find your travel destination</p>
          <input
            type="text"
            name="tripDestination"
            placeholder="City"
            onChange={(event) => {
              setTripData(event);
            }}
            required
          />
          {/* <AutoComplete/> */}
          <p>Select your Travel dates</p>
          <input
            type="date"
            min={searchParameters.today}
            name="tripStart"
            onChange={(event) => {
              setTripData(event);
            }}
            required
          />
          <input
            type="date"
            name="tripEnd"
            onChange={(event) => {
              setTripData(event);
            }}
            required
          />
          <hr />
          <p>What are your Travel Needs?</p>
          <label>Flight</label>
          <input
            type="checkbox"
            name="flight"
            value={!searchModel.flight}
            onChange={(event) => {
              setTripData(event);
            }}
          />
          <label>Hotel</label>
          <input
            type="checkbox"
            name="hotel"
            value={!searchModel.hotel}
            onChange={(event) => {
              setTripData(event);
            }}
          />
          <label>Todo's</label>
          <input
            type="checkbox"
            name="todo"
            value={!searchModel.todo}
            onChange={(event) => {
              setTripData(event);
            }}
          />
          <input type="submit" onClick={(event) => createTripModel(event)} />
        </form>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    searchParameters: state.searchParameters,
    userLoaded: state.userLoaded,
    userData: state.userData,
  };
};
export default connect(mapStateToProps, null)(TripCreator);

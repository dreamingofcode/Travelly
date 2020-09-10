import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import arrow from '../../icons/arrow.png';
import userMarker from '../../icons/userMarker.png';
import foodMarker from '../../icons/burger.png';


import './adventuresForm.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { viewport } from '@popperjs/core';
import { isConstructorDeclaration } from 'typescript';

//a viewport must be set to set where the map will load up.
//ideally we want a users location to determine where the map viewport is

function AdventuresMap(props) {
  const { searchData } = props;
  const USER_LOCATION = localStorage.getItem('USER_LOCATION');

  const locationCoordinate= localStorage.getItem("location_coordinates")
  let SEARCH_LATITUDE =""
  let SEARCH_LONGITUDE =""
// console.log("locationID",searchData.locationID)

// console.log("coordinates",locationCoordinate.split(','),locationCoordinate.split(',')[1],typeof(locationCoordinate.split(',')[0]))

  if (searchData.nearMe) {
     SEARCH_LATITUDE = parseFloat(USER_LOCATION.split(',')[0]);
    SEARCH_LONGITUDE = parseFloat(USER_LOCATION.split(',')[1]);
  }
  else {
    // SEARCH_LATITUDE = parseFloat(locationCoordinate.split(',')[0]);
    // SEARCH_LONGITUDE = parseFloat(locationCoordinate.split(',')[1]);
    SEARCH_LATITUDE = parseFloat(USER_LOCATION.split(',')[0]);
    SEARCH_LONGITUDE = parseFloat(USER_LOCATION.split(',')[1]);
  console.log("triggered no near me",SEARCH_LATITUDE,SEARCH_LONGITUDE,typeof(SEARCH_LONGITUDE))
  }
  const [viewportState, setViewport] = useState({
    width: 1000,
    height: 500,
    latitude: SEARCH_LATITUDE,
    longitude: SEARCH_LONGITUDE,
    zoom: 15,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  
  function setLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  function showPosition(position) {
    const coordinates = [position.coords.latitude, position.coords.longitude];
    // localStorage.setItem('USER_LOCATION', coordinates);
  }
// const flyTo=()=>{
//   setViewport({
//     ...viewportState,
//     center: [
//     -74.5 + (Math.random() - 0.5) * 10,
//     40 + (Math.random() - 0.5) * 10
//     ],
//     essential: true // this animation is considered essential with respect to prefers-reduced-motion
//     });
// }
  useEffect(() => {
    // setLocation();
  //  searchData.nearMe? console.log() : flyTo()
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);
  const { attractions, restaurants } = props;
  const TOKEN =
    'pk.eyJ1IjoiY2VzYXJtb3RhMTIzIiwiYSI6ImNrZWRjNjlxaTBmbTUydGs5cDRib2JsaW4ifQ.zBj3f9fd5ukPTjXjTO6f5A';
  return (
    <div className="adventures-map">
      <ReactMapGL
        {...viewportState}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <Marker
          key={'2'}
          longitude={parseFloat(USER_LOCATION.split(',')[1])}
          latitude={parseFloat(USER_LOCATION.split(',')[0])}
        >
          <div className="marker">
            <p>YOU ARE HERE</p>
            <img src={userMarker} alt="hotel icon" />
          </div>{' '}
        </Marker>
        {attractions && !attractions.errors
          ? attractions.data.map((attraction) => {
            console.log("yup",parseFloat(attraction.longitude),parseFloat(attraction.latitude))
              return (
                <Marker
                  key={attraction.location_id}
                  longitude={parseFloat(attraction.longitude)}
                  latitude={parseFloat(attraction.latitude)}
                >
                  <div className="marker">
                    <img
                      src={arrow}
                      alt="attraction icon"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedItem(attraction);
                      }}
                    />
                  </div>{' '}
                </Marker>
              );
            })
          : console.log('not eworki')}
        {restaurants && !restaurants.errors
          ? restaurants.data.map((restaurant) => {
              if (restaurant.longitude && restaurant.latitude) {
                return (
                  <Marker
                    key={restaurant.location_id}
                    longitude={parseFloat(restaurant.longitude)}
                    latitude={parseFloat(restaurant.latitude)}
                  >
                    <div className="marker">
                      <img
                        src={foodMarker}
                        style={{ height: '20px', width: '20px' }}
                        alt="restaurant icon"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedItem(restaurant);
                        }}
                      />
                    </div>{' '}
                  </Marker>
                );
              }
            })
          : console.log('not eworki')}
        {selectedItem ? (
          <Popup
            latitude={parseFloat(selectedItem.latitude)}
            longitude={parseFloat(selectedItem.longitude)}
            onClose={() => {
              setSelectedItem(null);
            }}
          >
            <div className="pop-up">
              {selectedItem.photo ? (
                <img
                  src={selectedItem.photo.images.original.url}
                  alt="hotel image"
                />
              ) : null}
              <p>{selectedItem.name}</p>
              <p>{selectedItem.rating}</p>
              <p>{selectedItem.phone}</p>
              <p>{selectedItem.address}</p>
              <p>
                <a href={selectedItem.web_url} target="blank">
                  Website
                </a>
              </p>

              {selectedItem.is_closed ? <p>Closed Now</p> : <p>Open Now</p>}
            </div>
          </Popup>
        ) : null}
        )
      </ReactMapGL>
      {/* <div className="hotel-listings">
        {' '}
        <h3>Hotel Listings</h3>
        {hotelSearchResults? hotelSearchResults.data.map((hotel) => (
          <React.Fragment>
            <p>
              <a href={`#${hotel.name}`}>{hotel.name}</a>
            </p>
            <p>{hotel.price}</p>
            <hr />
          </React.Fragment>
        )):null}
      </div> */}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    attractions: state.attractions,
    restaurants: state.restaurants,
    // hotelCoordinates: state.hotelCoordinates,
  };
};
export default connect(mapStateToProps, null)(AdventuresMap);

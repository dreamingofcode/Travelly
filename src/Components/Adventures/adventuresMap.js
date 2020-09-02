import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import arrow from '../../icons/arrow.png';
import './adventuresForm.css'
import 'mapbox-gl/dist/mapbox-gl.css'

//a viewport must be set to set where the map will load up.
//ideally we want a users location to determine where the map viewport is

function AdventuresMap(props) {
  const USER_LOCATION = localStorage.getItem('USER_LOCATION');
  const USER_LATITUDE= parseFloat(USER_LOCATION.split(',')[0])
  const USER_LONGITUDE = parseFloat(USER_LOCATION.split(',')[1])
  const [viewportState, setViewport] = useState({
    width: 1000,
    height: 500,
    latitude: USER_LATITUDE,
    longitude: USER_LONGITUDE,
    zoom: 15,
  });
  const [selectedHotel, setSelectedHotel] = useState(null);
  const hotelCoordinates = [
    // [41.886063, -87.62064],
    // [41.888565, -87.62734],
    // [parseFloat(USER_LOCATION.split(',')[0]),parseFloat(USER_LOCATION.split(',')[1])]
]
  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedHotel(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);
  const { hotelSearchResults } = props;
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
            key={"2"}
          longitude={parseFloat(USER_LOCATION.split(',')[1])}
          latitude={parseFloat(USER_LOCATION.split(',')[0])}
        >
          <div className="marker">
     <p>YOU ARE HERE</p>
            <img src={arrow} alt="hotel icon" />
          </div>{' '}
        </Marker>
       

        {/* {hotelSearchResults
          ? hotelSearchResults.data.map((hotel) => {
              return (
                <Marker
                  key={hotel.location_id}
                  longitude={parseFloat(hotel.longitude)}
                  latitude={parseFloat(hotel.latitude)}
                >
                  <div className="marker">
                    <img
                      src={arrow}
                      alt="hotel icon"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedHotel(hotel);
                      }}
                    />
                  </div>{' '}
                </Marker>
              );
            })
          : console.log('not eworki')} */}
        {selectedHotel ? (
          <Popup
            latitude={parseFloat(selectedHotel.latitude)}
            longitude={parseFloat(selectedHotel.longitude)}
            onClose={() => {
              setSelectedHotel(null);
            }}
          >
            <div className="pop-up">
              <img
                src={selectedHotel.photo.images.original.url}
                alt="hotel image"
              />
              <p>
                <a href={`#${selectedHotel.name}`}>{selectedHotel.name}</a>
              </p>
              <p>{selectedHotel.price}</p>
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
    hotelSearchResults: state.hotelSearchResults,
    // hotelCoordinates: state.hotelCoordinates,
  };
};
export default connect(mapStateToProps, null)(AdventuresMap);

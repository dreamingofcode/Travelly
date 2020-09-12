import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import './map.css';
import arrow from '../../icons/arrow.png';
//a viewport must be set to set where the map will load up.
//ideally we want a users location to determine where the map viewport is

function Map(props) {
  const [viewportState, setViewport] = useState({
    width: 1000,
    height: 500,
    latitude: 41.878407,
    longitude: -87.62568,
    zoom: 12,
  });
  const [selectedHotel, setSelectedHotel] = useState(null);
const hotelCoordinates=[
    [41.886063,-87.62064],
    [41.888565,-87.62734],
   


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
    <div className="map">
      {/* {console.log(",,"),hotelSearchResults.data} */}

      <ReactMapGL
        {...viewportState}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
       { hotelCoordinates.map((hotel) => {
              console.log('ssxoooo', hotel[0], typeof parseInt(hotel[0]));
              return (
                <Marker
                  key={hotel[0]}
                  longitude={parseFloat(hotel[1])}
                  latitude={parseFloat(hotel[0])}
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
            })}
          
        {hotelSearchResults
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
          : console.log('not eworki')}
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
      <div className="hotel-listings">
        {' '}
        <h3>Hotel Listings</h3>
        {hotelSearchResults.data.map((hotel) => (
          <React.Fragment>
            <p>
              <a href={`#${hotel.name}`}>{hotel.name}</a>
            </p>
            <p>{hotel.price}</p>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    hotelSearchResults: state.hotelSearchResults,
    // hotelCoordinates: state.hotelCoordinates,
  };
};
export default connect(mapStateToProps, null)(Map);

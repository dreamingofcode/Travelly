import React, { useState } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import arrow from '../icons/arrow.png';
//a viewport must be set to set where the map will load up.
//ideally we want a users location to determine where the map viewport is

export default function Map(props) {
  const [viewport, setViewport] = useState({
    width: 1400,
    height: 400,
    latitude: 41.878407,
    longitude: -87.62568,
    zoom: 10,
  });
  const { hotelSearchResults } = props;
  const TOKEN =
    'pk.eyJ1IjoiY2VzYXJtb3RhMTIzIiwiYSI6ImNrZWRjNjlxaTBmbTUydGs5cDRib2JsaW4ifQ.zBj3f9fd5ukPTjXjTO6f5A';
  return (
      <div>
      {/* {console.log(",,"),hotelSearchResults.data} */}
      <h1>map here</h1>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {hotelSearchResults? hotelSearchResults.data.map((hotel) => (
          
            <Marker
              key={hotel.name}
              latitude={parseInt(hotel.latitude)}
              longitude={parseInt(hotel.longitude)}
            >
                <button>PUSSY</button>
        <h1>{hotel.name}</h1>
              {/* {console.log('LAT:', hotel.latitude, 'long:', hotel.longitude)} */}
              {/* <img src={arrow} alt="hotel marker" style={{ height: '300px' }} /> */}
            </Marker>
          
        )   ):null}
      </ReactMapGL>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    hotelSearchResults: state.hotelSearchResults,
  };
};
// export default connect(mapStateToProps, null)(Map);

import React from 'react';
import { connect } from 'react-redux';
import flightSearchResults from '../../reducers/flightSearchResults';
function FlightDetailsCard() {
  return (<div className="flight-details-card">

<h1>Carrier</h1>
  </div >);
}
const mapStateToProps = (state) => {
  return { flightSearchResults: state.flightSearchResults };
};
export default connect(mapStateToProps, null)(FlightDetailsCard);

import React from 'react';
import { connect } from 'react-redux';
import './flightSearchResults.css';
import FlightDetailCards from './flightDetailsCard'
function FlightSearchResults(props) {
  const { history, flightSearchResults } = props;
  // const arrival= flightSearchResults.Places[0].Name
  // const departure= flightSearchResults.Places[1].Name
  // const departureDate= flightSearchResults.Quotes[0].OutboundLeg.DepartureDate
  // const returnDate= flightSearchResults

  ///FOR REFACTORING FROM DD/MM/YYYY DATE FORMAT TO YYYY/MM/DD
  // const refactoredDepartureDate=[]
  // refactoredDepartureDate.unshift(departureDate.split("-")[2].slice(0,2))
  // refactoredDepartureDate.unshift(departureDate.split("-")[1])
  // refactoredDepartureDate.unshift(departureDate.split("-")[0])

  return (
    <div className="flight-search-results-page">
      <div className="results-header">
        <h1>Flight Search Results</h1>
        
          <form>
            <hr />
            <label id="arrival">Departure: </label>
            <input
              type="text"
              name="departure"
              defaultValue={''}
              htmlFor="departure"
            />
            {/* defaultValue={departure} */}

            <label id="arrival">Arrival: </label>
            <input
              type="text"
              name="arrival"
              defaultValue={''}
              htmlFor="arrival"
            />
            {/* defaultValue={arrival} */}
            <label id="arrival">Date: </label>

            <input
              type="date"
              name="departureDate"
              defaultValue={''}
              htmlFor="arrival"
            />
            {/* defaultValue={ refactoredDepartureDate.join().replace(/,/g, '-')} */}

            {/* <input type="date" name="returnDate" defaultValue={""} htmlFor="arrival"/> */}
            <button>Search</button>
          <hr />
          </form>
      </div>
      <section>
          <FlightDetailCards/>
      </section>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    userLoaded: state.userData,
    flightSearchResults: state.flightSearchResults,
  };
};
export default connect(mapStateToProps, null)(FlightSearchResults);

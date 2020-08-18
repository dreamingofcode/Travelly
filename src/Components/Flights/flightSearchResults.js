import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import './flightSearchResults.css';
import FlightDetailCards from './flightDetailsCard';
function FlightSearchResults(props) {
  useEffect(() => {

    const API_URL=localStorage.getItem('flightSearch_API_URL')
    const RETURN_API_URL=localStorage.geItem('flightSearch_RETURN_API_URL')
    
      console.log(URL,"LOOOK")

  }, []);
  const [searchData, setSearchData] = useState({
   origin:"",
    destination:"",
departureDate:"",
ReturnDate:"",
  })

  const { history, flightSearchResults, returnFlightSearchResults } = props;
  // if(flightSearchResults=== null||flightSearchResults.Quotes.length === 0 ) history.push("/flightSearch")
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
          <label id="arrival">Dates: </label>

          <input
            type="date"
            name="departureDate"
            defaultValue={''}
            htmlFor="arrival"
          />
          <label id="arrival">- </label>

          <input
            type="date"
            name="departureDate"
            defaultValue={''}
            htmlFor="arrival"
          />
          {/* defaultValue={ refactoredDepartureDate.join().replace(/,/g, '-')} */}

          {/* <input type="date" name="returnDate" defaultValue={""} htmlFor="arrival"/> */}
          {/* <hr /> */}
        </form>
        <div id="flight-type">
          <div className="info-box">
            <input
              type="radio"
              name="tripType"
              value="roundtrip"
              id="return"
              //   onClick={(e) => this.setTripData(e)}
            />
            <label htmlFor="roundtrip">ROUND TRIP</label>
          </div>
          <div className="info-box">
            <input
              type="radio"
              name="tripType"
              value="oneway"
              id="one-way"
              //   onClick={(e) => this.setTripData(e)}
            />
            <label htmlFor="one-way">ONE WAY</label>
          </div>
        </div>
        <button>Search</button>
      </div>
      <section>
        {/* <FlightDetailCards /> */}

        {flightSearchResults !== null ? (
          <div>
            {' '}
            <h5>DEPARTURES</h5>
            {flightSearchResults.Quotes.map((result) => {
              return (
                <FlightDetailCards
                  result={result}
                  places={flightSearchResults.Places}
                />
              );
            })}
          </div>
        ) : null}

        {returnFlightSearchResults !== null ? (
          <div>
            {' '}
            <h5>RETURNS</h5>
            {returnFlightSearchResults.Quotes.map((result) => {
              return (
                <FlightDetailCards
                  result={result}
                  places={returnFlightSearchResults.Places}
                />
              );
            })}
          </div>
        ) : null}
      </section>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    userLoaded: state.userData,
    flightSearchResults: state.flightSearchResults,
    returnFlightSearchResults: state.returnFlightSearchResults,
  };
};
export default connect(mapStateToProps, null)(FlightSearchResults);

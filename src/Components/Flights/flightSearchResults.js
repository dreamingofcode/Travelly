import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import './flightSearchResults.css';
import FlightDetailCards from './flightDetailsCard';


function FlightSearchResults(props) {
  const{searchParametersfli}=props
  const API_KEY = '78658dd993msha58b4f039c6c59ep11289djsn173e61927b34';
const API_HOST = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';

  useEffect(() => {

    const API_URL=localStorage.getItem('flightSearch_API_URL')
    // console.log(API_URL,"KKOK->")
    const RETURN_API_URL=localStorage.getItem('flightSearch_RETURN_API_URL')
    fetch(API_URL, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY,
      },
    })
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
        localStorage.setItem('flightSearch_API_URL', API_URL)
        props.setFlightSearchResults(response);
     response.message||  response.Quotes.length <= 0 
          ? alert('No Avialable Flights available please try')
          : this.props.history.push('/flightSearch-results');
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(API_URL,"LOOOK")

  },[]);
  const [searchData, setSearchData] = useState({
   origin:"",
    destination:"",
departureDate:"",
ReturnDate:"",
  })

  const { history, flightSearchResults, returnFlightSearchResults } = props;
  if(flightSearchResults === null||flightSearchResults.Quotes.length === 0 ) history.push("/flightSearch")
  else{
  const arrival= flightSearchResults.Places[0].Name
  const departure= flightSearchResults.Places[1].Name
  const departureDate= flightSearchResults.Quotes[0].OutboundLeg.DepartureDate
  const returnDate= flightSearchResults

  ///FOR REFACTORING FROM DD/MM/YYYY DATE FORMAT TO YYYY/MM/DD
  const refactoredDepartureDate=[]
  refactoredDepartureDate.unshift(departureDate.split("-")[2].slice(0,2))
  refactoredDepartureDate.unshift(departureDate.split("-")[1])
  refactoredDepartureDate.unshift(departureDate.split("-")[0])
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
            defaultValue={departure||''}
            htmlFor="departure"
          />

          <label id="arrival">Arrival: </label>
          <input
            type="text"
            name="arrival"
            defaultValue={arrival||''}
            htmlFor="arrival"
          />
          <label id="arrival">Dates: </label>

          <input
            type="date"
            name="departureDate"
            defaultValue={refactoredDepartureDate.join().replace(/,/g, '-')||''}
            htmlFor="arrival"
          />
          <label id="arrival">- </label>

          <input
            type="date"
            name="departureDate"
            defaultValue={refactoredDepartureDate.join().replace(/,/g, '-')||''}
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
                  tripType={"departure"}
                  departureDate={departureDate}
                  places={flightSearchResults.Places}
                />
              );
            })}
          </div>
        ) : null}

        {returnFlightSearchResults !== null || !returnFlightSearchResults.message ? (
          <div>
            {' '}
            <h5>RETURNS</h5>
            {returnFlightSearchResults.Quotes.map((result) => {
              return (
                <FlightDetailCards
                  result={result}
                  tripType={"return"}
                  returnDate={returnDate}
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
          return null
}
const mapStateToProps = (state) => {
  return {
    
    flightSearchResults: state.flightSearchResults,
    returnFlightSearchResults: state.returnFlightSearchResults,
  searchParameters: state.searchParameters,
  
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setFlightSearchResults: (results) => {
      const action = {
        type: 'SET_FLIGHT_RESULTS',
        results: results,
      };
      dispatch(action);
    }
  //   returnFlightSearchResults: (results) => {
  //     const action = {
  //       type: 'SET_RETURN_FLIGHT_RESULTS',
  //       results: results,
  //     };
  //     dispatch(action);
  //   },
  }; 
};
export default connect(mapStateToProps, mapDispatchToProps)(FlightSearchResults);

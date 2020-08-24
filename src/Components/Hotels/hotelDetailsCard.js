
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';


function HotelDetailsCard(props) {
  const [toggleButtonClassName, setToggleButtonClassName] = useState(
    'flight-details-card'
  );
  const [toggleButtonStyle, setToggleButtonStyle] = useState('Select');

  const {
    result,
    places,
    tripType,
    id,
    setToggleButtonDisplay,
    flightSelected,
    setFlightSelected,
    departureDate
  } = props;
  const origin = places[1].IataCode;
  const destination = places[0].IataCode;
  const direct = result.Direct ? 'Nonestop' : 'Layover';
  const carrierId = result.OutboundLeg.CarrierIds;
  const price = result.MinPrice;

  // const departureDate= '2020-08-14T14:02:00'
  // console.log("hello",departureDate)
  //   const carrierId = [881];
  //   const price = 335;
  //   const origin = 'ORD';
  //   const destination = 'ATL';
  //   const noneStop = false;
  // const direct= noneStop? "Nonstop":"Layover"
  const setToggleButton = () => {
    toggleButtonClassName === 'flight-details-card'
      ? setToggleButtonClassName('flight-details-card-selected-flight')
      : setToggleButtonClassName('flight-details-card');
      if ( toggleButtonStyle === 'Select'){
        setToggleButtonStyle('Remove')
   }else if (toggleButtonStyle === 'Remove'){
     setToggleButtonStyle('Select')
 

   }
    
    setToggleButtonDisplay(tripType, id,toggleButtonStyle);
  };
  const formatDepartureDate = () => {
    const dateString = departureDate
      .split('-')
      .join()
      .toString()
      .replace(/,/g, '');
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const date = new Date(year, month - 1, day);
    return date.toString().split(' ').splice(0, 4).join().replace(/,/g, ' ');
  };
  const departureTime = () => {
    let time = '2020-08-14T14:02:00';
    // let time = result.QuoteDateTime;
    time = time.split(':'); // convert to array
    // fetch
    var hours = Number(time[0].split('T')[1]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);
    // calculate
    var timeValue;
    if (hours > 0 && hours <= 12) {
      timeValue = '' + hours;
    } else if (hours > 12) {
      timeValue = '' + (hours - 12);
    } else if (hours == 0) {
      timeValue = '12';
    }

    timeValue += minutes < 10 ? ':0' + minutes : ':' + minutes; // get minutes
    //timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds; get seconds
    timeValue += hours >= 12 ? ' PM' : ' AM'; // get AM/PM

    // show
    return timeValue;
  };
  const time = departureTime(); // your input
  

  return (
    <div className={toggleButtonClassName}>
      <div className="details">
        {/* <img
          className="details-img"
          src={determineAirline(carrierId).image}
          alt="airline logo"
        /> */}
        <hr />
        <ul>
          <li>{}</li>
        </ul>
      </div>
      <div className="specifics">
        <ul>
          <li>
            <h3>${price}</h3>
          </li>
          <li> {origin + '-' + destination + '(' + direct + ')'}</li>
          <li>
            {}
            {departureTime()}
          </li>
        </ul>
      </div>
      <div className="select">
        {flightSelected.boolean && flightSelected.id !== id ? null : (
          <button id={`${id}`} onClick={(id) => setToggleButton()}>
            {toggleButtonStyle}
          </button>
        )}

        <p>{formatDepartureDate()}</p>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { flightSearchResults: state.flightSearchResults };
};
export default connect(mapStateToProps, null)(HotelDetailsCard);

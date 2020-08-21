import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import spirit from '../../images/airlines/spirit.png';
import britishAirways from '../../images/airlines/britishAirways.png';
import lufthansa from '../../images/airlines/lufthansa.png';
import cathayPacific from '../../images/airlines/cathayPacific.png';
import unitedAirlines from '../../images/airlines/unitedAirlines.png';
import frontierAirlines from '../../images/airlines/frontierAirlines.png';
import jetBlue from '../../images/airlines/jetBlue.png';
import aegeanAirlines from '../../images/airlines/aegeanAirlines.png';
import allegiantAir from '../../images/airlines/allegiantAir.png';
import linearAir from '../../images/airlines/linearAir.png';
import southwest from '../../images/airlines/southwest.png';
import volaris from '../../images/airlines/volaris.png';
import klm from '../../images/airlines/klm.png';

function FlightDetailsCard(props) {
  const { result, places } = props;
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
  useEffect(() => {});
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
  const determineAirline = (carrierId) => {
    const airlines = {
      819: { name: 'Aegean Airlines', image: aegeanAirlines },
      870: { name: 'JetBlue', image: jetBlue },
      881: { name: 'British Airways', image: britishAirways },
      952: { name: 'Cathay Pacific', image: cathayPacific },
      1108: { name: 'Allegiant Air', image: allegiantAir },
      1490: { name: 'Linear Air', image: linearAir },
      1902: { name: 'Southwest Airlines', image: southwest },
      1972: { name: 'Volaris', image: volaris },
      1065: { name: 'Frontier Airlines', image: frontierAirlines },
      1368: { name: 'Lufthansa', image: lufthansa },
      1324:{ name: "KLM",image:klm},
      1467: { name: 'Spirit Airlines', image: spirit },
      1793: { name: 'United Airlines', image: unitedAirlines },
     852:{name: "Royal Air Maroc"},
1065:{name: "Frontier Airlines"},
1107:{name: "GOL Linhas Aéreas"},
1218:{name: "Iberia"},
1317:{name: "Korean Air"},
    };
    if (airlines[`${carrierId}`]) return airlines[`${carrierId}`];
    else return 'unknown carrier';
    // console.log("nuitt",event.target)
  };
  return (
    <div className="flight-details-card">
      <div className="details">
        <img src={determineAirline(carrierId).image} alt="ariline logo" />
        <hr />
        <ul>
          <li>{determineAirline(carrierId).name}</li>
        </ul>
      </div>
      <div className="specifics">
        <ul>
          <li>
            <h3>${price}</h3>
          </li>
          <li> {origin + '-' + destination + '(' + direct + ')'}</li>
  <li>{}{departureTime()}</li>
        </ul>
      </div>
      <div className="select">
        {/* <p>Departure</p> */}
        <button>Select</button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { flightSearchResults: state.flightSearchResults };
};
export default connect(mapStateToProps, null)(FlightDetailsCard);

import React from 'react';

import './bookingForm.css';

import cloud from '../images/cloud.png';
import plane from '../icons/planeicon.svg';

class BookingSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    const now = new Date();
    let departureDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 3
    );
    let returnDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 7
    );

    this.state = {
      tripType: 'round',
      origin: 'LTN',
      destination: '',
      timeRange: [departureDate, returnDate],
      adults: 1,
      children: 0,
      infant: 0,
      tripClass: 'economy',
    };
  }

  // tripTypeChange = (event) => {
  // set default time range depending on trip type
  //   let returnDate = null;
  //   const departureDate = this.state.timeRange[0];
  //   const value = event.target.value;

  //   if (value === 'round') {
  //     if (this.state.timeRange[1] !== null) {
  //       returnDate = this.state.timeRange[1];
  //     } else {
  //       returnDate = new Date(
  //         departureDate.getFullYear(),
  //         departureDate.getMonth(),
  //         departureDate.getDate() + 7
  //       );
  //     }
  //   }

  //   // push changes to state
  //   this.setState({
  //     tripType: value,
  //     timeRange: [departureDate, returnDate],
  //   });
  // };

  // // select time range
  // rangeSet = (event, inst) => {
  //   if (this.state.tripType === 'round') {
  //     this.setState({
  //       timeRange: inst.getVal(),
  //     });
  //   } else {
  //     this.setState({
  //       timeRange: [inst.getVal()[0], null],
  //     });
  //   }
  // };

  // rangeChange = (event, inst) => {
  //   const oneWay = this.state.tripType === 'oneway';
  //   if (oneWay && event.control === 'calendar' && event.active === 'start') {
  //     inst._isVisible = false;
  //     inst.setActiveDate('start');
  //     inst._isVisible = true;
  //   }
  //   if (inst._markup) {
  //     inst._isValid = true;
  //     inst._markup
  //       .find('.mbsc-fr-btn-s .mbsc-fr-btn')
  //       .removeClass('mbsc-fr-btn-d' + (oneWay ? ' mbsc-disabled' : ''));
  //   }
  // };

  // rangeClose = () => {
  //   if (this.state.tripType === 'oneway') {
  //     return true;
  //   }
  // };

  // passenger numbers
  // adultsChange = (event) => {
  //   this.setState({
  //     adults: +event.target.value,
  //   });
  // };

  // childrenChange = (event) => {
  //   this.setState({
  //     children: +event.target.value,
  //   });
  // };

  // infantChange = (event) => {
  //   this.setState({
  //     infant: +event.target.value,
  //   });
  // };

  // trip class selection
  // tripClassChange = (event) => {
  //   this.setState({
  //     tripClass: event.target.value,
  //   });
  // };

  remoteData = {
    url: 'https://trial.mobiscroll.com/airports/',
    remoteFilter: true,
    dataType: 'jsonp',
    processResponse: (data) => {
      let ret = [];

      if (data) {
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          ret.push({
            value: item.code,
            text: item.name,
            html:
              '<div style="font-size:16px;line-height:18px;">' +
              item.name +
              '</div><div style="font-size:10px;line-height:12px;">' +
              item.location +
              ', ' +
              item.code +
              '</div>',
          });
        }
      }
      return ret;
    },
  };
  sendSearch = (event) => {
    event.preventDefault();
    // const API_URL =
    //   'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2019-09-01?inboundpartialdate=2019-12-01';
    // const API_KEY = '78658dd993msha58b4f039c6c59ep11289djsn173e61927b34';
    fetch(
      'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2020-09-01?inboundpartialdate=2020-12-01',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host':
            'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
          'x-rapidapi-key':
            '78658dd993msha58b4f039c6c59ep11289djsn173e61927b34',
        },
      }
    )
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="booking-page">
        <header>
          <h1>Catch Your FLight</h1>
          <img className="plane1 " src={plane} alt="animated-plane" />
          <img
            className="cloud moving-cloud-2"
            src={cloud}
            alt="animated-cloud"
          />
          <img
            className="cloud3 moving-cloud-3"
            src={cloud}
            alt="animated-cloud"
          />
        </header>
        <div className="body1">
          <body>
            <div className="booking-form-box">
              <div className="radio-btn">
                <input
                  type="radio"
                  className="btn"
                  name="check"
                  // checked="checked"
                />{' '}
                <span>Roundtrip</span>
                <input type="radio" className="btn" name="check" />
                <span>One-Way</span>
                <input type="radio" className="btn" name="check" />
                <span>Multi-City</span>
              </div>
              <div className="booking-form-box">
                <label>Flying From</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="City or Airport"
                />
                <label>Flying To</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="City or Airport"
                />

                <label>Departing</label>
                <input
                  type="date"
                  className="form-control select-date"
                  value="1"
                />
                <label>Returning</label>
                <input type="date" className="form-control" value="1" />
                <div className="input-grp">
                  <label>Adults</label>
                  <input
                    type="number"
                    className="form-control"
                    defaultValue="1"
                  />
                  <label>Children</label>
                  <input
                    type="number"
                    className="form-control"
                    defaultValue="0"
                  />
                </div>
                <div className="input-grp">
                  <label>Travel Class</label>
                  <select className="custom-select">
                    <option value="1">Economy</option>
                    <option value="2">Business</option>
                  </select>
                </div>
                <div className="input-grp">
                  <button>Find Flights</button>
                </div>
              </div>
            </div>
          </body>
        </div>
      </div>
    );
  }
}
export default BookingSearchForm;

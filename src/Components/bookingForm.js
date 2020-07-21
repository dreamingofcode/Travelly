import React from 'react';
import  mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css'
import './bookingForm.css';

import cloud from '../images/cloud.png';
import plane from '../icons/planeicon.svg';
import unirest from 'unirest'
mobiscroll.settings = {
  theme: 'ios',
  themeVariant: 'light',
};

class BookingForm extends React.Component {
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
      
      tripTypeChange = (event) => {
        // set default time range depending on trip type
        let returnDate = null;
        const departureDate = this.state.timeRange[0];
        const value = event.target.value;
        
        if (value === 'round') {
          if (this.state.timeRange[1] !== null) {
            returnDate = this.state.timeRange[1];
          } else {
            returnDate = new Date(
              departureDate.getFullYear(),
              departureDate.getMonth(),
              departureDate.getDate() + 7
              );
            }
          }
          
          // push changes to state
          this.setState({
            tripType: value,
            timeRange: [departureDate, returnDate],
          });
        };
        
        // select time range
        rangeSet = (event, inst) => {
          if (this.state.tripType === 'round') {
            this.setState({
              timeRange: inst.getVal(),
            });
          } else {
            this.setState({
              timeRange: [inst.getVal()[0], null],
            });
          }
        };
        
        rangeChange = (event, inst) => {
          const oneWay = this.state.tripType === 'oneway';
          if (oneWay && event.control === 'calendar' && event.active === 'start') {
            inst._isVisible = false;
            inst.setActiveDate('start');
            inst._isVisible = true;
          }
          if (inst._markup) {
            inst._isValid = true;
            inst._markup
            .find('.mbsc-fr-btn-s .mbsc-fr-btn')
            .removeClass('mbsc-fr-btn-d' + (oneWay ? ' mbsc-disabled' : ''));
          }
        };
        
        rangeClose = () => {
          if (this.state.tripType === 'oneway') {
            return true;
          }
        };
        
        // passenger numbers
        adultsChange = (event) => {
          this.setState({
            adults: +event.target.value,
          });
        };
        
        childrenChange = (event) => {
          this.setState({
            children: +event.target.value,
          });
        };
        
        infantChange = (event) => {
          this.setState({
            infant: +event.target.value,
          });
        };
        
        // trip class selection
        tripClassChange = (event) => {
          this.setState({
            tripClass: event.target.value,
          });
        };
        
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
          event.preventDefault()
          unirest.get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2019-01-01?inboundpartialdate=2019-09-01")
.header("X-RapidAPI-Host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
.header("X-RapidAPI-Key", "SIGN-UP-FOR-KEY")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
          const API_URL="https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2019-09-01?inboundpartialdate=2019-12-01"
          const API_KEY="78658dd993msha58b4f039c6c59ep11289djsn173e61927b34"
          unirest.post("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0")
          .header("X-RapidAPI-Host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
          .header("X-RapidAPI-Key", "78658dd993msha58b4f039c6c59ep11289djsn173e61927b34")
          .header("Content-Type", "application/x-www-form-urlencoded")
          .send("inboundDate=2020-09-10")
          .send("cabinClass=business")
          .send("children=0")
          .send("infants=0")
          .send("country=US")
          .send("currency=USD")
          .send("locale=en-US")
          .send("originPlace=SFO-sky")
          .send("destinationPlace=LHR-sky")
          .send("outboundDate=2020-09-01")
          .send("adults=1")
          .end(function (result) {
            console.log(result.status, result.headers, result.body);
          });
          fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2019-09-01?inboundpartialdate=2019-12-01", {
            "method": "GET",
            "headers": {
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
		"x-rapidapi-key": "78658dd993msha58b4f039c6c59ep11289djsn173e61927b34"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});
  };

  render() {
    return (
      <div className="body flightForm">
        <h1>Catch Your FLight</h1>
        <img className="plane1 " src={plane} alt="animated-plane" />
        <img
          className="cloud moving-cloud-2"
          src={cloud}
          alt="animated-cloud"
        />
        <img className="cloud3 moving-cloud-3" src={cloud} alt="animated-cloud"/>
        <body className="body1">
          <mobiscroll.Form>
            <mobiscroll.Segmented
              value="round"
              checked={this.state.tripType === 'round'}
              onChange={this.tripTypeChange}
              name="flightType"
            >
              Round trip
            </mobiscroll.Segmented>
            <mobiscroll.Segmented
              value="oneway"
              checked={this.state.tripType === 'oneway'}
              onChange={this.tripTypeChange}
              name="flightType"
            >
              One way
            </mobiscroll.Segmented>
            <mobiscroll.FormGroup>
              <mobiscroll.Select
                value={this.state.origin}
                data={this.remoteData}
                multiline={2}
                height={50}
                filter={true}
              >
                <mobiscroll.Input placeholder="Please select...">
                  Origin
                </mobiscroll.Input>
              </mobiscroll.Select>
              <mobiscroll.Select
                data={this.remoteData}
                multiline={2}
                height={50}
                filter={true}
                placeholder="Please select a city"
              >
                <mobiscroll.Input>Destination</mobiscroll.Input>
              </mobiscroll.Select>
              <mobiscroll.Range
                value={this.state.timeRange}
                onSet={this.rangeSet}
                onSetDate={this.rangeChange}
                onBeforeClose={this.rangeClose}
                min={new Date()}
                showSelector={false}
              >
                <mobiscroll.RangeStart>
                  <mobiscroll.Input>Leaving</mobiscroll.Input>
                </mobiscroll.RangeStart>
                <mobiscroll.RangeEnd
                  disabled={this.state.tripType === 'oneway'}
                >
                  <mobiscroll.Input>Returning</mobiscroll.Input>
                </mobiscroll.RangeEnd>
              </mobiscroll.Range>
            </mobiscroll.FormGroup>
            <mobiscroll.FormGroup>
              <mobiscroll.Stepper
                value={this.state.adults}
                onChange={this.adultsChange}
                min={1}
                max={15}
                data-val="left"
              >
                Adults
                <span className="mbsc-desc">From 14 years</span>
              </mobiscroll.Stepper>
              <mobiscroll.Stepper
                value={this.state.children}
                onChange={this.childrenChange}
                min={0}
                max={15}
                data-val="left"
              >
                Children
                <span className="mbsc-desc">2-14 years</span>
              </mobiscroll.Stepper>
              <mobiscroll.Stepper
                value={this.state.infant}
                onChange={this.infantChange}
                min={0}
                max={10}
                data-val="left"
              >
                Infant
                <span className="mbsc-desc">0-2 years</span>
              </mobiscroll.Stepper>
              <mobiscroll.Segmented
                value="economy"
                checked={this.state.tripClass === 'economy'}
                onChange={this.tripClassChange}
                name="flightClass"
              >
                Economy
              </mobiscroll.Segmented>
              <mobiscroll.Segmented
                value="comfort"
                checked={this.state.tripClass === 'comfort'}
                onChange={this.tripClassChange}
                name="flightClass"
              >
                Comfort
              </mobiscroll.Segmented>
              <mobiscroll.Segmented
                value="business"
                checked={this.state.tripClass === 'business'}
                onChange={this.tripClassChange}
                name="flightClass"
              >
                Business
              </mobiscroll.Segmented>
            </mobiscroll.FormGroup>
            <div className="mbsc-btn-group-block">
              <button onClick={(event)=>this.sendSearch(event)}>Find Flights</button>
            </div>
          </mobiscroll.Form>
        </body>
      </div>
    );
  }
}
export default BookingForm;

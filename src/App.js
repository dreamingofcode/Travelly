import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getProfileFetch } from './reducers/actions/userActions';
import { getHotelSearchData} from './reducers/actions/hotelSearchData';
import ScrollToTop from './ScrollToTop';
import './styles.css';
import './App.css';
import twitter from './icons/twitter.svg';
import youtube from './icons/youtube.svg';
import instagram from './icons/instagram.svg';
import TripCreator from './Components/tripCreator'
import LandingPage from './Components/landingPage';
import SignUpModal from './Components/signUpModal';
import AccountPage from './Components/accountPage';
import FlightSearchForm from './Components/Flights/flightSearchForm';
import FlightResults from './Components/Flights/flightResults';
import HotelSearchForm from './Components/Hotels/hotelSearchForm';
import HotelResults from './Components/Hotels/hotelResults';
import AdventuresForm from './Components/Adventures/adventuresForm'
class App extends Component {
  componentWillMount() {
    this.props.getHotelSearchData()
    this.props.getProfileFetch();
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <header className="main-head">
            <nav>
              <h1 id="logo">
                <a href="/">Travelly</a>
              </h1>
              <ul>
                <li>
                  <a href="#locations">Account</a>
                </li>
                <li>
                  <a href="#benefits">Benefits</a>
                </li>
                <li>
                  <a href="#contacts">Contacts</a>
                </li>
                {this.props.userData ? (
                  <li
                    onClick={(event) => {
                      localStorage.removeItem('token');
                      // this.props.history.push('/');
                    }}
                  >
                    <a href="/">Sign Out</a>
                  </li>
                ) : null}
              </ul>
            </nav>
          </header>

          <Switch>
            <Route exact path="/" component={LandingPage} />
            {/* <Route path="/" render={()=><LandingPage history={history}/>} /> */}
            <Route exact path="/signup" component={SignUpModal} />
            <Route exact path="/signin" component={SignUpModal} />
            <Route exact path="/trip-creator" component={TripCreator} />
            <Route exact path="/flightSearch" component={FlightSearchForm} />
            <Route exact path="/hotel-search" component={HotelSearchForm} />
            <Route exact path="/hotel-results" component={HotelResults} />
            <Route exact path="/flightSearch-results"component={FlightResults}/>
            <Route exact path="/account-page/:id" component={AccountPage} />
            <Route exact path="/adventures-search" component={AdventuresForm} />

          </Switch>
          <ScrollToTop />
          <footer>
            <div className="footer-wrapper">
              <h5>Travelly &copy;</h5>
              <ul>
                <li>
                  <a href="/">
                    <img src={twitter} alt="twitter" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <img src={youtube} alt="youtube" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <img src={instagram} alt="instagram.svg" />
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return { userData: state.userData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileFetch: () => {
      dispatch(getProfileFetch());
    },
    getHotelSearchData: () => {
      dispatch(getHotelSearchData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

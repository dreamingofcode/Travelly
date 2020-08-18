import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getProfileFetch } from './reducers/actions/userActions';
import ScrollToTop from "./ScrollToTop"
import './styles.css';
import './App.css';
import twitter from './icons/twitter.svg';
import youtube from './icons/youtube.svg';
import instagram from './icons/instagram.svg';

import LandingPage from './Components/landingPage';
import SignUpModal from './Components/signUpModal';
import AccountPage from './Components/accountPage';
import BookingSearchForm from './Components/Flights/bookingSearchForm';
import FlightSearchResults from './Components/Flights/flightSearchResults'
// import FlightSearchResults from './reducers/flightSearchResults';
class App extends Component {
  componentWillMount() {
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
            <Route exact path="/flightSearch" component={BookingSearchForm} />
            <Route exact path="/flightSearch-results" component={FlightSearchResults} />
            <Route exact path="/account-page/:id" component={AccountPage} />
          </Switch>
          <ScrollToTop/>
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
    }
   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React from 'react';
import { connect } from 'react-redux';
import airplaneIcon from '../icons/plane.svg';
import hotel from '../icons/bed-solid.svg';
import road from '../icons/route-solid.svg';
import cloud from '../images/cloud.png';
import logo from '../icons/airplane.svg';
import MyVerticallyCenteredModal from './signUpModal.js';
// import '../styles.css';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: true,
    };
  }
  openModal = () => {
    this.setState({ modalShow: !this.state.modalShow });
    console.log(this.state);
  };
  changeUserType = (e) => {
    console.log('puta', e.target.name);
    let type = 'guest';
    if (e.target.name === 'newUser') {
      type = 'new';
    } else {
      type = 'existing';
    }
    this.props.alterUserType(type);
  };
  render() {
    return (
      <div>
        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={() => this.openModal()}
        />
        <section className="hero">
          <h2>Travel beyond</h2>
          <h3>
            Start your perfect travelling experience at an affordable price{' '}
            <br />
            with Travelly <br />
          </h3>
          <button>
            <a href="/flightSearch">Book Now</a>
          </button>
        </section>
        <section id="locations">
          <header className="locations-head">
            <h2>The sky is the Limit!</h2>

            <h3
              style={{
                textDecoration: 'none',
                justifyContent: 'start',
              }}
            >
              Take a Look at your possibilities!
            </h3>

            <h3
              style={{
                textDecoration: 'none',
              }}
            >
              {' '}
              Over 250 countries at the lowest rates possible!
            </h3>
            <button
              name="activeUser"
              onMouseOver={(e) => this.changeUserType(e)}
              onClick={(event) => {
                this.openModal(event);
              }}
            >
              <a href="/">SIGN IN </a>
            </button>
            <button
              name="newUser"
              onMouseOver={(e) => this.changeUserType(e)}
              onClick={(event) => {
                this.openModal(event);
              }}
            >
              Sign Up!
            </button>

            <img src={cloud} className="moving-cloud-1 cloud" />
            <img src={cloud} className="moving-cloud-2 cloud" />
          </header>
        </section>

        <section id="benefits">
          <header className="benefits-head">
            <h2>All Your Travel Needs In One Place</h2>
            <img className="globe" src={logo} alt="animated-logo" />
            <h3>
              Avoid the hazzle of Travelling by using resources readily
              available to you! Everything from picking the perfect hotel,
              flight, and travel destination!
            </h3>
          </header>
          <div className="cards">
            <div className="card">
              <div className="card-icon">
                <img src={road} alt="road route symbol" />
              </div>
              <h4>Travel</h4>
              <p>
                Discover new places by using our Trip Calculator to book a trip
                based on your budget!
              </p>
              <button>Trip Calculator</button>
            </div>
            <div className="card">
              <div className="card-icon">
                <img src={hotel} alt="bed symbol" />
              </div>
              <h4>Stay</h4>
              <p>
                Find Hotels located near popular Hot-Spots at reduced rates!
              </p>
              <button>
                <a href="/flightSearch">Find Hotels</a>
              </button>
            </div>
            <div className="card">
              <div className="card-icon">
                <img src={airplaneIcon} alt="airplane! symbol" />
              </div>
              <h4>Fly</h4>
              <p>
                Search for the lowest prices and compare your flight options to
                better accommodate you
              </p>
              <button>
                <a href="/flightSearch">Find Flights</a>
              </button>
            </div>
          </div>
        </section>
        <section id="contacts">
          <div className="form-wrapper">
            <header className="form-head">
              <h2>Contact Us!</h2>
            </header>
            <form>
              <div className="name-form">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" required />
              </div>
              <div className="email-form">
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" required />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userType: state.userType,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    alterUserType: (type) => {
      const action = {
        type: 'CHANGE_USER_TYPE',
        userType: type,
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

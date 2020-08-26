import React from 'react';
import { connect } from 'react-redux';
import airplaneIcon from '../icons/plane.svg';
import hotel from '../icons/bed-solid.svg';
import road from '../icons/route-solid.svg';
import cloud from '../images/cloud.png';
import logo from '../icons/airplane.svg';

let token = localStorage.getItem('token')
class LandingPage extends React.Component {
  
componentWillMount(){
token = localStorage.getItem('token')

};
componentDidMount(){
  token = localStorage.getItem('token')
  }
  render() {
    const { userData } = this.props;

    return (
      <div>
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
            {token != undefined? (
              <div>
                <button onClick={()=> this.props.history.push(`/account-page/${userData.id}`)}>
                VIEW ACCOUNT
                </button>
                <button
                  onClick={(event) => {
                    localStorage.removeItem('token');
                    this.props.history.push('/account-page/1');
                    //this will cause a refresh as the redirect will error out,it's intended purpose
                  }}
                >
                  SIGN OUT
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => {
                    this.props.history.push('/signin');
                  }}
                >
                  LOGIN 
                </button>
                <button
                  onClick={() => {
                    this.props.history.push('/signup');
                  }}
                >
                 SIGN UP
                </button>
              </div>
            )}

            <img src={cloud} className="moving-cloud-1 cloud" alt="animated moving cloud" />
            <img src={cloud} className="moving-cloud-2 cloud" alt="animated moving cloud" />
          </header>
        </section>

        <section id="benefits">
          <header className="benefits-head">
            <h2>The world is waiting for you...</h2>
            <img className="globe" src={logo} alt="animated-logo" />
            <h3>
              Start your perfect getaway today! <br/>Avoid the hazzle of Travelling by using resources readily
              available to you! Everything from picking the perfect hotel,
              flight, and travel destination!
            </h3>
          </header>
          <div className="cards">
            <div className="card">
              <div className="card-icon">
                <img src={airplaneIcon} alt="airplane! symbol" />
              </div>
              <h4>Fly</h4>
              <p>
                Browse through the lowest prices on flights and compare your options for the best deals!
              </p>
              <button>
                <a href="/flightSearch">Find Flights</a>
              </button>
            </div>
            <div className="card">
              <div className="card-icon">
                <img src={hotel} alt="bed symbol" />
              </div>
              <h4>Stay</h4>
              <p>
                Find the perfect Hotel located near popular Hot-Spots at reduced rates!
              </p>
              <button>
                <a href="/hotel-search">Find Hotels</a>
              </button>
            </div>
            <div className="card">
              <div className="card-icon">
                <img src={road} alt="road route symbol" />
              </div>
              <h4>Explore</h4>
              <p>
                Discover new adventures and see what both locals and tourists love to do!
              </p>
              <button>Find Adventures</button>
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
    userData: state.userData,
  };
};

export default connect(mapStateToProps, null)(LandingPage);

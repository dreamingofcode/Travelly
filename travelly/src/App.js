import React from 'react';
import './styles.css';
import './App.css';
import airplaneIcon from './icons/plane.svg';
import hotel from './icons/bed-solid.svg';
import road from './icons/route-solid.svg';
import cloud from './images/cloud.png';
import twitter from './icons/twitter.svg';
import youtube from './icons/youtube.svg';
import instagram from './icons/instagram.svg';
import BookingForm from './Components/bookingForm'

function App() {
  return (
    <div className="App">
      <header className="main-head">
        <nav>
          <h1 id="logo">Travelly!!!</h1>
          <ul>
            <li>
              <a href="#locations">Locations</a>
            </li>
            <li>
              <a href="#benefits">Benefits</a>
            </li>
            <li>
              <a href="#contacts">Contacts</a>
            </li>
          </ul>
        </nav>
      </header>
      <section className="hero">
        <h2>Travel beyond</h2>
        <h3>
          Start your perfect travelling experience at an affordable price <br />
          with Travelly <br />
          Contact us now below
        </h3>
        <button>Book Now</button>
      </section>
      <section id="locations">
        <header className="locations-head">
          <h2>The sky is the Limit!</h2>
          <h3>
            Take a Look at your possibilities! Over 250 countries at the lowest
            rates possible
          </h3>
          <img src={cloud} className="moving-cloud-1 cloud" />
          <img src={cloud} className="moving-cloud-2 cloud" />
        </header>
      </section>
      <BookingForm/>
      <section id="benefits">
        <header className="benefits-head">
          <h2>All Your Travel Needs In One Place</h2>
          <h3>
            Avoid the hazzle of Travelling by using resources readily available
            to you! Everything from picking the perfect hotel, flight, and
            travel destination!
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
            <p>Find Hotels located near popular Hot-Spots at reduced rates!</p>
            <button>Find Hotels</button>
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
            <button>Find Flights</button>
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
      <footer>
        <div className="footer-wrapper">
          <h5>Travelly &copy;</h5>
          <ul>
            <li>
              <a href="#">
                <img src={twitter} alt="twitter" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={youtube} alt="youtube" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={instagram} alt="instagram.svg" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;

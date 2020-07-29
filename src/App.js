import React,{ Component} from 'react';
import {connect} from 'react-redux'

import {Route,Switch} from 'react-router-dom'
import {getProfileFetch} from './reducers/actions/userActions'
import './styles.css';
import './App.css';

import twitter from './icons/twitter.svg';
import youtube from './icons/youtube.svg';
import instagram from './icons/instagram.svg';
import LandingPage from './Components/landingPage'
import BookingForm from './Components/bookingForm'
import signUpModal from './Components/signUpModal'
class App extends Component {
  componentWillMount() {
    this.props.getProfileFetch();
  }
  render(){

    return( 
  <React.Fragment>
  
    <div className="App">
      <header className="main-head">
        <nav>
          <h1 id="logo"><a href="/">Travelly</a></h1>
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
          </ul>
        </nav>
      </header>
    
     
  <Switch>
  <Route exact path="/" component={LandingPage}/>
    {/* <Route path="/" render={()=><LandingPage history={history}/>} /> */}
    <Route exact path="/flightSearch" component={BookingForm}/>
    <Route exact path="/accountSignIn" component={signUpModal}/>
  </Switch>
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
}}
const mapStateToProps=state=>{
  return{ userData: state.userData}
}

const mapDispatchToProps= (dispatch)=>{
  return{
    getProfileFetch:()=>{
      dispatch(getProfileFetch())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (App);

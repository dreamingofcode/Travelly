import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AccountDetails from './accountDetails';
import './accountPage.css';
import dash from '../images/dash.png';

function AccountPage(props) {
  const [userInfo, setUserInfo] = useState(props.userData);
  useEffect(() => {
    setUserInfo(props.userData);
    console.log('useeffect');
  }, [props.userLoaded]);
  return (
    <React.Fragment>
      <div className="accountPage">
        {props.userLoaded === false ? (
          <h1>IS LOADING..</h1>
        ) : (
          <AccountDetails userInfo={userInfo} />
        )}
        ;
        <img className="dashBoard" src={dash} />
        <button
          className="button1"
          onClick={() => {
            props.history.push('/');
          }}
        >
          Account Details
        </button>
        <button className="button2"
         onClick={() => {
          props.history.push('/flightSearch');
        }}>Book Your Next Adventure</button>
        <button className="button3">View Favorites</button>
      </div>{' '}
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    userLoaded: state.userLoaded,
  };
};
export default connect(mapStateToProps, null)(AccountPage);

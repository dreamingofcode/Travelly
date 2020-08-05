import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import palm from '../images/palm.png';
import palmRightSide from '../images/rightPalm.png';

function SignUpModal(props) {
  let history = useHistory();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
  });
///TODO:seperate this functions
  function createUser(event) {
    event.preventDefault();
    if (props.userType === 'existing') signIn(event);
    else {
      if (userData.password !== userData.rePassword) {
        alert('ERROR: Both passwords in password fields MUST match!');
      }

      fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          user: {
            name: `${userData.email}`,
            email: `${userData.email}`,
            password: `${userData.password}`,
          },
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert('Your Account was successfully created!');
            console.log(data);
            localStorage.setItem('token', data.jwt);
            props.onHide();
            history.push('/account-page');
          }
        });
    }
  }
  const signIn = (event) => {
    event.preventDefault();
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: `${userData.email}`,
          password: `${userData.password}`,
        },
      }),
    };

    fetch(`http://localhost:3000/api/v1/login`, configObj)
      .then((resp) => resp.json())
      .then((data) => {
        console.log('user logging in data', data);
        if (data.error) {
          alert(data.error);
        } else {
          props.loginSuccess(data);
          props.updateUserData(data);
          localStorage.setItem('token', data.jwt);
          props.onHide();
          props.userLoaded()
          history.push('/account-page');//TODO:RESTful urls
        }
      });
  };

  return (
    <React.Fragment>
      <Modal
        className="modal"
        {...props}
        size="lg"
        animation={true}
        aria-labelledby="contained-modal-title-vcenter"
        autoFocus={true}
        backdrop="static"
        centered
      >
        <header>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {props.userType === 'existing' ? (
                <div>
                  <h1>Welcome Back!</h1>
                  <h4>Sign In below to continue your Journey!</h4>
                </div>
              ) : (
                <div>
                  <h1>Sign Up!</h1>
                  <h4>Create Your Free Travelly Account Below</h4>
                </div>
              )}
            </Modal.Title>
          </Modal.Header>
        </header>
        <Modal.Body>
          <img className="palmLeft" src={palm} alt="rightPalmLeaf" />
          <img className="palmRight" src={palmRightSide} alt="rightPalmLeaf" />

          <form>
            {props.userType === 'existing' ? null : (
              <div>
                <input
                  onChange={(event) =>
                    setUserData({ ...userData, name: event.target.value })
                  }
                  required
                  type="text"
                  name="name"
                  placeholder="Enter Full Name"
                />{' '}
              </div>
            )}

            <input
              onChange={(event) =>
                setUserData({ ...userData, email: event.target.value })
              }
              required
              type="text"
              name="email"
              placeholder="Enter Email"
            />
            <input
              onChange={(event) =>
                setUserData({ ...userData, password: event.target.value })
              }
              required
              type="text"
              name="password"
              placeholder="Enter Password"
            />
            {props.userType === 'existing' ? null : (
              <div>
                <input
                  onChange={(event) =>
                    setUserData({ ...userData, rePassword: event.target.value })
                  }
                  required
                  type="text"
                  name="re-password"
                  placeholder="Re-enter Password"
                />
              </div>
            )}

            <button onClick={(event) => createUser(event)}>Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    userType: state.userType,
    userLoaded: state.userLoaded,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (user) => {
      const action = {
        type: 'USER_AUTH',
        userAuth: user,
      };
      dispatch(action);
    },
    updateUserData: (user) => {
      const action = {
        type: 'FETCH_USER_DATA',
        userData: user,
      };
      dispatch(action);
    },
    userLoaded:()=>{
      const action={
        type:"USER_LOADED"
      }
      dispatch(action)
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal);

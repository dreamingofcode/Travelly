import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
  var urld = window.location.pathname;
  useEffect(() => {
    urld = window.location.pathname;
  }, []);
  ///TODO:seperate this functions
  function createUser(event) {
    event.preventDefault();
    if (urld === '/signin') signIn(event);
    else {
      if (userData.password !== userData.rePassword) {
        alert('ERROR: Both passwords in password fields MUST match!');
      }
      if (!userData.email.includes("@")){
        alert('ERROR: Please use a valid email address and try again!');

      }else{

      fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          user: {
            name: `${userData.name}`,
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
            props.updateUserData(data);
            localStorage.setItem('token', data.jwt);
            history.push(`/account-page/${data.user.id}`);
          }
          });}
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
          alert("Please check your credentials and try again");
        } else {
          props.loginSuccess(data);
          props.updateUserData(data);
          localStorage.setItem('token', data.jwt);
          props.userLoaded();
          history.push(`/account-page/${data.user.id}`);
        }
      });
  };

  return (
    <div className="modal">
      <header>
        {urld === '/signup' ? (
          <div>
            <h1>Sign Up!</h1>
            <h4>Create Your Free Travelly Account Below</h4>
          </div>
        ) : (
          <div>
            <h1>Welcome Back!</h1>
            <h4>Sign In below to continue your Journey!</h4>
          </div>
        )}
      </header>

      <img className="palmLeft" src={palm} alt="rightPalmLeaf" />
      <img className="palmRight" src={palmRightSide} alt="rightPalmLeaf" />

      <form>
        {urld === '/signup' ? (
          <div>
            <input
              onChange={(event) =>
                setUserData({ ...userData, name: event.target.value })
              }
              required
              type="text"
              name="name"
            />{' '}<label>Full Name</label>
          </div>
        ) : null}
       
        <input
          onChange={(event) =>
            setUserData({ ...userData, email: event.target.value })
          }
          required
          type="text"
          name="email"
        />
        <label>Email</label>
       <input
          onChange={(event) =>
            setUserData({ ...userData, password: event.target.value })
          }
          required
          type="text"
          name="password"
        /> <label>Password</label>
        {urld === '/signin' ? null : (
          <div>
            <input
              onChange={(event) =>{
                console.log("money",userData)
                setUserData({ ...userData, rePassword: event.target.value })
              }}
              required
              type="text"
              name="re-password"
              /> <label>Password</label>
          </div>
        )}
      
        <button onClick={(event) => createUser(event)}>Submit</button><br/>
      </form>

      <button onClick={()=>history.push("/")}>
   Close
      </button>
        {urld==="/signin"?<h5><a href="/signup">Create An Account</a></h5>:<h5><a href="/signin">Sign Back In</a></h5>}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
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
    userLoaded: () => {
      const action = {
        type: 'USER_LOADED',
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal);

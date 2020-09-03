import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AccountEditForm from './accountEditForm';
import './accountPage.css';
import arrow from '../icons/arrow.png';

function AccountPage(props) {
  let history = useHistory();
  const token = localStorage.getItem('token');
  const { userData } = props;
  const [open, setOpen] = React.useState(false);
  const [editUser, seteditUser] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const [userInfo, setUserInfo] = useState(props.userData);
  useEffect(() => {
    // setUserInfo(props.userData);
  }, []);

  return (
    <div className="accountPage">
      {token ? null : history.push('/')}
      <div className="accountDetails">
        {userData ? null : (
          <div className="d-flex justify-content-center">
            <h1>IS LOADING..</h1>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {props.userLoaded === false ? null : (
          <h1>Welcome {props.userData.name}</h1>
        )}
        <h4>You currently have {0} trips booked</h4>
        {props.userLoaded && userData.address === "Please Update!" ?<h4>In order to better serve you, please update your Account Details</h4>:null}
        <button className="button1" onClick={handleOpen}>
          Account Details
        </button>
        <button
          className="button2"
          onClick={() => {
            props.history.push('/flightSearch');
          }}
        >
          Book Your Next Adventure
        </button>
        <button className="button3">View Favorites</button>
      </div>{' '}
      {props.userLoaded === false ? null : (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="classes.modal"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className="paper">
                <div className="updateForm">
                  <img
                    src={arrow}
                    style={{ height: '120px', marginBottom: '-30px' }}
                    alt="arrow symbol"
                  />
                  <h1 id="transition-modal-title">
                    {userData.name}'s Account Details
                  </h1>
                  {editUser ? null : (
                    <div>
                      <p id="transition-modal-description">
                        This information is used during flight searches in order
                        to save you time!
                      </p>{' '}
                      <br />
                    </div>
                  )}

                  {!editUser ? (
                    <div>
                      <ul>
                        <li>Name: {userData.name}</li>
                        <li>Date of Birth: {userData.DOB}</li>
                        <li>Email: {userData.email}</li>
                        <li>
                          Address: <br /> {userData.address}
                        </li>
                      </ul>
                      <button onClick={() => seteditUser(true)}>
                        Edit Details
                      </button>
                    </div>
                  ) : (
                    <AccountEditForm
                      userData={userData}
                      history={history}
                      setOpen={setOpen}
                      seteditUser={seteditUser}
                    />
                  )}
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    userLoaded: state.userLoaded,
  };
};
export default connect(mapStateToProps, null)(AccountPage);

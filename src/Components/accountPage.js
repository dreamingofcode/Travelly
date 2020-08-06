import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AccountDetails from './accountDetails';
import AccountEditForm from './accountEditForm';
import './accountPage.css';
import dash from '../images/dash.png';
import arrow from '../images/arrow.png';



function AccountPage(props) {
  let history = useHistory();
  const token = localStorage.getItem('token')
  const { userData } = props;
  const [open, setOpen] = React.useState(false);
  const [editUser, seteditUser] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [userInfo, setUserInfo] = useState(props.userData);
  useEffect(() => {
    setUserInfo(props.userData);
  });

  return (
    <div className="accountPage">
    {token?null:history.push("/")}
      <div className="accountDetail">
        {props.userLoaded === false ? (
          <div class="d-flex justify-content-center">
          <h1>IS LOADING..</h1>
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
        ) : (
          <AccountDetails userInfo={userInfo} />
        )}
        ;
        <img className="dashBoard" src={dash} />
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
                <img
                  src={arrow}
                  style={{ height: '120px', marginBottom: '-30px' }}
                  alt="arrow symbol"
                />
                <h1 id="transition-modal-title">
                  {userData.name}'s Account Details
                </h1>

                <p id="transition-modal-description">
                  This information is used during flight searches in order to
                  save you time!
                </p>
                <br />
                {!editUser ? (
                  <div>
                    <ul>
                      <li>Name: {userData.name}</li>
                      <li>Date of Birth:{userData.dob}</li>
                      <li>Email: {userData.email}</li>
                      <li>Address: {userData.address}</li>
                    </ul>
                    <button onClick={() => seteditUser(true)}>
                      Edit Details
                    </button>
                  </div>
                ) : (
                  <AccountEditForm userData={userData} history={history} seteditUser={seteditUser}/>
                )}
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

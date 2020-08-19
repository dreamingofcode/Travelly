import React, { useState, useEffect } from 'react';
import DateForm from './dateForm';
import SelectUSState from 'react-select-us-states';
import closingIcon from '../icons/close.png'

function AccountEditForm(props) {
  useEffect(() => {});
  const { userData, seteditUser, history ,setOpen} = props;
  const [newUserData, setNewUserData] = useState({
    name: `${userData.name}`,
    email: `${userData.email}`,
    DOB: `${userData.DOB}`,
    address: `${userData.address}`,
    city: `${userData.address}`,
    state: `${userData.address}`,
    postal: `${userData.address}`,
  });

  const handleSubmit = () => {
    const fullAddress =
      newUserData.address +
      ',' +
      newUserData.city +
      ',' +
      newUserData.state +
      ',' +
      newUserData.postal;
    console.log(
      fullAddress.split(',').splice(0, 4).join(),
      'perra',
      newUserData.address,
      'look',
      fullAddress
    );
    console.log('ready to uodate:', newUserData, fullAddress);
    const configObj = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: {
          name: `${newUserData.name}`,
          email: `${newUserData.email}`,
          DOB: `${newUserData.DOB}`,
          address: `${fullAddress.split(',').splice(0, 4).join()}`,
        },
      }),
    };
    fetch(`https://travelly-server.herokuapp.com/api/v1/users/${userData.id}`, configObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        }
        console.log('newupdaTTTT', data);
      });
    seteditUser(false);
  };
  const deleteAccount = () => {
    if (window.confirm('Are you sure you wish to delete your account?')) {
      const configObj = { method: 'DELETE' };
      fetch(`https://travelly-server.herokuapp.com/api/v1/users/${userData.id}`, configObj)
        .then((resp) => resp.json())
        .then((data) => {
          localStorage.clear();
          console.log('deleted', data);
          history.push('/');
        });
    }
  };
  const updateUser = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setNewUserData({ ...newUserData, [key]: value });
    console.log('newuodate', newUserData);
  };

  return (
    <React.Fragment>
      <div>
      <img onClick={()=>seteditUser? seteditUser(false):setOpen(false) } src={closingIcon} className="closing-icon" alt="closing icon"/>

        <ul>
          <li>
            <label>Name:</label>

            <input
              name="name"
              value={newUserData.name}
              onChange={(event) => updateUser(event)}
            />
          </li>
          <li>
            <label> Email:</label>

            <input
              name="email"
              value={newUserData.email}
              onChange={(event) => updateUser(event)}
            />
          </li>{' '}
          <li>
            <label>Address:</label>

            <input
              name="address"
              defaultValue={userData.address.split(',')[0]}
              onChange={(event) => updateUser(event)}
            />
          </li>{' '}
          <li>
            <label>City:</label>
            <input
              name="city"
              defaultValue={userData.address.split(',')[1]}
              onChange={(event) => updateUser(event)}
            />{' '}
          </li>{' '}
          <li>
            <label>State:</label>
            <SelectUSState
              id="myId"
              value={userData.address.split(',')[2]}
              className="paperInput"
              onChange={(event) =>
                setNewUserData({ ...newUserData, state: event })
              }
            />{' '}
          </li>{' '}
          <li>
            <label>Zipcode:</label>

            <input
              name="postal"
              defaultValue={userData.address.split(',')[3]}
              onChange={(event) => updateUser(event)}
            />
          </li>{' '}
          <li>
            <label>Date of Birth:</label>
            <DateForm
              className="paperInput"
              userData={userData}
              newUserData={newUserData}
              setNewUserData={setNewUserData}
            />{' '}
          </li>{' '}
        </ul>
        <button onClick={() => handleSubmit()}>Submit Changes</button>
        <button onClick={deleteAccount}>Delete Your Account</button>
      </div>
    </React.Fragment>
  );
}
export default AccountEditForm;

import React from 'react';

function AccountEditForm(props) {
  const { userData, seteditUser ,history} = props;
  const deleteAccount=()=>{
      console.log("userr",userData.id)
    if (
        window.confirm('Are you sure you wish to delete your account?')
      ){
        const configObj = {method: "DELETE"}
        fetch(`http://localhost:3000/api/v1/users/${userData.id}`,configObj)
          .then(resp => resp.json())
          .then((data) => {
              localStorage.clear();
              console.log("deleted",data)
        history.push('/');
          });

      }
    }
  return (
    <div>
      <label>Name:</label>
      <input value={userData.name}></input>
      <ul>
        <li>
          Date of Birth:<input placeholder={userData.name}></input>
        </li>
        <li>
          Email:<input placeholder={userData.name}></input>
        </li>
        <li>
          Address:<input placeholder={userData.name}></input>
        </li>
        <li>
          City:<input placeholder={userData.name}></input>
        </li>
        <li>
          State:<input placeholder={userData.name}></input>
          <li>
            Postal Code:<input placeholder={userData.name}></input>
          </li>
        </li>
      </ul>
      <button onClick={() => seteditUser(false)}>Submit Changes</button>
      <button onClick={deleteAccount}>Delete Your Account</button>
    </div>
  );
}
export default AccountEditForm;

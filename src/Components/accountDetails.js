import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import carFreshner from "../images/carScent.png"



function AccountDetails(props) {
    
  // const {userData, userLoaded}=props

  return (
    <div>
      <header>
        {/* {props.userLoaded ? ( */}
          <div className="accountDetails">
            <h1>Hello {props.userData.name} !</h1>
            
<img className="carScent" src={carFreshner}/>


          </div>
        {/* ) : null} */}
      </header>
      
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    userLoaded: state.userData,
  };
};
export default connect(mapStateToProps, null)(AccountDetails);







  

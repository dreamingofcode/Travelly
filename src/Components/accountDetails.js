import React from 'react';
import { connect } from 'react-redux';
import carFreshner from "../images/carScent.png"



function AccountDetails(props) {
    
  // const {userData, userLoaded}=props

  return (
    <React.Fragment >
      <header className="accountDetails">
        {/* {props.userLoaded ? ( */}
         
            <h1>Hello {props.userData.name} !</h1>
            
<img className="carScent" src={carFreshner} alt="animated image"/>
   
      </header>
      
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    userLoaded: state.userData,
  };
};
export default connect(mapStateToProps, null)(AccountDetails);







  

import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import palm from '../images/palm.png';
import palmRightSide from '../images/rightPalm.png';

function MyVerticallyCenteredModal(props) {
  return (
    <React.Fragment className="modal">
      <Modal
        {...props}
        size="lg"
        animation={true}
        aria-labelledby="contained-modal-title-vcenter"
        // autoFocus={true}
        // backdrop="static"
        centered
      >
        <header>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              <h1>Sign Up!</h1>
          <h4>Create Your Free Travelly Account Below</h4>
            </Modal.Title>
          </Modal.Header>
        </header>
        <Modal.Body>
          <img className="palmLeft" src={palm} alt="rightPalmLeaf" />
          <img className="palmRight"src={palmRightSide} alt="rightPalmLeaf"/>

          <form>
            <input
              required
              type="text"
              name="email"
              placeholder="Enter Email"
            />
            <input required type="text" name="password" placeholder="Enter Password" />
            <input
            required
              type="text"
              name="re-password"
              placeholder="Re-enter Password"
            />
            <button>Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div>{/* <h1 className="logo bags">Travelly</h1> */}</div>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
export default MyVerticallyCenteredModal;

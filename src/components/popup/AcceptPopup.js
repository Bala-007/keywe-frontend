import { Link } from "gatsby";
import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';

function  AcceptPopup(props) {
  const { success, toggleSuccess, claimAlertMessage,message } = props;

  console.log('sucess',success)
  const hanldeSuccess=()=>{
    props.agentAccept()
    toggleSuccess()
  }
  return (
    <div>
      <Modal show={success} onHide={toggleSuccess}>
        <Modal.Header closeButton className="team-popup-margin teampopup-title " >
          <Modal.Title className='form-field-label form-label-team '>{claimAlertMessage ? 'Sign in' : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
          <div>
            <div className={style1.successtext}>
              {claimAlertMessage ?
                <>
                  {/* <p className={style1.accepttext}>In order to {message} this property you will need to</p> */}
                  <p className={style1.accepttext}>{message}</p>
                  <p className={style1.accepttext}>sign in or sign up to KeyWe</p>
                </>
                :
                <>
                  <p className={style1.accepttext}>Are you sure you want to accept this request?</p>
                </>
              }
            </div>
          </div>
          {claimAlertMessage ?
            <>
              <Link to="/signin"><Button className={style1.nobutton}>Sign in</Button></Link>
              <Link to="/signup"><Button className={style1.yesbutton}>Sign up</Button></Link>
            </>
            :
            <>
              <Button className={style1.nobutton} onClick={toggleSuccess}>
                No
              </Button>
              <Button className={style1.yesbutton} onClick={hanldeSuccess}>
                Yes
              </Button>
            </>}
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default AcceptPopup
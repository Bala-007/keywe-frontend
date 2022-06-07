import React,{useState} from "react";
import { Modal, Button } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';

function DeclinePopup(props) {
    const {userSuccess, toggleUserSuccess,claimAlertMessage} = props;
  
  const handleDecline=()=>{
    props.agentDecline()
    toggleUserSuccess()
  }
  
  return (
    <div>
      <Modal show={userSuccess} onHide={toggleUserSuccess}>
        <Modal.Header closeButton className="team-popup-margin teampopup-title " >
          <Modal.Title className='form-field-label form-label-team '>{claimAlertMessage ? '' : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
          <div>
          <div className={style1.successtext}>
          {claimAlertMessage ?
                <>
                 <p className={style1.accepttext}>Are you sure you want to Uncliam </p>
              <p className={style1.accepttext}>this agent?</p>
                </>
                :
                <>
              <p className={style1.accepttext}>Are you sure you want to decline this request?</p>
              </>
              }
              </div>
          </div>
          <Button className={style1.nobutton} onClick={toggleUserSuccess}>
             No
          </Button>
          <Button className={style1.yesbutton} onClick={handleDecline}>
           Yes
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default DeclinePopup
import React from "react";
import { Modal, Button } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';

function UnClaimPopup(props) {
    const {userSuccess, toggleUserSuccess} = props;
  
  
  
  return (
    <div>
      <Modal show={userSuccess} onHide={toggleUserSuccess}>
        <Modal.Header closeButton className="team-popup-margin teampopup-title " >
          <Modal.Title className='form-field-label form-label-team '></Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
          <div>
          <div className={style1.successtext}>
         
                 <p className={style1.accepttext} style={{margin:0}}>Are you sure you want to Uncliam </p>
              <p className={style1.accepttext}>this agent?</p>
                
              </div>
          </div>
          <Button className={style1.nobutton}>
             No
          </Button>
          <Button className={style1.yesbutton}>
           Yes
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default UnClaimPopup
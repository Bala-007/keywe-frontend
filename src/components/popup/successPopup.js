import React,{useState} from "react";
import { Modal, Button } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';

function SuccessPopup(props) {
    const {success, toggleSuccess,agentName} = props;
  
    // const detail=props.data
    // console.log("agentt name...",props.data)
  
  
  return (
    <div>
    
      <Modal show={success} onHide={toggleSuccess} className="special_modal" dialogClassName="my-modal" >
        <Modal.Header closeButton className="team-popup-margin teampopup-title " >
          <Modal.Title className='form-field-label form-label-team '>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
          <div>
          <span className={style1.circle2}><i className="fa fa-check" style={{color:"#78C93A"}} ></i></span>
          <div className={style1.successtext}>
              <p style={{textAlign:"center",fontFamily:"DejaVuSansBold"}}>Transfer Successful</p>
              <p>Thank you! Your request has been notified to {agentName} successfully.</p>
              </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default SuccessPopup
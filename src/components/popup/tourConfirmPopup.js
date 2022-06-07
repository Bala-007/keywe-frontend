import React,{useState} from "react";
import { Modal, Button } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';

function SuccessPopup(props) {
    const {confirm, toggleConfirm} = props;
  
  
  
  return (
    <div>
    
      <Modal show={confirm} onHide={toggleConfirm} className="modelbox">
       <div className={style1.tourconfirm}>
        <Modal.Body className="team-popup-margin pb-0">
          <div className={style1.confirmText}>
          <span className={style1.circle2}><i className="fa fa-check" style={{color:"#78C93A"}} ></i></span>
          <div className={style1.successtext2}>
              <p style={{textAlign:"center"}}><b style={{color:"white", fontFamily: "DejaVuSansBold"}}>Tour Confirmed</b></p>
              <p style={{color:"white"}}>THURSDAY , JAN 12 1:30 PM</p>
              </div>
          </div>
        </Modal.Body>
        
          <Button variant="primary" className={style1.viewmytourbut}>
            View My Tours
          </Button>

          </div>
      </Modal>
    </div>
  )
}
export default SuccessPopup
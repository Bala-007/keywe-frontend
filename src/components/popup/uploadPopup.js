import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function UploadPopup(props) {  
    const {show, toggleShow} = props;

  return (
    <div>
        <Modal show={show} onHide={toggleShow}>
        <Modal.Header closeButton className="team-popup-margin teampopup-title" >
          <Modal.Title className='form-field-label form-label-team '>Team</Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
           
        </Modal.Body>
        <Modal.Footer className="team-popup-margin teampop-footer" > 
          <Button variant="primary" onClick={toggleShow} className='teamnext-submit-btn row col-lg-12 col-xl-12 col-md-12'>
            Next
          </Button>
          <div onClick={toggleShow} className='teampopup-skip row col-lg-12 col-xl-12 col-md-12'>
            Skip
          </div>
     
        </Modal.Footer>
      </Modal>
    </div>
  )
}

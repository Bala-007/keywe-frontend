import { Link } from "gatsby";
import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';

function  CommonPopup(props) {
  const { open, close, hanldeYes, para1, para2 } = props;


  const hanldeSuccess=()=>{
    hanldeYes()
    close()
  }
  return (
    <div>
      <Modal show={open} onHide={close}>
        <Modal.Header closeButton className="team-popup-margin teampopup-title " >
          <Modal.Title className='form-field-label form-label-team '></Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
          <div>
            <div className={style1.successtext}>
                <>
                  <p className={style1.accepttext}>{para1}</p>
                  <p className={style1.accepttext}>{para2}</p>
                </>
            </div>
          </div>
              <Button className={style1.nobutton} onClick={close}>
                No
              </Button>
              <Button className={style1.yesbutton} onClick={hanldeSuccess}>
                Yes
              </Button>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default CommonPopup
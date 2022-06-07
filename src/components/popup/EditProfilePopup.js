import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReactTooltip from "react-tooltip";
import question from '../../../static/images/question.png';
import * as style1 from '../../pages/dashboard/detail.module.css';
import user0 from "../../../static/images/james.png"

export default function EditProfilePopup(props) {
  const { show, toggleShow } = props;

  return (
    <div>
      <Modal show={show} onHide={toggleShow} >
        <Modal.Header closeButton className="team-popup-margin teampopup-title"  >
          <Modal.Title className='form-field-label form-label-team '><h5 className='teamText'>Edit Profile</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
          <div className={style1.profileDetail}>
          <img src={user0} alt="user0" className={style1.profileImage} />
          <p className={style1.profileName}>Carrie Hunter</p>  
          </div>
          <div className={style1.filedetails}>
          <div >
                <label htmlFor="name" className="form-label form-label-team" style={{ color: "#8a8787" }}>Pre-Approval Letter</label>
                <input type="text" name="createGroup" placeholder='Click to Browse' className={style1.fileUploadbox} />
              </div>
              <div >
                <label htmlFor="name" className="form-label form-label-team" style={{ color: "#8a8787" }}>Proof of Funds</label>
                <input type="text" name="createGroup" placeholder='Click to Browse' className={style1.fileUploadbox} />
              </div>
              <div >
                <label htmlFor="name" className="form-label form-label-team" style={{ color: "#8a8787" }}>Intro Letter</label>
                <input type="text" name="createGroup" placeholder='Click to Browse' className={style1.fileUploadbox} />
              </div>
              </div>
              <div>
              <label htmlFor="name" className="form-label form-label-team" style={{ color: "#8a8787",marginTop:"10px" }}>Add Notes</label>
              </div>
              <div>
              <textarea id="w3review"  name="message" rows="4" cols="50" className={style1.textnotes}  ></textarea>
              </div>
        </Modal.Body>
        <Button className={style1.Editsubmitbut}>
            Submit
          </Button>
        <Modal.Footer className="team-popup-margin teampop-footer" >
          
         

        </Modal.Footer>
      </Modal>
    </div>
  )
}

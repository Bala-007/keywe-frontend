import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReactTooltip from "react-tooltip";
import question from '../../../static/images/question.png';
import * as style1 from '../../pages/dashboard/detail.module.css';

export default function TeamPopup(props) {
    const { show, toggleShow } = props;

    return (
        <div>
            <Modal show={show} onHide={toggleShow} >
                <Modal.Header closeButton className="team-popup-margin teampopup-title"  >
                    <Modal.Title className='form-field-label form-label-team '><h5 className='teamText'></h5></Modal.Title>
                </Modal.Header>
                <Modal.Body className="team-popup-margin pb-0" >
                    <div className='row'>
                        <h6 className={style1.photosendtext}>Would you like to send a photo to the agent of </h6>
                            <h6 className={style1.photosendtext}>your home?</h6>
                        <label htmlFor="name" className="form-label form-label-team"><h6 className='createText'>Upload Photo</h6></label>
                        <input type="text" name="createGroup" placeholder='Click to browse' className={style1.fileuploadbox} />
                    </div>
                </Modal.Body>
                <Modal.Footer className="team-popup-margin teampop-footer" >
                    <Button variant="primary" onClick={toggleShow} className={style1.photosendbut}>
                        Submit
                    </Button>
                    <div onClick={toggleShow} className='teampopup-skip row col-lg-12 col-xl-12 col-md-12'>
                        Skip
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

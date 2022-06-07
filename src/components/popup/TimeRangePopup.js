import { style } from '@mui/system';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';
import ReactTooltip from "react-tooltip";
import question from '../../../static/images/question.png'

export default function TimeRangePopup(props) {
  const { show, toggleShow } = props;

  return (
    <div>
      <Modal show={show} onHide={toggleShow}>
        <Modal.Header closeButton className="team-popup-margin teampopup-title" >
          <Modal.Title className='form-field-label form-label-team '>Choose a Time Range</Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
          <form>
            <div className='row'>
              <div className='col-md-5'>
                  <div>
                <label htmlFor="name" className="form-label form-label-team" style={{ color: "#8a8787" }}>From</label>
                </div>
                <div>
                <select name="createGroup" className={style1.selecttime1} aria-label="--Select--">
                  <option>Select Time</option>
                  <option value="1">10:00</option>
                  <option value="2">11:00</option>
                  <option value="3">12:00</option>
                </select>
                </div>
              </div>
              <div className='col-md-5'>
                  <div>
                <label htmlFor="name" className="form-label form-label-team" style={{ color: "#8a8787" }}>To</label>
                </div>
                <div>
                <select name="createGroup" className={style1.selecttime2} aria-label="--Select--">
                  <option>Select Time</option>
                  <option value="1">12:00</option>
                  <option value="2">1:00</option>
                  <option value="3">2:00</option>
                </select>
                </div>
              </div>
              <div className='col-md-2'>
              <Button variant="primary" onClick={toggleShow} className={style1.timesubbut}>
            +
          </Button>
              </div>
            </div>
            
          </form>
        </Modal.Body>
        <Modal.Footer className="team-popup-margin teampop-footer" >
          <Button variant="primary" onClick={toggleShow} className={style1.claimbut}>
            Update
          </Button>


        </Modal.Footer>
      </Modal>
    </div>
  )
}

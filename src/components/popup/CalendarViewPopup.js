import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';
import Calendar from '../../pages/calendar/calendar';
import TourConfirmPopup from '../popup/tourConfirmPopup'

export default function CalendarViewPopup(props) {
   const {calendar, toggleCalendar} = props;
 
  
  return (
    <div>
      
      <Modal show={calendar} onHide={toggleCalendar}>
        <Modal.Header closeButton className="calendar-popup-margin teampopup-title" >
          <Modal.Title className='form-field-label form-label-team '>Choose date</Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
        <Calendar />
         
        
        </Modal.Body>
      </Modal>
    </div>
  )
}

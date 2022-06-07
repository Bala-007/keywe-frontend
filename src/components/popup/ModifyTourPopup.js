import React, { useState } from 'react';
import { Modal, Button, Row } from 'react-bootstrap';
import ReactTooltip from "react-tooltip";
import question from '../../../static/images/question.png';
import * as style1 from '../../pages/dashboard/detail.module.css';
import calendar from '../../../static/images/calendar.png';
import clock from '../../../static/images/clock.png'


export default function ModifyTourPopup(props) {
    const { show, toggleShow } = props;

    return (
        <div>
            <Modal show={show} onHide={toggleShow} >
                <Modal.Header closeButton className="team-popup-margin teampopup-title"  >
                    <Modal.Title className='form-field-label form-label-team '><h5 className='teamText'>Modify Tour</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body className="team-popup-margin pb-0" >
                    <div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label htmlFor="name" className="form-label form-label-team"><h6 className='createText'>Select Date</h6></label>
                                <input type="text" name="createGroup" placeholder='Select Date' className='form-control form-field form-field-team mb-4 position-relative' />
                                <img src={calendar} alt="calendar" className={style1.calendarIcon} />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor="name" className="form-label form-label-team"><h6 className='createText'>Change Time</h6></label>
                                <input type="text" name="createGroup" placeholder='Change Time' className='form-control form-field form-field-team mb-4 position-relative' />
                                <img src={clock} alt="clock" className={style1.clockIcon} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label htmlFor="name" className="form-label form-label-team"><h6 className='createText'>Asign to another Agent</h6></label>
                                <select name="company" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--">
                                    <option>Select Agent</option>
                                    <option value="1">AAA</option>
                                    <option value="2">BBB</option>
                                    <option value="3">CCC</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-5'>
                        <div className='col-md-6'>
                            <Button variant="primary" className={style1.updatetourbut}>
                                Update
                            </Button>
                        </div>
                        <div className='col-md-6'>
                            <Button variant="primary" className={style1.cancetourbut}>
                                Cancel Tour
                            </Button>
                        </div>
                    </div>
                    <Row className='sellertour-calender mb-3'>
                        <img alt='image'
                            style={{
                                width: "45px",
                                height: "20px",
                                marginRight: "-5px"
                            }}
                            src="/images/Icon awesome-calendar-alt.png"
                        />Update Calendar
                    </Row>
                </Modal.Body>
                <Modal.Footer className="team-popup-margin teampop-footer" >



                </Modal.Footer>
            </Modal>
        </div>
    )
}

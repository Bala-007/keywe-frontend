import React, { useState } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import home1 from '../../../static/images/home1.png';
import sendimage from '../../../static/images/Group327.png';
import Daniel from '../../../static/images/Daniel.png';
import * as style1 from '../../pages/dashboard/detail.module.css';

export default function ChatPopup(props) {
    const { show, toggleShow } = props;

    return (
        <div>
            <Modal show={show} onHide={toggleShow}>
                <Modal.Header closeButton className="team-popup-margin teampopup-title" style={{ borderBottom: "none" }}>
                    <Modal.Title className='form-field-label form-label-team' style={{ fontFamily: "DejaVuSansBold" }} >Chat</Modal.Title>
                </Modal.Header>
                <Modal.Body className="team-popup-margin p-0">
                    <h6 style={{ marginBottom: "30px"}}> <img src={Daniel} alt="Daniel"/> Me, John and Agent Amy are Active Now</h6>
                    <Card className={style1.chatsCard}>
                        <div className='row'>
                            <div className='col-md-4'>
                                <img src={home1} alt="home1" className={style1.homes1}/>
                            </div>
                            <div className='col-md-5' style={{ marginTop: "10px"}}>
                                <p style={{ margin: "5px 0"}}>$120,000</p>
                                <p style={{ margin: "0", fontFamily: "DejaVuSansBold" }}>123 Scotland Dr</p>
                                <p style={{ margin: "0", fontFamily: "DejaVuSansBold" }}>Saratoga,CA 95070</p>
                            </div>
                            <div className='col-md-3' style={{ marginTop: "10px"}}>
                            <div className={style1.chatActive}>
                                  <i className="fa fa-circle" style={{ color: "#03B45B" }} ></i>
                                  <p style={{ margin: "0px", marginLeft: "5px" }}>Active</p>
                            </div>
                            </div>
                        </div>
                    </Card>
                    {/* <div>
                        <p>Me</p>
                        <p>Is this walking distance to the nearest elementary school?</p>
                        <p>Friday, Nov 27 10:09am</p>
                    </div>
                    <div>
                        <p>Agent Amy</p>
                        <p>No, but the school bus stops right on the corner of this block.</p>
                        <p>Friday, Nov 27 11:16</p>
                    </div> */}
                    <div className={style1.chatdetail}>
                        <input type="text" name="createGroup" placeholder='Message' className={style1.chatinput} />
                        <img src={sendimage} alt="sendimage" className={style1.sendimage} />
                    </div>
                </Modal.Body>
                <Modal.Footer className="team-popup-margin teampop-footer" ></Modal.Footer>
            </Modal>
        </div>
    )
}

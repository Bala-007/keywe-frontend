import { Link } from 'gatsby';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReactTooltip from "react-tooltip";
import question from '../../../static/images/question.png';
import * as style1 from '../../pages/dashboard/detail.module.css';

export default function SelectGroupPopup(props) {
    const { show, toggleShow } = props;

    return (
        <div>
            <Modal show={show} onHide={toggleShow} >
                <Modal.Header closeButton className="team-popup-margin teampopup-title"  >
                    <Modal.Title className='form-field-label form-label-team '><h5 className='teamText'>Select Group</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body className="team-popup-margin pb-0" >
                    <div className={style1.groupdetail}>
                        <h6>Black Rock Flats</h6>
                        <Button className={style1.groupaddbut}>Add</Button>
                    </div>
                    <hr style={{color:"#c9bebe"}} />
                    <div className={style1.groupdetail}>
                        <h6>MDG Homes</h6>
                        <Button className={style1.groupaddbut}>Add</Button>
                    </div >
                    <hr style={{color:"#c9bebe"}} />
                    <div className={style1.groupdetail}>
                        <h6>The Estates</h6>
                        <Button className={style1.groupaddbut}>Add</Button>
                    </div>
                    <hr style={{color:"#c9bebe"}} />
                    <div className={style1.groupdetail}>
                        <h6>SDK Real Estate</h6>
                        <Button className={style1.groupaddbut}>Add</Button>
                    </div>
                    <hr style={{color:"#c9bebe"}} />
                    <div className={style1.groupdetail}>
                        <h6>The Korcoran Flats</h6>
                        <Button className={style1.groupaddbut}>Add</Button>
                    </div>
                    <hr style={{color:"#c9bebe"}} />

                </Modal.Body>
            </Modal>
        </div>
    )
}

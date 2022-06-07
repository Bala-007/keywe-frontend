import React, { useState } from "react"
import { Modal, Button, Card } from "react-bootstrap"
import * as style from "../../pages/agents/agent.module.css"

export default function JoinGroupPopup(props) {
  const { show, toggleShow } = props

  return (
    <div>
      <Modal show={show} onHide={toggleShow}>
        <Modal.Header closeButton className="team-popup-margin teampopup-title">
          <Modal.Title className="form-field-label form-label-team ">
            Join Group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0">
          <div className={style.overallBack}>
            <div className={style.createInBack}>
              <label className={style.createText}>Select Group Name</label>
              <br />
              <input type="text" name="" className={style.createInput} />
            </div>
            <div className={style.doneBack}>
              <Button className={style.doneButton} variant="primary">
                Join
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="team-popup-margin teampop-footer"></Modal.Footer>
      </Modal>
    </div>
  )
}
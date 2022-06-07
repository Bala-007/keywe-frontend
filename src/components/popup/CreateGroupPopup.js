import React, { useState } from "react"
import { Modal, Button, Card } from "react-bootstrap"
import * as style from "../../pages/agents/agent.module.css"
import { createGruop } from "../Api/formApi"
import { useSelector } from "react-redux";

export default function CreateGroupPopup(props) {
  const { show, toggleShow } = props
  const userDetails = useSelector(state => state.user.userDetail);
  // console.log("--userDetails to update-", userDetails);

  const transferApis = async () => {
    let userId = localStorage.getItem('userId')
    // console.log("user id", userId)
    let createPostData = {
      user_id: userId,
      name: userDetails.name
    };
    await createGruop(createPostData)
      .then(async (res) => {
        console.log("--createRes--", res)

      })
  }


  return (
    <div>
      <Modal show={show} onHide={toggleShow}>
        <Modal.Header closeButton className="team-popup-margin teampopup-title">
          <Modal.Title className="form-field-label form-label-team ">
            Create Group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0">
          <div className={style.overallBack}>
            <div className={style.createInBack}>
              <label className={style.createText}>Enter Group Name</label>
              <br />
              <input type="text" name="" className={style.createInput} />
            </div>
            <div className={style.doneBack}>
              <Button className={style.doneButton} variant="primary" onClick={() => { transferApis(); }}>
                Done
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="team-popup-margin teampop-footer"></Modal.Footer>
      </Modal>
    </div>
  )
}
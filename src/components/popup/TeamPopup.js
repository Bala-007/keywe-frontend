import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReactTooltip from "react-tooltip";
import question from '../../../static/images/question.png'
import { getGroupList } from '../Api/formApi';

export default function TeamPopup(props) {
  const { show, toggleShow,groupData } = props;
  const initialValues = {
    // team: '',
    createGroup: '',
    selectGroup:''
  }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [groupArray, setGroupArray] = useState([]);

  useEffect(() => {
    getGroupApi();
    // alert("here");
}, []);

  useEffect(() => {
   
    document.body.classList.add("form-bg");
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      handleSubmitFirebase();
      
    }
  }, [formErrors]);
  console.log("--formValues--", formValues);
  console.log("--formErrors--", formErrors);
  const getGroupApi = () => {
    getGroupList()
      .then((res) => {
        console.log("--group res--", res);
        if (res.status == 200) {
          setGroupArray(res.data.data);
        }
      })
      .catch((err) => {
        console.log('group api err', err);
      })
  }
  const handleSubmitFirebase = async () => {
    const { createGroup, selectGroup } = formValues;
    console.log("--createGroup--",createGroup);
    console.log("--selectGroup--",selectGroup);
    groupData(formValues);
    toggleShow();
  }

  const onSubmit = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.createGroup && !values.selectGroup) {
      errors.team = 'Please fill any one of these group';
    }
    if (values.createGroup && values.selectGroup) {
        errors.team = 'Please fill any one of these group';
      }
    return errors;
  };

  const formValChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("--name--", name);
    console.log("--value--", value);
    setFormValues({ ...formValues, [name]: value });

  };

  return (
    <div>
      <Modal show={show} onHide={toggleShow} >
        <Modal.Header closeButton className="team-popup-margin teampopup-title"  >
          <Modal.Title className='form-field-label form-label-team '><h5 className='teamText'>Team</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
          <form onSubmit={onSubmit}>
            <div className='row'>
              <div className='col-lg-12 col-xl-12 col-md-12'>
                <div className='jointeam'>
                  <label htmlFor="name" className="form-label form-label-team"><h6 className='createText'>Create Group</h6></label>
                  <div data-tip="msg to show" data-for='toolTip1' data-place='top'> <img src={question} alt="question" style={{ marginLeft: "5px" }} /></div>
                </div>
                <input type="text" name="createGroup" value={formValues.createGroup} onChange={formValChange} className='form-control form-field form-field-team mb-4' />
              </div>
            </div>
            <div className='hr-section teamhr-section' >
              <span className='hr-text'>
                OR
              </span>
            </div>
            <div className='row'>
              <div className='col-lg-12 col-xl-12 col-md-12'>
                <div className='jointeam'>
                  <label htmlFor="name" className="form-label form-label-team"><h6 className='createText'>Join Group</h6></label>
                  <div data-tip="msg to show" data-for='toolTip1' data-place='top'> <img src={question} alt="question" style={{ marginLeft: "5px" }} /></div>
                </div>
                <ReactTooltip id="toolTip1" />
                <select name="selectGroup" defaultValue={formValues.selectGroup} onChange={formValChange} className="form-select form-field-team form-select-lg form-field mb-2 teampopup-select" aria-label="--Select--">
                  <option value=''>--Select--</option>
                  {
                    groupArray.map((data, index) => {
                      return (
                        <option key={index} value={data._id}>{data.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <p className='error-msg'>{formErrors.team}</p>
            <Button variant="primary" type="submit" className='teamnext-submit-btn row col-lg-12 col-xl-12 col-md-12 w-100'>
            {/* onClick={toggleShow}  */}
              Next
            </Button>
            <div onClick={toggleShow} className='teampopup-skip row col-lg-12 col-xl-12 col-md-12'>
              Skip
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="team-popup-margin teampop-footer" >


          {/* <div className='row'>
              <div className='col-lg-12 col-xl-12 col-md-12'>
                <Button variant="primary" className='row col-lg-12 col-xl-12 col-md-12'>
                    Next
                </Button>
              </div>
              </div>
              <div className='row'>
              <div className='col-lg-12 col-xl-12 col-md-12'>
                <Button variant="secondary" className=' row col-lg-12 col-xl-12 col-md-12'>
                    Skip
                </Button>
              </div>
          </div> */}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

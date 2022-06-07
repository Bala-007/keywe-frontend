import { style } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';
import ReactTooltip from "react-tooltip";
import question from '../../../static/images/question.png'
import { useSelector } from "react-redux";
import Loader from '../Loader';
import axios from 'axios';
import { claimOwnershipPost } from '../Api/formApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var imageArray = {};
var imageResArray = [];

export default function ClaimPopup(props) {
  const { show, toggleShow, propertyId } = props;
  const userDetails = useSelector(state => state.user.userDetail);
  console.log("--userDetails--", userDetails);
  const initialValues = {
    name: userDetails ? userDetails.name : '',
    email: userDetails ? userDetails.email : '',
    number: '',
    document1: '',
    document2: '',
    document3: '',
  }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [imageArrays, setdataimageArrays] = useState(imageArray);
  const [imageArrayRes, setdataimageArraysRes] = useState(imageResArray);
  const [isSubmit, setIsSubmit] = useState(false);
  // const {setUser} = useContext(AuthContext);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      handleSubmitFirebase();
    }
  }, [formErrors]); //, formValues

  console.log("---props--", props);
  const handleSubmitFirebase = async () => {
    setLoader(true);

    for (const imgDoc in imageArrays) {   
      const dataArray = new FormData();
      dataArray.append("file", imageArrays[imgDoc]);

      await axios
        .post("http://107.21.137.14:3000/api/uploadFile?folder=claim_docs/", dataArray, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then((response) => {
          // successfully uploaded response
          //console.log("--- data response--", response);
          if (response.status == 200) {
            //   imageResArray.push(response.data.data);
            imageResArray.push({ "doc_name": imgDoc, "url": response.data.data });
            //console.log("--- data imageResArray--", imageResArray);  

          }

        })
        .catch((error) => {
          // error response
        });
    }

    var postData = {
      property_id: propertyId,
      user_id: userDetails._id, //uid
      document: imageResArray,
    };
   
    claimOwnershipPost(postData)
      .then((res) => {
        console.log("api res", res);
        if (res.status == 200) {
          //alert(res.data.message);
          setFormValues(initialValues);   
          toggleShow();
          toast.success('Claim Added Successfully', {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
          });
          //setTimeout(() => {
          setLoader(false);
          //}, 3000)
        

        }
      })
      .catch((err) => {
        setLoader(false);
        console.log("api err", err);
        //alert(err);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        });
      })
  }

  const onSubmit = e => {
    // alert("on submit");
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    //setFormValues(initialValues);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const allowedExtensions = /(\.doc|\.pdf|\.jpg)$/i;

    if (!values.name) {
      errors.name = 'Name is Required';
    }
    if (!values.email) {
      errors.email = 'Email is Required';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email address';
    }
    // if (!values.number) {
    //   errors.number = 'Phone Number is Required';
    // }
    if (!values.document1) {
      errors.document1 = 'Document1 is Required';
    }else if (!allowedExtensions.exec(values.document1.name)) {
      errors.document1 = 'Document1 has Invalid file type';
    }else if(Math.round((values.document1.size / 1024)) > 5120){
      errors.document1 = 'File size should be less than 5MB';
    }
    if (!values.document2) {
      errors.document2 = 'Document2 is Required';
    }else if (!allowedExtensions.exec(values.document2.name)) {
      errors.document2 = 'Document2 has Invalid file type';
    }else if(Math.round((values.document2.size / 1024)) > 5120){
      errors.document2 = 'File size should be less than 5MB';
    }
    if (!values.document3) {
      errors.document3 = 'Document3 is Required';
    }else if (!allowedExtensions.exec(values.document3.name)) {
      errors.document3 = 'Document3 has Invalid file type';
    }else if(Math.round((values.document3.size / 1024)) > 5120){
      errors.document3 = 'File size should be less than 5MB';
    }
    return errors;
  };


  const formValChange = e => {
    e.preventDefault();
    const { name, value, type, files } = e.target;
    // console.log("--type--", type);
    // console.log("--typnamee--", name);
    // console.log("--value--", value);
    // console.log("--files--", files);

    //var value = e.target.value;

    if (type == 'file') {
      // imageArray.push({[name]: files[0]});
      imageArray[name] = files[0];
      setFormValues({ ...formValues, [name]: files[0] });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };
  console.log("--formErrors--", formErrors);
  console.log("--formValues--", formValues);

  const getFileDetail = (files, name) => {
    // alert("file");
    console.log("--files--", files);

    for (var i = 0; i < files.length; i++) {
      var filesizeInBytes = files[i].size;
      //var filesizeInMB = (filesizeInBytes / (1024*1024)).toFixed(2);
      var filename = files[i].name;
      console.log("--filesizeInBytes--", filesizeInBytes);
      console.log("--filename--", filename);
      //setFormValues({ ...formValues, name: filename });    
    }
  }


  return (
    <div>
      <ToastContainer />   
      <Modal show={show} onHide={toggleShow}>
      {loader ? <Loader /> : null}
        <Modal.Header closeButton className="team-popup-margin teampopup-title" >
          <Modal.Title className='form-field-label form-label-team '>Claim Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
          <form onSubmit={onSubmit}>
            <div className='row'>
              <div className='col-md-6'>
                <label htmlFor="name" className="form-label form-label-team" style={{ color: "#8a8787" }}>Name</label>
                <input disabled={true} type="text" name="name" placeholder='Enter Name' className={style1.namedet} value={formValues.name} onChange={formValChange} />
                <p className='error-msg'>{formErrors.name}</p>
              </div>
              <div className='col-md-6'>
                <label htmlFor="name" className="form-label form-label-team" style={{ color: "#8a8787" }}>Email</label>
                <input disabled={true} type="text" name="email" placeholder='Enter Email' className={style1.namedet} value={formValues.email} onChange={formValChange} />
                <p className='error-msg'>{formErrors.email}</p>
              </div>
            </div>
            {/* <div className={style1.phoneText}>
              <label htmlFor="name" className="form-label form-label-team" style={{ color: "#8a8787" }}>Phone</label>
              <input type="number" name="number" placeholder='Enter Phone' className={style1.phoneNumber} maxLength="10" value={formValues.number} onChange={formValChange} />
              <p className='error-msg'>{formErrors.number}</p>
            </div> */}
            <div className={style1.ownership}>
              <div className={style1.tooltip}>
                <label htmlFor="name" className="form-label form-label-team" ><h5 style={{ color: "#8a8787" }}>Upload Proof of Ownership</h5></label>
                <div data-tip="msg to show" data-for='toolTip1' data-place='top'> <img src={question} alt="question" style={{ marginLeft: "5px" }} /></div>
              </div>
              <div>
                <div >
                  <p className="mb-0"><label htmlFor="name" className="form-label form-label-team" style={{ color: "#8a8787" }} >Document1</label></p>
                  <div className={style1.uploadOwner} >
                    <img src={question} alt="Upload" className="prequalified-img" />
                    <span className={style1.fileUploadBrowse}>Click to Browse</span>
                  </div>
                  {/* <input type="file" name="files[]" multiple="multiple" onChange={getFileDetail} placeholder='Click to Browse' className={style1.fileUpload} accept=".pdf,.jpg,.doc" /> */}
                  <input type="file" name="document1" onChange={formValChange} className={style1.fileUploadClaim} accept=".pdf,.jpg,.doc" />
                  <span className={style1.ownerFileName}>{formValues.document1 != '' && formValues.document1 != undefined ? formValues.document1.name : ''}</span>
                  <label style={{ color: "#8a8787" }}>*Accepted formats are PDF,JPG,Doc</label>
                  <p className='error-msg'>{formErrors.document1}</p>
                </div>
                <div className="mt-2 mb-2" style={{ position: "relative" }}>
                  <p className="mb-0"><label htmlFor="name" className="form-label form-label-team" style={{ color: "#8a8787" }} >Document2</label></p>
                  <div className={style1.uploadOwner} >
                    <img src={question} alt="Upload" className="prequalified-img" />
                    <span className={style1.fileUploadBrowse}>Click to Browse</span>
                  </div>
                  <input type="file" name="document2" onChange={formValChange} className={style1.fileUploadClaim} accept=".pdf,.jpg,.doc" />
                  <span className={style1.ownerFileName}>{formValues.document2 != ''  && formValues.document2 != undefined ? formValues.document2.name : ''}</span>
                  <label style={{ color: "#8a8787" }}>*Accepted formats are PDF,JPG,Doc</label>
                  <p className='error-msg'>{formErrors.document2}</p>
                </div>
                <div style={{ position: "relative" }}>
                  <p className="mb-0"><label htmlFor="name" className="form-label form-label-team" style={{ color: "#8a8787" }} >Document3</label></p>
                  <div className={style1.uploadOwner} >
                    <img src={question} alt="Upload" className="prequalified-img" />
                    <span className={style1.fileUploadBrowse}>Click to Browse</span>
                  </div>
                  <input type="file" name="document3" onChange={formValChange} className={style1.fileUploadClaim} accept=".pdf,.jpg,.doc" />
                  <span className={style1.ownerFileName}>{formValues.document3 != ''  && formValues.document3 != undefined ? formValues.document3.name : ''}</span>
                  <label style={{ color: "#8a8787" }}>*Accepted formats are PDF,JPG,Doc</label>
                  <p className='error-msg'>{formErrors.document3}</p>
                </div>
              </div>
            </div>
            <Button type="submit" variant="primary" className={style1.claimbut}>Submit</Button>
          </form>
        </Modal.Body>
        <Modal.Footer className="team-popup-margin teampop-footer" ></Modal.Footer>
      </Modal>
    </div>
  )
}

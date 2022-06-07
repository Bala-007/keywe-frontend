import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import firebase from 'gatsby-plugin-firebase';
// import { AuthContext } from '../../context/auth';
import { Link, navigate } from 'gatsby';
import { contactPost } from '../Api/formApi';
import Loader from '../Loader';

export default function ContactForm() {
    
    const initialValues = {
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        message: '',
        accept: 'true'
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (Object.keys(formErrors).length == 0 && isSubmit) {
            //    console.log(formErrors); 
            handleSubmitFirebase();
            setFormValues(initialValues);
        }
    }, [formErrors]);
    const handleSubmitFirebase = async () => {
        setLoader(true);
            const { email, phoneNumber, address, message, name } = formValues;
           
            var postData = {
                name: name,
                email: email,
                phone_number: phoneNumber,
                address: address,
                message: message,

            };

            contactPost(postData)
                .then((res) => {
                    console.log("api res", res);
                    if (res.status == 200) {
                        setLoader(false);

                        //alert(res.data.message);
                        // navigate("/contact/contact");
                        toast.success('Login Successfully', {
                            position: "top-right",
                            autoClose: 3000,
                            closeOnClick: true,                             
                        });
                    }
                })
                .catch((err) => {
                    setLoader(false);
                    console.log("api err", err);
                    toast.error(err.message, {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,                             
                    });
                   
                })
       
    }
    const onSubmit = e => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    const validate = (values) => {
        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!values.name) {
            errors.name = 'Name is Required';
        }
        if (!values.email) {
            errors.email = 'Email is Required';
        } else if (!regex.test(values.email)) {
            errors.email = 'Please enter valid email address';
        }
        if (!values.phoneNumber) {
            errors.phoneNumber = 'Phone Number is Required';
        } else if (values.phoneNumber.length < 10) {
            errors.phoneNumber = 'Phone Number must be minimum 20 digit';
        }
        if (!values.message) {
            errors.message = 'Message is Required';
        }else if (values.message.length < 10) {
            errors.message = 'Message must be minimum 20 characters';
        }
        return errors;
    };

    const formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

    };

    return (
        <div className='agentsignup-formsection'>
               <ToastContainer />
            {loader ? <Loader /> : null}
            <form onSubmit={onSubmit}>
                <div className='row'>
                    <div className='col-lg-4 col-xl-4 col-md-4'>
                        <label htmlFor="name" className="form-label form-field-label">Name<span className='error-msg'>*</span></label>
                        <input type="text"  name="name" value={formValues.name} onChange={formValChange} className='form-control form-field mb-2' />
                        <p className='error-msg'>{formErrors.name}</p>
                    </div>
                    <div className='col-lg-4 col-xl-4 col-md-4'>
                        <label htmlFor="email" className="form-label form-field-label">Email<span className='error-msg'>*</span></label>
                        <input type="text" name="email" value={formValues.email} onChange={formValChange} className='form-control form-field mb-2' />
                        <p className='error-msg'>{formErrors.email}</p>
                    </div>
                    <div className='col-lg-4 col-xl-4 col-md-4'>
                        <label htmlFor="phoneNumber" className="form-label form-field-label">Phone<span className='error-msg'>*</span></label>
                        <input type="number" name='phoneNumber' value={formValues.phoneNumber} onChange={formValChange} className='form-control form-field mb-2' />
                    </div>
                    <div className='textArea col-lg-12 col-xl-12 col-md-12 pt-3'>
                        <label htmlFor="number" className="form-label form-field-label">Comments<span className='error-msg'>*</span></label>
                        <textarea id="w3review"  name="message" rows="4" cols="50" value={formValues.message} onChange={formValChange}></textarea>
                        <p className='error-msg'>{formErrors.message}</p>
                    </div>
                    <div className="col-lg-12 col-xl-12 col-md-12 mb-2 mt-2">
                        <Button type='submit'  className='agentsignup-submit-btn'>Send</Button>
                  
                    </div>
                </div>
            </form>
        </div>
    );
}

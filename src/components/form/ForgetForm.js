import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from 'gatsby-plugin-firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader';
import { Formik } from 'formik';
import * as Yup from 'yup';
export default function ForgetForm() {
    const [loader, setLoader] = useState(false);

    const DisplayingErrorMessagesSchema = Yup.object().shape({
        email: Yup.string().email('Please Enter Valid Email ID').required('Email ID is Required'),
    });
    const handleSubmitFirebase = async (value) => {
        setLoader(true)
        try {
            await firebase
                .auth()
                .sendPasswordResetEmail(value.email)
                .then(function (res) {
                    console.log("--res--", res);
                    //alert('Email sent successfully');
                    setLoader(false)
                    toast.success('Please check your Email', {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                    });
                }).catch(function (err) {
                    setLoader(false)
                    toast.error('Please enter valid Email', {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                    });
                });
        } catch (err) {
            setLoader(false)
            //alert(err)
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
            });
        }
    }
    return (
        <div className='forget-formsection'>
            {/* {Object.keys(formErrors).length == 0 && isSubmit ? (
            <div className="ui message success">Email sent Successfully</div>
            ) : null} */}
            <ToastContainer />
            {loader ? <Loader /> : null}
            <Formik
                initialValues={{
                    email: ''
                }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={values => handleSubmitFirebase(values)}>
                {({ values, handleChange, errors, touched,  handleSubmit }) => (

                    <Form  >
                        <Form.Group>
                            <Form.Label className="form-field-label col-lg-2 col-xl-2 col-md-2 col-sm-2 col-form-label">Email<span className='error-msg'> *</span></Form.Label>
                            <Form.Control name="email" value={values.email} onChange={handleChange('email')} className="form-control form-field mb-2" id="email" type='text' placeholder='Email Address' />
                        </Form.Group>
                        {touched.email && errors.email &&
                            <p className='error-msg mb-0'>{errors.email}</p>
                        }
                        <Button onClick={handleSubmit} className='signup-submit-btn'>Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}


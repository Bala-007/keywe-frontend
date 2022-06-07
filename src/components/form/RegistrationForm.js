import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
// import firebaseConfig from '../../config';
import { Link, navigate } from 'gatsby';
// import { FormState } from "gatsby-theme-firebase";
import firebase from 'gatsby-plugin-firebase';
// import { AuthContext } from '../../context/auth';
import { signupPost } from '../Api/formApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader';

export default function RegistrationForm() {
    const initialValues = {
        name: '',
        email: '',
        password: '',
        accept: false
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    // const {setUser} = useContext(AuthContext);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        document.body.classList.add("form-bg");
        if (Object.keys(formErrors).length == 0 && isSubmit) {
            //    console.log(formErrors);  
            //    console.log("--formValues--",formValues);         
            handleSubmitFirebase();
            //setFormValues(initialValues);   
        }
    }, [formErrors]);

    const handleSubmitFirebase = async () => {
        try {
            setLoader(true);

            const { email, password, name } = formValues;
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(function (result) {
                    var uid = result.user.uid;
                    console.log("--result--", result);
                    console.log("--reg uid--", uid);
                    if (result) {
                        firebase.auth().currentUser.sendEmailVerification()
                            .then(() => {
                                // alert("Please verify your email address");
                                toast.warn('Please verify your email address', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    closeOnClick: true,
                                });
                                // navigate("/signin/signin");   
                            });
                        var postData = {
                            name: name,
                            uid: uid,
                            email: email,
                            provider: "local",
                            role: "user",
                            password: password,

                        };

                        signupPost(postData)
                            .then((res) => {
                                console.log("api res", res);
                                if (res.status == 200) {
                                    //alert(res.data.message);
                                    setTimeout(() => {
                                        setLoader(false);

                                        navigate("/signin");
                                    }, 1000)

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


                    // setUser(result)
                    // console.log("--reg uid--",uid);
                    // if(result){
                    //       var postData = {
                    //         name: name,
                    //         uid: uid,
                    //         email: email,
                    //         provider: "local",
                    //         role: "user",
                    //         password: password,

                    //       };

                    //     signupPost(postData)
                    //     .then((res) => {
                    //       console.log("api res", res);
                    //       if(res.status == 200){
                    //         alert(res.data.message);
                    //         navigate("/dashboard/dashboardlist");
                    //       }
                    //     })
                    //     .catch((err) => {
                    //       console.log("api err", err);
                    //       alert(err);
                    //     })  
                    // }   
                }).catch(function (error) {
                    setLoader(false);
                    console.log("firebase error2", error);
                    // if(error.code == "EMAIL_EXISTS"){
                    //     alert("Email is already exists");
                    // }
                    //alert(error.message);
                    toast.error(error.message, {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                    });
                });
        } catch (err) {
            setLoader(false);
            console.log("firebase err1");
            //alert(err);
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
            });
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        //setFormValues(initialValues);
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
            errors.email = 'This is not a valid email address';
        }
        if (!values.password) {
            errors.password = 'Password is Required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be minimum 8 characters';
        }
        if (!values.accept) {
            errors.accept = 'You must agree with the terms and conditions';
        }
        // else if(values.password.length > 10){
        //     errors.password = 'Password cannot exceed more than 10 characters';  
        // }
        return errors;
    };


    const formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        validates(name, value)
    };
    const validates = (name, value) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        console.log(name, value)
        if (name === 'name') {
            if (value === '') {
                console.log('hi')
                setFormErrors({ ...formErrors, 'name': 'Name is Required' })
            }
            else { setFormErrors({ ...formErrors, 'name': '' }) }
        }
        else if (name === 'email') {
            if (value === '') {
                console.log('hi')
                setFormErrors({ ...formErrors, 'email': 'Name is Required' })
            }
            else if (!regex.test(value)) {
                setFormErrors({ ...formErrors, 'email': 'This is not a valid email address' })
            }
            else { setFormErrors({ ...formErrors, 'email': '' }) }
        }
        else if(name === 'password'){
            if(value === ''){
                setFormErrors({...formErrors,'password':'Password is Required'})
            }
            else if(value.length < 8){
                setFormErrors({...formErrors,'password':'Password must be minimum 8 characters'})
            }
            else {setFormErrors({...formErrors,'password':''})}
        }
        // if(name === 'email' && value ===''){
        //     console.log('hi')
        //     setFormErrors({...formErrors,'email':'Name is Required'})
        // }
        // else{setFormErrors({...formErrors,'email':''})}
    }

    return (
        <div className='register-formsection'>
            {/* {Object.keys(formErrors).length == 0 && isSubmit ? (
            <div className="ui message success">Registered Successfully</div>
            ) : null} */}
            {/* (
            <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            ) */}
            <ToastContainer />
            {loader ? <Loader /> : null}

            <Form onSubmit={onSubmit} >
                <Form.Group controlId="name" className="mb-2">
                    <Form.Label className="form-field-label">Name<span className='error-msg'> *</span></Form.Label>
                    <Form.Control name="name" value={formValues.name} onChange={formValChange} className="form-field" type="text" placeholder='Enter Name' />
                </Form.Group>
                {formErrors.name !== '' && <p className='error-msg'>{formErrors.name}</p>}
                <Form.Group controlId="email" className="mb-2">
                    <Form.Label className="form-field-label">Email<span className='error-msg'> *</span></Form.Label>
                    <Form.Control name="email" value={formValues.email} onChange={formValChange} className="form-field" type='text' placeholder='Email Address' />
                </Form.Group>
                {formErrors.email !== "" && <p className='error-msg'>{formErrors.email}</p>}
                <Form.Group controlId="password" className="mb-2">
                    <Form.Label className="form-field-label">Password<span className='error-msg'> *</span></Form.Label>
                    <Form.Control name="password" value={formValues.password} onChange={formValChange} className="form-field" type='password' placeholder='************' />
                </Form.Group>
                {formErrors.password !== '' && <p className='error-msg'>{formErrors.password}</p>}
                <Form.Group controlId='accept' className="mb-2">
                    <Form.Check type="checkbox" name="accept" defaultChecked={formValues.accept} onChange={() => { setFormValues({ ...formValues, ['accept']: !formValues.accept }); }} style={{ display: "inline-block", paddingRight: "5px" }} />
                    <Form.Text className='term-accept'>I have read and accepted the <Link to="/termscondition/" className="terms-conditions">Terms and Conditions.</Link></Form.Text>
                </Form.Group>
                {formValues.accept && isSubmit?'': <p className='error-msg'>{formErrors.accept}</p>}
                <Button type='submit' className='signup-submit-btn'>Sign up</Button>
            </Form>
        </div>
    );
}

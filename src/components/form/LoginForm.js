import React, { useEffect, useState, useContext } from 'react';
import { Form, Button } from "react-bootstrap";
import { Link, navigate } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';
// import { AuthContext } from '../../context/auth';
import { signinDetails, userDetailInfo } from '../Api/formApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { userResponse } from '../../state/userSlice';
import { sendPushNotification, updateProfile } from '../Api/ListingApi';

export default function LoginForm() {
    const initialValues = {
        email: '',
        password: '',
        rememberme: false
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    // const { setUser } = useContext(AuthContext);
    const [loader, setLoader] = useState(false);
    let dispatch = useDispatch();

    useEffect(() => {
        const storedData = localStorage.getItem("remember-me");
        if (!storedData) {
            //Do nothing
        } else {
            let email = JSON.parse(storedData).email;
            let password = JSON.parse(storedData).password;
            let isRememberme = JSON.parse(storedData).isRememberme;
            if (isRememberme) {
                document.getElementById("rcheckbox").checked = true;
            } else {
                document.getElementById("rcheckbox").checked = false;
            }
            setFormValues({ ...formValues, email: email, password: password, rememberme: isRememberme });
        }
    }, []);

    useEffect(() => {
        document.body.classList.add("form-bg");
        if (Object.keys(formErrors).length == 0 && isSubmit) {
            //    console.log(formErrors); 
            handleSubmitFirebase();
            //setFormValues(initialValues);    
        }
    }, [formErrors]);

    // const userDetails = useSelector(state => state.user);
    // console.log("--userDetails--",userDetails);

    const handleSubmitFirebase = async () => {
        try {
            setLoader(true);

            const { email, password } = formValues;
            const result = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(function (firebaseInfo) {
                    console.log("--firebaseInfo--", firebaseInfo.user.ya);
                    // console.log("--emailVerified--",firebaseInfo.user.emailVerified);
                    // console.log("--uid--",firebaseInfo.user.uid);
                    let isEmailVerify = firebaseInfo.user.emailVerified;
                    let uid = firebaseInfo.user.uid;
                    let email = firebaseInfo.user.email;
                    if (isEmailVerify) {
                        //setUser(result);
                        signinDetails(uid)
                            .then(async (usersDetails) => {
                                console.log("--usersDetails--", usersDetails);
                                // console.log("--usersDetails2--",usersDetails.data);
                                // console.log("--usersDetails3--",usersDetails.data.data.customClaims.type);
                                if (usersDetails.status == 200) {
                                    try {
                                        firebase.messaging().getToken().then(async(res) => {
                                            console.log('notification',res)
                                            await updateProfile(uid,{ push_token: res }).then().catch((error)=>console.log(error))
                                        })
                                    }
                                    catch (error) {
                                        console.log('error', error)
                                    }

                                    await userDetailInfo(uid)
                                        .then((res) => {
                                            console.log("--userDetailInfo--", res.data.data._id);
                                            localStorage.setItem('userId', res.data.data._id)
                                            if (res.status == 200) {
                                                dispatch(userResponse(res.data.data));
                                            }
                                            let claimStatus = usersDetails.data.data.customClaims.type;
                                            // let items = [];
                                            // const userInfo = JSON.stringify([...items],{email:email,uid:uid,userType:claimStatus});


                                            var a = [];
                                            a.push(JSON.stringify({ email: email, uid: uid, userType: claimStatus, provider: "local" }));

                                            //console.log("--userInfo--",a);
                                            localStorage.setItem("userInfo", a);
                                            if (claimStatus) {


                                                // alert("Login Successfully");
                                                toast.success(`Login as ${res.data.data.role} Successfully`, {
                                                    position: "top-right",
                                                    autoClose: 3000,
                                                    closeOnClick: true,
                                                });
                                                setTimeout(() => {
                                                    setLoader(false);
                                                    if (claimStatus == "agent") {
                                                        navigate("/buyers");
                                                    } else {
                                                        navigate("/dashboard");
                                                    }
                                                }, 1000)

                                            }
                                        }).catch((error)=>{
                                            setLoader(false);
                                            toast.error('You are not valid user', {
                                                position: "top-right",
                                                autoClose: 3000,
                                                closeOnClick: true,
                                            });
                                        })


                                }
                            })
                    } else {
                        setLoader(false);
                        // alert("Email address not verified");
                        toast.warn('Email address is not verified', {
                            position: "top-right",
                            autoClose: 3000,
                            closeOnClick: true,
                        });
                    }
                })
        } catch (err) {
            setLoader(false);
            console.log("firebase err", err);
            if (err.code == "auth/wrong-password") {
                //alert("The password is invalid");
                toast.error('The password is invalid', {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                });
            } else {
                //alert(err)
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                });
            }

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
        // else if(values.password.length > 10){
        //     errors.password = 'Password cannot exceed more than 10 characters';  
        // }
        return errors;
    };

    const formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const isRememberme = (e) => {
        let isChecked = !formValues.rememberme;
        // console.log("--isChecked--",isChecked);
        // console.log("--formValues--",formValues);

        if (isChecked && formValues.email && formValues.password) {
            let rememberMe = [];
            rememberMe.push(JSON.stringify({ email: formValues.email, password: formValues.password, isRememberme: isChecked }));
            localStorage.setItem('remember-me', rememberMe);
        } else {
            localStorage.setItem('remember-me', '');
        }
        setFormValues({ ...formValues, rememberme: isChecked });
    }

    return (
        <div className='login-formsection'>
            {/* {Object.keys(formErrors).length == 0 && isSubmit ? (
            <div className="ui message success">Login Successfully</div>
            ) : null} */}
            <ToastContainer />
            {loader ? <Loader /> : null}
            <Form onSubmit={onSubmit} >
                <Form.Group controlId="email" className="mb-2">
                    <Form.Label className="form-field-label">Email<span className='error-msg'> *</span></Form.Label>
                    <Form.Control name="email" value={formValues.email} onChange={formValChange} className="form-field" type='text' placeholder='Email Address' />
                </Form.Group>
                {formValues.email.length > 0 && isSubmit ? '' : <p className='error-msg'>{formErrors.email}</p>}
                <Form.Group controlId="password" className="mb-2">
                    <Form.Label className="form-field-label">Password<span className='error-msg'> *</span></Form.Label>
                    <Form.Control name="password" value={formValues.password} onChange={formValChange} className="form-field" type='password' placeholder='************' />
                </Form.Group>
                {formValues.password.length > 0 && isSubmit ? '' : <p className='error-msg'>{formErrors.password}</p>}
                <Form.Group controlId='accept' className="mb-2">
                    {/* <input id="rcheckbox" className={`checkbox form-check-input`} data-value={formValues.rememberme} name="add" type="checkbox" value="add" defaultChecked={formValues.rememberme} onClick={(e)=>isRememberme(e)}/> */}
                    <Form.Check id="rcheckbox" type="checkbox" style={{ display: "inline-block", paddingRight: "10px" }} data-value={formValues.rememberme} defaultChecked={formValues.rememberme} onClick={(e) => isRememberme(e)} />
                    <Form.Text className='remember-me'>Remember me <Link to="/forgetpassword"><span className="forget-password">Forget Password?</span></Link></Form.Text>
                </Form.Group>
                <Button type='submit' className='signin-submit-btn'>Sign in</Button>
            </Form>
        </div>
    );
}

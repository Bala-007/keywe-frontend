import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import TeamPopup from '../popup/TeamPopup';
import firebase from 'gatsby-plugin-firebase';
// import { AuthContext } from '../../context/auth';
import { Link, navigate } from 'gatsby';
import { signupPost, getCompanyList, createGroupApi, selectGroupApi } from '../Api/formApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader';

export default function AgentSignupForm() {
    const initialValues = {
        name: '',
        email: '',
        password: '',
        company: '',
        accept: false,
        individualTeam: '',
        group: {}
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [show, setShow] = useState(false);
    // const {setUser} = useContext(AuthContext);
    const [loader, setLoader] = useState(false);
    const [companyArray, setCompanyArray] = useState([]);
    const toggleShow = () => setShow(p => !p);

    useEffect(() => {
        getCompanyApi();

    }, []);

    useEffect(() => {

        document.body.classList.add("form-bg");
        if (Object.keys(formErrors).length == 0 && isSubmit) {
            handleSubmitFirebase();
            // setFormValues(initialValues);
        }
    }, [formErrors]);
    console.log("--formValues--", formValues);
    console.log("--formErrors--", formErrors);
    const getCompanyApi = () => {
        getCompanyList()
            .then((res) => {
                console.log("--company res--", res);
                if (res.status == 200) {
                    setCompanyArray(res.data.data);
                }
            })
            .catch((err) => {
                console.log('company api err', err);
            })
    }

    const handleSubmitFirebase = async () => {
        try {
            setLoader(true);

            const { email, password, name, company, group, individualTeam } = formValues;
            console.log("--group--", group);
            const result = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async function (result) {
                    var uid = result.user.uid;
                    console.log("--result--", result);
                    if (result) {
                        firebase.auth().currentUser.sendEmailVerification()
                            .then(() => {
                                //alert("Please verify your email address");
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
                            role: "agent",
                            password: password,
                            company: company
                        };

                        await signupPost(postData)
                            .then(async(res) => {
                                console.log("api res", res);
                                if (res.status == 200) {
                                    setFormValues(initialValues);
                                    document.getElementById('company').selectedIndex = '';
                                    document.getElementById("accept").checked = false;
                                    //alert(res.data.message);
                                    console.log("--res.data.data_id--", res.data.data._id);
                                    let userId = res.data.data._id;
                                    if (userId != '') {
                                        if (individualTeam == 2) {
                                            if (group.createGroup) {
                                                let createPostData = {
                                                    "name": group.createGroup,
                                                    "user_id": userId
                                                }
                                               await  createGroupApi(createPostData)
                                                .then((createRes)=>{
                                                    console.log("--createRes--",createRes)
                                                })
                                            } else if (group.selectGroup) {
                                                let selectPostData = {
                                                    "user_id": userId
                                                }
                                                await selectGroupApi(group.selectGroup,selectPostData)
                                                .then((selectRes)=>{
                                                    console.log("--selectRes--",selectRes)

                                                })
                                            }
                                        }
                                    }
                                    setTimeout(() => {
                                        setLoader(false);

                                        //navigate("/signin");
                                    }, 1000)
                                }
                            })
                            .catch((err) => {
                                setLoader(false);
                                console.log("api err", err);
                                //alert(err);
                                toast.error(err.message, {
                                    position: "top-right",
                                    autoClose: 5000,
                                    closeOnClick: true,
                                });
                            })
                    }
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
            console.log("firebase err");
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
        if (!values.company) {
            errors.company = 'Company is Required';
        }
           if (!values.accept) {
            errors.accept = 'You must agree with the terms and conditions';
        }
        // if (!values.individualTeam) {
        //     errors.individualTeam = 'Please select any one of these button';
        // }
        // else if(values.password.length > 10){
        //     errors.password = 'Password cannot exceed more than 10 characters';  
        // }
        return errors;
    };

    const formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log("--name--", name);
        console.log("--value--", value);
        // if(name == 'individualTeam'){

        // }
        setFormValues({ ...formValues, [name]: value });

    };
    const groupData = (child) => {
        console.log("--child--", child);
        setFormValues({ ...formValues, individualTeam: 2, group: child });
        // toggleShow();
    }
    return (
        <div className='agentsignup-formsection'>
            {/* {showTeamPopup ? <TeamPopup showModel="true" /> : null} */}
            <ToastContainer />
            {loader ? <Loader /> : null}
            {show ?
                <TeamPopup show={show} toggleShow={toggleShow} groupData={groupData} />
                : null}
            <form onSubmit={onSubmit}>
                <div className='row mb-3'>
                    <div className='col-lg-6 col-xl-6 col-md-6 pr-40'>
                        <label htmlFor="name" className="form-label form-field-label">Name<span className='error-msg'> *</span></label>
                        <input type="text" placeholder='Enter Name' name="name" value={formValues.name} onChange={formValChange} className='form-control form-field mb-2' />
                        <p className='error-msg'>{formErrors.name}</p>
                    </div>
                    <div className='col-lg-6 col-xl-6 col-md-6 pl-40'>
                        <label htmlFor="email" className="form-label form-field-label">Email<span className='error-msg'> *</span></label>
                        <input type="text" placeholder='Email Address' name="email" value={formValues.email} onChange={formValChange} className='form-control form-field mb-2' />
                        <p className='error-msg'>{formErrors.email}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-6 col-xl-6 col-md-6 pr-40'>
                        <label htmlFor="password" className="form-label form-field-label">Password<span className='error-msg'> *</span></label>
                        <input type="password" placeholder='************' name="password" value={formValues.password} onChange={formValChange} className='form-control form-field mb-2' />
                        <p className='error-msg'>{formErrors.password}</p>
                    </div>
                    <div className='col-lg-6 col-xl-6 col-md-6 pl-40'>
                        <label htmlFor="company" className="form-label form-field-label">Company<span className='error-msg'> *</span></label>
                        <select defaultValue={formValues.company} onChange={formValChange} id="company" name="company" className="form-select form-select-lg form-field mb-2 company-select" aria-label="--Select--">
                            <option value=''>--Select--</option>
                            {
                                companyArray.map((data, index) => {
                                    return (
                                        <option key={index} value={data._id}>{data.name}</option>
                                    )
                                })
                            }
                        </select>
                        <p className='error-msg'>{formErrors.company}</p>
                    </div>
                </div>
                {/* {05-04-2022} */}
                {/* <div className='row'>
                    <div className='col-lg-12 col-xl-12 col-md-12 agenthr-section'>
                        <p className='are-you font-weight-bold'>Are you a</p>
                        <span className='agent-or'>OR</span>
                    </div>
                </div> */}
                {/* <div className='row'>
                    <div className='col-lg-6 col-xl-6 col-md-6 pr-40'>
                        <button type="button" value="1" name="individualTeam" onClick={formValChange} className={formValues.individualTeam ? 'individualSelected individual-btn' : 'individual-btn'}>Individual</button>
                    </div>
                    <div className='col-lg-6 col-xl-6 col-md-6 pl-40'>
                        <button type="button" onClick={toggleShow} className='team-btn' >Team</button>
                    </div>
                    <p className='error-msg mt-3'>{formErrors.individualTeam}</p>
                </div> */}
                <div className='row agent-team'>
                    <div className="col-lg-12 col-xl-12 col-md-12">
                        <div style={{ display: "inline-block", paddingRight: "5px" }}><input type="checkbox" name="accept" defaultChecked={formValues.accept} onChange={() => { setFormValues({ ...formValues, ['accept']: !formValues.accept }); }} id="accept" className="form-check-input" /></div>
                        <small className="term-accept form-text">I have read and accepted the <Link to="/termscondition/" className="terms-conditions">Terms and Conditions.</Link></small>
                        <p className='error-msg'>{formErrors.accept}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-lg-12 col-xl-12 col-md-12 mb-2">
                        <Button type='submit' className='agentsignup-submit-btn'>Sign up</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

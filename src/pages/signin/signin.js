import React, { useEffect, useState } from 'react';
import LoginForm from '../../components/form/LoginForm';
import { Link, navigate } from 'gatsby';
import Seo from "../../components/seo";
import firebase from 'gatsby-plugin-firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader';
import { signinDetails, userDetailInfo, LinkedInLogin, signupPost } from '../../components/Api/formApi';
import { useDispatch, useSelector } from 'react-redux';
import { userResponse } from '../../state/userSlice';
import { data } from 'jquery';
import { object } from 'yup';
import { sendPushNotification } from '../../components/Api/ListingApi';

const Login = () => {
    const [loader, setLoader] = useState(false);
    const [codeValue, setCodeValue] = useState(false)
    let dispatch = useDispatch();
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code')

        if (code && !codeValue) {
            setCodeValue(true)
            socialLinkedInSignin(code)
        }
    })

    function commonFunctionLogin(result, socialType) {
        if (result) {
            // var token = result.credential.accessToken;
            // console.log("--token--", token);
            // The signed-in user info.
            var user = result.user;
            //console.log("--user--", user);
            var uid = result.user.uid;

            //console.log("--uid--", uid);
            var displayName = result.user.displayName;
            //console.log("--displayName--",displayName);
            var email = result.user.email;
            //console.log("--email--",email);
            signinDetails(uid)
                .then((usersDetails) => {
                    console.log("--usersDetails--", usersDetails);
                    // console.log("--usersDetails2--",usersDetails.data);
                    // console.log("--usersDetails3--",usersDetails.data.data.customClaims.type);
                    if (usersDetails.status == 200) {
                        userDetailInfo(uid)
                            .then((res) => {
                                if (res.data.data === null) {
                                    commonFunctionRegistration(result, socialType)
                                }
                                else {
                                    console.log("--userDetailInfo--", res);
                                    if (res.status == 200) {
                                        dispatch(userResponse(res.data.data));
                                        localStorage.setItem('userId',res.data.data._id)
                                        try {
                                            firebase.messaging().getToken().then(res => {
                                                sendPushNotification({ device_token: res })
                                            })
                                        }
                                        catch(error) {
                                            console.log('error',error)
                                        }
                                        let claimStatus = usersDetails.data.data.customClaims.type;
                                        console.log("--claimStatus role--", claimStatus);
                                        // let items = [];
                                        // const userInfo = JSON.stringify([...items],{email:email,uid:uid,userType:claimStatus});
                                        var a = [];
                                        a.push(JSON.stringify({ email: email, uid: uid, userType: claimStatus, provider: socialType }));
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
                                    }
                                }

                            })
                    }
                })
                .catch((err) => {
                    setLoader(false);
                    console.log(`${socialType} api err`, err);
                    //alert(err);
                    toast.error(err.message, {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                    });
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
    }

    function commonFunctionRegistration(result, socialType) {
        if (result) {
            // var token = result.credential.accessToken;
            // console.log("--token--", token);
            // The signed-in user info.
            var user = result.user;
            //console.log("--user--", user);
            var uid = result.user.uid;
            //console.log("--uid--", uid);
            var displayName = result.user.displayName;
            //console.log("--displayName--", displayName);
            var email = result.user.email;
            //console.log("--email--", email);

            var postData = {
                name: displayName,
                uid: uid,
                email: email,
                provider: socialType,
                role: "user",
                //password: password, //no need
            };

            console.log('postdata--->', postData);

            signupPost(postData)
                .then((res) => {
                    console.log("google api res", res);
                    if (res.status == 200) {
                        userDetailInfo(uid)
                            .then((res) => {
                                console.log("--userDetailInfo--", res);
                                if (res.status == 200) {
                                    dispatch(userResponse(res.data.data));
                                    localStorage.setItem('userId',res.data.data._id)
                                    try {
                                        firebase.messaging().getToken().then(res => {
                                            sendPushNotification({ device_token: res })
                                        })
                                    }
                                    catch(error) {
                                        console.log('error',error)
                                    }
                                }
                            })
                        //let claimStatus = usersDetails.data.data.customClaims.type;
                        var a = [];
                        a.push(JSON.stringify({ email: email, uid: uid, userType: "user", provider: socialType }));
                        localStorage.setItem("userInfo", a);

                        toast.success('Registered Successfully', {
                            position: "top-right",
                            autoClose: 3000,
                            closeOnClick: true,
                        });

                        setTimeout(() => {
                            //alert(res.data.message);
                            setLoader(false);
                            navigate("/dashboard");
                        }, 1000)

                    }
                })
                .catch((err) => {
                    setLoader(false);
                    console.log(`${socialType} api err`, err);
                    //alert(err);
                    toast.error(err.message, {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                    });
                })
        }
    }

    const socialGoogleSignin = () => {
        setLoader(true);

        console.log("-socialGoogleSignin--");
        var provider = new firebase.auth.GoogleAuthProvider();
        console.log("--provider--", provider);

        firebase.auth().signInWithPopup(provider).then(function (result) {
            console.log("--result--", result);
            if (result) {
                signinDetails(result.user.uid).then((res) => {
                    console.log('sign in google', res)
                    if (Object.keys(res.data.data).length !== 0) {
                        commonFunctionLogin(result, "google");
                    }
                    else {
                        commonFunctionRegistration(result, "google")
                    }
                })
                // commonFunctionLogin(result, "google");
            }
        })
            .catch((error) => {
                setLoader(false);
                console.log("--error--", error);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                });
                // ...
            });
    }

    const socialFacebookSignin = () => {
        setLoader(true);
        var provider = new firebase.auth.FacebookAuthProvider();
        console.log("--provider--", provider);
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log("--result--", result);
            if (result) {
                signinDetails(result.user.uid).then((res) => {
                    if (object.keys(res.data.data).length !== 0) {
                        commonFunctionLogin(result, "facebook");
                    }
                    else {
                        commonFunctionRegistration(result, "facebook")
                    }
                })
            }
        })
            .catch((error) => {
                setLoader(false);
                console.log("--error--", error);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                });
                // ...
            });
    }

    const socialTwitterSignin = () => {
        setLoader(true);
        //version8
        var provider = new firebase.auth.TwitterAuthProvider();
        console.log("--provider--", provider);
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log("--result--", result);
            if (result) {
                signinDetails(result.user.uid).then((res) => {
                    if (object.keys(res.data.data).length !== 0) {
                        commonFunctionLogin(result, "twitter");
                    }
                    else {
                        commonFunctionRegistration(result, "twitter")
                    }
                })

            }
        }).catch((error) => {
            console.log("--error--", error);
            setLoader(false);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
            });
        });
    }

    const socialAppleSignin = () => {
        setLoader(true);

        var provider = new firebase.auth.OAuthProvider('apple.com');
        console.log("--provider--", provider);

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log("--result--", result);

                if (result) {
                    commonFunctionLogin(result, "apple");
                }
            })
            .catch((error) => {
                console.log("--error--", error);
                setLoader(false);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                });
                // ...
            });
    }

    const socialLinkedInSignin = (code) => {
        let url = new URL(window.location.href);
        url.searchParams.delete('code');
        setLoader(true);

        console.log('code', code, window.location.href)

        let datas = {
            "redirect_uri": window.location.protocol + "//" + window.location.host + '/signin',
            "code": code
        }

        LinkedInLogin(datas).then(data => {
            commonFunctionLogin({ user: { uid: data.data.data.localId, email: data.data.data.email } }, "linkedin")
            console.log('data', data);
        }).catch(error => {
            setLoader(false);
            console.log('error', error);
        })
    }
    const openInNewTab = () => {
        window.open("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=865lyrr7phzvgz&scope=r_emailaddress,r_liteprofile&state=123456&redirect_uri=" + window.location.protocol + "//" + window.location.host + '/web/signin', '_self').focus();
    }

    return (
        <div className='container p-100'>
            <ToastContainer />
            {loader ? <Loader /> : null}
            <Seo title="Sign In" />
            <div className='row m-0 bgWhite'>
                <div className='col-lg-6 col-xl-6 col-md-6 p-0' >
                    <div className='register-leftside'>
                        <Link to="/" ><img className="register-logo" src="/images/signin-logo.png" alt="logo" /></Link>
                        <div className='inner-text'>
                            <p className='reg-welcome'>New User Registration</p>
                            <p className='personal-info'>Please create a account with your personal info</p>
                            <Link to="/signup"><button className='signup-btn' >Sign up</button></Link>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6 col-xl-6 col-md-6 p-0'>
                    <div className='register-rightside'>
                        <div className='register-iconsection'>
                            <p className='registration font-weight-bold'>Welcome Back!</p>
                            <div className="registerIcons">
                                <ul>
                                    <li><img alt='social' onClick={socialFacebookSignin} src="/images/fb.png" /></li>
                                    <li><img alt='social' onClick={socialTwitterSignin} src="/images/tw.png" /></li>
                                    <li><img alt='social' onClick={openInNewTab} src="/images/in.png" /></li>
                                    <li><img alt='social' onClick={socialGoogleSignin} src="/images/gm.png" /></li>
                                    <li><img alt='social' onClick={socialAppleSignin} src="/images/apple.png" /></li>
                                </ul>
                            </div>
                            <div className='hr-section' >
                                <span className='hr-text'>
                                    OR
                                </span>
                            </div>
                        </div>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
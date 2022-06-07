import React, { useState,useEffect } from 'react';
import RegistrationForm from '../../components/form/RegistrationForm';
import { Link, navigate } from 'gatsby';
// import { StaticImage } from "gatsby-plugin-image";
// import { SocialLogins } from "gatsby-theme-firebase";
import firebase from 'gatsby-plugin-firebase';
import { signupPost, userDetailInfo, LinkedInLogin } from '../../components/Api/formApi';
// import { TwitterAuthProvider } from "firebase/auth";
// import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import Seo from "../../components/seo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { userResponse } from '../../state/userSlice';
import { sendPushNotification } from '../../components/Api/ListingApi';

const Registration = () => {
    // console.log("--FIREBASE_API_KEY---",process.env.FIREBASE_API_KEY);
    const [loader, setLoader] = useState(false);
    const [codeValue,setCodeValue]=useState(false)
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
                commonFunctionRegistration(result, "google");
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

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log("--result--", result);

             

                if (result) {
                    commonFunctionRegistration(result, "facebook");
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

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log("--result--", result);

              
                if (result) {
                    commonFunctionRegistration(result, "twitter");
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
                    commonFunctionRegistration(result, "apple");
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
        console.log('code', code, window.location.href)
        setLoader(true);
        let datas = {
            "redirect_uri": window.location.protocol + "//" + window.location.host + '/signup',
            "code": code
        }

        LinkedInLogin(datas).then(data => {
            console.log('data', data);

            let values = {
                user: {
                    uid: data.data.data.localId,
                    email: data.data.data.email,
                    displayName: data.data.data.displayName,
                }
            }
            console.log('values--->', values);
            commonFunctionRegistration(values, "linkedin")
        }).catch(error => {
            setLoader(false);
            console.log('error', error);
        })
    }




    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const code = urlParams.get('code')

    // if (code) {
    //     socialLinkedInSignin(code)
    // }

    const openInNewTab = () => {
        window.open("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=865lyrr7phzvgz&scope=r_emailaddress,r_liteprofile&state=123456&redirect_uri=" + window.location.protocol + "//" + window.location.host + '/signup', '_self').focus();
        
    }

    return (
        <div className='container p-100'>
            <ToastContainer />
            {loader ? <Loader /> : null}
            <Seo title="Sign Up" />
            <div className='row m-0 bgWhite'>
                <div className='col-lg-6 col-xl-6 col-md-6 p-0' >
                    <div className='register-leftside'>
                        {/* <StaticImage src="../../../static/images/signin-logo.png" alt="logo" /> */}
                        <Link to="/" ><img className="register-logo" src="/images/signin-logo.png" alt="logo" /></Link>
                        <div className='inner-text'>
                            <p className='reg-welcome'>Welcome Back!</p>
                            <Link to="/signin"><button className='signin-btn' >Sign in</button></Link>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6 col-xl-6 col-md-6 p-0'>
                    <div className='register-rightside'>
                        <div className='register-iconsection'>
                            <p className='registration font-weight-bold'>Registration</p>
                            <div className="registerIcons">
                                <ul>
                                    <li ><img alt='social' onClick={socialFacebookSignin} src="/images/fb.png" /></li>
                                    <li ><img alt='social' onClick={socialTwitterSignin} src="/images/tw.png" /></li>
                                    <li><img alt='social' onClick={openInNewTab}  src="/images/in.png" /></li> 
                                    {/*  */}
                                    <li >
                                        {/* <div class="s9-widget-wrapper"></div> */}
                                        <img alt='social' onClick={socialGoogleSignin} src="/images/gm.png" />
                                    </li>
                                    <li ><img alt='social' onClick={socialAppleSignin} src="/images/apple.png" /></li>

                                </ul>
                                {/* <li><StaticImage src="../../../static/images/fb.png" alt="logo" /></li>
                                <li><StaticImage src="../../../static/images/tw.png" alt="logo" /></li>
                                <li><StaticImage src="../../../static/images/in.png" alt="logo" /></li>
                                <li><StaticImage src="../../../static/images/gm.png" alt="logo" /></li>
                                <li><StaticImage src="../../../static/images/apple.png" alt="logo" /></li> */}
                                <div className='social-icons-firebase'>
                                    {/* <SocialLogins
                                    onSuccess={userData => {
                                        console.log("successfully login",userData);
                                        //doSomethingWith(user);
                                        //navigate("/");
                                    }}
                                /> */}
                                </div>
                            </div>
                            <div className='hr-section' >
                                <span className='hr-text'>
                                    OR
                                </span>
                            </div>
                        </div>
                        <RegistrationForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration;
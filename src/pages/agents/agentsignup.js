import React, { useState,useEffect } from 'react';
import AgentSignupForm from '../../components/form/AgentSignupForm';
import Seo from "../../components/seo";
import { Link, navigate } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';
import { signupPost, userDetailInfo, LinkedInLogin } from '../../components/Api/formApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { userResponse } from '../../state/userSlice';

export default function AgentSignup() {
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
            var token = result.credential.accessToken;
            console.log("--token--", token);
            // The signed-in user info.
            var user = result.user;
            console.log("--user--", user);
            var uid = result.user.uid;
            console.log("--uid--", uid);
            var displayName = result.user.displayName;
            console.log("--displayName--", displayName);
            var email = result.user.email;
            console.log("--email--", email);

            var postData = {
                name: displayName,
                uid: uid,
                email: email,
                provider: socialType,
                role: "agent",
                //password: password, //no need

            };

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
                                }
                            })
                        //let claimStatus = usersDetails.data.data.customClaims.type;
                        var a = [];
                        a.push(JSON.stringify({ email: email, uid: uid, userType: "agent", provider: socialType }));
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

                // /** @type {firebase.auth.OAuthCredential} */
                // var credential = result.credential;

                // // The signed-in user info.
                // var user = result.user;
                // console.log("--user--",user);
                // // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                // var accessToken = credential.accessToken;
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

                // /** @type {firebase.auth.OAuthCredential} */
                // var credential = result.credential;

                // // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                // // You can use these server side with your app's credentials to access the Twitter API.
                // var token = credential.accessToken;
                // var secret = credential.secret;

                // // The signed-in user info.
                // var user = result.user;

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

                // /** @type {firebase.auth.OAuthCredential} */
                // var credential = result.credential;

                // // The signed-in user info.
                // var user = result.user;

                // // You can also get the Apple OAuth Access and ID Tokens.
                // var accessToken = credential.accessToken;
                // var idToken = credential.idToken;

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
            "redirect_uri": window.location.protocol + "//" + window.location.host + '/web/agentsignup',
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
        window.open("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=865lyrr7phzvgz&scope=r_emailaddress,r_liteprofile&state=123456&redirect_uri=" + window.location.protocol + "//" + window.location.host + '/web/signup', '_self').focus();
    }

    return (
        <div className='container p-100 '>
            <ToastContainer />
            {loader ? <Loader /> : null}
            <div className='row m-0 bgWhite agentsignup-page'>
                <div className='col-lg-12 col-xl-12 col-md-12'>
                    <div className='register-iconsection'>
                        <Link to="/agents" ><img className='agent-logo' src="/images/logo.png" /></Link>
                        <p className='registration font-weight-bold'>Registration</p>
                        <div className="registerIcons">
                            <ul>
                                {/* <li><img alt='social' src="/images/fb.png" /></li>
                        <li><img alt='social' src="/images/tw.png" /></li>
                        <li><img alt='social' src="/images/in.png" /></li>
                        <li><img alt='social' src="/images/gm.png" /></li>
                        <li><img alt='social' src="/images/apple.png" /></li> */}
                                <li ><img alt='social' onClick={socialFacebookSignin} src="/images/fb.png" /></li>
                                <li ><img alt='social' onClick={socialTwitterSignin} src="/images/tw.png" /></li>
                                <li><img alt='social'  onClick={openInNewTab} src="/images/in.png" /></li>
                              
                                <li ><img alt='social' onClick={socialGoogleSignin} src="/images/gm.png" /> </li>
                                <li ><img alt='social' onClick={socialAppleSignin} src="/images/apple.png" /></li>
                            </ul>
                        </div>
                        <div className='hr-section' >
                            <span className='hr-text'>
                                OR
                            </span>
                        </div>
                    </div>
                    <AgentSignupForm />
                </div>
            </div>
        </div>
    );
}

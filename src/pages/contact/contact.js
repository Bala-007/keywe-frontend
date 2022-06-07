import React,{useState,useEffect} from 'react';
import ContactForm from '../../components/form/contactForm';
import { Link, navigate } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';
import { signupPost } from '../../components/Api/formApi';
import Seo from "../../components/seo";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import house1 from "../../../static/images/material-mail.png"


const Contact = () => {


    const socialGoogleSignin = () => {
        console.log("-socialGoogleSignin--");
        var provider = new firebase.auth.GoogleAuthProvider();
        console.log("--provider--", provider);

        firebase.auth().signInWithPopup(provider).then(function (result) {
            console.log("--result--", result);

            // This gives you a Google Access Token.
            var token = result.credential.accessToken;
            console.log("--token--", token);
            // The signed-in user info.
            var user = result.user;
            console.log("--user--", user);
            var uid = result.user.uid;
            //console.log("--uid--",uid);
            var displayName = result.user.displayName;
            //console.log("--displayName--",displayName);
            var email = result.user.email;
            //console.log("--email--",email);


        });
    }
    console.log("---process.env.API_URL--", process.env.API_URL);
    const socialFacebookSignin = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        console.log("--provider--", provider);

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log("--result--", result);

                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // The signed-in user info.
                var user = result.user;
                console.log("--user--", user);
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;

                // ...
            })
            .catch((error) => {
                console.log("--error--", error);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                // ...
            });

    }

    const socialTwitterSignin = () => {
        //version8
        var provider = new firebase.auth.TwitterAuthProvider();
        console.log("--provider--", provider);

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log("--result--", result);

                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                // You can use these server side with your app's credentials to access the Twitter API.
                var token = credential.accessToken;
                var secret = credential.secret;

                // The signed-in user info.
                var user = result.user;
                // ...
            }).catch((error) => {
                console.log("--error--", error);

                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });


    }

    const socialAppleSignin = () => {
        var provider = new firebase.auth.OAuthProvider('apple.com');
        console.log("--provider--", provider);

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log("--result--", result);



                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // The signed-in user info.
                var user = result.user;

                // You can also get the Apple OAuth Access and ID Tokens.
                var accessToken = credential.accessToken;
                var idToken = credential.idToken;

                // ...
            })
            .catch((error) => {
                console.log("--error--", error);

                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                // ...
            });
    }
    const [storage,setStorage] =useState(false);

   //console.log("--userType--",userType);

    useEffect(() => {
        const storedData =localStorage.getItem("userInfo") ;
         if (!storedData) {
          
             setStorage(false);
         }else{
            setStorage(true);
           
         }
    },[]);
    return (

        <div>
            <Navbar  isLogin={storage} />

            <div className='container-fluid p-100 contactForm'>
                <div className='row m-0'>
                    <div className='col-lg-12 col-xl-12 col-md-12 p-0'>
                        <div>
                            <h2>Contact Us</h2>
                            <h4>We'd love to hear from you. You can shoot us an email at</h4>
                            <h3>
                                <span><img  src={house1} alt="house1"  /></span>
                                <a href="#">info@keywe.com</a> 
                            </h3>
                            <div className="hr-section"><span className="hr-text">or</span></div>
                            <h5>you can contact us by filling out the form below</h5>
                        </div>
                        <ContactForm />
                    </div>
                </div>
            </div>
            <Footer isLogin={storage} />
        </div>
    )
}

export default Contact;
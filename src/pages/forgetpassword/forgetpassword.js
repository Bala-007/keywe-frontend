import * as React from 'react';
import ForgetForm from '../../components/form/ForgetForm';
import { Link } from 'gatsby';
import Seo from "../../components/seo";

const ForgetPassword = () => {
    return (
    <div className='container p-100 forgotHeight'>
      <Seo title="Forget Password" />
        <div className='row m-0 bgWhite'>
            <div className='col-lg-6 col-xl-6 col-md-6 p-0' >
                <div className='register-leftside'>
                    <Link to="/" ><img className="register-logo" src="/images/signin-logo.png" alt="logo"/></Link>
                    <div className='inner-text'>
                        <p className='reg-welcome'>Welcome Back!</p>  
                        <Link to="/signin"><button className='signin-btn' >Sign in</button></Link>  
                    </div> 
                </div>
            </div>
            <div className='col-lg-6 col-xl-6 col-md-6 p-0'>
                <div className='register-rightside'>
                    <div className='register-iconsection'>
                        <p className='registration font-weight-bold'>Forget Password</p>                       
                    </div>
                    <ForgetForm />
                </div>
            </div>
        </div>
    </div>
    )
}
export default ForgetPassword;
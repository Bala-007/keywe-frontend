import { Link } from "gatsby";
import React from "react";
import * as styles from './header.module.css';

export default function Footer({ isLogin }) {
    //console.log("hi",isLogin)

    return (
        <div className="row footerdes">
            <div className="col-md-5 footer-link">
                {!isLogin ?
                    <>
                        <Link to="/" className={styles.footerNav}>Home</Link>
                        <Link to="/signin" className={styles.footerNav} >Sign in</Link>
                        <Link to="/contact" className={styles.footerNav} >Contact</Link>
                        <Link to="/termscondition/" className={styles.footerNav} >Terms</Link>
                        <Link to="/privacypolicy" className={styles.footerNav} >Privacy</Link>
                    </>
                    : <>
                        <Link to="/" className={styles.footerNav}>Home</Link>
                        <Link to="/termscondition/" className={styles.footerNav} >Terms</Link>
                        <Link to="/privacypolicy" className={styles.footerNav} >Privacy</Link>
                        <Link to="/contact" className={styles.footerNav} >Contact</Link>
                    </>}

            </div>
            <div className="col-md-3 text-center">
                <i className="fa fa-facebook-f"></i>
                <i className="fa fa-twitter"></i>
                <i className="fa fa-instagram"></i>
            </div>
            <div className="col-md-4">
                <p className="footercopy">Copyright  <i className="fa fa-copyright"></i> 2022 KeyWe</p>
            </div>
        </div>
    )
}

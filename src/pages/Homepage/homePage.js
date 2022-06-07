import React, { useEffect, useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import * as styles from "../dashboard/dashboard.module.css"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import "bootstrap/dist/css/bootstrap.css"
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { Link } from "gatsby"
import Footer from "../../components/Footer"
import Seo from "../../components/seo";
import './homePage.css'
import homebanner from '../../../static/images/home banner.png'
import homemobile from '../../../static/images/homemobile.png'
import homelogo from '../../../static/images/homelogo.png'
import hexagon1 from '../../../static/images/hexagon1.png'
import SkeletonProductLib from '../../components/skeleton/SkeletonProductLib'

function HomePage() {

    const [storage, setStorage] = useState(false);

    //console.log("--userType--",userType);

    useEffect(() => {
        const storedData = localStorage.getItem("userInfo");
        if (!storedData) {

            setStorage(false);
        } else {
            setStorage(true);

        }
    }, []);

    const [loader, setLoader] = useState(false);
    useEffect(() => {
        setLoader(true);
        setTimeout(() => { setLoader(false) }, 1000)

    }, []);

    return (

        <div>
            <Seo title="Home" />
            <div style={{height:"610px"}}>
                {loader && <div><SkeletonProductLib /></div>}
                {!loader &&
                    <div className="homepage position-relative" >
                        <img src={homebanner} alt="homebanner" className="w-100 h-100" />
                        <Link to={"/"}>
                            <img src={homelogo} alt="homelogo" className="homelogo" />
                        </Link>
                        <h4 className="estimateText">WELCOME TO THE REAL ESTATE REVOLUTION</h4>
                    </div>
                }
            </div>
            <div className="d-flex justify-content-around mb-5">
                    <img src={homemobile} alt="homemobile" className="homemobile" />
                </div>
            <div className=" position-relative w-100">
                <img src={hexagon1} alt="hexagon" className={styles.hexagon} />
                <div className={styles.hexagonInner}>
                    <h2 className={styles.hexagonInnerText1}>Join the Broker Metaverse</h2>
                    <div className={styles.hexagonContain}>
                        <h2 className={styles.hexagonInnerText2}>REDEFINE WHAT REAL</h2>
                        <h2 className={styles.hexagonInnerText2}>ESTATE MEANS</h2>
                    </div>
                </div>
            </div>
            <div className="needhome">
                <h3 className="homeText">KeyWe for all your home needs</h3>
                <h6 className="homeemail">To learn more send us an email at <Link to="" style={{ color: "#0490fb", textDecoration: "none" }}>info@KeyWe.com</Link></h6>
            </div>
            <Footer isLogin={storage} />
        </div>
    )
}
export default HomePage

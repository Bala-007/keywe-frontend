import React,{useState,useEffect} from "react";
import { Card, Button, Tab, Tabs } from "react-bootstrap"
import * as style1 from '../../pages/dashboard/detail.module.css';
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Mask38 from '../../../static/images/Mask Group 38.png';
import * as styles from "../seller/seller.module.css";
import { Link } from "gatsby";
import Footer from "../../components/Footer";
import * as styled from "../buyers/buyer.module.css";
import recenttour1 from '../../../static/images/Mask Group 108.png'
import Image95 from '../../../static/images/Image 95.png';
import Image96 from '../../../static/images/Image 96.png';
import RangeSlider from "../ranger/ranger";
import Ranger from "../ranger/ranger";
import PhotoSendPopup from "../../components/popup/PhotoSendPopup";


function Estimator() {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(p => !p);

    return (
        <Layout>
            <div>
            <PhotoSendPopup show={show} toggleShow={toggleShow}  />
                <div className="row m-0 mt-4">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-6">
                                <img src={Mask38} alt='mask38' className="mask38 w-30" height="250" />
                            </div>
                            <div className="col-md-6" style={{ marginLeft: "-45px" }}>
                                <div className="row m-0">
                                    <div className="col-md-8">
                                        <h5 className={styles.edithead}>123 Scotland DE</h5>
                                        <h5 className={styles.edithead}>Saratoga, CA 95070</h5>
                                        <h5 className={styles.edithead}>$120,000</h5>
                                    </div>
                                </div>
                                <div>
                                    <p className={style1.incredibletext}>Incredible remodeled single story family home located in one of Saratoga's finest neighborhoods with award winning Saratoga schools incredible remodeled single story family home located in one of Saratoga's finest neighborhoods with award winning Saratoga schools...</p>
                                </div>
                                <div className={style1.detailIcon}>
                                    <span className={style1.circle}><i className="fa fa-heart" style={{ color: "#4283D9",marginLeft:"1px" }}></i></span>
                                    <span className={style1.upload}> <i className="fa fa-upload" style={{marginLeft:"2px"}}></i></span>
                                </div>
                                <div>
                                    <Card className={style1.detCard} style={{ borderRadius: "5px", }}>
                                        <div className="row m-0">
                                            <div className="col-md-4 cardtext2 mt-3">
                                                <p><b>4</b></p>
                                                <p style={{ color: "#898686" }}>Beds</p>
                                            </div>
                                            <div className="col-md-4 cardtext2 mt-3">
                                                <p><b>4</b></p>
                                                <p style={{ color: "#898686" }}>Baths</p>
                                            </div>
                                            <div className="col-md-4 cardtext2 mt-3">
                                                <p><b>2,819</b></p>
                                                <p style={{ color: "#898686" }}>Sq. Feet</p>
                                            </div>
                                        </div>
                                    </Card>
                                    <div className={styles.cardbelowtext}>
                                        <p>Is this information inaccurate? </p>
                                        <Link to="/seller/Editinfo" className={styles.editinfo}>Yes, edit this info</Link>
                                    </div>
                                </div>
                                <div className={styles.sellbut}>
                                    <button type="button" className={styles.transbut}  >Transfer Ownership</button>
                                    <button type="button" className={styles.keybut}>Keywe Estimator</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <Card className={styles.estimatCard} style={{ boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)" }}>
                            <div>
                                <h5 className={styles.estimatorhead1}>KeyWe Estimator</h5>
                                <p className={styles.estimatesuggest}>Suggested Price Range</p>
                                <h5 className={styles.estimatorhead}>$120,000 - $140,000</h5>
                            </div>
                            <div className={styles.demandback}>
                                <h5 className={styles.estimatorhead2}>Demand Calculator</h5>
                                <Ranger />
                                <div className={styles.demanddetail}>
                                    <div className={styles.estimatesale} >
                                        <p style={{ margin: "0" }}>Estimated By Reach</p>
                                        <p className={styles.demandText}>29 Buyers</p>
                                    </div>
                                    <div className={styles.estimatesale2}>
                                        <p style={{ margin: "0" }}>Estimated Views</p>
                                        <p className={styles.demandText}>1423 Views</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={styles.compare}>
                                    <h6 className={styles.estimatorhead}>Comparables</h6>
                                    <p>Listed around $2.7M</p>
                                </div>
                                <Tabs defaultActiveKey="For Sale" id="uncontrolled-tab-example" className="mb-2">
                                    <Tab eventKey="For Sale" title="For Sale" style={{ marginTop: "50px" }}>
                                        <p>3 Homes</p>
                                        <div className={styled.tourImagedetail} >
                                            <div>
                                                <img src={Image95} alt="Image95" className={styled.recenttour1} />
                                            </div>
                                            <div style={{  fontSize: "small", marginBottom: "10px", marginRight:"103px"}}>
                                                <p style={{ margin: "0px" }}>1038 Redway place</p>
                                                <p style={{ margin: "0px" }}>Saratoga, CS 95071</p>
                                                <p style={{ margin: "0px" }}>3 bed,3 bath</p>
                                                <p style={{ margin: "0px" }}>5 Tours</p><p>26 Days on Market</p>
                                            </div>

                                            <div>
                                                <p style={{ fontFamily: "DejaVuSansBold" }}>$2,799,000</p>
                                            </div>
                                        </div>
                                        <div className={styled.tourImagedetail} >
                                            <div>
                                                <img src={Image96} alt="Image96" className={styled.recenttour1} style={{borderRadius:"15px"}}/>
                                            </div>
                                            <div style={{ fontSize: "small", marginBottom: "10px", marginRight:"103px" }}>
                                                <p style={{ margin: "0px" }}>1038 Redway place</p>
                                                <p style={{ margin: "0px" }}>Saratoga, CS 95071</p>
                                                <p style={{ margin: "0px" }}>3 bed,3 bath</p>
                                                <p style={{ margin: "0px" }}>5 Tours</p><p>26 Days on Market</p>
                                            </div>

                                            <div>
                                                <p style={{ fontFamily: "DejaVuSansBold" }}>$2,799,000</p>
                                            </div>
                                        </div>
                                        <div className={styled.tourImagedetail} >
                                            <div>
                                                <img src={Image96} alt="Image96" className={styled.recenttour1} style={{borderRadius:"15px"}} />
                                            </div>
                                            <div style={{ fontSize: "small", marginBottom: "10px",marginRight:"103px" }}>
                                                <p style={{ margin: "0px" }}>1038 Redway place</p>
                                                <p style={{ margin: "0px" }}>Saratoga, CS 95071</p>
                                                <p style={{ margin: "0px" }}>3 bed,3 bath</p>
                                                <p style={{ margin: "0px" }}>5 Tours</p><p>26 Days on Market</p>
                                            </div>

                                            <div>
                                                <p style={{ fontFamily: "DejaVuSansBold" }}>$2,799,000</p>
                                            </div>
                                        </div>
                                        <div className={styles.estimatebut}>
                                        <button type="button" className={styles.Refinancebut}>Refinance</button>
                                    <button type="button" className={styles.connectbut} onClick={toggleShow} >Connect with agent</button>
                                   
                                </div>
                                    </Tab>
                                    <Tab eventKey="Recently Sold" title="Recently Sold">
                                    </Tab>
                                </Tabs>
                            </div>


                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Estimator
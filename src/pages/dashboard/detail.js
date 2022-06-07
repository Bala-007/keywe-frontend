import React from "react";
import { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Card } from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import * as style1 from './detail.module.css';
import Mask38 from '../../../static/images/Mask Group 38.png';
import Mask39 from '../../../static/images/Mask Group 39.png';
import Mask40 from '../../../static/images/Mask Group 40.png';
import Mask41 from '../../../static/images/Mask Group 42.png';
import Mask42 from '../../../static/images/Mask Group 42.png';
import Mask43 from '../../../static/images/Mask Group 43.png';
import Mask44 from '../../../static/images/Mask Group 44.png';
import Group236 from "../../../static/images/Group 236.png"
import heart from "../../../static/images/heart.png"
import memberIcon from '../../../static/images/memberIcon.png';
import image95 from '../../../static/images/Image 95.png';
import image96 from '../../../static/images/Image 96.png';
import TourPopup from "../../components/popup/TourPopup";
import ChatPopup from "../../components/popup/ChatPopup";
import Layout from "../../components/Layout";
import Bar from '../bars/bar';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";




function Details({ location, id }) {
    const [show, setShow] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const toggleShow = () => setShow(p => !p);
    const toggleShowChat = () => setShowChat(p => !p);
    const initialState = {
        beforeClaim: false
    }
    const [schedule, setSchedule] = useState(initialState);
    const renderProductList = () => {
        let products = []
        let remainder = 7;

        for (let i = 1; i <= remainder; i++) {
            products.push(
                <div key={i}>

                    <Card className={style1.propCard}>
                        <div>
                            <img src={image95} alt="image95" width={200} height={150} className={style1.propImage} />
                            <div className={style1.simproperties} >
                                <p>1038 Redway Place</p>
                                <p>Saratoga, CA 95071</p>
                                <p style={{ fontFamily: "DejaVuSansBold" }}>$2,799,000</p>
                            </div>
                        </div>
                    </Card>
                </div>

            )
        }
        return products
    }

    return (

        <div>
            <Navbar />
         
            <TourPopup show={show} toggleShow={toggleShow} />
            <ChatPopup show={showChat} toggleShow={toggleShowChat} />

            <div className="row m-0">
                <div className="col-md-8">
                    <img src={Mask38} alt='mask38' className={style1.mask38}/>
                    <div className="row m-0">
                        <div className="col-md-6">
                            <img src={Mask39} alt='mask39' className="mask39 w-100 " height="400" />
                            <div className={style1.imagetext}>
                                <div>
                                    <p>Exterior</p>
                                </div>
                                <div>
                                    <i className="fa fa-thumbs-o-up" style={{ marginRight: "30px" }}></i>
                                    <i className="fa fa-thumbs-o-down"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 m-0">
                            <img src={Mask40} alt='mask40' className="mask40 w-100 " height="400" />
                            <div className={style1.imagetext}>
                                <div>
                                    <p>Kitchen</p>
                                </div>
                                <div>
                                    <i className="fa fa-thumbs-o-up" style={{ marginRight: "30px" }}></i>
                                    <i className="fa fa-thumbs-o-down"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-md-6">
                            <img src={Mask41} alt='mask41' className="mask41 w-100 " height="400" />
                            <div className={style1.imagetext}>
                                <div>
                                    <p>Bedroom</p>
                                </div>
                                <div>
                                    <i className="fa fa-thumbs-o-up" style={{ marginRight: "30px" }}></i>
                                    <i className="fa fa-thumbs-o-down"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img src={Mask42} alt='mask42' className="mask42 w-100 " height="400" />
                            <div className={style1.imagetext}>
                                <div>
                                    <p>Living Room</p>
                                </div>
                                <div>
                                    <i className="fa fa-thumbs-o-up" style={{ marginRight: "30px" }}></i>
                                    <i className="fa fa-thumbs-o-down"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-md-6">
                            <img src={Mask43} alt='mask43' className="mask43 w-100 " height="400" />
                            <div className={style1.imagetext}>
                                <div>
                                    <p>Backyard</p>
                                </div>
                                <div>
                                    <i className="fa fa-thumbs-o-up" style={{ marginRight: "30px" }}></i>
                                    <i className="fa fa-thumbs-o-down"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img src={Mask44} alt='mask44' className="mask44 w-100 " height="400" />
                            <div className={style1.imagetext}>
                                <div >
                                    <p>Garage</p>
                                </div>
                                <div>
                                    <i className="fa fa-thumbs-o-up" style={{ marginRight: "30px" }}></i>
                                    <i className="fa fa-thumbs-o-down"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-md-4">
                    <div className="row m-0">
                        <div className="col-md-8 p-0 mt-3">
                            <p className={style1.housetext}>HOUSE FOR SALE</p>
                            <p className={style1.houseSale}>123 Scotland DR</p>
                            <p className={style1.houseSale}>Saratoga, CA 95070</p>
                        </div>
                        <div className="col-md-4 mt-3">
                            <div>
                                <p className={style1.memberSale}>$120,000</p>
                                <div className={style1.memberdetails}>
                                    {/* <button type="button" className={style1.memberbut} > <img src={memberIcon} alt="memberIcon" className={style1.memberIcon}/> Members only</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className={style1.incredibletext}>Incredible remodeled single story family home located in one of Saratoga's finest neighborhoods with award winning Saratoga schools incredible remodeled single story family home located in one of Saratoga's finest neighborhoods with award winning Saratoga schools...</p>

                    </div>
                    <div className={style1.detailIcon}>
                        <span><img src={heart} alt="heart" style={{width:"40px"}}/></span>
                        <img src={Group236} alt="group236" style={{marginLeft:"13px", width:"60px"}}/>
                        <span className={style1.claimOwner}>Claim Ownership</span>
                    </div>
                    <div>
                        <Card className={style1.detCard}>
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
                    </div>
                    
                        <div className={style1.schedulbut}>
                            <button type="button" className={style1.tourbut} onClick={toggleShow}>Schedule Tour</button>
                            <button type="button" className={style1.chatbut} onClick={toggleShowChat} >Chat with Listing Agent</button>
                        </div>
                   
                    <div className={style1.activity}>
                        <div>
                            <p className="pt-3" style={{ fontFamily: "DejaVuSansBold" }}>Activity</p>
                        </div>
                        <div>
                            <select className={style1.week} name="calender" id="calender">
                                <option value="week">This Week</option>
                                <option value="day">Today</option>
                                <option value="month">This Month</option>
                                <option value="year">This Year</option>
                            </select>
                        </div>
                    </div>
                    < div>
                        {/* <Bar /> */}
                    </div>
                    <div className="row m-0 pt-5 mb-4">
                        <div className="col-md-5 wid100">
                            <div className={style1.viewdetails}>
                                <div>
                                    <p className={style1.viewtext}>Viewership</p>
                                    <p style={{ fontFamily: "DejaVuSansBold" }}>25%</p>
                                </div>
                                <div>
                                    <p className={style1.viewtext}>Downloads</p>
                                    <p style={{ fontFamily: "DejaVuSansBold" }}>3</p>
                                </div>
                                <div>
                                    <p className={style1.viewtext}>Offers</p>
                                    <p style={{ fontFamily: "DejaVuSansBold" }}>1</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 wid100">
                            <button className={style1.otherbut} type="button" >2 other people are viewing this property now</button>
                        </div>
                    </div>

                    <button type="button" className={style1.viewbut}>View  Disclosures & Reports</button>


                </div>
            </div>
            <div>

            </div>

            <div className='row m-0'>
                <div className={style1.similarback}>
                    <h6 className={style1.similar}>Simlilar Properties</h6>
                    <div className={style1.simCard}>
                        {renderProductList()}
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}
export default Details
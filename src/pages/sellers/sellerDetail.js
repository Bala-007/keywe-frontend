import React, { useState } from "react"
import Mask192 from "../../../static/images/Mask Group 192.png"
import Mask193 from "../../../static/images/Mask Group 193.png"
import MaskGroup41 from "../../../static/images/Mask Group 41.png"
import MaskGroup42 from "../../../static/images/Mask Group 42.png"
import dots from "../../../static/images/Group 237.png"
import memberIcon from "../../../static/images/memberIcon.png"
import phonintrest from "../../../static/images/phoneintrest.png"
import msgint from "../../../static/images/msgint.png"
import Group236 from "../../../static/images/Group 236.png"
import arrow from '../../../static/images/arrow.png';
import MaskGroup40 from '../../../static/images/Mask Group 40.png'
import closebutton from "../../../static/images/Icon ionic-ios-close.png"
import * as styled from "../buyers/buyer.module.css"
import { Button, Card } from "react-bootstrap"
import RoundBar from '../bars/RoundBar'
import { Link } from "gatsby";
import * as style2 from "../buyerdetaipages/buyerdetail.module.css";
import recenttour1 from '../../../static/images/recenttour1.png'
import recenttour2 from '../../../static/images/recenttour2.png';
import TourAvailablePopup from "../../components/popup/tourAvailablePopup"
import { RWebShare } from "react-web-share"
import { useLocation } from '@reach/router';
import Chat from '../chat/chat'


function SellerDetail(props) {
    const [open, setOpen] = useState(false)
    const [isTourAvailable, setIsTourAvailable] = useState(false)
    const showDetail = () => {
        setOpen(true)
    }
    const location = useLocation();

    const handleIsTourAvailablePopup = () => {
        setIsTourAvailable(p => !p)
    }
    const sellerDetail = props.data
    console.log('sellerDetail', props)
    const [openChat, setOpenChat] = useState(false)
    const showChatDetail = () => {
        setOpenChat(true)
    }

    return (
        <div>
        <div className="sellerback">
            <TourAvailablePopup show={isTourAvailable} property_id={props.data.property_id._id} toggleShow={handleIsTourAvailablePopup} />
            <Card className="sellerCard">
                <div className="row" style={{ alignItems: "center" }}>
                    <div className="col-md-6" style={{ textAlign: "right" }}>
                        <img src={sellerDetail.property_id.thumbnail_image} height={100} width={100} alt="mask193" className={style2.sellerimage} />
                    </div>
                    <div className="col-md-6">
                        <div className={style2.sellerDetailName} >{sellerDetail.user_id.name}</div>
                        <div>
                            <img src={phonintrest} alt="phonintrest" className={styled.phonintrest} />
                            <img src={msgint} alt="msgint" className="msgint" onClick={()=>{showChatDetail();}}/>
                        </div>
                    </div>
                </div>
                <div className="interaddress">
                    <h6 style={{ fontFamily: "DejaVuSansBold", marginBottom: "12px" }}>{sellerDetail.property_id.address.split(',').slice(0).shift()} </h6>
                    <p>{sellerDetail.property_id.address.split(",").slice(1).join(",")}</p>
                    <p>${sellerDetail.property_id.price.$numberDecimal}</p>
                    <select className="propectstatus" name="calender" id="calender">
                        <option value="notshow">Status - Not Showing</option>
                        <option value="show">Status - Showing</option>
                        <option value="none">Status - none</option>
                    </select>
                </div>
                <div className="row ms-2 me-2">
                    <div className="col-12 col-lg-6">
                    <Link to="/agenttour" style={{ textDecoration: "none" }}>
                        <button className="btn primaryColor  w-100 f-14 py-2 DejaVuSansCondensed">Manage Tours</button>
                        </Link>
                    </div>
                    <div className="col-12 col-lg-6">
                        <button className="btn primaryColor  w-100 f-14 py-2 DejaVuSansCondensed">Manage Offers</button>
                    </div>
                    <div className="col-12 mt-2 col-lg-6">
                        <button className="btn primaryColorOutline w-100 f-14 py-2 DejaVuSansCondensed" onClick={handleIsTourAvailablePopup}>Tour Availability</button>
                    </div>
                     <div className="col-12 mt-2 col-lg-6">
                        <button className="btn primaryColorOutline  w-100 f-14 py-2 DejaVuSansCondensed">Keywe Estimator</button>
                    </div>
                </div>
                
            
                    <div className="mt-2">
                        <div className={styled.imagedetails}>
                            <Link to={`/dashboard/detail/${sellerDetail.property_id._id}`} style={{ textDecoration: "none" }}>
                                <img src={sellerDetail.property_id.thumbnail_image} alt="mask192" className={styled.inthomeImage} />
                            </Link>
                            <img
                                src={closebutton}
                                alt="closebutton"
                                className={styled.closebutton2}
                                onClick={() => setOpen(false)}
                            />
                            <RWebShare
                                data={{
                                    text: "",
                                    url: location.origin + '/dashboard/detail/' + sellerDetail.property_id._id,
                                    title: "Share your property",
                                }}
                                onClick={() => console.log(location.origin + '/dashboard/detail/' + sellerDetail.property_id._id)}
                            >
                                <img src={Group236} alt="group236" className={styled.upload2} />
                            </RWebShare>
                            <img src={dots} alt="dots" className={styled.dots2} />

                            <div className={styled.memberdetails}>
                                {/* <img
                                    src={memberIcon}
                                    alt="memberIcon"
                                    className={styled.memberIcon}
                                />
                                <button type="button" className={styled.memberbut2}>
                                    Members only
                                </button> */}
                            </div>
                        </div>
                        <div className={styled.housedetail}>
                            <p className={styled.housesale}>HOUSE FOR SALE</p>
                            <p className={styled.pricehouse}>${sellerDetail.property_id.price.$numberDecimal}</p>
                        </div>
                        <div className={styled.headContent}>
                            <h5 className={styled.intaddess} >{sellerDetail.property_id.address.split(',').slice(0).shift()}</h5>
                            <h5 className={styled.intaddess}>{sellerDetail.property_id.address.split(",").slice(1).join(",")}</h5>
                        </div>
                        <div className={styled.dashboardActive2}>
                            <i className="fa fa-circle" style={{ color: "green" }}></i>
                            <p style={{ marginLeft: "5px" }}>Actively Showing</p>
                        </div>
                        <div>
                            <Card
                                className={styled.detCard}
                                style={{
                                    borderRadius: "5px",
                                    boxShadow:
                                        "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)",
                                }}
                            >
                                <div className="row m-0">
                                    <div className="col-md-4 cardtext2 mt-3">
                                        <p style={{ fontFamily: "DejaVuSansBold" }}>{sellerDetail.property_id.beds}</p>
                                        <p style={{ color: "#898686" }}>Beds</p>
                                    </div>
                                    <div className="col-md-4 cardtext2 mt-3">
                                        <p style={{ fontFamily: "DejaVuSansBold" }}>{sellerDetail.property_id.baths}</p>
                                        <p style={{ color: "#898686" }}>Baths</p>
                                    </div>
                                    <div className="col-md-4 cardtext2 mt-3">
                                        <p style={{ fontFamily: "DejaVuSansBold" }}>{sellerDetail.property_id.square_feet.$numberDecimal}</p>
                                        <p style={{ color: "#898686" }}>Sq. Feet</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
             

                <div className="sellerRoundBar">
                    <RoundBar />
                </div>
                <div >
                    <p className="sellerTour">These factors are affecting ranking</p>

                    <div className="sellertourdetail">
                        <div>
                            <h5>11% Decrease in Tours</h5>
                            <p>2 Upcoming Tours scheduled</p>
                        </div>
                        <div>
                            <img src={arrow} alt="arrow" />
                        </div>
                    </div>

                    <div className="sellertourdetail">
                        <div>
                            <h5>12 Prospect Buyers</h5>
                            <p>1 buyer has left the Market</p>
                        </div>
                        <div>
                            <img src={arrow} alt="arrow" />
                        </div>
                    </div>

                    <div className="sellertourdetail">
                        <div>
                            <h5>2 New Comparables</h5>

                        </div>
                        <div>
                            <img src={arrow} alt="arrow" />
                        </div>
                    </div>

                    <div className="sellertourdetail">
                        <div>
                            <h5>3% Decrease in Viewership</h5>
                            <p>#16 This Week</p>
                        </div>
                        <div>
                            <img src={arrow} alt="arrow" />
                        </div>
                    </div>

                    <div className="sellertourdetail ">
                        <div>
                            <h5>2 Download This Week</h5>

                        </div>
                        <div>
                            <img src={arrow} alt="arrow" />
                        </div>
                    </div>
                </div>

                <Link className="sellerview">View All Activity</Link>
                <div className="galleryback">
                    <h6 className="sellergallery">Galary Activity</h6>
                    <div className="gallerygroup">
                        <div >
                            <img src={MaskGroup40} alt="MaskGroup40" className="sellermaskgroup40" />
                            <div className="sellerThumbs">
                                <i className="fa fa-thumbs-o-up" style={{ marginRight: "30px" }}></i>
                                <i className="fa fa-thumbs-o-down"></i>
                            </div>
                        </div>
                        <div>
                            <img src={MaskGroup41} alt="MaskGroup41" className="sellermaskgroup40" style={{ marginLeft: "10px" }} />
                            <div className="sellerThumbs">
                                <i className="fa fa-thumbs-o-up" style={{ marginRight: "30px" }}></i>
                                <i className="fa fa-thumbs-o-down"></i>
                            </div>
                        </div>
                        <div>
                            <img src={MaskGroup42} alt="MaskGroup42" className="sellermaskgroup40" />
                            <div className="sellerThumbs">
                                <i className="fa fa-thumbs-o-up" style={{ marginRight: "30px" }}></i>
                                <i className="fa fa-thumbs-o-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h6 className="sellerreal">RealVitalize</h6>
                    <p className="sellerrealtext">You can raise the price of your home by making updates. View RealVitalize to see your options</p>
                    <Button className="sellerbut">Add RealVitalize</Button>
                </div>
                <div className="soldcomp">
                    <h6 className="sellerrecently">Recently Sold Comparables</h6>
                    <div className={style2.recenttourdetail1}>
                        <img src={recenttour1} alt="recenttour1" className={style2.recenttourImage} />
                        <div className={style2.touraddress}>
                            <h5>$2,600,000</h5>
                            <p>885 Ronec Way</p>
                            <p>Saratoga, CA 95070</p>
                            <span>3 bed, 3 bath</span>
                        </div>
                    </div>
                    <div className={style2.recenttourdetail2}>
                        <img src={recenttour2} alt="recenttour2" className={style2.recenttourImage} />
                        <div className={style2.touraddress}>
                            <h5>$2,830,000</h5>
                            <p>1003 Betu path</p>
                            <p>Saratoga, CA 95070</p>
                            <span>3 bed, 2.5 bath</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        {openChat?
        <Chat />
        :null}
        </div>
    )
}
export default SellerDetail

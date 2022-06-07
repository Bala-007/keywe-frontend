import React, { useState } from "react"
import dots from "../../../static/images/Group 237.png"
import memberIcon from "../../../static/images/memberIcon.png"
import phonintrest from "../../../static/images/phoneintrest.png"
import msgint from "../../../static/images/msgint.png"
import Group236 from "../../../static/images/Group 236.png"
import closebutton from "../../../static/images/Icon ionic-ios-close.png"
import * as styled from "../buyers/buyer.module.css"
import { Button, Card } from "react-bootstrap"
import { Link } from "gatsby";
import AvatarImage from "../../components/Avatar/avatarImage"
import ConnectAgentPopup from "../../components/popup/connectAgentPopup";
import { RWebShare } from "react-web-share";
import { useLocation } from '@reach/router';
import Chat from '../chat/chat'


function ProspectDetail(props) {
    const [open, setOpen] = useState(false)
    const showDetail = () => {
        setOpen(true)
    }
    const location = useLocation();
    const [connect, setConnect] = useState(false);
    const toggleConnect = () => setConnect(p => !p);
    const agentDetails = props.prospectDetail
    console.log('prospectDetail', props)
    const [openChat, setOpenChat] = useState(false)
    const showChatDetail = () => {
        setOpenChat(true)
    }


    return (
        <div>
            <div className="prospectback mb-5">
                <ConnectAgentPopup data={agentDetails} location={props.prospectDetail.property_id.location} isActive={false} connect={connect} toggleConnect={toggleConnect} />
                <Card className="prospectCard" >
                    <div className="row" style={{ alignItems: "center" }}>
                        <div className="col-md-5" style={{ textAlign: "right" }}>
                            {agentDetails.user_id.img ?
                                <img src={process.env.API_IMAGE_URL + agentDetails.user_id.img} alt="mask193" style={{ width: "66px", height: "66px", borderRadius: "50%" }} />
                                : <>{agentDetails.user_id.name ? <AvatarImage data={agentDetails.user_id.name ? agentDetails.user_id.name : ""} />
                                    : null}</>
                            }
                        </div>
                        <div className="col-md-6">
                            <h6 className="buyerName text-capitalize"  > {agentDetails.user_id.name} </h6>
                            <div>
                                <img src={phonintrest} alt="phonintrest" className={styled.phonintrest} />
                                <img src={msgint} alt="msgint" className="msgint" onClick={() => { showChatDetail(); }} />
                            </div>
                        </div>
                    </div>
                    <div className="interaddress">
                        <h6 style={{ fontFamily: "DejaVuSansBold", marginBottom: "12px" }}> {agentDetails.property_id.address.split(',').slice(0).shift()} </h6>
                        <p>{agentDetails.property_id.address.split(",").slice(1).join(",")}</p>
                        <p>${agentDetails.property_id.price.$numberDecimal}</p>
                        <select className="propectstatus" name="calender" id="calender">
                            <option value="notshow">Status - Not Showing</option>
                            <option value="show">Status - Showing</option>
                            <option value="none">Status - none</option>
                        </select>
                        {/* <button>Status - Not Showing </button> */}
                    </div>
                    <div>
                        <Button variant="primary" className={styled.transferbut} onClick={toggleConnect}>Transfer Request</Button>
                    </div>
                    <Button variant="primary" className={styled.viewbut2} onClick={showDetail}>
                        View Property Details
                    </Button>
                    {open ? (
                        <div >
                            <div className={styled.imagedetails}>
                                <Link to={`/dashboard/detail/${agentDetails.property_id._id}`} style={{ textDecoration: "none" }}>
                                    <img src={agentDetails.property_id.thumbnail_image} alt="mask192" width={200} height={300} className={styled.inthomeImage} />
                                </Link>
                                <img src={closebutton} alt="closebutton" className={styled.closebutton2} onClick={() => setOpen(false)} />
                                <RWebShare
                                    data={{
                                        text: "",
                                        url: location.origin + '/dashboard/detail/' + agentDetails.property_id._id,
                                        title: "Share your property",
                                    }}
                                    onClick={() => console.log(location.origin + '/dashboard/detail/' + agentDetails.property_id._id)}
                                >
                                    <img src={Group236} alt="group236" className={styled.upload2} />
                                </RWebShare>
                                {/* <img src={Group236} alt="group236" className={styled.upload2} /> */}
                                <img src={dots} alt="dots" className={styled.dots2} />
                                <div className={styled.memberdetails}>
                                    {/* <img src={memberIcon} alt="memberIcon" className={styled.memberIcon} />
                                <button type="button" className={styled.memberbut2}>
                                    Members only
                                </button> */}
                                </div>
                            </div>
                            <div className={styled.housedetail}>
                                <p className={styled.housesale}>HOUSE FOR SALE</p>
                                <p className={styled.pricehouse}>${agentDetails.property_id.price.$numberDecimal}</p>
                            </div>
                            <div className={styled.headContent}>
                                <h5 className={styled.intaddess} >{agentDetails.property_id.address.split(',').slice(0).shift()}</h5>
                                <h5 className={styled.intaddess}>{agentDetails.property_id.address.split(",").slice(1).join(",")}</h5>
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
                                            <p style={{ fontFamily: "DejaVuSansBold" }}>{agentDetails.property_id.beds}</p>
                                            <p style={{ color: "#898686" }}>Beds</p>
                                        </div>
                                        <div className="col-md-4 cardtext2 mt-3">
                                            <p style={{ fontFamily: "DejaVuSansBold" }}>{agentDetails.property_id.baths}</p>
                                            <p style={{ color: "#898686" }}>Baths</p>
                                        </div>
                                        <div className="col-md-4 cardtext2 mt-3">
                                            <p style={{ fontFamily: "DejaVuSansBold" }}>{agentDetails.property_id.square_feet.$numberDecimal}</p>
                                            <p style={{ color: "#898686" }}>Sq. Feet</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ) : null}
                    {/* <div>
                    <h6 className="prospectmessage">Message</h6>
                    <p className="prospectText">{agentDetails.message}</p>
                </div> */}
                </Card>
            </div>

            {openChat ?
                <Chat />
                : null}
        </div>
    )
}
export default ProspectDetail


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
import Julia from '../../../static/images/Julia.png'
import Mask192 from "../../../static/images/Mask Group 192.png"
import { RWebShare } from "react-web-share"
import { useLocation } from '@reach/router';
function OutboundDetail(props) {
    const [open, setOpen] = useState(false)
    const showDetail = () => {
        setOpen(true)
    }
    const location = useLocation();

    const outboundDetail = props.data
    console.log("outboundDetails", props)

    return (
        <div className="prospectback mb-5">

            <Card className="prospectCard" >
                <div>

                    <div className="row" style={{ alignItems: "center" }}>
                        <div className="col-md-6" style={{ textAlign: "right" }}>
                            {outboundDetail.agent_id.img ?
                                <img alt="no_image" src={process.env.API_IMAGE_URL + outboundDetail.agent_id.img} style={{ width: '50%', height: '114px', borderRadius: '60px' }} />
                                : <>{outboundDetail.agent_id.name ? <div style={{ width: '88px', height: '88px',position:"relative" }}><AvatarImage fontSize={'40px'} data={outboundDetail.agent_id.name ? outboundDetail.agent_id.name : ''} /></div>
                                    : null}</>
                            }
                            {/* <img alt="" src={outboundDetail.agent_id.img} style={{ width: '50%', height: '114px', borderRadius: '60px' }} /> */}
                        </div>
                        <div className="col-md-6">
                            <h6 style={{ marginBottom: "15px", fontFamily: "DejaVuSansBold" }}>{outboundDetail.agent_id.name}</h6>
                            <div>
                                <img src={phonintrest} alt="phonintrest" className={styled.phonintrest} />
                                <img src={msgint} alt="msgint" className="msgint" />
                            </div>
                        </div>
                    </div>
                    <div className="interaddress mb-4">
                        <h6 style={{ fontFamily: "DejaVuSansBold", marginBottom: "12px" }}> {outboundDetail.property_id.address.split(',').slice(0).shift()} </h6>
                        <p>{outboundDetail.property_id.address.split(",").slice(1).join(",")}</p>
                        <p>${outboundDetail.property_id.price.$numberDecimal}</p>
                    </div>
                    <div>
                        <Button variant="primary" className={styled.viewbut2} onClick={showDetail}>View Property Details</Button>
                    </div>
                    {open ? (
                        <div>
                            <div className={styled.imagedetails}>
                                <Link to={`/dashboard/detail/${outboundDetail.property_id._id}`} style={{ textDecoration: "none" }}>
                                    <img src={outboundDetail.property_id.thumbnail_image} alt="mask192" className={styled.inthomeImage} />
                                </Link>
                                <img src={closebutton} alt="closebutton" className={styled.closebutton2} onClick={() => setOpen(false)} />
                                <RWebShare
                                    data={{
                                        text: "",
                                        url: location.origin + '/dashboard/detail/' + outboundDetail.property_id._id,
                                        title: "Share your property",
                                    }}
                                    onClick={() => console.log(location.origin + '/dashboard/detail/' + outboundDetail.property_id._id)}
                                >
                                    <img src={Group236} alt="group236" className={styled.upload2} />
                                </RWebShare>
                                <img src={dots} alt="dots" className={styled.dots2} />
                                <div className={styled.memberdetails}>
                                    {/* <img src={memberIcon} alt="memberIcon" className={styled.memberIcon} />
                                    <button type="button" className={styled.memberbut2}>Members only </button> */}
                                </div>
                            </div>
                            <div className={styled.housedetail}>
                                <p className={styled.housesale}>
                                    HOUSE FOR SALE
                                </p>
                                <p className={styled.pricehouse}>${outboundDetail.property_id.price.$numberDecimal}</p>
                            </div>
                            <div className={styled.headContent}>
                                <h5 className={styled.intaddess}>{outboundDetail.property_id.address.split(',').slice(0).shift()}</h5>
                                <h5 className={styled.intaddess}>{outboundDetail.property_id.address.split(",").slice(1).join(",")}</h5>
                            </div>
                            <div className={styled.dashboardActive2}>
                                <i
                                    className="fa fa-circle"
                                    style={{ color: "green" }}
                                ></i>
                                <p style={{ marginLeft: "5px" }}>
                                    Actively Showing
                                </p>
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
                                            <p style={{ fontFamily: "DejaVuSansBold" }}>{outboundDetail.property_id.beds}</p>
                                            <p style={{ color: "#898686" }}>Beds</p>
                                        </div>
                                        <div className="col-md-4 cardtext2 mt-3">
                                            <p style={{ fontFamily: "DejaVuSansBold" }}>{outboundDetail.property_id.baths}</p>
                                            <p style={{ color: "#898686" }}>Baths</p>
                                        </div>
                                        <div className="col-md-4 cardtext2 mt-3">
                                            <p style={{ fontFamily: "DejaVuSansBold" }}>{outboundDetail.property_id.square_feet.$numberDecimal}</p>
                                            <p style={{ color: "#898686" }}>Sq. Feet </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ) : null}
                    {/* <div>
                        <h6 className="prospectmessage">Message</h6>
                        <p className="prospectText">I am intrested in viewing, this text for sample pupose only.</p>
                    </div> */}
                </div>
            </Card>
        </div>
    )
}
export default OutboundDetail


import React, { useState } from "react";
import AvatarImage from "../../components/Avatar/avatarImage";
import * as styled from "./buyer.module.css"
import { Row, Col } from "react-bootstrap"
import callsimg from "../../../static/images/callsimg.png"
import chatimg from "../../../static/images/chatimg.png"
import Progressbar from "../../components/processbar"
import Chat from "../chat/chat";


function BuyerPropectDetails(props) {
    const [openChat, setOpenChat] = useState(false)
    const showChatDetail = () => {
        setOpenChat(true)
    }
    const buyerdetail=props.data
    console.log("buyerdetails",buyerdetail)
    return (
        <div>
            <div className={styled.hunterbg}>

                <Row className={styled.hunterbgName}>
                    <Row
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <Col lg="6" style={{ textAlign: "right" }}>
                            {buyerdetail.user_id.img ?
                                < img src={process.env.API_IMAGE_URL + buyerdetail.user_id.img} alt='image' className={styled.cardRowImg} />
                                : <>{buyerdetail.user_id.name ? <div style={{ width: '88px', height: '88px', marginLeft: 'auto' }}><AvatarImage fontSize={'38px'} data={buyerdetail.user_id.name ? buyerdetail.user_id.name : ''} /></div>
                                    : null}</>
                            }
                        </Col>
                        <Col lg="6">
                            <h6 className="text-capitalize buyerName">{buyerdetail.user_id.name}</h6>
                            <p>prospect Buyer</p>
                            <div className={styled.callsName}>
                                <span>
                                    <img
                                        src={callsimg}
                                        alt="callsimg.png"
                                        className="callsimg-img"
                                    />
                                </span>
                                <span>
                                    <img
                                        src={chatimg}
                                        alt="chatimg.png"
                                        className="chatimg-img"
                                        onClick={() => { showChatDetail(); }}
                                    />
                                </span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Row
                            style={{
                                marginTop: "15px",
                            }}
                        >
                            <Col className={styled.profilestatusName}>
                                {" "}
                                Buyer Profile Status{" "}
                            </Col>
                            <Col className={styled.profilestatusNo}>
                                {" "}
                                68%{" "}
                            </Col>
                            <div style={{ marginLeft: "10px" }}>
                                <Progressbar
                                    bgcolor="rgb(4, 144, 251)"
                                    progress="68"
                                    height={30}
                                />
                            </div>
                        </Row>
                        <Row></Row>
                        {/* </div> */}
                    </Row>

                    <div className={styled.searchCriettext}>
                        <div
                            style={{
                                fontFamily: "DejaVuSansBold",
                                marginLeft: "25px",
                            }}
                        >
                            Search Criteria
                        </div>
                        <Row className={styled.searchCriet}>
                            <Col style={{ padding: "0" }}>Area</Col>
                            <Col
                                style={{
                                    fontFamily: "DejaVuSansBold",
                                    textAlign: "right",
                                }}
                            >
                                {buyerdetail.buy_info.area}
                            </Col>
                        </Row>

                        <Row className={styled.searchCriet}>
                            <Col style={{ padding: "0" }}>Budget</Col>
                            <Col
                                style={{
                                    fontFamily: "DejaVuSansBold",
                                    textAlign: "right",
                                }}
                            >$ {buyerdetail.buy_info.budget}
                            </Col>
                        </Row>

                        <Row className={styled.searchCriet}>
                            <Col style={{ padding: "0" }}>Prequalified</Col>
                            <Col
                                style={{
                                    fontFamily: "DejaVuSansBold",
                                    textAlign: "right",
                                }}
                            >
                                $ {buyerdetail.buy_info.pre_qualified}
                            </Col>
                        </Row>
                        <Row className={styled.searchCriet}>
                            <Col style={{ padding: "0" }}>Type</Col>
                            <Col
                                style={{
                                    fontFamily: "DejaVuSansBold",
                                    textAlign: "right",
                                }}
                            >
                                {buyerdetail.buy_info.beds} Bed, {buyerdetail.buy_info.baths} Bath
                            </Col>
                        </Row>
                        <div
                            style={{
                                margin: "25px 25px 5px",
                                fontFamily: "DejaVuSansBold",
                            }}
                        >
                            Message
                        </div>
                        <div
                            style={{ margin: "0 25px", fontSize: "15px" }}
                        >
                            {buyerdetail.message}
                        </div>
                    </div>
                </Row>

            </div>
            {openChat ?
                <Chat />
                : null}
        </div>
    )
}
export default BuyerPropectDetails
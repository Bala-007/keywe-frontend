import React,{useState} from "react";
import Chat from "../chat/chat";
import * as style2 from '../buyerdetaipages/buyerdetail.module.css';
import { Tab, Tabs, Row, Col, Button, Card } from "react-bootstrap"
import * as styled from "../buyers/buyer.module.css"
import AvatarImage from "../../components/Avatar/avatarImage";
import user3 from "../../../static/images/house6.png"
import user5 from "../../../static/images/pink.png"
import user6 from "../../../static/images/house2.png"
import dots from "../../../static/images/Group 237.png"
import Group236 from "../../../static/images/Group 236.png"
import Mask192 from "../../../static/images/Mask Group 192.png"
import recenttour1 from "../../../static/images/recenttour1.png"
import recenttour2 from "../../../static/images/recenttour2.png"
import prequalified from "../../../static/images/prequalified.png"
import reqcircle from "../../../static/images/reqcircle.png"
import callimg from "../../../static/images/callimg.png"
import chatimg from "../../../static/images/chatimg.png"
import closebutton from "../../../static/images/Icon ionic-ios-close.png"
import arrow from "../../../static/images/arrow.png"

function BuyerDetails(props) {

const buyerData=props.data
console.log("buyer data",buyerData)
const [openChat, setOpenChat] = useState(false)
const showChatDetail = () => {
  setOpenChat(true)
}
const [open, setOpen] = useState(false)
const showDetail = () => {
  setOpen(true)
}
const toggleShow = () => setShow(p => !p)
const toggleDetail = () => setDetail(p => !p)
const [userOpen, setUserOpen] = useState(false)
const [show, setShow] = useState(false)
const [detail, setDetail] = useState(false)

const showUserDetail = () => {
    setUserOpen(true)
  }
    return (
        <Row className={styled.hunterbgName}>
            <Row style={{ marginBottom: "20px", }} >
                <Col lg="6" style={{ textAlign: "right" }}>
                    {buyerData.user_id.img ?
                        < img src={process.env.API_IMAGE_URL + buyerData.user_id.img} alt='image' className={styled.cardRowImg} />
                        : <>{buyerData.user_id.name ? <div style={{ width: '88px', height: '88px', marginLeft: 'auto' }}><AvatarImage fontSize={'38px'} data={buyerData.user_id.name ? buyerData.user_id.name : ''} /></div>
                            : null}</>
                    }
                </Col>
                <Col lg="6">
                    <h6 className="text-capitalize buyerName" >{buyerData.user_id.name}</h6>
                    <div className={styled.callsName}>
                        <span>
                            <img src={callimg} alt="callimg.png" className="callimg-img" />
                        </span>
                        <span>
                            <img src={chatimg}
                                alt="chatimg.png"
                                className="chatimg-img"
                                onClick={() => { showChatDetail(); }} />
                        </span>
                    </div>
                </Col>
            </Row>
            <Row className={styled.negotiation}>
                <Row style={{ marginTop: "8px" }}>
                    <div className="sellertour-text">
                        Active Negotiation
                    </div>
                    <div style={{ fontSize: "15px" }}>
                        <img
                            className={styled.negotiationimg}
                            alt="user"
                            src={user5}
                        />
                        Waiting on Seller
                    </div>
                </Row>
                <Row>
                    <Col lg="4">
                        <img className="mt-15" src={user3} />
                    </Col>
                    <Col>
                        <div className="mlt-30">
                            <div className="mt-25">
                                123 Scotland Dr Saratoga, CA 95070
                            </div>
                            <div className="mt-10">List $2,900,000</div>
                            <div
                                style={{
                                    fontFamily: "DejaVuSansBold",
                                }}
                            >
                                Offer $2,800,000
                            </div>
                        </div>
                    </Col>
                </Row>
                {/* </div> */}
                <div
                    className="d-grid gap-1"
                    style={{ margin: "20px 0px 10px" }}
                >
                    <Button
                        onClick={showDetail}
                        style={{
                            height: "45px",
                            background: "#0490fb",
                            border: "#0490fb",
                        }}
                        variant="primary"
                    >
                        View Details
                    </Button>
                    {open ? (
                        <div>
                            <div className={styled.imagedetails}>
                                <img
                                    src={Mask192}
                                    alt="mask192"
                                    className={styled.inthomeImage}
                                />

                                <img
                                    src={closebutton}
                                    alt="closebutton"
                                    className={styled.closebutton2}
                                    onClick={() => setOpen(false)}
                                />
                                <img
                                    src={Group236}
                                    alt="group236"
                                    className={styled.upload2}
                                />
                                <img
                                    src={dots}
                                    alt="dots"
                                    className={styled.dots2}
                                />

                                <div className={styled.memberdetails}>
                                    {/* <img
                                        src={memberIcon}
                                        alt="memberIcon"
                                        className={styled.memberIcon}
                                      /> */}
                                    {/* <button
                                        type="button"
                                        className={styled.memberbut2}
                                      >
                                        Members only
                                      </button> */}
                                </div>
                            </div>
                            <div className={styled.housedetail}>
                                <p className={styled.housesale}>
                                    HOUSE FOR SALE
                                </p>
                                <p className={styled.pricehouse}>$164,000</p>
                            </div>
                            <div className={styled.headContent}>
                                <h5 className={styled.intaddess}>
                                    5507 SE 1st Ct,
                                </h5>
                                <h5 className={styled.intaddess}>
                                    Des Moines, IA 50315
                                </h5>
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
                                            <p>
                                                <b>4</b>
                                            </p>
                                            <p style={{ color: "#898686" }}>Beds</p>
                                        </div>
                                        <div className="col-md-4 cardtext2 mt-3">
                                            <p>
                                                <b>4</b>
                                            </p>
                                            <p style={{ color: "#898686" }}>
                                                Baths
                                            </p>
                                        </div>
                                        <div className="col-md-4 cardtext2 mt-3">
                                            <p>
                                                <b>2,819</b>
                                            </p>
                                            <p style={{ color: "#898686" }}>
                                                Sq. Feet
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="d-grid gap-1">
                    <Button
                        onClick={toggleShow}
                        style={{ height: "45px" }}
                        variant="outline-primary"
                    >
                        Edit Profile
                    </Button>
                </div>
            </Row>
            <div style={{ marginTop: "20px", padding: "0px 25px" }}>
                <Row>
                    <div
                        className="d-grid gap-1"
                        style={{ margin: "0px" }}
                    >
                        <Button
                            onClick={showUserDetail}
                            variant="outline-primary"
                            style={{ height: "45px" }}
                        >
                            2 Upcoming Tours
                        </Button>
                        {userOpen ? (
                            <div>
                                <p className={styled.upcomingtour}>
                                    Upcoming Tours
                                </p>
                                <div className={styled.dateoftour}>
                                    <div className={styled.tourdetail}>
                                        <div onClick={toggleDetail}>
                                            <p className={styled.tourDate}>
                                                wed.Feb.2 PM
                                            </p>
                                            <p>Julie Parker</p>
                                        </div>
                                        <img
                                            src={arrow}
                                            alt="arrow"
                                            className={styled.arrow}
                                        />
                                    </div>
                                    <hr />
                                    <div className={styled.tourdetail}>
                                        <div>
                                            <p className={styled.tourDate}>
                                                wed.Feb.4 PM
                                            </p>
                                            <p>RON & Jamey Maki</p>
                                        </div>
                                        <img
                                            src={arrow}
                                            alt="arrow"
                                            className={styled.arrow}
                                        />
                                    </div>
                                </div>

                                <div className={styled.activity}>
                                    <div>
                                        <p
                                            style={{ fontFamily: "DejaVuSansBold" }}
                                        >
                                            Tour Activity
                                        </p>
                                    </div>
                                    <div>
                                        <select
                                            className={styled.week}
                                            name="calender"
                                            id="calender"
                                        >
                                            <option value="week">This Week</option>
                                            <option value="day">Today</option>
                                            <option value="month">
                                                This Month
                                            </option>
                                            <option value="year">This Year</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={styled.totaltour}>
                                    <div>
                                        <p
                                            style={{
                                                fontFamily: "DejaVuSansBold",
                                                margin: "0px",
                                            }}
                                        >
                                            12
                                        </p>
                                        <p>Total tours</p>
                                    </div>
                                    <div className={styled.totalcontent}>
                                        <p
                                            style={{
                                                fontFamily: "DejaVuSansBold",
                                                margin: "0px",
                                            }}
                                        >
                                            0
                                        </p>
                                        <p>Repeate tours</p>
                                    </div>
                                </div>
                                <div className={styled.tourback}>
                                    <p>Buyer also toured</p>
                                    <div className={styled.tourImagedetail}>
                                        <div>
                                            <img
                                                src={recenttour1}
                                                alt="recenttour1"
                                                className={styled.recenttour1}
                                            />
                                        </div>
                                        <div className={styled.recenttoursText}>
                                            <p style={{ margin: "0px" }}>
                                                1038 Redway place
                                            </p>
                                            <p style={{ margin: "0px" }}>
                                                Saratoga, CS 95071
                                            </p>
                                            <p style={{ margin: "0px" }}>
                                                3 bed,3 bath
                                            </p>
                                            <p style={{ margin: "0px" }}>5 Tours</p>
                                            <p>26 Days on Market</p>
                                        </div>

                                        <div>
                                            <p className={styled.recenttoursNum}>
                                                $2,799,000
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styled.tourImagedetail}>
                                        <div>
                                            <img
                                                src={recenttour2}
                                                alt="recenttour2"
                                                className={styled.recenttour1}
                                            />
                                        </div>
                                        <div className={styled.recenttoursText}>
                                            <p style={{ margin: "0px" }}>
                                                {" "}
                                                1890 Fulton st
                                            </p>
                                            <p style={{ margin: "0px" }}>
                                                Saratoga, CA 95071
                                            </p>
                                            <p style={{ margin: "0px" }}>
                                                3 bed,4 bath
                                            </p>
                                            <p style={{ margin: "0px" }}>
                                                10 Tours
                                            </p>
                                            <p>12 Days on Market</p>
                                        </div>
                                        <div>
                                            <p className={styled.recenttoursNum}>
                                                $2,658,000
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </Row>
            </div>
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
                        {buyerData.buy_info.area}
                    </Col>
                </Row>

                <Row className={styled.searchCriet}>
                    <Col style={{ padding: "0" }}>Budget</Col>
                    <Col
                        style={{
                            fontFamily: "DejaVuSansBold",
                            textAlign: "right",
                        }}
                    >$ {buyerData.buy_info.budget}
                    </Col>
                </Row>

                <Row className={styled.searchCriet}>
                    <Col style={{ padding: "0" }}>
                        <img
                            src={prequalified}
                            alt="prequalified.png"
                            className="prequalified-img"
                        />
                        Prequalified
                    </Col>
                    <Col
                        style={{
                            fontFamily: "DejaVuSansBold",
                            textAlign: "right",
                        }}
                    >
                        {buyerData.buy_info.pre_qualified}
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
                        {buyerData.buy_info.beds} Bed, {buyerData.buy_info.baths} Bath
                    </Col>
                </Row>
                <Row className={styled.searchCriet}>
                    <Col style={{ padding: "0" }}>Requirements</Col>
                    <Col
                        style={{
                            fontFamily: "DejaVuSansBold",
                            textAlign: "right",
                        }}
                    >
                        Pool, Private Yard
                    </Col>
                </Row>
                <div
                    style={{ textAlign: "center", marginTop: "20px" }}
                >
                    <img
                        src={reqcircle}
                        alt="reqcircle.png"
                        className="reqcircle-img"
                    />
                </div>
            </div>
            <div style={{ marginTop: "20px" }}>
                <div
                    style={{
                        background: "#f0f0f0",
                        padding: "10px 20px",
                    }}
                >
                    <div className={styled.savedText}>
                        <div className="sellertour-text">Saved</div>
                        <div className={styled.savedSale}>
                            {" "}
                            Probability of Sale{" "}
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <div className={styled.sanfranImg}>
                                <img alt="user6" src={user6} className={styled.sanfranImages} />
                                <div>
                                    <p style={{ margin: "0" }} >1003 Betu path</p>
                                    <p style={{ margin: "0" }}>Saratoga, CA 95070</p>
                                    <p className="buyerdetailcardprice">$2,830,000</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className={styled.sanfranImg}>
                                <img alt="user6" src={user6} className={styled.sanfranImages} />
                                <div>
                                    <p style={{ margin: "0" }} >1003 Betu path</p>
                                    <p style={{ margin: "0" }}>Saratoga, CA 95070</p>
                                    <p className="buyerdetailcardprice">$2,830,000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        background: "transparent",
                        padding: "10px 20px",
                    }}
                >
                    <div className={styled.savedText}>
                        <div className="sellertour-text">
                            Recently Saved
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <div className={styled.sanfranImg}>
                                <img alt="user6" src={user6} className={styled.sanfranImages} />
                                <div >
                                    <p style={{ margin: "0" }}>1003 Betu path</p>
                                    <p style={{ margin: "0" }}>Saratoga, CA 95070</p>
                                    <p className="buyerdetailcardprice">$2,830,000</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div className={styled.sanfranImg}>
                                <img alt="user6" src={user6} className={styled.sanfranImages} />
                                <div >
                                    <p style={{ margin: "0" }}>1003 Betu path</p>
                                    <p style={{ margin: "0" }}>Saratoga, CA 95070</p>
                                    <p className="buyerdetailcardprice">$2,830,000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h6 className="sellerrecently">Recommended</h6>
                    <div className={style2.recenttourdetail1}>
                        <img src={recenttour1} alt="recenttour1" className={style2.recenttourImage} />
                        <div className={style2.touraddress}>
                            <p className="buyerdetailcardprice">$2,600,000</p>
                            <p>885 Ronec Way Saratoga, CA 95070</p>
                            <p>3 bed, 3 bath</p>
                        </div>
                    </div>
                    <div className={style2.recenttourdetail2}>
                        <img src={recenttour2} alt="recenttour2" className={style2.recenttourImage} />
                        <div className={style2.touraddress}>
                            <p className="buyerdetailcardprice">$2,830,000</p>
                            <p>1003 Betu path Saratoga, CA 95070</p>
                            <p>3 bed, 2.5 bath</p>
                        </div>
                    </div>
                    <div className={style2.recenttourdetail2}>
                        <img src={recenttour2} alt="recenttour2" className={style2.recenttourImage} />
                        <div className={style2.touraddress}>
                            <p className="buyerdetailcardprice">$2,830,000</p>
                            <p>885 Ronec Way Saratoga, CA 95070</p>
                            <p>3 bed, 2.5 bath</p>
                        </div>
                    </div>
                </div>
            </div>
            {openChat ?
                <Chat />
                : null}
        </Row>
    )

}
export default BuyerDetails
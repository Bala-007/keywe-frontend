import React, { useState, useEffect } from "react"
import Mask192 from "../../../static/images/Mask Group 192.png"
import Mask193 from "../../../static/images/Mask Group 193.png"
import Mask190 from "../../../static/images/Mask Group 190.png"
import Image90 from "../../../static/images/Image 90.png"
import dots from "../../../static/images/Group 237.png"
import memberIcon from "../../../static/images/memberIcon.png"
import phonintrest from "../../../static/images/phoneintrest.png"
import msgint from "../../../static/images/msgint.png"
import Group236 from "../../../static/images/Group 236.png"
import closebutton from "../../../static/images/Icon ionic-ios-close.png"
import * as styled from "../buyers/buyer.module.css"
import { Modal, Button, Card } from "react-bootstrap"
import Bar from "../bars/bar"
import { propertyActivity } from "../../components/Api/ListingApi";
import { RWebShare } from "react-web-share"
import { useLocation } from '@reach/router';
import { navigate } from "@reach/router";

function IntrestedPropertyDetail(props) {
  const { data, similarProperty } = props
  const agentDetails = data
  const [isImage, setIsImage] = useState(false)
  const showDetail = (e) => {
    e.preventDefault()
    setIsImage(true)
    console.log('hi')
  }
  const location = useLocation();

  console.log('agent details', props)
  const [activityDetails, setActivityDetails] = useState({});

  useEffect(async () => {
    getPropertyActivity("this_week");
  }, [])
  //Property Activity Api//
  const getPropertyActivity = async (e) => {

    let id = props.data.property_id._id
    // console.log('propertyid...',id)
    let params = {

      date_filter: e.target !== undefined ? e.target.value : "this_week"

    }
    console.log(id,params)
    await propertyActivity(id, params)
      .then((res) => {
        setActivityDetails(res.data.data)
        console.log("ProprtyActivity...", res)
      })
  }
  const handleRoute=(id)=>{
    navigate(`/dashboard/detail/${id}`)
  }

  return (
    <div>
      <Card style={{ background: 'rgb(255, 255, 255)' }}>
        <div style={{ margin: '17px 18px', padding: '10px', border: '2px solid #f8f7f7' }}>

          <div className="row" style={{ alignItems: "center" }}>
            <div className="col-md-6" style={{ textAlign: "right" }}>
              <img src={Mask193} alt="mask193" />
            </div>
            <div className="col-md-6" style={{ marginTop: "20px" }}>
              <p>Listing Agent</p>
              <p>
                <b>Kathy Morgan</b>
              </p>
              <p>coldwell Banker</p>
              <div>
                <img
                  src={phonintrest}
                  alt="phonintrest"
                  className={styled.phonintrest}
                />
                <img src={msgint} alt="msgint" className={styled.msgint} />
              </div>
            </div>
          </div>
          <div className={styled.intaddress}>
            <p>
              <b>5507 SE 1st Ct,</b>
            </p>
            <p>
              <b>Des Moines, IA 50315</b>
            </p>
            <p>$164,000 12Days on the Market</p>
            <p>Status-Actively Showing</p>
          </div>
          <Button variant="primary" className={styled.viewbut2} onClick={showDetail}>
            View Property Details
          </Button>
          {isImage && agentDetails ? (
            <div>
              <div className={styled.imagedetails}>
                <img src={agentDetails.property_id.thumbnail_image} alt="mask192" className={styled.inthomeImage} onClick={()=>handleRoute(agentDetails.property_id._id)}/>

                <img
                  src={closebutton}
                  style={{ cursor: 'pointer' }}
                  alt="closebutton"
                  className={styled.closebutton2}
                  onClick={() => setIsImage(false)}
                />
                <RWebShare
                  data={{
                    text: "",
                    url: location.origin + '/dashboard/detail/' + agentDetails.property_id._id,
                    title: "Share your property",
                  }}
                >
                  <img src={Group236} alt="group236" className={styled.upload2} />
                </RWebShare>
                <img src={dots} alt="dots" className={styled.dots2} />

                <div className={styled.memberdetails}>
                  {/* <img
                    src={memberIcon}
                    alt="memberIcon"
                    className={styled.memberIcon}
                  /> */}
                  {/* <button type="button" className={styled.memberbut2}>
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
                      <p>
                        <b>{agentDetails.property_id.beds}</b>
                      </p>
                      <p style={{ color: "#898686" }}>Beds</p>
                    </div>
                    <div className="col-md-4 cardtext2 mt-3">
                      <p>
                        <b>{agentDetails.property_id.baths}</b>
                      </p>
                      <p style={{ color: "#898686" }}>Baths</p>
                    </div>
                    <div className="col-md-4 cardtext2 mt-3">
                      <p>
                        <b>{agentDetails.property_id.square_feet.$numberDecimal}</b>
                      </p>
                      <p style={{ color: "#898686" }}>Sq. Feet</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ) : null}
          <Button variant="primary" className={styled.viewdisbut}>
            View Disclosures
          </Button>
          <div className={styled.activity}>
            <div>
              <p>
                <b>Activity</b>
              </p>
            </div>
            <div >
              <select className={styled.week} name="calender" id="calender" onChange={getPropertyActivity}>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
                <option value="six_month">Six Month</option>
                <option value="this_year">This Year</option>
                <option value="all_year">All Year</option>
              </select>
            </div>
          </div>
          <div>
            <Bar activity={activityDetails} />
          </div>
          <div>
            <div>
              <div className={styled.viewdetails}>
                <div>
                  <p className={styled.viewtext1}>Viewership</p>
                  <p style={{ fontFamily: "DejaVuSansBold" }}>25%</p>
                </div>
                <div>
                  <p className={styled.viewtext2}>Downloads</p>
                  <p style={{ fontFamily: "DejaVuSansBold" }}>3</p>
                </div>
                <div>
                  <p className={styled.viewtext3}>Offers</p>
                  <p style={{ fontFamily: "DejaVuSansBold" }}>1</p>
                </div>
              </div>
            </div>
            <div>
              <button className={styled.otherbut2} type="button">
                2 other people are viewing this property now
              </button>
            </div>
          </div>
          {/* <div className="row m-0">
          <div className={styled.similarback}>
            <h6 className={styled.similar}>Similar Properties</h6>
            <div className={styled.simCard}>
              <Card className={styled.propCard}>
                <div>
                  <img
                    src={Image90}
                    alt="image90"
                    width={200}
                    height={150}
                    className={styled.propImage}
                  />
                   <div className={styled.cardtext2}>
                    <p style={{margin:"0"}}>1038 Redway Place</p>
                    <p style={{margin:"0"}}>Saratoga, CA 95071</p>
                    <p style={{fontFamily:"DejaVuSansBold",margin:"0"}}>$2,799,000</p>
                  </div>
                </div>
              </Card>
              <Card className={styled.propCard}>
                <div>
                  <img
                    src={Mask190}
                    alt="Mask193"
                    width={200}
                    height={150}
                    className={styled.propImage}
                  />
                  <div className={styled.cardtext2}>
                    <p style={{margin:"0"}}>1038 Redway Place</p>
                    <p style={{margin:"0"}}>Saratoga, CA 95071</p>
                    <p style={{fontFamily:"DejaVuSansBold",margin:"0"}}>$2,799,000</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div> */}
        </div>
      </Card>
    </div>
  )
}
export default IntrestedPropertyDetail

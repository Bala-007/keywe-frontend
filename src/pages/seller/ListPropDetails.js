import React, { useState, useEffect } from "react"
import * as styles from "../../pages/seller/sellerProp.module.css"
import "react-multi-carousel/lib/styles.css"
import "bootstrap/dist/css/bootstrap.css"
import { Card } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/fontawesome-free-solid"
import { RiUpload2Line, RiCloseLine } from "react-icons/ri"
import { HiDotsHorizontal } from "react-icons/hi"
import image92 from "../../../static/images/Image 92.png"
import { Button } from "react-bootstrap"
import PropActivity from "../../components/Seller/PropActivity"
import RealVitalize from "../../components/Seller/RealVitalize"
import RecentlySold from "../../components/Seller/RecentySold"
import SimilarProperty from "../../components/Seller/SimilarProperty"
import ListDocument from "../../components/Seller/ListDocument"
import ActiveOffers from "../../components/Seller/ActiveOffers"
import PropBar from "../bars/PropBar"
import RoundBar from "../bars/RoundBar"
import GalleryActivity from "../../components/Seller/GalleryActivity"
import { propertyActivity } from '../../components/Api/ListingApi'


function ListPropDetails(props) {
  const [isOpen, setIsopen] = useState(false)
  const [activityDetails, setActivityDetails] = useState({});
  const [show, setShow] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const toggleShow = () => setShow(p => !p)
  const toggleShowChat = () => setShowChat(p => !p)
  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true)
  }

  const listingDetails = props.data
  console.log("listingdetails...", listingDetails)


  useEffect(async () => {
    getPropertyActivity("this_week");
  }, [])
  const getPropertyActivity = async (e) => {
    let id = props.data.property_id._id
    let params = {
      date_filter: e.target !== undefined ? e.target.value : "this_week"
    }
    await propertyActivity(id,params)
      .then((res) => {
        setActivityDetails(res.data.data)
        console.log("ProprtyActivity...", res)
      })
  }

  return (
    <div
      // className={styles.propback}
      id="mySidenav"
    >
      <Card
        // className={styles.descriptioncard4}
        style={{
          background: 'rgb(255, 255, 255)',
        }}
      >
        <div className="row " style={{ margin: '17px 18px', padding: '10px', border: '2px solid #f8f7f7' }}>
          <div className={styles.imagedetails}>
            <img src={listingDetails.property_id.thumbnail_image} alt="image92" className={styles.imageBack1} />
            <div className={styles.iconBack}>
              <span className={styles.iconCircle}>
                <RiUpload2Line size={25} />
              </span>
            </div>
            <div className={styles.iconBack1}>
              <span className={styles.iconCircle}>
                <HiDotsHorizontal size={25} />
              </span>
            </div>
            <div className={styles.iconBack2}>
              <RiCloseLine size={35} fill={"#fff"} />
            </div>
            <div className={styles.iconBack3}>
              <span className={styles.iconCircle2}>
                <p style={{ fontSize: "16px", fontFamily: "DejaVuSansBold", }}>15</p>
              </span>
            </div>

            <div className={styles.memberdetails}>
              {/* <img
                src={memberIcon}
                alt="memberIcon"
                className={styles.memberIcon}
              /> */}
              {/* <button type="button" className={styles.memberbut2}>
                Members only
              </button> */}
            </div>
          </div>
          <div className="row m-0" style={{ paddingTop: "20px" }}>
            <div className="col-md-8 p-0">
              <p className={styles.housetext1}>HOUSE FOR SALE</p>
              <p className={styles.houseSale}>{listingDetails.property_id.address.split(',').slice(0).shift()}</p>
              <p className={styles.houseSale}>{listingDetails.property_id.address.split(",").slice(1).join(",")}</p>
            </div>
            <div className="col-md-4">
              <p className={styles.memberSale}>${listingDetails.property_id.price.$numberDecimal}</p>
            </div>
          </div>
          <div className={styles.dashboardActive1}>
            <i className="fa fa-circle" style={{ color: "#6dd400", fontSize: "24px", display: "flex", }}></i>
            <p style={{ marginLeft: "5px" }}>Actively Showing</p>
          </div>
          <div>
            <Card
              className={styles.detCard1}
              style={{ borderRadius: "15px", boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)", }}>
              <div className="row m-0">
                <div className="col-md-4 cardtext2 mt-3">
                  <p style={{ fontFamily: "DejaVuSansBold" }}>{listingDetails.property_id.beds}</p>
                  <p style={{ color: "#898686" }}>Beds</p>
                </div>
                <div className="col-md-4 cardtext2 mt-3">
                  <p style={{ fontFamily: "DejaVuSansBold" }}>{listingDetails.property_id.baths}</p>
                  <p style={{ color: "#898686" }}>Baths</p>
                </div>
                <div className="col-md-4 cardtext2 mt-3">
                  <p style={{ fontFamily: "DejaVuSansBold" }}>{listingDetails.property_id.square_feet.$numberDecimal}</p>
                  <p style={{ color: "#898686" }}>Sq. Feet</p>
                </div>
              </div>
            </Card>
          </div>
          <div className={styles.schedulbut}>
            <Button className="view-btn" variant="primary" onClick={toggleShow}>
              View Details
            </Button>

            <Button
              className="view-btn"
              variant="primary"
              onClick={toggleShowChat}
            >
              View Disclosures
            </Button>
          </div>
          <div className={styles.activity}>
            <div>
              <p
                className="pt-3"
                style={{ fontFamily: "DejaVuSansBold", fontSize: "15px" }}
              >
                Activity
              </p>
            </div>
            <div>
              <select className={styles.week1} name="calender" id="calender" onChange={getPropertyActivity}>
                <option value="week">This Week</option>
                <option value="day">Today</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
          <div>
            <PropBar />
          </div>

          <div className={styles.viewdetails1}>
            <div>
              <p className={styles.viewtext}>
                Viewership
                <p>
                  <b>25%</b>
                </p>
              </p>
            </div>
            <div>
              <p className={styles.viewtext}>
                Downloads
                <p>
                  <b>3</b>
                </p>
              </p>
            </div>
            <div>
              <p className={styles.viewtext}>
                Offers{" "}
                <p>
                  <b>1</b>
                </p>
              </p>
            </div>
          </div>

          <div>
            <button className={styles.otherbut1} type="button">
              2 other people are viewing this propert now
            </button>
          </div>
        </div>

        <SimilarProperty />
        <div className={styles.keyEstimatorbtn}>
          <Button className="viewdisclosure-btn" variant="primary">
            Keywe Estimator
          </Button>
        </div>
        <hr />
        {/* <div className={styles.meterBar}> */}
        <Card
          className={styles.circularBack}
          style={{
            boxShadow:
              "0 1px 4px rgb(82 80 80 / 10%), inset 0 0 40px rgb(135 128 128 / 5%)",
          }}
        >
          <div>
            <span className={styles.numzero}>0</span>
            <span className={styles.numone}>25</span>
            <span className={styles.numtwo}>50</span>
            <span className={styles.numthree}>75</span>
            <span className={styles.numfour}>100</span>
          </div>
          <RoundBar />
          {/* </div> */}
        </Card>
        <div className="row m-0">
          <div style={{ paddingTop: "20px", fontSize: "12px" }}>
            <p>These factors are affecting ranking.</p>
            <hr />
          </div>
          <PropActivity />
        </div>
        <div>
          <GalleryActivity />
        </div>

        <div>
          <RealVitalize />
        </div>
        <div>
          <RecentlySold />
        </div>
      </Card>
    </div>
  )
}
export default ListPropDetails

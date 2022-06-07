import React from "react"
import { useState } from "react"
import "font-awesome/css/font-awesome.min.css"
import { Card } from "react-bootstrap"
import "react-multi-carousel/lib/styles.css"
import * as style1 from "../dashboard/detail.module.css"
import * as styles from "../seller/sellerProp.module.css"
import Mask38 from "../../../static/images/Mask Group 38.png"
import Mask39 from "../../../static/images/Mask Group 39.png"
import Mask40 from "../../../static/images/Mask Group 40.png"
import Mask41 from "../../../static/images/Mask Group 42.png"
import Mask42 from "../../../static/images/Mask Group 42.png"
import Mask43 from "../../../static/images/Mask Group 43.png"
import Mask44 from "../../../static/images/Mask Group 44.png"
import image95 from "../../../static/images/Image 95.png"
// import image96 from '../../../static/images/Image 96.png';
import Layout from "../../components/Layout"

function PropertyDetails() {
  return (
    <Layout>
    <div className={styles.propDetails}>
      <div className="col-md-4">
        <div className="row m-0">
          <div className="col-md-8">
            <p className={style1.housetext}>HOUSE FOR SALE</p>
            <p>
              <b>123 Scotland DE</b>
            </p>
            <p>
              <b>Saratoga, CA 95070</b>
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <b>$120,000</b>
            </p>
            <button type="button" className={style1.memberbut}>
              Members only
            </button>
          </div>
        </div>
        <div>
          <p className={style1.incredibletext}>
            Incredible remodeled single story family home located in one of
            Saratoga's finest neighborhoods with award winning Saratoga schools
            incredible remodeled single story family home located in one of
            Saratoga's finest neighborhoods with award winning Saratoga
            schools...
          </p>
          <i className="fa fa-heart"></i>
          <i className="fas fa-upload"></i>
        </div>
        <div>
          <Card className={style1.detCard}>
            <div className="row">
              <div className="col-md-4">
                <p>4</p>
                <p>Beds</p>
              </div>
              <div className="col-md-4">
                <p>4</p>
                <p>Baths</p>
              </div>
              <div className="col-md-4">
                <p>2,819</p>
                <p>Sq. Feet</p>
              </div>
            </div>
          </Card>
        </div>

        <div className={style1.activity}>
          <div>
            <p>
              <b>Activity</b>
            </p>
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
        <div>{/* bar details */}</div>
        <div className="row m-0">
          <div className="col-md-5">
            <div className="row m-0">
              <div className="col-md-4">
                <p className={style1.viewtext}>Viewership</p>
                <p>
                  <b>25%</b>
                </p>
              </div>
              <div className="col-md-4">
                <p className={style1.viewtext}>Downloads</p>
                <p>
                  <b>3</b>
                </p>
              </div>
              <div className="col-md-4">
                <p className={style1.viewtext}>Offers</p>
                <p>
                  <b>1</b>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <button className={style1.otherbut} type="button">
              2 other people are viewing this propert now
            </button>
          </div>
        </div>

        <button type="button" className={style1.viewbut}>
          View  Disclosures & Reports
        </button>
      </div>
    </div>
    </Layout>
  )
}
export default PropertyDetails

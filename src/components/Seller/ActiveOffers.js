import React from "react"
import * as styles from "../../pages/seller/sellerProp.module.css"
import "react-multi-carousel/lib/styles.css"
import "bootstrap/dist/css/bootstrap.css"
import Mask192 from "../../../static/images/Mask Group 192.png"
function ActiveOffers() {
  return (
    <div className="row">
      <div className="col-md-16">
        <hr />
        <p className={styles.activeOffer}>Active Offers</p>

        <div className="row">
          <div className="col-md-4">
            <img src={Mask192} alt="Mask192" className={styles.homeImage} />
          </div>
          <div
            className="col-md-8"
            style={{
              paddingLeft: "60px",
              marginBottom: "10px",
            }}
          >
            <div className={styles.dashboardActive2}>
              <i
                className="fa fa-circle"
                style={{ color: "#fa6400", fontSize: "16px" }}
              ></i>
              <p style={{ marginLeft: "5px", fontSize: "14px" }}>
                Waiting on Seller
              </p>
            </div>
            <p style={{ fontSize: "12px" }}>
              5507 SE 1st Ct,Des Moines, IA 50315
            </p>
            <p
              style={{
                fontSize: "12px",
                fontFamily: "DejaVuSansBold",
                marginTop: "20px",
              }}
            >
              Agent
              <br />
              <p style={{ color: "#0490fb" }}>Samuel Smith</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveOffers

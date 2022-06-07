import React, { useState } from "react"
import Layout from "../../components/Layout"
import * as styles from "../../pages/seller/sellerProp.module.css"
import "react-multi-carousel/lib/styles.css"
import "bootstrap/dist/css/bootstrap.css"
import { Card } from "react-bootstrap"
import home1 from "../../../static/images/home1.png"
import home2 from "../../../static/images/home2.png"
import Mask38 from "../../../static/images/Mask Group 38.png"
import Prop1 from "../../../static/images/Prop1.png"
import Prop2 from "../../../static/images/Prop2.png"
import Prop3 from "../../../static/images/Prop3.png"
import Prop4 from "../../../static/images/Prop4.png"
import PropMap from "../../pages/seller/PropDetailMap"

function PropSideBar() {
  const [isOpen, setIsopen] = useState(false)

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true)
  }

  return (
    <div>
      <div className={styles.descriptioncard2}>
        <Card
          className={styles.descriptioncard3}
          style={{
            borderRadius: "25px",
            boxShadow:
              "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)",
          }}
        >
          <div className="row m-0" style={{ padding: "20px" }}>
            <div className="col-md-8">
              <p className={styles.homedescription1}>
                <b>
                  5507 SE 1st Ct, <br /> Des Moines, IA 50315
                </b>
              </p>
            </div>
            <div className="col-md-4">
              <p>
                <b>$164,000</b>
              </p>
            </div>
          </div>
          <div>
            <p className={styles.incredibletext}>
              Incredible remodeled single story family home located in one of
              Saratoga's finest neighborhoods with award winning Saratoga
              schools incredible remodeled single story family home located in
              one of Saratoga's finest neighborhoods with award winning Saratoga
              schools...
            </p>
          </div>
          <div className={styles.detailIcon}>
            <span className={styles.circle}>
              <i className="fa fa-heart" style={{ color: "#4283D9" }}></i>
            </span>
            <span className={styles.upload}>
              {" "}
              <i className="fa fa-upload"></i>
            </span>
          </div>
          <div>
            <Card
              className={styles.detCard1}
              style={{
                borderRadius: "10px",
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
                  <p style={{ color: "#898686" }}>Baths</p>
                </div>
                <div className="col-md-4 cardtext2 mt-3">
                  <p>
                    <b>2,819</b>
                  </p>
                  <p style={{ color: "#898686" }}>Sq. Feet</p>
                </div>
              </div>
            </Card>
            <div>
              <PropMap />
            </div>
          </div>

          <div className={styles.ImageView1}>
            <img
              src={Mask38}
              alt="mask38"
              style={{
                height: "300",
                width: "449px",
                display: "flex",
                margin: "0 auto",
              }}
            />

            <div
              className="row"
              style={{
                paddingLeft: "5px",
                paddingRight: "15px",
              }}
            >
              <div className="col-md-6">
                <img src={Prop1} alt="prop1" className={styles.ImageView3} />
              </div>
              <div className="col-md-6">
                <img src={Prop2} alt="prop2" className={styles.ImageView3} />
              </div>
            </div>

            <div
              className="row"
              style={{
                paddingLeft: "5px",
                paddingRight: "15px",
              }}
            >
              <div className="col-md-6">
                <img src={Prop3} alt="prop3" className={styles.ImageView3} />
              </div>
              <div className="col-md-6">
                <img src={Prop4} alt="prop4" className={styles.ImageView3} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default PropSideBar

import React, { useState } from "react"
import * as styles from "../../pages/seller/sellerProp.module.css"
import "react-multi-carousel/lib/styles.css"
import "bootstrap/dist/css/bootstrap.css"

import Mask38 from "../../../static/images/Mask Group 38.png"
import Prop1 from "../../../static/images/Prop1.png"
import Prop2 from "../../../static/images/Prop2.png"
import Prop3 from "../../../static/images/Prop3.png"
import Prop4 from "../../../static/images/Prop4.png"

function HouseDetails(props) {
  console.log(props.image)
  return (
    <div className={styles.ImageView1}>
      <img
        src={props.image.thumbnail_image}
        alt="mask38"
        style={{
          width:"100%"
        }}
      />

      <div
        className="row overflow-auto"
        style={{height:"305px",marginTop:"10px"}}
      >
        {props.image.images.map((item,index)=>(
          <div className="col-md-6" key={index} >
            <img src={item.url} alt={item.image_name} className={styles.ImageView3} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default HouseDetails
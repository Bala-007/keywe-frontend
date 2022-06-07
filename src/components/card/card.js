import React from 'react'
import { Card } from "react-bootstrap"
import * as styles from "../../pages/seller/sellerProp.module.css"
import home3 from "../../../static/images/home3.png"
import { imageLike } from '../Api/ListingApi'

export default function Cards(props) {
    const item = props.data
    // const hanldeLike=()=>{
    //     props.like()
    // }
    const hanldeLike=(id)=>{
        let userId=localStorage.getItem('userId')
        if(userId !== null){
            props.loader()
            imageLike(userId,id).then((res)=>{
                props.reLoadPage()
            })
        }
      }
    const hanldeAgentDetails=()=>{
        props.agentDetails()
    }
    return (
        <Card
            className={styles.carouselCard}
            style={{
                borderRadius: "25px",
                boxShadow:
                    "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)",
            }}
        >
            <div className={styles.favorite} >
                <img
                    src={item.property_id !== null &&item.property_id.thumbnail_image  }
                    alt="home3"
                    className={styles.carouselImage}
                    onClick={hanldeAgentDetails}
                />
                <div className={styles.favorite1} onClick={()=>hanldeLike(item.property_id._id)}>
                    <span className={styles.circle}>
                        <i className="fa fa-heart" style={{ color:item.isLike !== undefined?"red": "white" }}></i>
                    </span>
                </div>
            </div>
            <div className="row m-0">
                <div className="col-md-8 cardtext1">
                    <p>{item.property_id.address.split(',').slice(0).shift()}</p>
                    <p>{item.property_id.address.split(",").slice(1).join(",")}</p>
                </div>
                <div className="col-md-4 cardtext1">
                    <div className={styles.dashboardActive}>
                        <i className="fa fa-circle" style={{ color: "#03B45B" }} ></i>
                        <p style={{ marginLeft: "5px" }}>Active</p>
                    </div>
                </div>
            </div>
            <div className="row m-0">
                <div className="col-md-4">
                    <p>
                        <b>${item.property_id.price.$numberDecimal}</b>
                    </p>
                </div>
                <div className="col-md-8 cardtext2">
                    <div className={styles.beds}>
                        <div>
                            <p>
                                <b>{item.property_id.beds}</b>
                            </p>
                            <p style={{ color: "#898686" }}>Beds</p>
                        </div>
                        <div>
                            <p>
                                <b>{item.property_id.baths}</b>
                            </p>
                            <p style={{ color: "#898686" }}>Baths</p>
                        </div>
                        <div>
                            <p>
                                <b>{item.property_id.square_feet.$numberDecimal}</b>
                            </p>
                            <p style={{ color: "#898686" }}>Sq.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

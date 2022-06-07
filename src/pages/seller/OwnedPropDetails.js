import React, { useEffect, useState } from "react"
import * as styles from "../../pages/seller/sellerProp.module.css"
import "react-multi-carousel/lib/styles.css"
import "bootstrap/dist/css/bootstrap.css"
import closebutton from "../../../static/images/Icon ionic-ios-close.png"
import { Card, Button } from "react-bootstrap"
import { ownedPropDetails } from "./ownedPropDetails.css"
import { RiUpload2Line } from "react-icons/ri"
import PropMap from "../../components/Seller/PropMap"
import ConnectAgentPopup from "../../components/popup/connectAgentPopup"
import HouseDetails from "../../components/Seller/HouseDetails"
import { width } from "@mui/system"
import { sellerProspectList } from '../../components/Api/ListingApi'
import { RWebShare } from "react-web-share"
import { useLocation } from '@reach/router';

function OwnedPropDetails(props) {
  console.log('properties Details for owned', props.data)
  const details = props.data

  const [connect, setConnect] = useState(false);
  const toggleConnect = () => setConnect(p => !p);
  const location = useLocation();

  return (

    <div >
      {connect ? <ConnectAgentPopup data={details} location={props.data.location} connect={connect} toggleConnect={toggleConnect} isActive={true} /> : null}
      {details.length !== 0 &&
        <Card
          // className={styles.descriptioncard3}
          style={{
            background: 'rgb(255, 255, 255)',
          }}>
          <div className="row " style={{ margin: '17px 18px', padding: '10px', border: '2px solid #f8f7f7' }}>
            <div className="col-md-8">
              {details.address !== undefined && details.address !== null &&
                <p className={styles.homedescription1}>
                  {details.address.split(',').slice(0).shift()} <br /> {details.address.split(',').slice(1).join(",")}
                </p>
              }
            </div>
            <div className="col-md-4">
              <p className={styles.memberSale2}>${details.price.$numberDecimal}</p>
            </div>
            <div>
              <p className={styles.incredibletext}>
                {details.description}
              </p>
            </div>
            <div className={styles.detailIcon}>
              <span className={styles.circle}>
                <i
                  className="fa fa-heart"
                  style={{
                    color: "#4283D9",
                    paddingTop: "6px",
                    fontSize: "15px",
                  }}
                ></i>
              </span>
              <RWebShare
                data={{
                  text: "",
                  url: location.origin + '/dashboard/detail/' + details._id,
                  title: "Share your property",
                }}
              >
                <span className={styles.upload}>

                  <RiUpload2Line size={18} />
                </span>
              </RWebShare>
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
                    <p className={styles.smallCard}>{details.beds}</p>
                    <p className={styles.smallCard1} style={{ color: "#898686" }}>
                      Beds
                    </p>
                  </div>
                  <div className="col-md-4 cardtext2 mt-3">
                    <p className={styles.smallCard}>{details.baths}</p>
                    <p className={styles.smallCard1} style={{ color: "#898686" }}>
                      Baths
                    </p>
                  </div>
                  <div className="col-md-4 cardtext2 mt-3">
                    <p className={styles.smallCard}>{details.square_feet.$numberDecimal}</p>
                    <p className={styles.smallCard1} style={{ color: "#898686" }}>
                      Sq. Feet
                    </p>
                  </div>
                </div>
              </Card>
              {!details.owned &&
                <div>
                  <Button variant="primary" className={styles.transferbut} onClick={toggleConnect}>Sell My Home</Button>
                </div>
              }

              <div>
                <PropMap location={details.location} />
              </div>
            </div>
            <HouseDetails image={details} />
          </div>
        </Card>
      }
    </div>
  )
}
export default OwnedPropDetails

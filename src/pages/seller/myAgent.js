import React, { useEffect, useState } from "react"
import SellerLayout from "./SellerLayout"
import Layout from "../../components/Layout"
import * as styles from "../../pages/seller/sellerProp.module.css"
import "react-multi-carousel/lib/styles.css"
import "bootstrap/dist/css/bootstrap.css"
import { StaticImage } from "gatsby-plugin-image"
import { Card } from "react-bootstrap"
import agent from "../../../static/images/Agent.png"
import { Icon } from "@iconify/react"
import { Rating } from "react-simple-star-rating"
import SidenavBar from "../../components/sideNavBar"
import { SocialMediaIconsReact } from "social-media-icons-react"
import Seo from "../../components/seo";
import { useDispatch, useSelector } from "react-redux"
import { claimAgent } from "../../state/claimAgentList"
import AvatarImage from "../../components/Avatar/avatarImage"
import ChatPopup from "../../components/popup/ChatPopup"

function MyAgent() {
  const [rating, setRating] = useState(0)
  const [showChat, setShowChat] = useState(false);
  const toggleShowChat = () => setShowChat(p => !p);
  const handleRating = rate => {
    setRating(rate)
  }
  const claimAgentDetails = useSelector(state => state.claimAgent.result)
  console.log("my agent data..", claimAgentDetails)
  const dispatch = useDispatch()
  const fillColorArray = [
    "#f17a45",
    "#f17a45",
    "#f19745",
    "#f19745",
    "#f1a545",
    "#f1a545",
    "#f1b345",
    "#f1b345",
    "#f1d045",
    "#f1d045",
  ]

  useEffect(() => {
    let userId = localStorage.getItem('userId')
    dispatch(claimAgent(userId))
  }, [])



  const hanldeImage = (img) => {
    let data = img.split('/')[0]
    if (data === "uploads") {
      return process.env.API_IMAGE_URL + img
    }
    else {
      return img
    }
  }
  return (
    <Layout>
      <Seo title="My Agent" />
      <div>
        <div className="row mt-5">
          {claimAgentDetails.length !== 0 &&
            claimAgentDetails.map((data, index) => (
              data.agent_id !== null &&
              <div className="col-3" key={index}>
                <Card
                  className={styles.agentCarouselCard}
                  style={{
                    borderRadius: "25px",
                    boxShadow:
                      "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)",
                  }}
                >
                  <div className={styles.favorite}>
                    {data.agent_id.img ?
                      <img src={hanldeImage(data.agent_id.img)} alt='tour2' className={styles.agentProfile} style={{ borderRadius: "50%" }} />
                      : <div className={styles.agentProfile}><AvatarImage fontSize={'85px'} data={data.agent_id.name ? data.agent_id.name : ''} /></div>
                    }
                    {/* <img src={data.agent_id.img} alt="agent" className={styles.agentProfile} /> */}
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <p className={styles.agentName}>{data.agent_id.name}</p>
                    </div>
                    <div className="col-md-4">
                      <div className={styles.active}>
                        <StaticImage
                          src="../../../static/images/Ellipse2.png"
                          alt="Ellips"
                        ></StaticImage>
                        <p>Active</p>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <p className={styles.agentNumber}>{data.agent_id.phone_number}</p>
                    </div>
                    <div className="col-md-4">
                      <div className={styles.active}>
                        <Icon icon="bi:chat" style={{ color: "red" }} />
                        <p className={styles.chatdata}>
                          Chat
                        </p>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <p className={styles.agentLicense}>License #:</p>
                     </div>
                    <div className="col-md-8" style={{ paddingLeft: "30px",marginBottom: "25px" }}>
                      <Rating
                        onClick={handleRating}
                        ratingValue={rating}
                        transition
                        size={24}
                        allowHalfIcon
                        fillColorArray={fillColorArray}
                      />
                    </div>

                    {/* <div className="col-md-7 ps-0">
                      <p style={{ fontSize: "14px", padding: "5px 5px 5px 0px", }}>{data.agent_id.profile_status}</p>
                    </div> */}

                    <div>
                      {/* <button
                        style={{
                          backgroundColor: "#0490fb",
                          color: "white",
                          marginLeft: "15px",
                          borderRadius: "10px",
                          marginBottom: "30px",
                          width: "326px",
                          height: "39px",
                        }}>
                        Select Agent
                      </button> */}
                    </div>
                  </div>
                </Card>
                {/* <p className={styles.unClaim}>Unclaim</p> */}
              </div>
            ))}

        </div>

      </div>

      {/* <div>
        <Card
          className={styles.bodyCarouselCard}
          style={{
            borderRadius: "25px",
            boxShadow:
              "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)",
          }}
        >
          <div>
            <p className={styles.agentDetails}>About me</p>
            <p className={styles.agentDetails1}>
              This is the text about me. This is the text about me.This is the
              text about me. This is the text about me.This is the text about
              me. This is the text about me.This is the text about me. This is
              the text about me.This is the text about me. This is the text
              about me.This is the text about me. This is the text about meThis
              is the text about me. This is the text about me.
            </p>
          </div>
          <div className={styles.agentDetails2}>
            <div className={styles.agentDetails4}>
              <p className={styles.agentDetails5}>Social media Link</p>

              <div
                className="seller-agent"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginLeft: "20px"
                }}
              >
                <SocialMediaIconsReact
                  borderColor="#3b5a9a"
                  icon="facebook"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="#3b5a9a"
                  url="https://www.facebook.com/login/"
                  // size="22"
                  width="10"
                  height="10"
                  paddingleft="3em"
                />

                <SocialMediaIconsReact
                  borderColor="#3d739c"
                  icon="instagram"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="#3d739c"
                  url="https://www.instagram.com/accounts/login/"
                  // size="22"
                  width="22"
                  height="22"
                />

                <SocialMediaIconsReact
                  borderColor="#117bb8"
                  icon="linkedin"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="#117bb8"
                  url="https://www.linkedin.com/signup"
                  // size="22"
                  width="22"
                  height="22"
                />

                <SocialMediaIconsReact
                  borderColor="#23aae1"
                  icon="twitter"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="#23aae1"
                  url="https://twitter.com/i/flow/login"
                  // size="22"
                  width="22"
                  height="22"
                />
              </div>
            </div>
            <div className={styles.agentDetails4}>
              <p style={{ color: "#413b3b" }}> Brokerage Company</p>
              <p style={{ color: "#413b3b", fontSize: "small" }}>Company name</p>
            </div>
            <div className={styles.agentDetails4}>
              <p style={{ color: "#413b3b" }}># of years licensed</p>
              <p style={{ color: "#413b3b" }}>16</p>
            </div>
          </div>
        </Card>
      </div> */}
    </Layout>
  )
}

export default MyAgent

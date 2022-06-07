import React, { useEffect, useState } from "react"
import { Container, Card, Row, Col, Button, Dropdown } from "react-bootstrap"
import "./notification.css"
import Layout from '../components/Layout'
import "bootstrap/dist/css/bootstrap.css"
import Seo from "../components/seo";
import searchIcon from '../../static/images/Icon feather-search.png';
import filterIcon from '../../static/images/sortup.png';
import { notificationList, notificationDelete } from '../components/Api/ListingApi'
import * as styles from "../pages/seller/sellerProp.module.css";
import AvatarImage from "../components/Avatar/avatarImage"


export default function Notifications() {

  const [notification, setNotification] = useState([]);
  const [deleteNote, setDeleteNote] = useState([])


  useEffect(async () => {
    await getNotification();
    // await deleteNotification();
  }, [])
  const getNotification = async () => {
    let userId = localStorage.getItem('userId')
    await notificationList(userId).then((res) => {
      setNotification(res.data.data)
      console.log("notification list...", res)

    })
  }


  const HandleDelete = async () => {
    let id = notification.data._id
    console.log("delete notification",id)
    await notificationDelete(id).then((res) => {
      setNotification(res.data.data)
      console.log("delete.......", res.data.data)

    })
  }

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
    <div className="bgcolor">
      <Layout>
        <Seo title="Notifications" />

        <div className='searchBuy searchIcons'>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ padding: '0px 25px' }}>

              <form>
                <input className="buyer-search" placeholder='Search' />
                <div className="searchIconAgent" >
                  <img src={searchIcon} alt="Icon feather-search.png" className='search-icon-img' />
                </div>
              </form>
            </div>
            <div>
              <img src={filterIcon} alt="sortup.png" className='filter-icon-img' />
            </div>
          </div>
        </div>
        <div>
          <div className="cardProfile">
            <div>
              <button className='notificationdelete'>
                Mark all as read
              </button>
              <button className='networkmessage' onclick={HandleDelete}>
                Delete All
              </button>
            </div>
            <div className="row">
              {notification.map((data, index) => (
                <div className="col-3">
                  <Row id="cardComponent" key={index}>
                    <Col lg="2" className="profile">
                      {data.user_id.img ?
                      
                        <img src={hanldeImage(process.env.API_IMAGE_URL + data.user_id.img)} alt='tour2' className="profilepic " style={{ borderRadius: "50%" }} />
                        : <div className={styles.agentProfile}><div style={{ width: '88px', height: '88px',position:"relative",marginTop:"-21px" }}><AvatarImage fontSize={'50px'} data={data.user_id.name  ? data.user_id.name : ''} /></div></div>
                      }
                      {/* <img alt="" className="profilepic" src={data.user_id.img} /> */}
                    </Col>
                    <Col lg="7" className="prof">
                      <div>
                        <h6 className="fname text-capitalize">{data.user_id.name}</h6>
                        <p className="rolenote">{data.user_id.role}</p>
                        <p className="time"></p>
                      </div>
                    </Col>
                    <p className="content text-capitalize">{data.content}</p>
                  </Row>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bgleftcolor"></div>
      </Layout>
    </div>
  )
}


import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Card } from "react-bootstrap"
import { Container, Row, Col, Text, Button } from "react-bootstrap"
import user4 from "../../../static/images/noah.png"
import Seo from "../../components/seo";
import { Icon } from "@iconify/react";
import MessageDetail from '../seller/messageDetail'
import CancelTour from "../../components/popup/CancelTour"
import CalendarPopup from '../../components/popup/CalendarPopup'
import { tourList } from '../../components/Api/ListingApi'
import Avatar from 'antd/lib/avatar/avatar'
import AvatarImage from "../../components/Avatar/avatarImage";
import moment  from 'moment'


export default function Tours() {
  const [message, setMessage] = useState(false)
  const showMessage = () => {
    setMessage(true)
  }
  const [click, setClick] = useState(false); 
  const toggleClick = () => setClick(p => !p);

  const [userSuccess, setUserSucess] = useState(false)
  const toggleUserSuccess = () => setUserSucess(p => !p)
  const [data, setData] = useState([]);
  const [listingDatas ,setListingDatas]= useState("")

  var sentence = "Oh , a , cookie!"
  var set=sentence.split(",");
  console.log(set[1])
    
  const [listing, setListing] = useState("")
    useEffect(async () => {
    await listingApi();

  }, [])
  const listingApi = async () => {
    let userId =localStorage.getItem('userId')
    let getParams = {
        user_id:userId}
     
    console.log("userId",userId)

    await tourList(getParams)
    .then((res) => {
      setListing(res.data.data)
      setData(res.data.data)
      console.log("listing property...", res.data.data)

    }) 
  }
  return (   
    <Layout>
      <Seo title="Tours" />
      <div>
      <CancelTour userSuccess={userSuccess} toggleUserSuccess={toggleUserSuccess} />
  <CalendarPopup click={click} toggleClick={toggleClick} />
      <div style={{ margin: "0px 50px", padding: "15px 0px 80px 0px" }}>
        
        <div >
        {/* <p className='sellertour-text sellertour-date'>Today, December 9, 2021</p> */}
        <div className='row'>
        <div className={`${message === true ? 'col-md-8' : 'col-md-12'}`} >
            {data.map((item, index) => 
              <Row key={index}
                style={{
                  border: "1px solid lightgrey",
                  borderRadius: "20px",
                  boxShadow: "1px 2px 4px 2px #e4e5e7",
                  margin: "30px 0 0 0",
                  padding: "20px 10px",
                  background: "#fff",
                }}
              >
              
                <Col lg="5">
                  <Row>
                    <Col lg="6">
                      <img alt='image'
                        style={{ borderRadius: "10px",height: "100%",
                        width: "100%" }}
                        src={item.property_id.thumbnail_image}
                      />
                    </Col>
                    <Col lg="6" className='sellertour-margin'>
                    
                        <div className='sellertour-title'>Address</div>
                        <div className='sellertour-text'>{item.property_id.address}</div>
                  
                    </Col>
                  </Row>
                </Col>
                <Col lg="3">
                  <Row>
                    <Col lg="6" style={{marginTop: "15px"}}>
                    {item.agent_id.img ?
                        <img alt='image'
                          className='sellertour-img'
                          src={item.agent_id.img}
                        />:<>{item.agent_id.name ? <div style={{ width: '88px', height: '88px', marginLeft: 'auto' }}><AvatarImage fontSize={'38px'} data={item.agent_id.name ? item.agent_id.name : ''} /></div>
                        : null}</>
                }
                      </Col>
                    <Col lg="6" className='sellertour-margin'>
                        <div className='sellertour-title'>{item.agent_id.role}</div>
                        <div className='sellertour-text'>{item.agent_id.name}</div>
                    </Col>
                  </Row>
                </Col>
                
                <Col lg="2" className='sellertour-margin'>
                    <div className='sellertour-title'>Tour Time</div>
                    <div className='sellertour-text'>{item.date_time.split(",")[1]}</div>
                </Col>

                <Col lg="2" className='sellertour-margin'>                   
                      <Button  onClick={toggleUserSuccess}
                          className='sellertour-cancel'
                          variant="primary"
                        >
                          Cancel Tour
                      </Button>                   
                      <Button onClick={showMessage}
                          className='sellertour-chat'
                          variant="primary"
                        >
                           <Icon icon="bi:chat" style={{ color: "red" }} />Chat
                      </Button>
                       <Row className='sellertour-calender' onClick={toggleClick}> 
                      <img  alt='image'
                        style={{width: "45px",
                          height: "20px",
                          marginRight: "-5px"
                        }}
                        src="/images/Icon awesome-calendar-alt.png"
                      />Reschedule Tour
                  </Row>        
                </Col>
              </Row>
            )}
            </div>
            {message ? (
                <div className='col-md-4'>
                  <MessageDetail />
                </div>
              ) : null}
              </div>
              </div>
        </div>  

        </div>
        
    
    </Layout>   
  )
}
import React, { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import Layout from '../components/Layout';
import { Container, Row, Col, Text, Button, Tab, Tabs, Card } from "react-bootstrap"
import Seo from "../components/seo";
import searchIcon from '../../static/images/Icon feather-search.png';
import * as style from '../pages/agents/agent.module.css';
import BuyerListing from "./buyerdetaipages/buyerListing";
import filterIcon from '../../static/images/sortup.png';
import '../assets/buyers.css'
import TourbuyerDetail from './buyerdetaipages/tourBuyerDetail';
import Calendar from './calendar/calendar';
import ModifyTourPopup from '../components/popup/ModifyTourPopup';
import buyerdetailimage from '../../static/images/buyerdetailimage.png';
import * as style1 from '../pages/dashboard/detail.module.css';
import Bar from "./bars/bar"
import MessageDetail from './seller/messageDetail';
import CalendarViewPopup from '../components/popup/CalendarViewPopup';
import { RiDeleteBinLine, RiArrowLeftLine, RiArrowDownSLine, RiArrowRightLine } from "react-icons/ri";

export default function Tours() {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(p => !p);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false)
  const showDetail = () => {
    setOpen(true)
  }
  const [isVisible, setIsVisible] = useState(false)
  const showIsVisible = () => {
    setIsVisible(true)
  }
  const [message, setMessage] = useState(false)
  const showMessage = () => {
    setMessage(true)
  }
  const [calendar, setCalendar] = useState(false)

  const toggleCalendar = () => setCalendar(p => !p)


  useEffect(() => {
    const dataArr = [
      { id: 1, Name: 'Sara Tuner', address: "123 Scotland Drive Saratoga, CA 95071", time: '10.00 am', image: "/images/Mask Group 108.png", profileimage: "/images/Mask Group 205.png" },
      { id: 2, Name: 'Nichole Robertson', address: "1890 Fulton St Saratoga, CA 95071", time: '11.00 am', image: "/images/Mask Group 132.png", profileimage: "/images/Mask Group 207.png" },
      { id: 3, Name: 'Anonymous', address: "5932 Redway Place Saratoga, CA 95071", time: '03.00 pm', image: "/images/Mask Group 135.png", profileimage: "/images/Group 335.png" },
    ]
    setData(dataArr);
  }, []);


  return (
    <Layout>
      <Seo title="Tours" />
      <div>
        <ModifyTourPopup show={show} toggleShow={toggleShow} />
        <CalendarViewPopup calendar={calendar} toggleCalendar={toggleCalendar} />
        <div style={{ margin: "0px 50px", padding: "15px 0px 80px 0px" }}>

          <Tabs defaultActiveKey="All" id="uncontrolled-tab-example" className="tabdesign" style={{ background: 'transparent' }}>
            <Tab eventKey="All" title="All" >
              <div className='row'>
                <div className={`${message === true ? 'col-md-8' : 'col-md-12'}`} >
                  <p className='sellertour-text sellertour-date'>Today, February 23, 2022</p>
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
                            <img alt="" className='zoom' style={{ borderRadius: "10px" }} src={item.image}/>
                          </Col>
                          <Col lg="6" className='sellertour-margin'>
                            <div className='sellertour-title'>Address</div>
                            <div className='sellertour-text'>{item.address}</div>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="3">
                        <Row>
                          <Col lg="6" style={{ marginTop: "15px" }}>
                            <img alt=""
                              className='sellertour-img'
                              src={item.profileimage}
                            />
                          </Col>
                          <Col lg="6" className='sellertour-margin'>
                            <div className='sellertour-title'>Buyer</div>
                            <div className='sellertour-text'>{item.Name}</div>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg="1" className='sellertour-margin'>
                        <div className='sellertour-title'>Tour Time</div>
                        <div className='sellertour-text'>{item.time}</div>
                      </Col>
                      <Col lg="3" className='sellertour-margin'>
                        <Row>
                          <Col lg="8">
                            <div>
                              <Button onClick={toggleShow}
                                className={style.agenttourcancel}
                                variant="primary"
                              >
                                Modify
                              </Button>
                            </div>
                            <div>
                              <Button onClick={showMessage}
                                className='sellertour-chat'
                                variant="primary"
                                style={{ width: "100%", marginTop: "10px"}}
                              >
                                <Icon icon="bi:chat" style={{ color: "red" }} />Chat
                              </Button>
                            </div>

                          </Col>
                          <Col lg="4" >

                            <img alt='group339'
                              // style={{
                              //   width: "50px",
                              //   height: "50px",
                              //   marginLeft: "54px"

                              // }}
                              src="/images/Group 339.png"
                            />
                          </Col>
                        </Row>

                      </Col>

                    </Row>
                  )}
                </div>
                {message ? (
                  <div className='col-md-4' style={{ marginTop: "-119px" }}>
                    <MessageDetail />
                  </div>
                ) : null}
              </div>
              <div >
                <p className='sellertour-text sellertour-date mt-4'>Tomorrow, February 24, 2022</p>
                {data.map((item, index) =>
                  <Row key={index} onClick={showDetail}
                    style={{
                      border: "1px solid lightgrey",
                      borderRadius: "20px",
                      boxShadow: "1px 2px 4px 2px #e4e5e7",
                      margin: "30px 0 0 0",
                      padding: "20px 10px",
                      background: "#fff",
                    }}
                  >

                    <Col lg="4">
                      <Row>
                        <Col lg="6">
                          <img alt=""
                            style={{ borderRadius: "10px" }}
                            src={item.image}
                          />
                        </Col>
                        <Col lg="6" className='sellertour-margin'>

                          <div className='sellertour-title'>Address</div>
                          <div className='sellertour-text'>{item.address}</div>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg="2">
                      <Row>
                        <Col lg="6" style={{ marginTop: "15px" }}>
                          <img alt='profileimage'
                            className='sellertour-img'
                            src={item.profileimage}
                          />
                        </Col>
                        <Col lg="6" className='sellertour-margin'>
                          <div className='sellertour-title'>Buyer</div>
                          <div className='sellertour-text'>{item.Name}</div>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg="2" className='sellertour-margin'>
                      <div className='sellertour-title' >Tour Time</div>
                      <div className='sellertour-text' >{item.time}</div>
                    </Col>
                    <Col lg="3" className='sellertour-margin'>
                      <Button onClick={toggleShow}
                        className={style.agenttourmodify}
                        variant="primary"
                      >
                        Modify
                      </Button>
                    </Col>
                    <Col lg="1" className='sellertour-margin'>
                      <img alt='group338'
                        style={{
                          width: "50px",
                          height: "50px",
                        }}
                        src="/images/Group 338.png"
                      />
                    </Col>
                  </Row>
                )}
              </div>
            </Tab>
            <Tab eventKey="buyers" title="Buyers">
              <div className='row'>
                <div className={`${open ? 'col-md-8' : 'col-md-12'}`}>
                  <div>
                    <div className='tourbuyer mb-5' >
                      <div >
                        <div className={style.dateselect}>
                          <h6 style={{ fontFamily: "DejaVuSansBold", color: "black" }}>Today, December 9, 2021</h6>
                          <div className='d-flex' onClick={toggleCalendar}>
                            <p  >Choose Date</p><RiArrowDownSLine style={{ fill: '' }} size="25px" />
                          </div>
                        </div>
                        {data.map((item, index) =>
                          <Row key={index} onClick={showDetail}
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
                                  <img alt='image' onClick={showIsVisible}
                                    style={{ borderRadius: "10px", marginTop: "10px" }}
                                    src={item.image}
                                  />
                                </Col>
                                <Col lg="6" className='sellertour-margin'>
                                  <div className='sellertour-title' style={{ marginTop: "0px" }}>Address</div>
                                  <div className='sellertour-text'>{item.address}</div>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg="3">
                              <Row>
                                <Col lg="6" style={{ marginTop: "15px" }}>
                                  <img alt='image'
                                    className='sellertour-img'
                                    src={item.profileimage}
                                  />
                                </Col>
                                <Col lg="6" className='sellertour-margin'>
                                  <div className='sellertour-title'>Buyer</div>
                                  <div className='sellertour-text'>{item.Name}</div>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg="2" className='sellertour-margin'>
                              <div className='sellertour-title'>Tour Time</div>
                              <div className='sellertour-text'>{item.time}</div>
                            </Col>
                            <Col lg="2" className='sellertour-margin'>
                              <Button className={style.buyertourmodify} onClick={toggleShow}>Modify</Button>
                              <Button className='sellertour-chat' variant="primary" style={{ width: "100%", }}>
                                <Icon icon="bi:chat" style={{ color: "red" }} />Chat </Button>
                            </Col>
                            {isVisible ? (
                              <div>
                                <div>
                                  <img alt='buyerdetailimage' className={style.buyerdetailimage} src={buyerdetailimage} />
                                </div>
                                <div>
                                  <h5 className={style.buyerdetailprice}>$120,000</h5>
                                  <p className={style.tourincredibletext}>Incredible remodeled single story family home located in one of Saratoga's finest neighborhoods with award winning Saratoga schools incredible remodeled single story family home located in one of Saratoga's finest neighborhoods with award winning Saratoga schools...</p>
                                </div>
                                <div className={style1.detailIcon}>
                                  <span className={style1.circle}><i className="fa fa-heart" style={{ color: "#4283D9", marginLeft: "1px" }}></i></span>
                                  <span className={style1.upload}> <i className="fa fa-upload"></i></span>
                                </div>
                                <Card className={style1.detCard} style={{ borderRadius: "5px", width: "48%" }}>
                                  <div className="row m-0">
                                    <div className="col-md-4 cardtext2 mt-3">
                                      <p><b>4</b></p>
                                      <p style={{ color: "#898686" }}>Beds</p>
                                    </div>
                                    <div className="col-md-4 cardtext2 mt-3">
                                      <p><b>4</b></p>
                                      <p style={{ color: "#898686" }}>Baths</p>
                                    </div>
                                    <div className="col-md-4 cardtext2 mt-3">
                                      <p><b>2,819</b></p>
                                      <p style={{ color: "#898686" }}>Sq. Feet</p>
                                    </div>
                                  </div>
                                </Card>
                                <div className={style1.activity}>
                                  <div >
                                    <p className="pt-3"><b>Activity</b></p>
                                  </div>
                                  <div >
                                    <select className={style1.week} name="calender" id="calender">
                                      <option value="week">This Week</option>
                                      <option value="day">Today</option>
                                      <option value="month">This Month</option>
                                      <option value="year">This Year</option>
                                    </select>
                                  </div>
                                </div>
                                < div>
                                  {/* <Bar /> */}
                                </div>
                                <div className="row m-0 pt-5 mb-4">
                                  <div className="col-md-5">
                                    <div className={style1.viewdetails}>
                                      <div>
                                        <p className={style1.viewtext}>Viewership</p>
                                        <p><b>25%</b></p>
                                      </div>
                                      <div>
                                        <p className={style1.viewtext}>Downloads</p>
                                        <p><b>3</b></p>
                                      </div>
                                      <div>
                                        <p className={style1.viewtext}>Offers</p>
                                        <p><b>1</b></p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-7">
                                    <button className={style1.otherbut} type="button" >2 other people are viewing this propert now</button>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </Row>
                        )}
                      </div>
                    </div>
                    <div>
                      <h6 style={{ fontFamily: "DejaVuSansBold" }}>Tomorrow, December 10, 2021</h6>
                      <div >

                        {data.map((item, index) =>
                          <Row key={index} onClick={showDetail}
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
                                  <img alt='image' onClick={showIsVisible}
                                    style={{ borderRadius: "10px", marginTop: "10px" }}
                                    src={item.image}
                                  />
                                </Col>
                                <Col lg="6" className='sellertour-margin'>
                                  <div className='sellertour-title' style={{ marginTop: "0px" }}>Address</div>
                                  <div className='sellertour-text'>{item.address}</div>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg="3">
                              <Row>
                                <Col lg="6" style={{ marginTop: "15px" }}>
                                  <img alt='image'
                                    className='sellertour-img'
                                    src={item.profileimage}
                                  />
                                </Col>
                                <Col lg="6" className='sellertour-margin'>
                                  <div className='sellertour-title'>Buyer</div>
                                  <div className='sellertour-text'>{item.Name}</div>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg="2" className='sellertour-margin'>
                              <div className='sellertour-title'>Tour Time</div>
                              <div className='sellertour-text'>{item.time}</div>
                            </Col>
                            <Col lg="2" className='sellertour-margin'>
                              <Button className={style.buyertourmodify} onClick={toggleShow}>Modify</Button>

                              <Button className='sellertour-chat' variant="primary" style={{ width: "100%", }}>
                                <Icon icon="bi:chat" style={{ color: "red" }} />Chat </Button>
                            </Col>
                            {isVisible ? (
                              <div>
                                <div>
                                  <img alt='buyerdetailimage' className={style.buyerdetailimage} src={buyerdetailimage} />
                                </div>
                                <div>
                                  <h5 className={style.buyerdetailprice}>$120,000</h5>
                                  <p className={style.tourincredibletext}>Incredible remodeled single story family home located in one of Saratoga's finest neighborhoods with award winning Saratoga schools incredible remodeled single story family home located in one of Saratoga's finest neighborhoods with award winning Saratoga schools...</p>
                                </div>
                                <div className={style1.detailIcon}>
                                  <span className={style1.circle}><i className="fa fa-heart" style={{ color: "#4283D9", marginLeft: "1px" }}></i></span>
                                  <span className={style1.upload}> <i className="fa fa-upload"></i></span>
                                </div>
                                <Card className={style1.detCard} style={{ borderRadius: "5px", width: "48%" }}>
                                  <div className="row m-0">
                                    <div className="col-md-4 cardtext2 mt-3">
                                      <p><b>4</b></p>
                                      <p style={{ color: "#898686" }}>Beds</p>
                                    </div>
                                    <div className="col-md-4 cardtext2 mt-3">
                                      <p><b>4</b></p>
                                      <p style={{ color: "#898686" }}>Baths</p>
                                    </div>
                                    <div className="col-md-4 cardtext2 mt-3">
                                      <p><b>2,819</b></p>
                                      <p style={{ color: "#898686" }}>Sq. Feet</p>
                                    </div>
                                  </div>
                                </Card>
                                <div className={style1.activity}>
                                  <div >
                                    <p className="pt-3"><b>Activity</b></p>
                                  </div>
                                  <div >
                                    <select className={style1.week} name="calender" id="calender">
                                      <option value="week">This Week</option>
                                      <option value="day">Today</option>
                                      <option value="month">This Month</option>
                                      <option value="year">This Year</option>
                                    </select>
                                  </div>
                                </div>
                                < div>
                                  {/* <Bar /> */}
                                </div>
                                <div className="row m-0 pt-5 mb-4">
                                  <div className="col-md-5">
                                    <div className={style1.viewdetails}>
                                      <div>
                                        <p className={style1.viewtext}>Viewership</p>
                                        <p><b>25%</b></p>
                                      </div>
                                      <div>
                                        <p className={style1.viewtext}>Downloads</p>
                                        <p><b>3</b></p>
                                      </div>
                                      <div>
                                        <p className={style1.viewtext}>Offers</p>
                                        <p><b>1</b></p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-7">
                                    <button className={style1.otherbut} type="button" >2 other people are viewing this propert now</button>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </Row>
                        )}
                      </div>
                    </div>
                    <div>
                      <h6 style={{ fontFamily: "DejaVuSansBold" }}>December 11, 2021</h6>
                      <div >

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
                                  <img alt='image' onClick={showIsVisible}
                                    style={{ borderRadius: "10px", marginTop: "10px" }}
                                    src={item.image}
                                  />
                                </Col>
                                <Col lg="6" className='sellertour-margin'>
                                  <div className='sellertour-title' style={{ marginTop: "0px" }}>Address</div>
                                  <div className='sellertour-text'>{item.address}</div>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg="3">
                              <Row>
                                <Col lg="6" style={{ marginTop: "15px" }}>
                                  <img alt='image'
                                    className='sellertour-img'
                                    src={item.profileimage}
                                  />
                                </Col>
                                <Col lg="6" className='sellertour-margin'>
                                  <div className='sellertour-title'>Buyer</div>
                                  <div className='sellertour-text'>{item.Name}</div>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg="2" className='sellertour-margin'>
                              <div className='sellertour-title'>Tour Time</div>
                              <div className='sellertour-text'>{item.time}</div>
                            </Col>
                            <Col lg="2" className='sellertour-margin'>
                              <Button className={style.buyertourmodify} onClick={toggleShow}>Modify</Button>
                              <Button className='sellertour-chat' variant="primary" style={{ width: "100%", }}>
                                <Icon icon="bi:chat" style={{ color: "red" }} />Chat </Button>
                            </Col>
                            {isVisible ? (
                              <div>
                                <div>
                                  <img alt='buyerdetailimage' className={style.buyerdetailimage} src={buyerdetailimage} />
                                </div>
                                <div>
                                  <h5 className={style.buyerdetailprice}>$120,000</h5>
                                  <p className={style.tourincredibletext}>Incredible remodeled single story family home located in one of Saratoga's finest neighborhoods with award winning Saratoga schools incredible remodeled single story family home located in one of Saratoga's finest neighborhoods with award winning Saratoga schools...</p>
                                </div>
                                <div className={style1.detailIcon}>
                                  <span className={style1.circle}><i className="fa fa-heart" style={{ color: "#4283D9", marginLeft: "1px" }}></i></span>
                                  <span className={style1.upload}> <i className="fa fa-upload"></i></span>
                                </div>
                                <Card className={style1.detCard} style={{ borderRadius: "5px", width: "48%" }}>
                                  <div className="row m-0">
                                    <div className="col-md-4 cardtext2 mt-3">
                                      <p><b>4</b></p>
                                      <p style={{ color: "#898686" }}>Beds</p>
                                    </div>
                                    <div className="col-md-4 cardtext2 mt-3">
                                      <p><b>4</b></p>
                                      <p style={{ color: "#898686" }}>Baths</p>
                                    </div>
                                    <div className="col-md-4 cardtext2 mt-3">
                                      <p><b>2,819</b></p>
                                      <p style={{ color: "#898686" }}>Sq. Feet</p>
                                    </div>
                                  </div>
                                </Card>
                                <div className={style1.activity}>
                                  <div >
                                    <p className="pt-3"><b>Activity</b></p>
                                  </div>
                                  <div >
                                    <select className={style1.week} name="calender" id="calender">
                                      <option value="week">This Week</option>
                                      <option value="day">Today</option>
                                      <option value="month">This Month</option>
                                      <option value="year">This Year</option>
                                    </select>
                                  </div>
                                </div>
                                < div>
                                  {/* <Bar /> */}
                                </div>
                                <div className="row m-0 pt-5 mb-4">
                                  <div className="col-md-5">
                                    <div className={style1.viewdetails}>
                                      <div>
                                        <p className={style1.viewtext}>Viewership</p>
                                        <p><b>25%</b></p>
                                      </div>
                                      <div>
                                        <p className={style1.viewtext}>Downloads</p>
                                        <p><b>3</b></p>
                                      </div>
                                      <div>
                                        <p className={style1.viewtext}>Offers</p>
                                        <p><b>1</b></p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-7">
                                    <button className={style1.otherbut} type="button" >2 other people are viewing this propert now</button>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </Row>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {open ? (
                  <div className='col-md-4'>
                    <TourbuyerDetail />
                  </div>
                ) : null}
              </div>
            </Tab>
            <Tab eventKey="listings" title="Listings">
              <BuyerListing />
            </Tab>
          </Tabs>
          <div className='searchBuy'>
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
        </div>
      </div>
    </Layout>

  )
}

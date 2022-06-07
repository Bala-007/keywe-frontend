import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Row, Col, Button, } from 'react-bootstrap';
import Layout from '../../components/Layout'
import searchIcon from '../../../static/images/Icon feather-search.png';
import filterIcon from '../../../static/images/sortup.png';
import Julia from '../../../static/images/Julia.png'
import Elisabeth from '../../../static/images/Elisabeth.png'
import InboundDetail from './inboundDetail';
import OutboundDetail from './outboundDetail';
import * as styled from "../buyers/buyer.module.css"
import AcceptPopup from '../../components/popup/AcceptPopup'
import DeclinePopup from '../../components/popup/DeclinePopup'
import RefrelfeePopup from '../../components/popup/RefrelfeePopup';
import { inboundList, outboundList, agentAccept, agentDecline } from '../../components/Api/ListingApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './referralfee.css'
import Loader from '../../components/Loader'
import Pagination from '../../components/Pagination';
import AvatarImage from '../../components/Avatar/avatarImage';
import * as styles from "../seller/sellerProp.module.css";
import { Icon } from "@iconify/react"

var currentPage = 1;
export default function ReferralFee() {
  const [isOpen, setIsOpen] = useState(false)
  const showMessage = () => {
    setIsOpen(true)
  }
  const [outDetail, setOutDetail] = useState(false)
  const showoutDetail = () => {
    setOutDetail(true)
  }
  const [success, setSucess] = useState(false)
  const toggleSuccess = () => { setSucess(p => !p) }
  const [userSuccess, setUserSucess] = useState(false)
  const toggleUserSuccess = () => setUserSucess(p => !p)
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(p => !p);
  const [inBound, setInbound] = useState([])
  const [outBound, setOutbound] = useState([])
  const [propertyId, setPropertyId] = useState('')
  const [loader, setLoader] = useState(false);
  const [tabName, setTabName] = useState("referralfee")
  const [inboundDetail, setInboundDetail] = useState({})
  const [outboundDetail, setOutboundDetail] = useState({})
  const [referralAmount, setReferralAmount] = useState(null)
  const [dataSort, setDataSort] = useState(-1)
  const [pageCount, setPageCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [detail, setDetail] = useState([]);
  const [isInbound, setIsInbound] = useState(false)
  const [isOutbound, setIsOutbound] = useState(false)


  useEffect(async () => {
    setLoader(true);
    await getInboundList();
    await getOutboundList();

  }, []);

  //inbound api
  const getInboundList = async () => {
    let userId = localStorage.getItem('userId')
    let getParams = {
      pagesize: 20,
      page: currentPage,
      sort_field: "_id",
      sort_value: dataSort
    }
    setLoader(true);
    await inboundList(userId, getParams).then((res) => {
      setPageCount(res.data.Paging.total_page);
      setSelectedPage(res.data.Paging.current_page - 1);
      setLoader(false);
      res.data.data.length !== 0 ? setIsInbound(false) : setIsInbound(true)
      setInbound(res.data.data)
      console.log("inbound list", res)
    })
  }

  //outbound api
  const getOutboundList = async () => {
    let userId = localStorage.getItem('userId')
    let getParams = {
      pagesize: 20,
      page: currentPage,
      sort_field: "_id",
      sort_value: dataSort
    }
    setLoader(true);
    await outboundList(userId, getParams).then((res) => {
      setPageCount(res.data.Paging.total_page);
      setSelectedPage(res.data.Paging.current_page - 1);
      setLoader(false);
      res.data.data.length !== 0 ? setIsOutbound(false) : setIsOutbound(true)
      setOutbound(res.data.data)
      console.log("outbound list", res)
    })
  }
  //accept and decline
  const handleAgentAccept = async () => {
    console.log('accept',)
    await agentAccept(propertyId).then((res) => {
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
      getInboundList()
      getOutboundList()
      closeShowMessage()
    })
  }

  const handleAgentDecline = async () => {
    await agentDecline(propertyId).then((res) => {
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
      getInboundList()
      getOutboundList()
      closeShowMessage()
    })
  }
  const closeShowMessage = () => {
    setIsOpen(false)
  }
  async function handlePageClick(event) {
    console.log("page select", event);
    currentPage = event.selected + 1;
    getInboundList();
    await getOutboundList();
  };


  return (
    <>
      {loader ? <Loader /> : null}
      <Layout>
        <div>
          <ToastContainer />
          <AcceptPopup success={success} toggleSuccess={toggleSuccess} agentAccept={handleAgentAccept} />
          <DeclinePopup userSuccess={userSuccess} toggleUserSuccess={toggleUserSuccess} agentDecline={handleAgentDecline} />
          <RefrelfeePopup show={show} toggleShow={toggleShow} updateFee={"updateFee"} inBound={getInboundList} outBound={getOutboundList} propertyId={propertyId} referralAmount={referralAmount} />
          <div className='searchBuy'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ padding: '0px 25px' }}>
                <input type="search" id="gsearch" className="buyer-search" placeholder='Search' />

                <div className="searchIconAgent" >
                  <img src={searchIcon} alt="Icon feather-search.png" className='search-icon-img' />
                </div>
              </div>
              <div>
                <img src={filterIcon} alt="sortup.png" onClick={() => {
                  let sort = dataSort === -1 ? 1 : -1;
                  setDataSort(sort);
                  tabName === "referralfee" ? getInboundList(sort) : getOutboundList(sort);
                }} className='filter-icon-img' />
              </div>
            </div>
          </div>
          <div className='referral'>
            <Tabs defaultActiveKey="referralfee" onSelect={(e) => { setTabName(e); getInboundList(); getOutboundList(); }} className="" style={{ borderBottom: '1px solid lightgrey', background: 'transparent' }}>
              <Tab eventKey="referralfee" title="InBound">
                <div className='row position-relative'>
                  {inBound.length !== 0 &&
                    < div className='col-lg-8 outboundhead' style={{ height: "950px", overflow: "auto" }}>
                      {inBound.map((data, i) =>
                        data.status !== "decline" &&
                        <Row className='sellercardRow' onClick={() => { setInboundDetail(data); showMessage() }} key={i}>
                          {data.agent_id !== null &&
                            <>
                              <Col lg="2">
                                {data.agent_id.img ?
                                  < img alt="no_image" src={process.env.API_IMAGE_URL + data.agent_id.img} className="inboundImage1" />
                                  : <>{data.agent_id.name ? <div style={{ width: '88px', height: '88px',position:"relative" }}><AvatarImage fontSize={'40px'} data={data.agent_id.name ? data.agent_id.name : ''} /></div>
                                    : null}</>
                                }
                                {/* <img alt="" src={data.agent_id.img} style={{ width: '100%', height: '80%', borderRadius: '75px' }} /> */}
                              </Col>
                              <Col lg="2">
                                <div>
                                  <h6>Name</h6>
                                  <h6 className='sellername'>{data.agent_id.name}</h6>
                                </div>
                                <div className='prospectsource'>
                                  <h6>Status</h6>
                                  <h6 className='selleraddress'>{data.status}</h6>
                                </div>
                              </Col>
                            </>}

                          <Col lg="3">
                            <div>
                              <h6>Address</h6>
                              <h6 className='selleraddress'>{data.property_id.address.split(',').slice(0).shift()}</h6>
                              <h6 className='selleraddress'>{data.property_id.address.split(",").slice(1).join(",")}</h6>
                            </div>

                            <div className='prospectrefrel' style={{ display: "flex" }}>
                              <div>
                                <h6 className='referralfeedata'>Referral Fee</h6>
                                <h6 className='sellermarketdays'>{data.referral_fee}%</h6>
                              </div>
                              {/* {data.status === "waiting" &&
                              <Button variant="primary" style={{ marginTop: "-3px" }} className={styled.acceptBtn} onClick={() => { toggleShow(); setPropertyId(data._id); setReferralAmount(data.referral_fee) }}>Modify{" "}</Button>
                            } */}
                            </div>

                          </Col>
                          <Col lg="3">
                            <div>
                              <h6 className='referralfeeprice'>Keywe Price</h6>
                              <h6 className='referralkeyweprice'>${data.property_id.price.$numberDecimal}</h6>
                            </div>
                            {data.status === "waiting" &&
                              <>
                                <div className="d-grid gap-1 justify-content-center keywePrice">
                                  <Button variant="primary"
                                    className={styled.acceptBtn} onClick={() => { toggleSuccess(); setPropertyId(data._id) }}>Accept{" "}</Button>
                                </div>
                                <div className="d-grid gap-1 justify-content-center">
                                  <Button variant="outline-primary" className={styled.declineBtn} onClick={() => { toggleUserSuccess(); setPropertyId(data._id) }}>
                                    Decline{" "}
                                  </Button>
                                </div>
                                <div className={styles.active}>
                                  <Icon icon="bi:chat" style={{ color: "red" }} />
                                  <p style={{ color: "#0490fb", fontSize: "14px", fontWeight: "bold", padding: "5px", }}>Chat</p>
                                </div>
                              </>
                            }
                          </Col>
                          <Col lg="2">
                            {data.referred_by.img ?
                              <img alt="no_image" src={process.env.API_IMAGE_URL + data.referred_by.img} className="inboundImage1" />
                              : <>{data.referred_by.name ? <div style={{ width: '88px', height: '88px',position:"relative" }}><AvatarImage fontSize={'40px'} data={data.referred_by.name ? data.referred_by.name : ''} /></div>
                                : null}</>
                            }
                            {/* <img alt="" src={data.referred_by.img} style={{ width: '100%', height: '80%', borderRadius: '75px' }} /> */}
                          </Col>
                        </Row>
                      )}
                      <div>
                        {isInbound && <div className='no-resultSell mt-5'> Result not found</div>}
                      </div>
                    </div>
                  }
                  {isOpen ?
                    <div className='col-lg-4'>
                      <InboundDetail data={inboundDetail} />
                    </div>
                    : null}

                </div>
              </Tab>
              <Tab eventKey="OutBound" title="OutBound">
                <div className='row position-relative'>
                  {outBound.length !== 0 &&
                    <div className='col-lg-8 outboundhead' style={{ height: "950px", overflow: "auto" }} >
                      {outBound.map((data, i) => (
                        <Row key={i} className='sellercardRow' onClick={() => { setOutboundDetail(data); showoutDetail() }}>
                          {data.agent_id !== null &&
                            <>
                              <Col lg="2">
                                {data.agent_id.img ?
                                  <img alt="no_image" src={process.env.API_IMAGE_URL + data.agent_id.img} className="inboundImage1" />
                                  : <>{data.agent_id.name ? <div style={{ width: '88px', height: '88px',position:"relative" }}><AvatarImage fontSize={'40px'} data={data.agent_id.name ? data.agent_id.name : ''} /></div>
                                    : null}</>
                                }
                                {/* <img alt="" src={data.agent_id.img} style={{ width: '100%', height: '80%', borderRadius: '75px' }} /> */}
                              </Col>
                              <Col lg="2">
                                <div>
                                  <h6>Name</h6>
                                  <h6 className='sellername'>{data.agent_id.name}</h6>
                                </div>
                                <div className='prospectsource'>
                                  <h6>Status</h6>
                                  <h6 className='selleraddress'>{data.status}</h6>
                                </div>
                              </Col>
                            </>}

                          <Col lg="3">
                            <div>
                              <h6>Address</h6>
                              <h6 className='selleraddress'>{data.property_id.address.split(',').slice(0).shift()}</h6>
                              <h6 className='selleraddress'>{data.property_id.address.split(",").slice(1).join(",")}</h6>
                            </div>

                            <div className='prospectrefrel' style={{ display: "flex" }}>
                              <div>
                                <h6 style={{ marginRight: "17px" }}>Referral Fee</h6>
                                <h6 className='sellermarketdays'>{data.referral_fee}%</h6>
                              </div>
                              {data.status === "waiting" &&
                                <Button variant="primary" style={{ marginTop: "-3px" }} className={styled.acceptBtn} onClick={() => { toggleShow(); setPropertyId(data._id); setReferralAmount(data.referral_fee) }}>Modify{" "}</Button>
                              }
                            </div>

                          </Col>
                          <Col lg="3">
                            <div>
                              <h6 className='referralfeeprice'>Keywe Price</h6>
                              <h6 className='referralkeyweprice'>${data.property_id.price.$numberDecimal}</h6>
                            </div>
                            {data.status === "waiting" &&
                              <>
                                <div className="d-grid gap-1 justify-content-center keywePrice">
                                  <Button variant="primary" className={styled.acceptBtn} onClick={() => { toggleSuccess(); setPropertyId(data._id) }}>Accept</Button>
                                </div>
                                <div className="d-grid gap-1 justify-content-center">
                                  <Button variant="outline-primary" className={styled.declineBtn} onClick={() => { toggleUserSuccess(); setPropertyId(data._id) }} >
                                    Decline
                                  </Button>
                                </div>
                                <div className={styles.active}>
                                  <Icon icon="bi:chat" style={{ color: "red" }} />
                                  <p style={{ color: "#0490fb", fontSize: "14px", fontWeight: "bold", padding: "5px", }}>Chat</p>
                                </div>
                              </>
                            }
                          </Col>
                          <Col lg="2">
                            {data.referred_by.img ?
                              <img alt="no_image" src={process.env.API_IMAGE_URL + data.referred_by.img} className="inboundImage1" />
                              : <>{data.referred_by.name ? <div style={{ width: '88px', height: '88px',position:"relative" }}><AvatarImage fontSize={'40px'} data={data.referred_by.name ? data.referred_by.name : ''} /></div>
                                : null}</>
                            }
                            {/* <img alt="" src={data.referred_by.img} style={{ width: '100%', height: '80%', borderRadius: '75px' }} /> */}
                          </Col>
                        </Row>
                      ))}
                      <div>
                        {isOutbound && <div className='no-resultSell mt-5'> Result not found</div>}
                      </div>
                    </div>
                  }
                  {outDetail ?
                    <div className='col-lg-4'>
                      <OutboundDetail data={outboundDetail} />
                    </div>
                    : null}
                </div>
              </Tab>
              {inBound.length > 0 ? <Pagination pageCount={pageCount} handlePageClick={handlePageClick} forcePage={selectedPage} /> : null}
            </Tabs>
          </div>
        </div>
      </Layout>
    </>
  )
}

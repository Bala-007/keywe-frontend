import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Tab, Tabs, Row, Col, Button, Card, Container, Dropdown } from 'react-bootstrap';
import searchIcon from '../../../static/images/Icon feather-search.png';
import filterIcon from '../../../static/images/sortup.png';
import '../../assets/buyers.css';
import './seller.css';
import Seo from "../../components/seo";
import SellerDetail from './sellerDetail';
import * as styled from "../buyers/buyer.module.css"
import ProspectDetail from './prospectDetail';
import AcceptPopup from '../../components/popup/AcceptPopup';
import DeclinePopup from '../../components/popup/DeclinePopup';
import { agentAccept, agentDecline, sellerProspectList, sellerList } from '../../components/Api/ListingApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader'
import * as styles from "../../pages/seller/sellerProp.module.css";
import { SearchSharp } from '@mui/icons-material';

export default function Sellers() {
  const [open, setOpen] = useState(false)
  const [seller, setSeller] = useState([])
  const [sellerDetails, setSellerDetails] = useState([])
  const [againProspectId, setAgentPropspectId] = useState(null)
  const [agentDetails, setAgentDetails] = useState({})
  const [tabName, setTabName] = useState("seller")
  const [dataSort, setDataSort] = useState(-1)
  const [prospectAgentDetails, setProspectAgentDetails] = useState([])
  const [isShowSeller, setIsShowSeller] = useState(false)
  const [loader, setLoader] = useState(false);
  const [isSellerFounded, setSellerFounded] = useState(false)
  const [isSellerProspect, setIsSellerProspect] = useState(false)
  const [search, setSearch] = useState("")
  const [searchName, setSearchName] = useState("")
  console.log("search", search)


  const [sellerDetail, setSellerDetail] = useState({})
  const handlesellerDetails = (data) => {
    setSellerDetail(data)
    console.log("data", data)
    showDetail()
  }
  // const handleAgentDetails = (data) => {
  //   setAgentDetails(data)
  //   console.log("data", data)
  //   showDetail()
  //   showMessage()
  // }
  const showDetail = () => {
    setOpen(true)
  }
  const [isOpen, setIsOpen] = useState(false)
  // const [search, setSearch] = useState("")
  const showMessage = () => {
    setIsOpen(true)
  }
  const closeShowMessage = () => {
    setIsOpen(false)
  }
  const [success, setSucess] = useState(false)
  const toggleSuccess = () => { setSucess(p => !p) }
  const [userSuccess, setUserSucess] = useState(false)
  const toggleUserSuccess = () => setUserSucess(p => !p)

  useEffect(async () => {
    setLoader(true);
    await getAgentSellerDetails(search );
    await getSellerList(search);
  }, []);

  //seller Prospect
  const getAgentSellerDetails = async (searchs) => {
    let userId = localStorage.getItem('userId')
    let getParams = {
      id: userId,
      status: 'waiting',
      search: searchs,
      sort_field: "_id",
      sort_value: dataSort,
      // name_search: searchNames
    }
    setLoader(true);

    await sellerProspectList(getParams).then((res) => {
      setLoader(false);
      res.data.data.length !== 0 ? setIsSellerProspect(false) : setIsSellerProspect(true)
      console.log('seller prospect', res)
      setSellerDetails(res.data.data)
    })
  }

  const handleAgentAccept = async () => {
    console.log('accept', againProspectId)
    await agentAccept(againProspectId).then((res) => {
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
      getAgentSellerDetails()
      getSellerList()
      closeShowMessage()
    })
  }

  const handleAgentDecline = async () => {
    await agentDecline(againProspectId).then((res) => {
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
      getAgentSellerDetails()
      getSellerList()
      closeShowMessage()
    })
  }

  //My seller
  const getSellerList = async (searchs) => {
    console.log("search------------------>",search)
    let userId = localStorage.getItem('userId')
    let getParams = {
      id: userId,
      status: 'accept',
      sort_field: "_id",
      search:searchs,
      // name_search: searchNames,
      sort_value: dataSort
    }
    setLoader(true);
    await sellerList(getParams).then((res) => {
      setLoader(false);
      res.data.data.length !== 0 ? setSellerFounded(false) : setSellerFounded(true)
      console.log('sellerList', res)
      setSeller(res.data.data)
    })
  }
  const handleKeySearch=(event)=>{
    if (event.key === 'Enter') {
      handleSearch()
    }
  }
 
  const handleSearch = (e) => {
    getAgentSellerDetails(search);
    getSellerList(search);
  }

  // const handleSearch = async (e) => {
  //   setSearch(e.target.value)
  //   console.log('hi', tabName)
  //   if (tabName === 'seller') {
  //     let userId = localStorage.getItem('userId')
  //     let getParams = {
  //       id: userId,
  //       status: 'accept',
  //       search: e.target.value
  //     }
  //     console.log(getParams)
  //     await sellerProspectList(getParams).then((res) => {
  //       setSeller(res.data.data)
  //     })
  //   }
  //   else if (tabName === 'prospect') {
  //     let userId = localStorage.getItem('userId')
  //     let getParams = {
  //       id: userId,
  //       status: 'waiting',
  //       search: e.target.value
  //     }
  //     await sellerProspectList(getParams).then((res) => {
  //       setSellerDetails(res.data.data)
  //     })
  //   }
  // }



  return (
    <>
      {loader ? <Loader /> : null}

      <Layout>
        <Seo title="Sellers" />
        <ToastContainer />
        <div>
          <AcceptPopup success={success} toggleSuccess={toggleSuccess} agentAccept={handleAgentAccept} />
          <DeclinePopup userSuccess={userSuccess} toggleUserSuccess={toggleUserSuccess} agentDecline={handleAgentDecline} />
          <div className='searchBuy'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ padding: '0px 25px' }}>
              {/* <div className={styles.search}> */}
                <input type="search" id="gsearch" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search City" onKeyDown={handleKeySearch} className="buyer-search"  />

                <div className="searchIconAgent" >
                  <img src={searchIcon} alt="Icon feather-search.png" className='search-icon-img' onClick={handleSearch} />
                </div>
                {/* </div> */}
              </div>
              <div>
                <img src={filterIcon} alt="sortup.png" onClick={() => {
                  let sort = dataSort === -1 ? 1 : -1;
                  setDataSort(sort);
                  tabName === "seller" ? getSellerList(search, sort) : getAgentSellerDetails(search, sort);
                }} className='filter-icon-img' />
              </div>
            </div>
          </div>
          <Tabs defaultActiveKey="seller" onSelect={(e) => { setTabName(e); getAgentSellerDetails(); getSellerList(); }} id="uncontrolled-tab-example" className="mb-3" style={{ borderBottom: '1px solid lightgrey', background: 'transparent' }}>
            <Tab eventKey="seller" title="My Seller">
              <div >
                <div className='row mb-5 position-relative'>
                  <div className={`${open ? 'col-md-8' : 'col-md-8'}`} style={{ height: "950px", overflow: "auto" }}>
                    {seller.map((data, i) =>
                      <Row key={i} className='sellercardRow' onClick={() => { setSellerDetail(data); setIsShowSeller(true); setOpen(true) }}>
                        <div className={`${isOpen ? 'col-lg-3' : 'col-lg-3'}`}>
                          <img alt="" src={data.property_id.thumbnail_image} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                        </div>
                        <Col lg="3">
                          <div>
                            <h6>Name</h6>
                            <h6 className='sellername'>{data.user_id.name}</h6>
                          </div>
                          <div className='mt-20'>
                            <h6>Address</h6>
                            <h6 className='selleraddress'>{data.property_id.address.split(',').slice(0).shift()}</h6>
                            <h6 className='selleraddress'>{data.property_id.address.split(",").slice(1).join(",")}</h6>
                          </div>
                        </Col>
                        <Col lg="3">
                          <div>
                            <h6>Keywe Price</h6>
                            <h6 className='sellerkeyweprice'>${data.property_id.price.$numberDecimal}</h6>

                          </div>
                          <div className='mt-20'>
                            <h6>Days on Market</h6>
                            <h6 className='sellermarketdays'></h6>
                          </div>
                        </Col>
                        <Col lg="3">
                          <h6>List Price</h6>
                          <h6 className='sellerlistprice'>${data.property_id.price.$numberDecimal}</h6>
                        </Col>
                      </Row>
                    )}
                    <div className='resulttext'>
                      {isSellerFounded && <div className='no-resultSell mt-5'> Result not found</div>}
                    </div>
                  </div>
                  {isShowSeller ? (
                    <div className='col-md-4'>
                      <SellerDetail data={sellerDetail} />
                    </div>
                  ) : null}
                </div>
              </div>
            </Tab>
            <Tab eventKey="prospect" title="Prospects">
              <div className="container-fluid" style={{ padding: '0px' }}>
                <Row>
                  <div >
                    <div className='row position-relative'>
                      <div className={`${isOpen ? 'col-md-8' : 'col-md-12'}`} style={{ height: "950px", overflow: "auto" }}>

                        {sellerDetails.map((data, i) => (
                          <Row className='sellercardRow' onClick={() => { setAgentDetails(data); showMessage() }} key={i}>
                            <div className={`${isOpen ? 'col-lg-3' : 'col-lg-2'}`}>
                              <img alt="" src={data.property_id.thumbnail_image} style={{ width: '100%', height: '100%', borderRadius: '10px' }} className="sellerProspectImage" />
                            </div>
                            <Col lg="3">
                              <div>
                                <h6>Name</h6>
                                <h6 className='sellername'>{data.user_id.name}</h6>
                              </div>
                              <div className='prospectsource'>
                                <h6>Source</h6>
                                <h6 className='selleraddress'>KeyWe</h6>
                              </div>
                            </Col>
                            <Col lg="3">
                              <div>
                                <h6>Address</h6>
                                <h6 className='selleraddress'>{data.property_id.address}</h6>
                              </div>

                              <div className='prospectrefrel'>
                                <h6>Referral Fee</h6>
                                <h6 className='sellermarketdays'>{data.referral_fee}</h6>
                              </div>
                            </Col>
                            <Col lg="3">
                              <div>
                                <h6>Keywe Price</h6>
                                <h6 className='sellerkeyweprice'>${data.property_id.price.$numberDecimal}</h6>
                              </div>
                              <div className="d-grid gap-1 keywePrice">
                                <Button variant="primary"
                                  onClick={() => { toggleSuccess(); setAgentPropspectId(data._id) }}
                                  className={styled.acceptBtn}>
                                  Accept{" "}
                                </Button>
                              </div>
                              <div className="d-grid gap-1">
                                <Button variant="outline-primary" className={styled.declineBtn} onClick={() => { toggleUserSuccess(); setAgentPropspectId(data._id) }}>
                                  {" "}
                                  Decline{" "}
                                </Button>
                              </div>
                            </Col>
                          </Row>

                        ))}
                        <div>
                          {isSellerProspect && <div className='no-resultSell mt-5'> Result not found</div>}
                        </div>
                      </div>
                      {isOpen ? (
                        <div className='col-md-4'>
                          <ProspectDetail prospectDetail={agentDetails} />
                        </div>
                      ) : null}
                    </div>

                  </div>
                </Row>
              </div>
            </Tab>
          </Tabs>
        </div>
      </Layout>
    </>
  )
}





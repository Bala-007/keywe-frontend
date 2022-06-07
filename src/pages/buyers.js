import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { Tab, Tabs, Row, Col, Button, Card } from "react-bootstrap"
import "../assets/buyers.css"
import Seo from "../components/seo"
import searchIcon from "../../static/images/Icon feather-search.png"
import filterIcon from "../../static/images/sortup.png"
import * as styled from "../pages/buyers/buyer.module.css"
import EditProfilePopup from "../components/popup/EditProfilePopup"
import AcceptPopup from "../components/popup/AcceptPopup"
import DeclinePopup from "../components/popup/DeclinePopup"
import TourDetailPopup from "../components/popup/TourDetailPopup";
import { agentAccept, agentDecline, buyerProspectList, buyerList, rocommendedProperty } from "../components/Api/ListingApi"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AvatarImage from '../components/Avatar/avatarImage';
import Loader from "../components/Loader"
import BuyerProspect from "../pages/buyers/buyerProspect"
import BuyerDetails from "../pages/buyers/buyerDetails"

export default function Buyers() {
  const [buyerInfo, setBuyerInfo] = useState(false)
  const [buyer, setBuyer] = useState([])
  const [prospectDetails, setProspectDetails] = useState([])
  const [show, setShow] = useState(false)
  const [prospect, setProspect] = useState(false)
  const [tabName, setTabName] = useState('buyer')
  const [dataSort, setDataSort] = useState(-1)
  const [search, setSearch] = useState("")
  const [buyerdetail, setBuyerDetail] = useState({})
  const [buyerData, setBuyerData] = useState([])
  const [loader, setLoader] = useState(false);



  const showBuyerDetail = (data) => {
    setBuyerInfo(true)
    setBuyerData(data)
  }

  const showProspect = (data) => {
    console.log(data)
    setBuyerDetail(data)
    setProspect(true)
  }

  const handleAgentAccept = async () => {
    await agentAccept(buyerdetail._id).then((res) => {
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
      buyerProspect()
      listingApis()
      setProspect(false)
    })
  }

  const handleAgentDecline = async () => {
    await agentDecline(buyerdetail._id).then((res) => {
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
      buyerProspect()
      listingApis()
      setProspect(false)
    })
  }

  const toggleShow = () => setShow(p => !p)
  const [open, setOpen] = useState(false)
  const showDetail = () => {
    setOpen(true)
  }
  const [userOpen, setUserOpen] = useState(false)
  const showUserDetail = () => {
    setUserOpen(true)
  }
  const [success, setSucess] = useState(false)
  const toggleSuccess = () => setSucess(p => !p)
  const [userSuccess, setUserSucess] = useState(false)
  const toggleUserSuccess = () => setUserSucess(p => !p)
  const [detail, setDetail] = useState(false)
  const [isBuyerFounded, setBuyerFounded] = useState(false)
  const [isBuyerProspect, setIsBuyerProspect] = useState(false)
  const toggleDetail = () => setDetail(p => !p)

  useEffect(async () => {
    setLoader(true);
    await buyerProspect(search, dataSort);
    await listingApis(search, dataSort);
    await getRecommendList();
  }, [])
  const buyerProspect = async (searchs, dataSort) => {
    let userId = localStorage.getItem('userId')
    let getParams = {
      id: userId,
      status: 'waiting',
      search: searchs,
      sort_field: "_id",
      sort_value: dataSort
    }
    setLoader(true);
    await buyerProspectList(getParams).then((res) => {
      setLoader(false);
      res.data.data.length !== 0 ? setIsBuyerProspect(false) : setIsBuyerProspect(true)
      console.log('buyer prospect', res)
      setProspectDetails(res.data.data)

    })
  }
  const listingApis = async (searchs, dataSort) => {
    let userId = localStorage.getItem('userId')
    let getParams = {
      id: userId,
      status: 'accept',
      search: searchs,
      sort_field: "_id",
      sort_value: dataSort
    }
    setLoader(true);

    await buyerList(getParams).then(async (res) => {
      setLoader(false);
      setLoader(false);
      res.data.data.length !== 0 ? setBuyerFounded(false) : setBuyerFounded(true)
      console.log('buyer', res)
      setBuyer(res.data.data)

    })
  }
  const handleSearchList = async () => {
    if (tabName === 'buyer') {
      let userId = localStorage.getItem('userId')
      let getParams = {
        id: userId,
        status: 'accept',
        search: search
      }
      await buyerProspectList(getParams).then((res) => {
        setLoader(false);
        setBuyer(res.data.data)
      })
    }
    else if (tabName === 'prospect') {
      let userId = localStorage.getItem('userId')
      let getParams = {
        id: userId,
        status: 'waiting',
        search: search
      }
      await buyerProspectList(getParams).then((res) => {
        setProspectDetails(res.data.data)
      })
    }
  }
  const handleSearchKey = (event) => {
    if (event.key === 'Enter') {
      handleSearchList()
    }
  }
  //recomended property api
  const getRecommendList = async () => {
    let userId = localStorage.getItem('userId')
    await rocommendedProperty(userId).then(async (res) => {
      console.log("recomended propert", res)
    })
  }
  const handleSearch = () => {
    listingApis(search);
    buyerProspect(search);
  }
  const handleKeySearch=(event)=>{
    if (event.key === 'Enter') {
      handleSearch()
    }
  }
 
  return (
    <>
      {loader ? <Loader /> : null}

      <Layout>
        <Seo title="Buyers" />
        <ToastContainer />
        <div>
          <EditProfilePopup show={show} toggleShow={toggleShow} />
          <AcceptPopup success={success} toggleSuccess={toggleSuccess} agentAccept={handleAgentAccept} />
          <DeclinePopup
            userSuccess={userSuccess}
            toggleUserSuccess={toggleUserSuccess}
            agentDecline={handleAgentDecline}
          />
          <TourDetailPopup detail={detail} toggleDetail={toggleDetail} />
          <EditProfilePopup show={show} toggleShow={toggleShow} />

          <Tabs
            defaultActiveKey="buyer"
            id="uncontrolled-tab-example"
            className="mb-2"
            onSelect={(key) => { setTabName(key); listingApis(); buyerProspect() }}
          >
            <Tab eventKey="buyer" title="My Buyers">
              <div className="container-fluid p-0">
                <div className="row position-relative">
                  <div className="col-8" style={{ height: "950px", overflow: "auto" }}>
                    {buyer.map((data, i) => (
                      <Row key={i} className={styled.cardRow} onClick={() => showBuyerDetail(data)}>
                        <Col lg="2" style={{ marginTop: "15px" }}>
                          {data.user_id.img ?
                            < img src={process.env.API_IMAGE_URL + data.user_id.img} alt='image' className={styled.cardRowImg} />
                            : <>{data.user_id.name ? <div style={{ width: '88px', height: '88px', margin: 'auto' }}><AvatarImage fontSize={'38px'} data={data.user_id.name ? data.user_id.name : ''} /></div>
                              : null}</>
                          }
                        </Col>
                        <Col lg="4">
                          <div>
                            <div className="sellertour-title">Name</div>
                            <div className="sellertour-text">
                              {data.user_id.name}
                            </div>
                          </div>
                          <div style={{ paddingTop: "20px" }}>
                            <div className="sellertour-title">Status</div>
                            <span className={styled.cardRowSpan}>
                              {data.status}
                            </span>
                          </div>
                        </Col>
                        <Col lg="4">
                          <div>
                            <div className="sellertour-title">Contact</div>
                            <div className="sellertour-text"></div>
                          </div>
                          <div style={{ paddingTop: "20px" }}>
                            <div className="sellertour-title">Profile Status</div>
                            <span className="sellertour-text">
                              {data.user_id.profile_status}
                            </span>
                          </div>
                        </Col>
                        <Col lg="2">
                          <div className="sellertour-title">Saves</div>
                          <span className="sellertour-text">{data.saves}</span>
                        </Col>
                      </Row>
                    ))}
                    {isBuyerFounded && <div className='no-resultSell mt-5'>Result not found</div>}
                  </div>
                  <div className="col-4 mt-70">
                    <div className={styled.hunterbg}>
                      {buyerInfo ? (
                        <BuyerDetails data={buyerData}/>
                      ) : null}
                    </div>
                    
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="prospect" title="Prospects">
              <div className="container-fluid" style={{ padding: "0px" }}>
                <div className="row position-relative">
                  <div>
                    <Row>
                      <Col lg="8" style={{ height: "950px", overflow: "auto" }}>
                        {prospectDetails.map((data, i) => (
                          <Row
                            className={styled.cardRow}
                            onClick={() => showProspect(data)}
                            key={i}
                          >
                            <Col lg="2" style={{ marginTop: "15px" }}>
                              {data.user_id.img ?
                                < img src={process.env.API_IMAGE_URL + data.user_id.img} alt='image' className={styled.cardRowImg} />
                                : <>{data.user_id.name ? <div style={{ width: '88px', height: '88px', margin: 'auto' }}><AvatarImage fontSize={'38px'} data={data.user_id.name ? data.user_id.name : ''} /></div>
                                  : null}</>
                              }
                            </Col>
                            <Col lg="4">
                              <div>
                                <div className="sellertour-title">Name</div>
                                <h6 className="sellertour-text">{data.user_id.name}</h6>
                              </div>
                              <div style={{ paddingTop: "20px" }}>
                                <div className="sellertour-title">Source</div>
                                <div className="sellertour-text">
                                  KeyWe
                                </div>
                              </div>
                            </Col>
                            <Col lg="4">
                              <div>
                                <div className="sellertour-title">Area</div>
                                <div className="sellertour-text">
                                  {data.buy_info.area}
                                </div>
                              </div>
                              {/* <div style={{ paddingTop: "20px" }}>
                              <div className="sellertour-title">
                                Referral Fee
                              </div>
                              <span className="sellertour-text">
                                {data.referral_fee}
                              </span>
                            </div> */}
                            </Col>
                            {/* //Recomended property */}
                            <Col lg="2">
                              <div className="sellertour-title">Budget</div>
                              <span className="sellertour-text">
                                $ {data.buy_info.budget}
                              </span>
                              <div
                                className="d-grid gap-1"
                                style={{ margin: "18px 0px 8px" }}
                              ></div>
                              <div className="d-grid gap-1">
                                <Button
                                  variant="primary"
                                  className={styled.acceptBtn}
                                  onClick={toggleSuccess}
                                >
                                  {" "}
                                  Accept{" "}
                                </Button>
                              </div>
                              <div className="d-grid gap-1">
                                <Button
                                  variant="outline-primary"
                                  className={styled.declineBtn}
                                  onClick={toggleUserSuccess}
                                >
                                  {" "}
                                  Decline{" "}
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        ))}
                        {isBuyerProspect && <div className='no-resultSell mt-5'> Result not found</div>}
                      </Col>
                      {prospect ? (
                        <Col lg="4 mt-70">
                          <BuyerProspect data={buyerdetail} />
                        </Col>
                      ) : null}
                    </Row>
                  </div>
                </div>
              </div>

            </Tab>
          </Tabs>

          <div className="searchBuy">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ padding: "0px 25px" }}>
                <input type="search" id="gsearch" value={search} onChange={(e) => {
                  setSearch(e.target.value)}} onKeyDown={handleKeySearch} 
                   className="buyer-search" placeholder='Search City' />

                <div className="searchIconAgent">
                  <img
                    src={searchIcon}
                    alt="Icon feather-search.png"
                    className="search-icon-img cursor-pointer"
                    onClick={handleSearch}/>
                </div>
              </div>
              <div>
                <img src={filterIcon} alt="sortup.png" onClick={() => {
                  let sort = dataSort == -1 ? 1 : -1;
                  setDataSort(sort);
                  tabName == "buyer" ? listingApis(search, sort) : buyerProspect(search, sort);
                }} className='filter-icon-img' />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}


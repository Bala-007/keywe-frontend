import React, { useState, useEffect } from "react"
import Layout from "../../components/Layout";
import * as styles from "../../pages/seller/sellerProp.module.css";
import "react-multi-carousel/lib/styles.css"
import "bootstrap/dist/css/bootstrap.css";
import { StaticImage } from "gatsby-plugin-image"
import { Button, Card } from "react-bootstrap"
import { Icon } from "@iconify/react"
import Seo from "../../components/seo";
import Phone from "../../../static/images/phone.png";
import SelectAgentPopup from "../../components/popup/selectAgentPopup";
import { findAgentList, findAgentFeatureList } from "../../components/Api/ListingApi";
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import AvatarImage from '../../components/Avatar/avatarImage';
import ChatPopup from "../../components/popup/ChatPopup"

var currentPage = 1;
export default function Agent() {
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState([]);
  const [agentDetail, setAgentDetail] = useState([]);
  const [loader, setLoader] = useState(false);
  const [agentId, setAgentId] = useState('')
 
  //pagination
  const [pageCount, setPageCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [search, setSearch] = useState("")
  const [searchName, setSearchName] = useState("")
  console.log("search", search)


  useEffect(async () => {
    setLoader(true);
    await listingApis(search, searchName);
    await findAgentFeature(search, searchName);

  }, [])

  const findAgentFeature = async (searchs, searchNames) => {

    let getParams = {
      page: currentPage,
      pagesize: 21,
      search: searchs,
      name_search: searchNames

    };
    setLoader(true);

    await findAgentFeatureList(getParams)
      .then(async (res) => {
        setLoader(false);
        // setPageCount(res.data.Paging.total_page);
        // setSelectedPage(res.data.Paging.current_page - 1);
        setAgentDetail(res.data.data)
        console.log("-findAgentFeatureList-res", res);

      })
  }

  const listingApis = async (searchs, searchNames) => {

    let getParams = {
      page: currentPage,
      pagesize: 21,
      search: searchs,
      name_search: searchNames
    };

    await findAgentList(getParams)
      .then(async (res) => {
        setPageCount(res.data.Paging.total_page);
        setSelectedPage(res.data.Paging.current_page - 1);
        setDetail(res.data.data)
        console.log("-findAgentList-res", res);

      })
  }

  const handleSearch = () => {
    listingApis(search, searchName);
    findAgentFeature(search, searchName);

  }

  const handleSearchName = () => {
    listingApis(search, searchName);
    findAgentFeature(search, searchName);
  }

  const toggleShow = () => {
    setShow(p => !p)
  }
  async function handlePageClick(event) {
    console.log("page select", event);
    currentPage = event.selected + 1;
    await listingApis();
  };

  const hanldeImage = (img) => {
    let data = img.split('/')[0]
    if (data === "uploads") {
      return process.env.API_IMAGE_URL + img
    }
    else {
      return img
    }
  }
  const handleKeySearch=(event)=>{
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleKeySearchName=(event)=>{
    if (event.key === 'Enter') {
      handleSearchName()
    }
  }

  return (
    <>
      {loader ? <Loader /> : null}
      <Layout>
        <Seo title="Find an Agent" />
        <SelectAgentPopup show={show} toggleShow={toggleShow} agentId={agentId} />
       
        <div className="row">
          <div className="col-md-12 ps-4">
            <div className={styles.search}>
              <div className="me-4">
                <p className="mb-1">Search City</p>
                <div className="d-flex position-relative align-items-center">
                  <input type="search"  className="border-none form-control br-10" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Saratoga, CA" onKeyDown={handleKeySearch}/>
                  <span className="position-absolute right-10 cursor-pointer" onClick={handleSearch}><i class="fa fa-search"></i></span>
                </div>
              </div>
              <div>
                <p className="mb-1">Name</p>
                <div className="d-flex position-relative align-items-center">
                  <input type="search" className="border-none form-control br-10" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Agent Name" onKeyDown={handleKeySearchName}/>
                  <span className="position-absolute right-10 cursor-pointer" onClick={handleSearchName}><i class="fa fa-search"></i></span>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <p className={styles.featurehead}>Featured Agent</p>
              <div className="row">
                {agentDetail.map((data, i) => (
                  <div className="col-md-4 mb-4" onClick={() => setAgentId(data._id)} key={i}>
                    <Card
                      className={styles.agentCarouselCard2}
                      style={{
                        borderRadius: "25px",
                        width: "94%",
                        boxShadow:
                          "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)",
                      }}
                    >
                      <div className={styles.favorite}>


                        <img src={data.img} alt="agent" className={styles.agentProfile} />
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          <p className={styles.agentName}>{data.name}</p>
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
                          <div className={styles.phonenumber}>
                            <img src={Phone} alt="Phone" className={styles.mobileImage} />
                            <p className={styles.agentNumber}>{data.phone_number}</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className={styles.active} >
                            <Icon icon="bi:chat" style={{ color: "red" }} />
                            <p style={{ color: "#0490fb", fontSize: "14px", fontWeight: "bold", padding: "5px", }}>Chat</p>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <p className={styles.agentLicense}>License #: {data.license_number}</p>
                        </div>
                        <div className="col-md-7 ps-0">
                        </div>

                        <div className="pv-32">
                          <button className='btn w-100 primaryColor mb-3 br-10 f-14' onClick={data => toggleShow(data)}>
                            Select Agent
                          </button>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className={styles.agenthead}>Agents</p>
              <div className="row">
                {detail.map((data, i) => (
                  <div className='col-md-4 mb-4' onClick={() => setAgentId(data._id)} key={i}>
                    <Card
                      className={styles.agentCarouselCard2}
                      style={{
                        borderRadius: "25px",
                        width: "94%",
                        boxShadow:
                          "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)",
                      }}
                    >
                      <div className={styles.favorite}>
                        {/* {data.img ?
                            <img alt="no_image" src={process.env.API_IMAGE_URL + data.img} style={{ width: '100%', height: '80%', borderRadius: '75px' }} />
                            : <>{data.name ? <div style={{ width: '88px', height: '88px' }}><AvatarImage fontSize={'40px'} data={data.name ? data.name : ''} /></div>
                              : null}</>  } */}

                        {data.img ?
                          <img src={hanldeImage(data.img)} alt='tour2' className={styles.agentProfile} style={{ borderRadius: "50%" }} />
                          : <div className={styles.agentProfile}><AvatarImage fontSize={'85px'} data={data.name ? data.name : ''} /></div>
                        }                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          <p className={styles.agentName}>{data.name}</p>
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
                          <div className={styles.phonenumber}>
                            <img src={Phone} alt="Phone" className={styles.mobileImage} />
                            <p className={styles.agentNumber}>{data.phone_number}</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className={styles.active} >
                            <Icon icon="bi:chat" style={{ color: "red" }} />
                            <p style={{ color: "#0490fb", fontSize: "14px", fontWeight: "bold", padding: "5px", }}>Chat</p>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <p className={styles.agentLicense}><b>License #:</b> {data.license_number}</p>
                          <p className={styles.agentCity}><b>City:</b> {data.address_city}</p>
                        </div>
                        <div className="pv-32">
                          <button className='btn w-100 primaryColor mb-3 br-10 f-14' onClick={(data) => toggleShow(data)}>
                            Select Agent
                          </button>
                        </div>
                      </div>
                    </Card>

                  </div>
                ))}
              </div>
            </div>
          </div>
          {detail.length > 0 ? <Pagination pageCount={pageCount} handlePageClick={handlePageClick} forcePage={selectedPage} /> : null}
        </div >

      </Layout >
    </>
  )
}

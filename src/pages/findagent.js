import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import { Card } from "react-bootstrap"
import { Container, Row, Col, Text, Button } from "react-bootstrap"
import * as styles from "../pages/seller/seller.module.css";
import user4 from "../../static/images/noah.png"
import Seo from "../components/seo";
import searchIcon from '../../static/images/Icon feather-search.png';
import filterIcon from '../../static/images/sortup.png';
import SelectGroupPopup from "../components/popup/SelectGroupPopup"
import { findAgentList } from "../components/Api/ListingApi";
import Pagination from '../components/Pagination';
import AvatarImage from "../components/Avatar/avatarImage"

var currentPage = 1;

export default function FindAgent() {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(p => !p);
  const [detail, setDetail] = useState([])
  const [pageCount, setPageCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [search, setSearch] = useState("")

  useEffect(async () => {
    await listingApis(search);

  }, [])

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

  async function handlePageClick(event) {
    console.log("page select", event);
    currentPage = event.selected + 1;
    await listingApis();
  };
  const handleSearch = (value) => {
    setSearch(value)
    listingApis(value, search);
   

  }

  const hanldeImage=(img)=>{
    let data=img.split('/')[0]
    if(data === "uploads"){
      return process.env.API_IMAGE_URL+img
    }
    else{
      return img
    }
  }

  return (

    <Layout>

      <div className='searchBuy searchIcons'>
        <SelectGroupPopup show={show} toggleShow={toggleShow} />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ padding: '0px 25px' }}>

            <form>
              <input type="search" id="gsearch" value={search} onChange={(e) => handleSearch(e.target.value)} className="buyer-search" placeholder='Search' />
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

      <Seo title="Find Agent" />

      <div style={{ background: "#f1f1f1" }}>
        <div>
          <div>
            <Row>
  
              <Col lg="11" style={{ padding: "0px", margin: "50px" }}>
              
              {detail.map((data, i) => (
                  <Row  className={styles.agentsCard}>
                    
                    <Row className={styles.agentsCardsize}>
                      <Col lg="1">
                               
                    {data.img ?
                      <img src={hanldeImage(data.img)} alt='tour2' className={styles.agentimage} style={{ borderRadius: "50%" }} />
                      : <div className={styles.agentProfile}><AvatarImage fontSize={'85px'} data={data.name ? data.name : ''} /></div>
                    } 
                        {/* <img className={styles.agentimage} src={data.img} /> */}
                      </Col>
                      <Col lg="2">
                        <div className={styles.agentsCardname}>
                          <div style={{ fontFamily: "DejaVuSansBold", marginBottom: "5px" }}>{data.name}</div>
                          <div>{data.address_city}</div>
                        </div>
                      </Col>
                      <Col lg="2">
                        <div>
                          <div style={{ marginBottom: "5px" }}>Location</div>
                          <div style={{ fontFamily: "DejaVuSansBold" }}>{data.address}</div>
                        </div>
                      </Col>
                      <Col lg="3">
                        <div>
                          <div style={{ marginBottom: "5px" }}>Email</div>
                          <div style={{ fontFamily: "DejaVuSansBold" }}>{data.email}</div>
                        </div>
                      </Col>
                      <Col lg="2">
                        <div>
                          <div style={{ marginBottom: "5px" }}>Phone</div>
                          <div style={{ fontFamily: "DejaVuSansBold" }}>{data.phone_number}</div>
                        </div>
                      </Col>
                      <Col lg="2">
                        <div>
                          <Button onClick={toggleShow} variant="primary" className={styles.agentsCardbtn}> Invite to Group </Button>
                        </div>
                      </Col>
                    </Row>
                  </Row>
                ))}
              </Col>
             
            </Row>
          </div>
        </div>
        {detail.length > 0 ? <Pagination pageCount={pageCount} handlePageClick={handlePageClick} forcePage={selectedPage} /> : null}
      </div>
    </Layout>


  )
}




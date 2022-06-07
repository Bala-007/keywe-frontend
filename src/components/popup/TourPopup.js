import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';
import tourimage1 from '../../../static/images/tourimage1.png';
import tourimage2 from '../../../static/images/tourimage2.png';
import tourimage3 from '../../../static/images/tourimage3.png';
import tourimage4 from '../../../static/images/tourimage4.png';
import CalendarPopup from '../../components/popup/CalendarPopup';
import { positions } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { claimAgent } from "../../state/claimAgentList";
import { getAgent } from "../../state/getAllAgent";
import Pagination from "../Pagination";
import BuyerScheduleCalender from "./buyerScheduleCalender";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Handyman } from "@mui/icons-material";
import AvatarImage from "../Avatar/avatarImage";
import * as styles from "../../pages/seller/seller.module.css";

function TourPopup(props) {
  const { show, toggleShow, claimId, propertyId, location,propertyDetails } = props;
  const [click, setClick] = useState(false);
  const toggleClick = () => setClick(p => !p);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [checkAgent, setCheckAgent] = useState({
    data: {},
    list: ''
  })
  const [dates, setDates] = useState([{
    "data": {
      "mon": {
        "flag": true,
        "time": [
          {
            "from": "7:00am",
            "to": "8:00am"
          },
          {
            "from": "9:00am",
            "to": "10:00am"
          },
          {
            "from": "11:00am",
            "to": "12:00pm"
          }
        ]
      },
      "tue": {
        "flag": true,
        "time": [
          {
            "from": "7:00am",
            "to": "8:00am"
          }
        ]
      },
      "wed": {
        "flag": false,
        "time": [
          {
            "from": "7:00am",
            "to": "8:00am"
          }
        ]
      },
      "thu": {
        "flag": true,
        "time": [
          {
            "from": "7:00am",
            "to": "8:00am"
          }
        ]
      },
      "fri": {
        "flag": true,
        "time": [
          {
            "from": "7:00am",
            "to": "8:00am"
          }
        ]
      },
      "sat": {
        "flag": false,
        "time": []
      },
      "sun": {
        "flag": false,
        "time": []
      },
      "date": {
        "time": [
          {
            "5/8/2022": [
              {
                "from": "7:00am",
                "to": "8:00am"
              },
              {
                "from": "9:00am",
                "to": "10:00am"
              },
              {
                "from": "11:00am",
                "to": "12:00pm"
              }
            ],
            "5/7/2022": [
              {
                "from": "8:00am",
                "to": "9:00am"
              },
              {
                "from": "10:00am",
                "to": "11:00am"
              },
              {
                "from": "12:00pm",
                "to": "1:00pm"
              }
            ],
            "5/6/2022": [
              {
                "from": "7:00am",
                "to": "9:00am"
              }
            ]
          }
        ]
      },
    }
  }
  ])
  const claimAgentDetails = useSelector(state => state.claimAgent.result)
  const getAllAgentDetails = useSelector(state => state.getAgent.result)
  const [getAllAgent, setGetAllAgent] = useState({})
  console.log('claimAgentDetails', propertyDetails)
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const [selectDropDown, setSelectDropDown] = useState("")

  useEffect(() => {
    let params = {
      page: 1,
      pagesize: 5
    }
    dispatch(getAgent(params))
  }, [])

  useEffect(() => {
    if (claimId !== null) {
      dispatch(claimAgent(claimId))
    }
  }, [claimId])

  async function handlePageClick(event) {
    let currentPage = event.selected + 1;
    console.log("page select", currentPage);
    let params = {
      page: currentPage,
      pagesize: 5,
      name_search: search,
      max_distance: selectDropDown,
      longitude: selectDropDown !== "" ? location.coordinates[0]:'',
      latitude: selectDropDown !== "" ? location.coordinates[1]:''
    }
    dispatch(getAgent(params))
  };

  useEffect(() => {
    console.log('agent List',getAllAgentDetails)
    setGetAllAgent({...getAllAgentDetails})
    if (getAllAgentDetails.data !== undefined && getAllAgentDetails.data.length !== 0) {
      setPageCount(getAllAgentDetails.Paging.total_page);
      setSelectedPage(getAllAgentDetails.Paging.current_page - 1);
    }

  }, [getAllAgentDetails])

  const handleSubmit = () => {
    console.log('data', checkAgent)
    if (Object.keys(checkAgent.data).length !== 0) {
      if (checkAgent.list === "listingAgent") {
        if (checkAgent.data.meta_id.staff_id !== undefined) {
          toggleClick()
        }
        else {
          toast.error('Appointment time not available', {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
          });
        }
      }
      else if (checkAgent.list === "otherAgents") {
        console.log('hi')
        if (checkAgent.data.user_id !== null && checkAgent.data.user_id.meta_id.staff_id !== undefined && checkAgent.data.user_id.meta_id.staff_id !== null) {
          toggleClick()
        }
        else {
          toast.error('Appointment time not available', {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
          });
        }
      }
    }
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

  const handleCheck = (data, list, e) => {
    if (e.target.checked) {
      setCheckAgent({ ...checkAgent, data: data, list: list })
    }
    else {
      setCheckAgent({ ...checkAgent, data: {}, list: '' })
    }
    console.log('id,list', data, list, e.target.checked)
  }

  const handleSearch = () => {
    let params = {
      page: 1,
      pagesize: 5,
      name_search: search,
      max_distance: selectDropDown,
      longitude: selectDropDown !== "" ? location.coordinates[0]:'',
      latitude: selectDropDown !== "" ? location.coordinates[1]:''
    }
    console.log(params)
    dispatch(getAgent(params))
  }
  const hanldeSelect = (e) => {
    setSelectDropDown(e.target.value)
    let params = {
      page: 1,
      pagesize: 5,
      name_search: search,
      max_distance: e.target.value,
      longitude: location.coordinates[0],
      latitude: location.coordinates[1]
    }
    dispatch(getAgent(params))
  }
const handleKeyDown=(event)=>{
  if (event.key === 'Enter') {
    handleSearch()
  }
}
  return (
    <div>
      <ToastContainer />
      <BuyerScheduleCalender click={click} toggleClick={toggleClick} data={dates[0].data} details={checkAgent} propertyId={propertyId} closeTour={toggleShow} />
      <Modal show={show} onHide={toggleShow} dialogClassName="tour-popup">
        <Modal.Header closeButton className="team-popup-margin teampopup-title " >
          <Modal.Title className='form-field-label form-label-team '><p style={{ fontFamily: "DejaVuSansBold" }}>To schedule a tour, please connect with an agent</p>
            <p className={style1.tourtext1}>Agents will be able to review your profile information.</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
          <div className={style1.popupsearch}>
            <p className={style1.tourtext1}>Search</p>
            <p className={style1.tourtext1}>Select Radius</p>
          </div>
          <div className={style1.popupselect}>
            <div style={{ position: "relative" }}>
              <input type="search" placeholder="Search by Keywords" className={style1.toursearch} value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={handleKeyDown}/>
              <span className={style1.toursearchIcon} onClick={handleSearch}><i class="fa fa-search"></i></span>
            </div>
            <select name="miles" id="miles" className={style1.selectdistance} onChange={hanldeSelect}>
              <option value={selectDropDown} disabled selected>Select for distance</option>
              <option value="">0 Miles</option>
              <option value="5">5 Miles</option>
              <option value="10">10 Miles</option>
              <option value="20">20 Miles</option>
              <option value="50">50 Miles</option>
              <option value="100">100 Miles</option>
            </select>
          </div>
          <div>
            <p style={{ fontFamily: "DejaVuSansBold" }}>Listing Agent</p>
            {propertyDetails.agent_id !== undefined &&
                <div className="row align-items-center pb-3" >
                  <div className="col-md-1">
                    <label className="checkbox">
                      <input type="checkbox" className="checkbox__input" onChange={(e) => handleCheck(propertyDetails.agent_id, "listingAgent", e)} checked={checkAgent.data._id === propertyDetails.agent_id._id && checkAgent.list === "listingAgent" ? true : false} />
                      <span className="checkbox__inner"></span>
                    </label>
                  </div>
                  <div className="col-md-3">
                    {propertyDetails.agent_id.img ?
                      <img src={hanldeImage(propertyDetails.agent_id.img)} alt='tour2' className="tour" width={75} height={75} style={{ borderRadius: "40px" }} />
                      : <div style={{ width: '75px', height: '75px', position: 'relative' }}><AvatarImage fontSize={'38px'} data={propertyDetails.agent_id.name ? propertyDetails.agent_id.name : ''} /></div>
                    }
                    {/* <img src={item.img} alt='tour2' width={75} height={75} style={{ borderRadius: "40px" }} /> */}
                  </div>
                  <div className="col-md-5">
                    <p style={{ fontFamily: "DejaVuSansBold" }} className="text-capitalize">{propertyDetails.agent_id.name}</p>
                    <p>{propertyDetails.agent_id.address_city !== null && propertyDetails.agent_id.address_city}</p>
                  </div>
                </div>
              }
          </div>
          {Object.keys(getAllAgent).length !== 0 && getAllAgent.data !== undefined && getAllAgent.data.length !== 0 &&
            <div>
              <p style={{ fontFamily: "DejaVuSansBold" }}>Other agents in your Area</p>
              <hr />
              {getAllAgent.data.map((item, index) => (
                <>
                  <div className="row align-items-center" key={index}>
                    <div className="col-md-1">
                      <label className="checkbox">
                        <input type="checkbox" className="checkbox__input" onChange={(e) => handleCheck(item, "otherAgents", e)} checked
                          ={checkAgent.data._id === item._id && checkAgent.list === "otherAgents" ? true : false} />
                        <span className="checkbox__inner"></span>
                      </label>
                    </div>
                    <div className="col-md-3">
                      {item.img ?
                        <img src={hanldeImage(item.img)} alt='tour2' className="tour" width={75} height={75} style={{ borderRadius: "40px" }} />
                        : <div style={{ width: '75px', height: '75px', position: 'relative' }}><AvatarImage fontSize={'38px'} data={item.name ? item.name : ''} /></div>
                      }
                      {/* <img src={item.img} alt='tour2' width={75} height={75} style={{ borderRadius: "40px" }} /> */}
                    </div>
                    <div className="col-md-5">
                      <p style={{ fontFamily: "DejaVuSansBold" }}>{item.name}</p>
                      <p>{item.address_city}</p>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
              {getAllAgent.data.length !== 0 && <Pagination pageCount={pageCount} handlePageClick={handlePageClick} forcePage={selectedPage} />}
            </div>
          }
        </Modal.Body>
        <Modal.Footer className="team-popup-margin teampop-footer" >
          <Button variant="primary" onClick={handleSubmit} className='teamnext-submit-btn row col-lg-12 col-xl-12 col-md-12'> Connect with Agent </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default TourPopup
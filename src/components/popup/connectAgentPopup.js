import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';
import SuccessPopup from "./successPopup";
import { findAgentList } from "../Api/ListingApi"
import Pagination from '../Pagination';
import { traferOwnership } from "../Api/formApi";
import RefrelfeePopup from "./RefrelfeePopup";
import { data, param } from "jquery";
import OwnedPropDetails from "../../pages/seller/OwnedPropDetails";
import ProspectDetail from "../../pages/sellers/prospectDetail";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from "@mui/icons-material";
import { useSelector } from "react-redux";
import AvatarImage from "../Avatar/avatarImage";

var currentPage = 1;
function ConnectAgentPopup(props) {
  const { connect, toggleConnect, location, isActive } = props;

  const [detail, setDetail] = useState([])
  const [pageCount, setPageCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [searchName, setSearchName] = useState("")
  const [miles, setMiles] = useState(null)
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(p => !p);
  const [success, setSucess] = useState(false);
  const toggleSuccess = () => setSucess(p => !p);
  const [isData, setIsData] = useState(false)
  const userDetails = useSelector(state => state.user.userDetail);
  const [isCheck, setIsCheck] = useState(false)
  const [selectDropDown, setSelectDropDown] = useState("")

  const agentDetails = props.data
  console.log('prospectDetail.......', props)
  const details = props.data
  console.log("owned property", props.data)



  const transferApis = async () => {
    console.log('detsial', detail)
    if (isCheck) {
      if (isActive === false) {
        toggleShow()
        toggleConnect()
      }
      else {
        var datas = []
        detail.map((item) => {
          if (item.is_active === false) {
            datas.push(item._id)
          }
        })
        let userId = localStorage.getItem('userId')
        let createPostData = {
          user_id: userId,
          agent_id: datas,
          type: "sell",
          property_id: props.data._id
        };
        // console.log("transfer", createPostData);
        await traferOwnership(createPostData)
          .then(async (res) => {
            if (res.status === 200) {
              toggleSuccess()
              setTimeout(()=>toggleSuccess(),3000)
              setTimeout(()=>toggleConnect(),3000)
            }

            console.log("--createRes--", res)
          }).catch((error) => {
            console.log(error)
            toggleConnect()
            toast.error('Already applied request', {
              position: "top-right",
              autoClose: 3000,
              closeOnClick: true,
            });
          })
      }
    }
  }
  useEffect(async () => {
    await listingApis();

  }, [])

  const listingApis = async (getParams) => {
    console.log(getParams)
    await findAgentList(getParams)
      .then(async (res) => {
        if (userDetails.role === 'agent') {
          var number = null
          res.data.data.map((item, index) => {
            if (item.email === userDetails.email) {
              number = index
            }
          })
          if (number !== null) {
            res.data.data.splice(number, 1)
            console.log(res.data.data)
          }

        }
        setPageCount(res.data.Paging.total_page);
        setSelectedPage(res.data.Paging.current_page - 1);
        if (res.data.data.length !== 0)
          setIsData(false)
        else
          setIsData(true)
        setDetail(res.data.data)
        console.log("-findAgentList-res", res.data.data);

      })
  }
  const handleSearchName = () => {
    let params = {
      page: 1,
      pagesize: 21,
      name_search: searchName,
      max_distance: selectDropDown,
      longitude: selectDropDown !== "" ? location.coordinates[0] : '',
      latitude: selectDropDown !== "" ? location.coordinates[1] : ''
    }
    listingApis(params);
  }


  async function handlePageClick(event) {
    console.log("page select", event);
    currentPage = event.selected + 1;
    let params = {
      page: currentPage,
      pagesize: 21,
      name_search: searchName,
      max_distance: selectDropDown,
      longitude: selectDropDown !== "" ? location.coordinates[0] : '',
      latitude: selectDropDown !== "" ? location.coordinates[1] : ''
    }
    await listingApis(params);
  };

  const handleDistance = async (e) => {
    console.log(e.target.value)
    let distance = e.target.value
    setMiles(e.target.value)
    let data = {
      longitude: location.coordinates[0],
      latitude: location.coordinates[1],
      max_distance: distance
    }
    await findAgentList(data).then(res => {
      setDetail(res.data.data)
      setPageCount(res.data.Paging.total_page);
      setSelectedPage(res.data.Paging.current_page - 1);
    })
  }

  const handleMultiple = (i, id, e) => {
    let data = [...detail]
    data[i].is_active = !data[i].is_active
    setDetail(data)
    setIsCheck(e.target.checked)
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
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchName()
    }
  }
  const hanldeSelect = (e) => {
    setSelectDropDown(e.target.value)
    let params = {
      page: 1,
      pagesize: 21,
      name_search: searchName,
      max_distance: e.target.value,
      longitude: location.coordinates[0],
      latitude: location.coordinates[1]
    }
    listingApis(params);
  }
  return (
    <div>
      <ToastContainer />
      <SuccessPopup success={success} toggleSuccess={toggleSuccess} />
      <RefrelfeePopup data={agentDetails} agentId={detail} show={show} toggleShow={toggleShow} />
      <Modal show={connect} onHide={toggleConnect} >
        <Modal.Header closeButton className="team-popup-margin teampopup-title " >
          <Modal.Title className='form-field-label form-label-team '><p>Connect with an Agent</p>
            <p>Select Agent</p>
            <p className={style1.agentText2}>Agent will be able to review your possibly listing information</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
          <div className={style1.popupsearch}>
            <p>Search</p>
            <p>Select Radius</p>
          </div>
          <div className={style1.popupselect}>
            <input type="search" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Search by Keywords" className={style1.toursearch} onKeyDown={handleKeyDown} />
            <span className={style1.searchIcon} onClick={handleSearchName}><i className="fa fa-search"></i></span>
            {/* <input type="number" value={miles} onChange={handleDistance} placeholder="Miles" className={style1.selectdistance} /> */}
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
          {detail.length !== 0 &&
            <div className="row overflow-auto" style={{ height: '400px' }}>
              {detail.map((data, i) => (
                <div key={i} className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-1">
                      <label className="checkbox">
                        <input type="checkbox" onChange={(e) => handleMultiple(i, data._id, e)} checked={data.is_active ? false : true} className="checkbox__input" />
                        <span className="checkbox__inner"></span>
                      </label>
                    </div>
                    <div className="col-md-3">
                      {data.img ?
                        <img src={hanldeImage(data.img)} alt='tour2' className="tour" width={75} height={75} style={{ borderRadius: "40px" }} />
                        : <div style={{ width: '75px', height: '75px', position: 'relative' }}><AvatarImage fontSize={'38px'} data={data.name ? data.name : ''} /></div>
                      }
                    </div>
                    <div className="col-md-8">
                      <p style={{ fontFamily: "DejaVuSansBold" }} className="text-capitalize">{data.name}</p>
                      <p>{data.address_city}</p>
                    </div>
                    {/* <div className="col-md-3">
                    <p className={style1.tourtext}>14 Recent Sales</p>
                    <p className={style1.tourtext}>1 Listing</p>
                  </div> */}
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          }
          {isData && <p className="text-center">No Agents Found</p>}
          {detail.length > 0 ? <Pagination pageCount={pageCount} handlePageClick={handlePageClick} forcePage={selectedPage} /> : null}
        </Modal.Body>
        <Modal.Footer className="team-popup-margin teampop-footer" >
          <Button variant="primary" onClick={transferApis} className='teamnext-submit-btn row col-lg-12 col-xl-12 col-md-12'>
            Send Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default ConnectAgentPopup
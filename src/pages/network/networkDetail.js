import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Tab, Tabs, Row, Col, Button, Card, Container, Dropdown } from 'react-bootstrap'
import '../network/network.css'
import { RiDeleteBinLine, RiArrowLeftLine } from "react-icons/ri";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import searchIcon from '../../../static/images/Icon feather-search.png';
import deleteIcon from '../../../static/images/deleteIcon.png';
import plusIcon from '../../../static/images/plus.png';
import deletesIcon from '../../../static/images/delete.png';
import Seo from "../../components/seo";
import { Link } from 'gatsby';
import message from '../../../static/images/message.png';
import Daniel from '../../../static/images/Daniel.png';
import messageIconnetwork from '../../../static/images/messageIconnetwork.png'

export default function Network() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataArr = [
      { id: 1, Name: 'Daniel Howell', Company: "Meridian Trust", Role: "Agent", image: "/images/Daniel.png", },
      { id: 2, Name: 'Edward Richards', Company: "Elseworth Maine", Role: "Broker", image: "/images/edwards.png", },
      { id: 3, Name: 'Elizabeth stewart', Company: "Gateway Center", Role: "Owner", image: "/images/Elisabeth.png", },
      { id: 4, Name: 'Julia Duncan', Company: "Coldwell Banker", Role: "Agent", image: "/images/Julia.png", },
      { id: 5, Name: 'Janet Barnent', Company: "Proscott Agency", Role: "Agent", image: "/images/Juneth.png", },
      { id: 6, Name: 'Daniel Howell', Company: "Meridian Trust", Role: "Agent", image: "/images/Daniel.png", },
      { id: 7, Name: 'Edward Richards', Company: "Elseworth Maine", Role: "Broker", image: "/images/edwards.png", },
      { id: 8, Name: 'Elizabeth stewart', Company: "Gateway Center", Role: "Owner", image: "/images/Elisabeth.png", },
      { id: 9, Name: 'Julia Duncan', Company: "Coldwell Banker", Role: "Agent", image: "/images/Julia.png", },
      { id: 10, Name: 'Janet Barnent', Company: "Proscott Agency", Role: "Agent", image: "/images/Juneth.png", },
    ]
    setData(dataArr);
  }, []);
  return (
    <Layout>
      <Seo title="Network" />
      <div className='searchBuy networkSearch'>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ padding: '0px 15px' }}>

            <form>
              <input className="buyer-search" placeholder='Search' />
              <div className="searchIconAgent" >
                <img src={searchIcon} alt="Icon feather-search.png" className='search-icon-img' />
              </div>
            </form>
          </div>

        </div>
      </div>
      <div>
      <Link to="/network">
        <div className='networkbackicon'>       
          <RiArrowLeftLine style={{ fill: '' }} size="25px" />
          <p className='backtext m-0 ps-1'>Back</p>
        </div>
        </Link>
        <div className="networkdethead">
          <Link to="" className='networkselect'>Select All</Link>
          <h5 className='networkheading'>Lenux Homes</h5>
          <div className='networkdetbut'>
            <div className='position-relative'>
              <Button className='networkdelete '>
                Delete
              </Button>
              <img src={deleteIcon} alt="deleteIcon" className='networkdeleteIcon' />
            </div>
            <div className='position-relative'>
              <Button className='networkmessage'>
                Message
              </Button>
              <img src={messageIconnetwork} alt="messageIconnetwork" className='messageIconnetwork' />
            </div>
            <div>
              <img src={plusIcon} alt="plus.png" className='pluses-icon-img' />
              <Button className='networkdetadd'> Add New Member</Button>
            </div>
          </div>
        </div>
        <Card className='networkdetailCard'>
          {data.map((item, index) =>
            <div className='row networkcenter' key={index}>
                <div className="col-md-1">
                  <label className="checkbox">
                    <input type="checkbox" className="checkbox__input" />
                    <span className="checkbox__inner"></span>
                  </label>
                </div>
                <div className="col-md-1 ml-70">
                  <img alt="" src={item.image} />
                </div>
                <div className="col-md-2 ml-40">
                  <p className="danielname">{item.Name}</p>
                </div>
              
              <div className='col-md-3 deletemessage'>
                <p style={{ margin: "0" }}>Company</p>
                <p className='maridianText'>{item.Company}</p>
              </div>
              <div className='col-md-3 deletemessage'>
                <p style={{ margin: "0" }}>Role/Title</p>
                <p className='agentText'>{item.Role}</p>
              </div>
              <div className='col-md-2 deletemessage'>
                <img src={deletesIcon} alt="delete.png" className='deletes-icon-img' style={{ width: "15px" }} />
                <img src={message} alt="message" style={{ marginLeft: "40px", width: "28px" }} />
              </div>
              <hr className='networkhrtag' />
            </div>
          )}


        </Card>
      </div>

    </Layout>
  )
}
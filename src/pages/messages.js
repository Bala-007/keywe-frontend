import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout'
import Seo from "../components/seo";
import { Container, Row, Col, Text, Button, Tab, Tabs, Card } from "react-bootstrap";
import * as styles from "../pages/seller/seller.module.css";
import { Icon } from "@iconify/react";
import MessageDetail from './seller/messageDetail';
import ToggleSwitch from './bars/toggleSwitch';
import { Link } from 'gatsby';
import TimeRangePopup from '../components/popup/TimeRangePopup';
import searchIcon from '../../static/images/Icon feather-search.png';
import filterIcon from '../../static/images/sortup.png';
import sendimage from '../../static/images/Group327.png';
import axios from 'axios';
import { Client } from 'twilio-chat';

export default function Messages() {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(p => !p);
  const [open, setOpen] = useState(false)
  const [roomName, setRoomName] = useState('keywe')
  const [channel, setChannel] = useState({})
  const [messages, setMessages] = useState([])
  const [email,setEmail]=useState('')
  const [textMessage,setTestMessage]=useState('')

  const scrollDiv = useRef()

  const showDetail = async (email) => {
    setEmail(email)
    let response = await axios.get(`http://localhost:3000/token/${email}`)
    const { data } = response;
    console.log('data', data)

    const client = await Client.create(data.token)

    client.on('channelJoined', async (channel) => {
      const messages = await channel.getMessages();
      if (messages.items.length !== 0) {
        if (messages.items[0].channel.channelState.uniqueName === roomName) {
          console.log(messages.items)
          setMessages(messages.items)
        }
      }
    })

    try {
      const channel = await client.getChannelByUniqueName(roomName);
      console.log('uniqname', channel)
      setChannel(channel)
      await joinChannel(channel);
    } catch {
      try {
        const channel = await client.createChannel({
          uniqueName: roomName,
          friendlyName: roomName
        });
        console.log('create channel', channel)
        setChannel(channel)
        await joinChannel(channel);
        console.log('catch channel', channel)
      } catch {
        console.log("unable to create channel, please reload this page");
      }
    }
    setOpen(true)
  }
  const joinChannel = async (channel) => {
    console.log('joinChannel')
    if (channel.channelState.status !== "joined") {
      await channel.join()
    }
    channel.on("messageAdded", handleMessageAdded)
  }

  const handleMessageAdded = (message) => {
    console.log('message', message)
    console.log('normal message',messages)
  }
  const sendMessage = () => {
    channel && channel.sendMessage(textMessage)
    setTestMessage('')
    console.log('original send message',messages)
  }


  const [data, setData] = useState([]);
  useEffect(() => {
    const dataArr = [
      { id: 1,email:'asheel@yopmail.com', name: 'Marguerite Goodwin', text: "This text is for sample purposes, it will be replaced with the actual text later,  it will be replaced with the actual text later", image: "/images/Mask Group 56.png", profile: "Buyer", time: "4 hrs ago" },
      { id: 2,email:'tony@yopmail.com', name: 'Daniel Beck', text: "This text is for sample purposes, it will be replaced with the actual text later", image: "/images/Mask Group 174.png", profile: "Buyer", time: "8 hrs ago" },
      { id: 3,email:'strange@yopmail.com', name: 'Alex Griffin', text: "This text is for sample purposes, it will be replaced with the actual text later", image: "/images/Mask Group 49.png", profile: "Seller", time: "1 day ago" },
      { id: 4,email:'peter@yopmail.com', name: 'Mae Hart', text: "This text is for sample purposes, it will be replaced with the actual text later", image: "/images/profile_1.png", profile: "Seller", time: "1 day ago" },
    ]
    setData(dataArr);
  }, [])
  return (
    <Layout>

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
      <Seo title="Messages" />
      <TimeRangePopup show={show} toggleShow={toggleShow} />

      <div className='row'>
        <div className={`${open ? 'col-md-8' : 'col-md-12'}`} >
          <div className={styles.headText}>
            <p className={styles.chatText}>Live Chat</p>
            <ToggleSwitch />
            <Link to="" onClick={toggleShow} style={{ marginLeft: "8px", marginTop: "10px" }}>Edit</Link>
          </div>
          {data.map((item, index) =>
            <div key={index} >
              <div onClick={()=>showDetail(item.email)}>
                <Card className={styles.msgCard} style={{ border: "none" }}>
                  <div className='row' style={{ marginTop: "25px", alignItems: "center" }}>
                    <div className='col-md-2'>
                      <img alt="" className={styles.profilemarImage} src={item.image} />
                    </div>
                    <div className='col-md-8'>
                      <p style={{ fontFamily: "DejaVuSansBold", fontSize: "16px", marginBottom: "10px" }}>{item.name}</p>
                      <p style={{ fontSize: "16px", }}>{item.text}</p>
                    </div>
                    <div className='col-md-2' style={{ textAlign: "right", marginLeft: "-40px" }}>
                      <p style={{ fontFamily: "DejaVuSansBold", fontSize: "16px", marginBottom: "10px" }}>{item.profile}</p>
                      <p style={{ fontSize: "12px", color: "#848484" }}>{item.time}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
        {open ? (
          <div className="col-md-4 mt-0" >
            <div style={{ background: 'white' }}>
            <div style={{ height: '450px', overflow:'auto'}} ref={scrollDiv}>
              {messages &&
                messages.map((message, index) => (
                  <MessageDetail key={index} message={message} email={email} />
                ))}
            </div>
            <div className={styles.chatinput} style={{paddingBottom:'20px'}}>
              <input type="text" name="createGroup" placeholder="Message" className={styles.chatfield} value={textMessage} onChange={(e)=>setTestMessage(e.target.value)}/>
              <img src={sendimage} alt="sendimage" className={styles.sendimage} onClick={sendMessage}/>
            </div>
          </div>
          </div>
        ) : null}

      </div>
    </Layout>

  )
}




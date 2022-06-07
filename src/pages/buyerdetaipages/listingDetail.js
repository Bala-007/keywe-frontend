import React, { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import { Row, Col, Text, Button, } from "react-bootstrap"
import searchIcon from '../../../static/images/Icon feather-search.png';
import * as style2 from "./buyerdetail.module.css";
import * as style from '../agents/agent.module.css';
import Calendar from '../calendar/calendar';
import { Link } from 'gatsby';
import { RiDeleteBinLine, RiArrowLeftLine,RiArrowDownSLine } from "react-icons/ri";
import CalendarViewPopup from '../../components/popup/CalendarViewPopup';
import ModifyTourPopup from '../../components/popup/ModifyTourPopup';

export default function ListingDetail() {
    const [userdata, setUserData] = useState([]);
    const [listdata, setListData] = useState([]);
    useEffect(() => {
        const UserDataArr = [
            { id: 1, Name: 'Steven Wrighte', price: "150,000", beds: 4, baths: 4, feet: 2819, score: 35, days: 21, profile: "Seller", address: "123 Scotland Drive Saratoga, CA 95071", image: "/images/Mask Group 108.png", profileimage: "/images/Mask Group 130.png" },
            // { id: 2, Name: 'Doris Howell', price: "2,235,000", beds: 3, baths: 2, feet: 2150, score: 40, days: 17, profile: "Seller", address: "123 Scotland Drive Saratoga, CA 95071", image: "/images/Mask Group 132.png", profileimage: "/images/Mask Group 133.png" },
            // { id: 3, Name: 'Gary Ford', price: "1,735,000", beds: 2, baths: 2, feet: 1950, score: 55, days: 19, profile: "Seller", address: "123 Scotland Drive Saratoga, CA 95071", image: "/images/Mask Group 135.png", profileimage: "/images/Mask Group 144.png" },
            // { id: 4, Name: 'Melissa Rose', price: "635,000", beds: 1, baths: 1, feet: 1000, score: 30, days: 24, profile: "Seller", address: "123 Scotland Drive Saratoga, CA 95071", image: "/images/Mask Group 108.png", profileimage: "/images/Mask Group 157.png" },
            // { id: 5, Name: 'Alan Ruize', price: "2,135,000", beds: 3, baths: 3, feet: 2350, score: 65, days: 11, profile: "Seller", address: "123 Scotland Drive Saratoga, CA 95071", image: "/images/Mask Group 108.png", profileimage: "/images/Mask Group 160.png" },
            // { id: 6, Name: 'Louis Lee', price: "2,375,000", beds: 3, baths: 2, feet: 3520, score: 40, days: 9, profile: "Seller", address: "123 Scotland Drive Saratoga, CA 95071", image: "/images/Mask Group 108.png", profileimage: "/images/Mask Group 136.png" },
            // { id: 7, Name: 'Helen Pearson', price: "4,500,000", beds: 2, baths: 2, feet: 2819, score: 55, days: 15, profile: "Seller", address: "123 Scotland Drive Saratoga, CA 95071", image: "/images/Mask Group 108.png", profileimage: "/images/Mask Group 207.png" },
        ]
        setUserData(UserDataArr);
        const ListDataArr = [
            { id: 1, buyer: 'Donna Morrison', tourtime: "10:00 am", image: "/images/Mask Group 202.png", profileimage: "/images/Mask Group 130.png", agent: "Sean Sims" },
            { id: 2, buyer: 'Anonymous', tourtime: "12:30 pm", image: "/images/Group 335.png", profileimage: "/images/Mask Group 133.png", agent: "Ethan Owens" },
            { id: 3, buyer: 'Anthony Fernandez', tourtime: "04:00 pm", image: "/images/Mask Group 174.png", agent: "No Agent", profileimage: "/images/Mask Group 174.png", },

        ]
        setListData(ListDataArr);
    }, []);
    const [calendar, setCalendar] = useState(false)

    const toggleCalendar = () => setCalendar(p => !p)
    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(p => !p);


    return (
        <div>
              <CalendarViewPopup calendar={calendar} toggleCalendar={toggleCalendar} />
              <ModifyTourPopup show={show} toggleShow={toggleShow} />
            <div className='tourbuyer mb-5' >
            {/* <Link to="">
                <div className='networkbackicon'>                   
                        <RiArrowLeftLine style={{ fill: '' }} size="25px" />
                        <h6 className='backtext'>Back</h6>
                </div>
                </Link> */}
                <div >
                    {userdata.map((item, index) =>
                        <Row key={index}
                            style={{
                                border: "1px solid lightgrey",
                                borderRadius: "20px",
                                boxShadow: "1px 2px 4px 2px #e4e5e7",
                                margin: "30px 0 0 0",
                                padding: "20px 10px",
                                background: "#fff",
                            }}>
                            <Col lg="4">
                                <Row>
                                    <Col lg="6">
                                        <img alt='homeimage' style={{ borderRadius: "10px" }} src={item.image} className={style2.homeImage} />
                                    </Col>
                                    <Col lg="6" className='sellertour-margin'>
                                        <h6 className={style2.addresslist}>Address</h6>
                                        <div className='sellertour-text'>{item.address}</div>
                                        <div className={style2.pricedetail}>
                                            <h6>Price</h6>
                                            <h5 className={style2.homeprice}>${item.price}</h5>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg="1" className='sellertour-margin'>
                                <h5 className={style2.roomCount}>{item.beds}</h5>
                                <h6 style={{ marginLeft: "-7px" }}>Beds</h6>
                            </Col>
                            <Col lg="1" className='sellertour-margin'>
                                <h5 className={style2.roomCount}>{item.baths}</h5>
                                <h6 style={{ marginLeft: "-7px" }}>Baths</h6>
                            </Col>
                            <Col lg="1" className='sellertour-margin'>
                                <h5 className={style2.roomCount}>{item.feet}</h5>
                                <h6>Sq.Feet</h6>
                            </Col>
                            <Col lg="1" className='sellertour-margin'>
                                <h5 className={style2.roomCount}>{item.score}</h5>
                                <h6 className={style2.score2}>Keywe score</h6>
                            </Col>
                            <Col lg="1" className='sellertour-margin'>
                                <h5 className={style2.roomCount}>{item.days}</h5>
                                <h6 style={{ marginLeft: "-22px" }}>Days on Market</h6>
                            </Col>
                            <Col lg="1">
                                <img alt="profileimage" className={style2.profileImage1} src={item.profileimage} />
                            </Col>
                            <Col lg="2">
                                <div className={style2.sellerdetails}>
                                    <h6>Seller</h6>
                                    <div className='sellertour-text'>{item.Name}</div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </div>

            </div >
            <div>
                <div className={style2.listdate}>
                    <h6 className={style2.listingdate}>Today, December 10, 2021</h6>
                    <div className='d-flex' onClick={toggleCalendar}>
                          <p  >Choose Date</p><RiArrowDownSLine  style={{ fill: '' }} size="25px" />
                          </div>
                </div>
                <div  className='mb-4' >
                    {listdata.map((item, index) =>
                        <div className='row' key={index}
                            style={{
                                border: "1px solid lightgrey",
                                borderRadius: "20px",
                                boxShadow: "1px 2px 4px 2px #e4e5e7",
                                margin: "30px 0 0 0",
                                padding: "20px 10px",
                                background: "#fff",
                            }}>
                            <div className='col-md-2 mt-3 zoom'>
                                <img alt='listimage' src={item.image} />
                            </div>
                            <div className='col-md-2 mt-4'>
                                <p>Buyer</p>
                                <p className={style2.listbuyername}>{item.buyer}</p>
                            </div>
                            <div className='col-md-2 mt-4'>
                                <p>Tour Time</p>
                                <p className={style2.listtime}>{item.tourtime}</p>
                            </div>
                            <div className='col-md-2 mt-4'>

                                <img alt='profileimage' src={item.profileimage} />
                            </div>
                            <div className='col-md-2 mt-4'>
                                <p>Buyers Agent</p>
                                <p className={style2.listagent}>{item.agent}</p>
                            </div>
                            <div className='col-md-2 mt-4'>
                                <Button className={style2.listmodifybut} onClick={toggleShow}>Modify</Button>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                <h6 className={style2.listingdate}>Tomorrow, December 11, 2021</h6>
                <div className='mb-4' >
                    {listdata.map((item, index) =>
                        <div className='row' key={index}
                            style={{
                                border: "1px solid lightgrey",
                                borderRadius: "20px",
                                boxShadow: "1px 2px 4px 2px #e4e5e7",
                                margin: "30px 0 0 0",
                                padding: "20px 10px",
                                background: "#fff",
                            }}>
                            <div className='col-md-2 mt-3'>
                                <img alt='listimage' src={item.image} />
                            </div>
                            <div className='col-md-2 mt-4'>
                                <p>Buyer</p>
                                <p className={style2.listbuyername}>{item.buyer}</p>
                            </div>
                            <div className='col-md-2 mt-4'>
                                <p>Tour Time</p>
                                <p className={style2.listtime}>{item.tourtime}</p>
                            </div>
                            <div className='col-md-2 mt-4'>

                                <img alt='profileimage' src={item.profileimage} />
                            </div>
                            <div className='col-md-2 mt-4'>
                                <p>Buyers Agent</p>
                                <p className={style2.listagent}>{item.agent}</p>
                            </div>
                            <div className='col-md-2 mt-4'>
                                <Button className={style2.listmodifybut} onClick={toggleShow}>Modify</Button>
                            </div>
                        </div>
                    )}
                </div>
                </div>
            </div>
        </div >
    )
}

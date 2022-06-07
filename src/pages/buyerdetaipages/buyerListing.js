import React, { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import { Row, Col, Text, Button, } from "react-bootstrap"
import searchIcon from '../../../static/images/Icon feather-search.png';
import * as style2 from "./buyerdetail.module.css"
import ListingDetail from './listingDetail';
import { RiDeleteBinLine, RiArrowLeftLine,RiArrowDownSLine } from "react-icons/ri";

export default function TourListing() {
    const [userdata, setUserData] = useState([]);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [buyersVisible, setBuyersVisible] = useState(true);
    useEffect(() => {
        const UserDataArr = [
            { id: 1, Name: 'Steven Wrighte', price: "150,000", beds: 4, baths: 4, feet: 2819, score: 35, days: 21, profile: "Seller", address: "123 Scotland Drive Saratoga, CA 95071", image: "/images/Mask Group 108.png", profileimage: "/images/Mask Group 130.png" },
            { id: 2, Name: 'Doris Howell', price: "2,235,000", beds: 3, baths: 2, feet: 2150, score: 40, days: 17, profile: "Seller", address: "123 Scotland Drive Saratoga, CA 95071", image: "/images/Mask Group 132.png", profileimage: "/images/Mask Group 133.png" },
            { id: 3, Name: 'Gary Ford', price: "1,735,000", beds: 2, baths: 2, feet: 1950, score: 55, days: 19, profile: "Seller", address: "123 Scotland Drive Saratoga, CA 95071", image: "/images/Mask Group 135.png", profileimage: "/images/Mask Group 144.png" },
            { id: 4, Name: 'Melissa Rose', price: "635,000", beds: 1, baths: 1, feet: 1000, score: 30, days: 24, profile: "Seller", address: "123 Scotland Drive Saratoga, CA 95071", image: "/images/Mask Group 108.png", profileimage: "/images/Mask Group 157.png" },
            { id: 5, Name: 'Alan Ruize', price: "2,135,000", beds: 3, baths: 3, feet: 2350, score: 65, days: 11, profile: "Seller", address: "123 Scotland Drive Saratoga, CA 95071", image: "/images/Mask Group 108.png", profileimage: "/images/Mask Group 160.png" },
            { id: 6, Name: 'Louis Lee', price: "2,375,000", beds: 3, baths: 2, feet: 3520, score: 40, days: 9, profile: "Seller", address: "123 Scotland Drive Saratoga, CA 95071", image: "/images/Mask Group 108.png", profileimage: "/images/Mask Group 136.png" },
            { id: 7, Name: 'Helen Pearson', price: "4,500,000", beds: 2, baths: 2, feet: 2819, score: 55, days: 15, profile: "Seller", address: "123 Scotland Drive Saratoga, CA 95071", image: "/images/Mask Group 108.png", profileimage: "/images/Mask Group 207.png" },
        ]
        setUserData(UserDataArr);
    }, []);
  
    const listClick = () => {
        setDetailsVisible(true)
        setBuyersVisible(false)
    }
    const back = () => {
        setDetailsVisible(false)
        setBuyersVisible(true)
    }

    return (
        <div>
            {
                buyersVisible &&
                <div className='tourbuyer mb-5' >
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
                                }} onClick={listClick}>
                                <Col lg="4">
                                    <Row>
                                        <Col lg="6 zoom">
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
            }
            {
                detailsVisible &&
                <>
                 <div className='networkbackicon' onClick={back}>                   
                        <RiArrowLeftLine style={{ fill: '' }} size="25px" />
                        <p className='backtext m-0 ps-1'>Back</p>
                </div>            
                    <ListingDetail />
                </>
            }
        </div >
    )
}

import React from "react";
import sarah from "../../../static/images/Mask Group 205.png";
import { Card, Tab, Tabs, Row, Col } from "react-bootstrap";
import * as style2 from "./buyerdetail.module.css"
import callimage from '../../../static/images/callimg.png';
import msgimage from '../../../static/images/chatimg.png';
import recenttour1 from '../../../static/images/recenttour1.png'
import recenttour2 from '../../../static/images/recenttour2.png'


function TourbuyerDetail() {
    return (
        <div className={style2.detailCardBack}>
            <Card className={style2.tourdetailcard}>
                <div >
                    <div className={style2.saradetails}>
                    <img src={sarah} alt="sarah" className={style2.sarahImage} />
                    <div className={style2.nameDetail}>
                        <p className={style2.detaName}>Sarah Tuner</p>
                        <p style={{textAlign:"center"}}>Buyer</p>
                        <img src={callimage} alt="callimage" />
                        <img src={msgimage} alt="callimage" style={{marginLeft:"17px"}} />  
                    </div>
                    </div>
                    <div className={style2.propdetail}>
                        <h6 className={style2.propdetail1}>Area</h6>
                        <h6 className={style2.propdetail2}>Saratoga, CA</h6>

                    </div>
                    <hr className={style2.hrtag} />
                    <div className={style2.propdetail}>
                        <h6 className={style2.propdetail1}>Budget</h6>
                        <h6 className={style2.propdetail2}>$120,000</h6>
                    </div>
                    <hr  className={style2.hrtag}/>
                    <div className={style2.propdetail}>
                        <h6 className={style2.propdetail1}>Prequalified</h6>
                        <h6 className={style2.propdetail2}>$145,000</h6>
                    </div>
                    <hr className={style2.hrtag} />
                    <div className={style2.propdetail}>
                        <h6 className={style2.propdetail1}>Type</h6>
                        <h6 className={style2.propdetail2}>4 Bed, 4 Bath</h6>
                    </div>
                    <hr className={style2.hrtag} />
                    <div>
                        <Tabs defaultActiveKey="Recently Toured Properties" id="uncontrolled-tab-example" className="mb-3 " style={{ background: 'transparent', }}>
                            
                            <Tab eventKey="Recently Toured Properties" title="Recently Toured Properties" >
                                <div className={style2.recenttourdetail1}>
                                    <img src={recenttour1} alt="recenttour1" className={style2.recenttourImage}/>
                                    <div className={style2.touraddress}>
                                        <p>$2,600,000</p>
                                        <p>885 Ronec Way</p>
                                        <p>Saratoga, CA 95070</p>
                                        <p>3 bed, 3 bath</p>
                                    </div>
                                </div>
                                <div className={style2.recenttourdetail2}>
                                <img src={recenttour2} alt="recenttour2" className={style2.recenttourImage}/>
                                    <div className={style2.touraddress}>
                                        <p>$2,830,000</p>
                                        <p>1003 Betu path</p>
                                        <p>Saratoga, CA 95070</p>
                                        <p>3 bed, 2.5 bath</p>
                                    </div>
                                </div>
                            </Tab>  
                            <Tab eventKey="Recently Viewed Properties" title="Recently Viewed Properties" >
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </Card>
        </div>
    )
}
export default TourbuyerDetail

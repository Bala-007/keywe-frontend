import React from "react";
import { Card, Button } from "react-bootstrap"
import * as style1 from '../../pages/dashboard/detail.module.css';
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Mask38 from '../../../static/images/Mask Group 38.png';
import * as styles from "../seller/seller.module.css";
import { Link } from "gatsby";
import Footer from "../../components/Footer";


function SellerEditInfo() {

    return (
        <Layout> 
        <div>         
            <div className="row m-0 mt-4">
                <div className="col-md-8">
                <div className="row">
                    <div className="col-md-6">
                <img src={Mask38} alt='mask38' className="mask38 w-30" height="250" />
                </div>
                <div className="col-md-6" style={{marginLeft:"-45px"}}>
                <div className="row m-0">
                        <div className="col-md-8">
                            <h5 className={styles.edithead}>123 Scotland DE</h5>
                            <h5 className={styles.edithead}>Saratoga, CA 95070</h5>
                            <h5 className={styles.edithead}>$120,000</h5>        
                        </div>
                    </div>
                    <div>
                        <p className={style1.incredibletext}>Incredible remodeled single story family home located in one of Saratoga's finest neighborhoods with award winning Saratoga schools incredible remodeled single story family home located in one of Saratoga's finest neighborhoods with award winning Saratoga schools...</p>                 
                    </div>
                    <div className={style1.detailIcon}>
                        <span className={style1.circle}><i className="fa fa-heart" style={{color:"#4283D9"}}></i></span>
                        <span className={style1.upload}> <i className="fa fa-upload"></i></span>
                        </div>
                    <div>
                        <Card className={style1.detCard} style={{borderRadius:"5px",boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)"}}>
                            <div className="row m-0">
                                <div className="col-md-4 cardtext2 mt-3">
                                    <p><b>4</b></p>
                                    <p style={{color:"#898686"}}>Beds</p>
                                </div>
                                <div className="col-md-4 cardtext2 mt-3">
                                    <p><b>4</b></p>
                                    <p style={{color:"#898686"}}>Baths</p>
                                </div>
                                <div className="col-md-4 cardtext2 mt-3">
                                    <p><b>2,819</b></p>
                                    <p style={{color:"#898686"}}>Sq. Feet</p>
                                </div>
                            </div>
                        </Card>
                        <div className={styles.cardbelowtext}>
                          <p>Is this information inaccurate? </p>
                          <Link to="/seller/Editinfo" className={styles.editinfo}>Yes, edit this info</Link>
                        </div>
                    </div>
                    <div className={styles.sellbut}>
                        <button type="button" className={styles.transbut}  >Transfer Ownership</button>
                        <button type="button" className={styles.keybut}>Keywe Estimator</button>
                    </div>
                    </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <Card className={styles.editCard} style={{boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)" }}>
                        <div>
                            <h5 className={style1.addHead}>Update Features</h5>
                            <p className={style1.detailText}>Upload Photos</p>
                        </div>
                        <div>
                            <Card className={style1.detCard2} style={{ borderRadius: "5px", boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)", marginLeft: "20px" }}>
                                <div className="row m-0">
                                    <div className="col-md-4 cardtext2 mt-3">
                                        <p><b>4</b></p>
                                        <p style={{ color: "#898686" }}>Beds</p>
                                    </div>
                                    <div className="col-md-4 cardtext2 mt-3">
                                        <p><b>4</b></p>
                                        <p style={{ color: "#898686" }}>Baths</p>
                                    </div>
                                    <div className="col-md-4 cardtext2 mt-3">
                                        <p><b>2,819</b></p>
                                        <p style={{ color: "#898686" }}>Sq. Feet</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div >
                            <h5 className={style1.addHead}>Kitchen</h5>
                            <p className={style1.detailText}> Last Updtaed(Years)</p>
                            <div className={style1.updatehome} >
                                <p>0-5</p>
                                <p>5-10</p>
                                <p>10-15</p>
                                <p>15+</p>
                                <p className={style1.detailText}>Original</p>
                            </div>
                        </div>
                        <div>
                            <p className={style1.detailText}>Cost of Update</p>
                            <input type="text" name="email" value="$ 100,000"  className={style1.updatehomeprice} />
                        </div>
                        <div>
                            <h5 className={style1.addHead}>Bath 1</h5>
                            <p className={style1.detailText}>Last Updtaed(Years)</p>
                            <div className={style1.updatehome} >
                                <p>0-5</p>
                                <p>5-10</p>
                                <p>10-15</p>
                                <p>15+</p>
                                <p className={style1.detailText}>Original</p>
                            </div>
                        </div>
                        <div>
                            <p className={style1.detailText}>Cost of Update</p>
                            <input type="text" name="email" value="$ 100,000"  className={style1.updatehomeprice} />
                        </div>
                        <div>
                            <h5 className={style1.addHead}>Bath 2</h5>
                            <p className={style1.detailText}> Last Updtaed(Years)</p>
                            <div className={style1.updatehome} >
                                <p>0-5</p>
                                <p>5-10</p>
                                <p>10-15</p>
                                <p>15+</p>
                                <p className={style1.detailText}>Original</p>
                            </div>
                        </div>
                        <div>
                            <p className={style1.detailText}>Cost of Update</p>
                            <input type="text" name="email" value="$ 100,000"  className={style1.updatehomeprice} />
                        </div>
                        <div>
                            <h5 className={style1.addHead}>Bath 3</h5>
                            <p className={style1.detailText}>Last Updtaed(Years)</p>
                            <div className={style1.updatehome} >
                                <p>0-5</p>
                                <p>5-10</p>
                                <p>10-15</p>
                                <p>15+</p>
                                <p className={style1.detailText}> Original</p>
                            </div>
                        </div>
                        <div>
                            <p className={style1.detailText}>Cost of Update</p>
                            <input type="text" name="email" value="$ 100,000"  className={style1.updatehomeprice} />
                        </div>
                        <div>
                            <h5 className={style1.addHead}>Bath 4</h5>
                            <p className={style1.detailText}>Last Updtaed(Years)</p>
                            <div className={style1.updatehome} >
                                <p>0-5</p>
                                <p>5-10</p>
                                <p>10-15</p>
                                <p>15+</p>
                                <p className={style1.detailText}>Original</p>
                            </div>
                        </div>
                        <div>
                            <p className={style1.detailText}>Cost of Update</p>
                            <input type="text" name="email" value="$ 100,000"  className={style1.updatehomeprice} />
                        </div>
                        <h5 className={style1.addHead}>Additional Upgrades</h5>
                        <div>
                            <Button className={style1.additionalbut}>
                                Pool
                            </Button>
                            <Button className={style1.additionalbut3}>
                                Private Yard
                            </Button>
                        </div>
                        <div>
                            <Button className={style1.additionalbut2}>
                                Scenic View
                            </Button>
                            <Button className={style1.additionalbut2}>
                                Landscaping
                            </Button>
                        </div>

                    </Card>
                </div>
            </div>
        </div>
        </Layout>
        





    )
}
export default SellerEditInfo
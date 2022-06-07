import React,{ useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { Card } from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import * as style1 from '../../pages/dashboard/detail.module.css';
import Mask38 from '../../../static/images/Mask Group 38.png';
import Mask39 from '../../../static/images/Mask Group 39.png';
import Mask40 from '../../../static/images/Mask Group 40.png';
import Mask41 from '../../../static/images/Mask Group 42.png';
import Mask42 from '../../../static/images/Mask Group 42.png';
import Mask43 from '../../../static/images/Mask Group 43.png';
import Mask44 from '../../../static/images/Mask Group 44.png';
import * as styles from "../seller/seller.module.css"
import Layout from "../../components/Layout";
import { Link } from "gatsby";
import ConnectAgentPopup from "../../components/popup/connectAgentPopup";
import Seo from "../../components/seo";

const SellerHome = () => {
    const [connect, setConnect] = useState(false); 
   
    const toggleConnect = () => setConnect(p => !p);

    
    return (
        <Layout>
        <Seo title="Sell My Home" />

        <div>
            {connect ? <ConnectAgentPopup connect={connect} toggleConnect={toggleConnect}  /> : null}
            

            <div className="row m-0" style={{paddingBottom:"25px"}}> 
                <div className="col-md-8">
                    <img src={Mask38} alt='mask38' className="mask38 w-100 mb-5" height="500" />
                    <div className="row m-0" style={{paddingBottom:"25px"}}>
                        <div className="col-md-6">
                            <img src={Mask39} alt='mask39' className="mask39 w-100 " height="300" />
                        </div>
                        <div className="col-md-6 m-0">
                            <img src={Mask40} alt='mask40' className="mask40 w-100 " height="300" />
                        </div>
                    </div>
                    <div className="row m-0" style={{paddingBottom:"25px"}}>
                        <div className="col-md-6">
                            <img src={Mask41} alt='mask41' className="mask41 w-100 " height="300" />
                        </div>
                        <div className="col-md-6">
                            <img src={Mask42} alt='mask42' className="mask42 w-100 " height="300" />
                        </div>
                    </div>
                    <div className="row m-0" style={{paddingBottom:"25px"}}>
                        <div className="col-md-6">
                            <img src={Mask43} alt='mask43' className="mask43 w-100 " height="300" />
                            
                        </div>
                        <div className="col-md-6">
                            <img src={Mask44} alt='mask44' className="mask44 w-100 " height="300" />
                            
                        </div>
                    </div>

                </div>
                <div className="col-md-4">
                    <div className="row m-0">
                        <div className="col-md-8">
                            <p className={style1.housetext}>HOUSE FOR SALE</p>
                            <p><b>123 Scotland DE</b></p>
                            <p><b>Saratoga, CA 95070</b></p>
                        </div>
                        <div className="col-md-4">
                            <p><b>$120,000</b></p>
                            {/* <button type="button" className={style1.memberbut} >Members only</button> */}
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
                        <button type="button" className={styles.transbut}  onClick={toggleConnect}>Transfer Ownership</button>
                        <Link to="/estimator">
                        <button type="button" className={styles.keybut}>Keywe Estimator</button>
                        </Link>
                    </div>
                </div>
            </div>
         </div>
        </Layout>
    )
}
export default SellerHome;
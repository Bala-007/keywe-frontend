import React from 'react'
import Layout from '../../components/Layout'
import { Tab, Tabs, Row, Col, Button, Card, Container, Dropdown } from 'react-bootstrap'
import '../network/network.css'
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import searchIcon from '../../../static/images/Icon feather-search.png';
import closeIcon from '../../../static/images/close.png';
import deleteIcon from '../../../static/images/delete.png';
import selectIcon from '../../../static/images/select.png';
import viewIcon from '../../../static/images/view.png';
import plusIcon from '../../../static/images/plus.png';
import Seo from "../../components/seo";
import { Link } from 'gatsby';

export default function Network() {
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
            <Row>
                <Col lg='6'>
                    <Card className='networkCard'>
                        <div>
                            <div className='networkgrouphead'>
                                <h5 className='networkhead'>My Groups</h5>
                                <div>
                                    <img src={plusIcon} alt="plus.png" className='plus-icon-img' />
                                    <Button variant="primary"> Create a New Group</Button>
                                </div>
                            </div>
                            <div className='networktext'>
                                <div>
                                    <h6 className='networkname'>Lenox Homes</h6>
                                </div>
                                <div className='viewaccept'>
                                    <Link to="/network/detail">
                                        <img src={viewIcon} alt="view.png" className='view-icon-img' style={{ marginRight: "50px", width: "25px" }} />
                                    </Link>
                                        <img src={deleteIcon} alt="delete.png" className='delete-icon-img' style={{ width: "15px" }} />
                                </div>
                            </div>
                            <div className='networktext'>
                                <div>
                                    <h6 className='networkname'>Hendrick Farm Homes</h6>
                                </div>
                                <div className='viewaccept'>
                                    <Link to="/network/detail">
                                        <img src={viewIcon} alt="view.png" className='view-icon-img' style={{ marginRight: "50px", width: "25px" }} />
                                    </Link>
                                        <img src={deleteIcon} alt="delete.png" className='delete-icon-img' style={{ width: "15px" }} />
                                </div>
                            </div>
                            <div className='networktext'>
                                <div>
                                    <h6 className='networkname'>Keller Willams Realty, Inc</h6>
                                </div>
                                <div className='viewaccept'>
                                    <Link to="/network/detail">
                                        <img src={viewIcon} alt="view.png" className='view-icon-img' style={{ marginRight: "50px", width: "25px" }} />
                                    </Link>
                                        <img src={deleteIcon} alt="delete.png" className='delete-icon-img' style={{ width: "15px" }} />
                                </div>
                            </div>
                            <div className='networktext'>
                                <div>
                                    <h6 className='networkname'>The Corcoran Group</h6>
                                </div>
                                <div className='viewaccept'>
                                    <Link to="/network/detail">
                                        <img src={viewIcon} alt="view.png" className='view-icon-img' style={{ marginRight: "50px", width: "25px" }} />
                                    </Link>
                                        <img src={deleteIcon} alt="delete.png" className='delete-icon-img' style={{ width: "15px" }} />
                                </div>
                            </div>
                            <div className='networktext'>
                                <div>
                                    <h6 className='networkname'>Better Homes and Gardens</h6>
                                </div>
                                <div className='viewaccept'>
                                    <Link to="/network/detail">
                                        <img src={viewIcon} alt="view.png" className='view-icon-img' style={{ marginRight: "50px", width: "25px" }} />
                                    </Link>
                                        <img src={deleteIcon} alt="delete.png" className='delete-icon-img' style={{ width: "15px" }} />
                                </div>
                            </div>
                            <div className='networktext'>
                                <div>
                                    <h6 className='networkname'>Ruckart Reak Estate</h6>
                                </div>
                                <div className='viewaccept'>
                                    <Link to="/network/detail">
                                        <img src={viewIcon} alt="view.png" className='view-icon-img' style={{ marginRight: "50px", width: "25px" }} />
                                    </Link>
                                        <img src={deleteIcon} alt="delete.png" className='delete-icon-img' style={{ width: "15px" }} />
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col lg='6'>
                    <Card className='networkCard'>
                        <div className='networkgrouphead'>
                            <h5 className="networkhead">Joined Groups</h5>
                        </div>
                        <div className='networktext2'>
                            <h6 className='networkname'>Camden Property Trust</h6>
                            <Link to="" className='networkLink'>Unjoin</Link>
                        </div >
                        <div className='networktext2'>
                            <h6 className='networkname'>SFT Real Estate</h6>
                            <Link to="" className='networkLink'>Unjoin</Link>
                        </div>
                        <div className='networktext2'>
                            <h6 className='networkname'>Damon Wofford Realty</h6>
                            <Link to="" className='networkLink'>Unjoin</Link>
                        </div>
                        <div className='networktext2'>
                            <h6 className='networkname'>Unity Home Group</h6>
                            <Link to="" className='networkLink'>Unjoin</Link>
                        </div>
                        <div className='networktext2'>
                            <h6 className='networkname'>Coldwell Banker Estate</h6>
                            <Link to="" className='networkLink'>Unjoin</Link>
                        </div>
                        <div className='networktext2'>
                            <h6 className='networkname'>Equinox Real Estate</h6>
                            <Link to="" className='networkLink'>Unjoin</Link>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Card className='networkCard2'>
                <div>
                    <div className="networkgrouphead">
                        <h5 className="networkhead">Invites</h5>
                    </div>
                </div>
                <div className='networkinvite2'>
                    <h6 className='networkname'>Great Lakes Real Estate</h6>
                    <div className='declineaccept'>
                        <div className='accepttext'>
                            <img src={selectIcon} alt="select.png" className='select-icon-img' style={{ width: "25px", height: "17px" }} />
                            <p className='accept'>Accept</p>
                        </div>
                        <div className='declinetext'>
                            <img src={closeIcon} alt="close.png" className='close-icon-img' style={{ height: "15px" }} />
                            <p className='decline'>Decline</p>
                        </div>
                    </div>
                </div>
                <div className='networkinvite2'>
                    <h6 className='networkname'>Signature Real Estate Companies</h6>
                    <div className='declineaccept'>
                        <div className='accepttext'>
                            <img src={selectIcon} alt="select.png" className='select-icon-img' style={{ width: "25px", height: "17px" }} />
                            <p className='accept'>Accept</p>
                        </div>
                        <div className='declinetext'>
                            <img src={closeIcon} alt="close.png" className='close-icon-img' style={{ height: "15px" }} />
                            <p className='decline'>Decline</p>
                        </div>
                    </div>
                </div>
                <div className='networkinvite2'>
                    <h6 className='networkname'>Buckner Homes Realty Inc</h6>
                    <div className='declineaccept'>
                        <div className='accepttext'>
                            <img src={selectIcon} alt="select.png" className='select-icon-img' style={{ width: "25px", height: "17px" }} />
                            <p className='accept'>Accept</p>
                        </div>
                        <div className='declinetext'>
                            <img src={closeIcon} alt="close.png" className='close-icon-img' style={{ height: "15px" }} />
                            <p className='decline'>Decline</p>
                        </div>
                    </div>
                </div>
                <div className='networkinvite2'>
                    <h6 className='networkname'>United Real Estate East Carolina</h6>
                    <div className='declineaccept'>
                        <div className='accepttext'>
                            <img src={selectIcon} alt="select.png" className='select-icon-img' style={{ width: "25px", height: "17px" }} />
                            <p className='accept'>Accept</p>
                        </div>
                        <div className='declinetext'>
                            <img src={closeIcon} alt="close.png" className='close-icon-img' style={{ height: "15px" }} />
                            <p className='decline'>Decline</p>
                        </div>
                    </div>
                </div>
                <div className='networkinvite2'>
                    <h6 className='networkname'>Orson Hill Realty</h6>
                    <div className='declineaccept'>
                        <div className='accepttext'>
                            <img src={selectIcon} alt="select.png" className='select-icon-img' style={{ width: "25px", height: "17px" }} />
                            <p className='accept'>Accept</p>
                        </div>
                        <div className='declinetext'>
                            <img src={closeIcon} alt="close.png" className='close-icon-img' style={{ height: "15px" }} />
                            <p className='decline'>Decline</p>
                        </div>
                    </div>
                </div>

            </Card>
        </Layout>
    )
}
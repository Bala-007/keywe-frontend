import React, { useEffect } from "react";
import { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Card } from "react-bootstrap";
import 'react-multi-carousel/lib/styles.css';
import * as style1 from './detail.module.css';
import memberIcon from '../../../static/images/memberIcon.png';
import Group236 from "../../../static/images/Group 236.png"
import ClaimPopup from "../../components/popup/ClaimPopup";
import ChatPopup from "../../components/popup/ChatPopup";
import Layout from "../../components/Layout";
import Bar from '../bars/bar';
import { dashboardPropertyDetail, imageLike, imageLikeList, similarProperty, propertyActivity, favoritePicture } from "../../components/Api/ListingApi";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
// import { detailResponse } from "../../state/DetailReducer";
// import { detailResponse } from "../../state/detailSlice";
import { fetchdetail, storeResult } from "../../state/detailSlice";
import AcceptPopup from "../../components/popup/AcceptPopup";
import 'react-multi-carousel/lib/styles.css';
import { claimOwnershipPost } from "../../components/Api/formApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as styles from '../../pages/dashboard/dashboard.module.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from 'gatsby';
import { RiDeleteBinLine, RiArrowLeftLine, RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import '../../components/popup/popup.css'
import { navigate } from "@reach/router";
import SimilarCarousel from "../../components/Carousel/similarCarousel";
import TourPopup from "../../components/popup/TourPopup";
import { RWebShare } from "react-web-share";
import { LeakRemove } from "@mui/icons-material";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from '@reach/router';


var address1 = '', address2 = '';

function ClaimDetail({ id }) {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 7,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    console.log("--detail id--", id);
    const userId = localStorage.getItem('userId')
    const [show, setShow] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [likeDetials, setLikeDetials] = useState([])
    const [similar, setSimilar] = useState([])
    const [isUserId, setIsUserId] = useState(null)
    const initialState = {
        beforeClaim: false
    }
    const addressData = {
        address1: '',
        address2: '',
    }
    const [claimpopup, setClaimPopup] = useState(initialState);
    const [imageId, setImageId] = useState("")
    const [isLike, setIslike] = useState(false)
    const [address, setAddress] = useState(addressData);
    const [activityDetails, setActivityDetails] = useState({});
    const [images, setimages] = useState([]);
    const [loader, setLoader] = useState(false);
    const [showTour, setShowTour] = useState(false)
    const [message, setMessage] = useState('')
    //console.log("--claimdetail --", claimdetail);
    let dispatch = useDispatch();
    const userDetails = useSelector(state => state.user.userDetail);
    const location = useLocation();

    const toggleShow = () => {
        setLoader(true);
        // setShow(p => !p);
        var postData = {
            property_id: id,
            user_id: userDetails._id,
        };
        console.log("--postData--", postData);

        claimOwnershipPost(postData)
            .then((res) => {
                console.log("api res", res);
                if (res.status == 200) {
                    document.getElementById('claim-btn').style.display = 'none';
                    setLoader(false);
                    toast.success('Claim Added Successfully', {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                    });
                }
            })
            .catch((err) => {
                setLoader(false);
                console.log("api err", err);
                //alert(err);
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                });
            })
    };
    const toggleShowChat = () => setShowChat(p => !p);
    //const claimAlert = () => setClaimPopup(p => !p);

    const loginAlert = () => {
        //alert("Please Login");
        setClaimPopup({ ...claimpopup, beforeClaim: !claimpopup.beforeClaim })
    }
    // const { result: claimdetail, loading: detailLoading } = useSelector(
    const claimdetailResult = useSelector(
        state => state.detail.result
    );
    const detailLoading = useSelector(
        state => state.detail.loading
    );
    const [claimdetail, setClaimdetail] = useState([])
    console.log("--detailResult --", claimdetail);

    useEffect(() => {
        console.log('loading')
        setClaimdetail(claimdetailResult)
        if (Object.keys(claimdetailResult).length !== 0) {
            if (claimdetailResult.claim_data !== null && claimdetailResult.claim_data.length !== 0) {
                let userId = localStorage.getItem('userId')
                let index = claimdetailResult.claim_data.findIndex((a) => a === userId)
                setIsUserId(index)
                console.log('claim Id', index)
            }
            else { setIsUserId(-1) }
        }
    }, [claimdetailResult])


    useEffect(async () => {
        //await propertyDetailApi();
        getSimilarProperty(id);
        dispatch(fetchdetail(id));
        getPropertyActivity("this_week");
    }, [id])

    const handleNavigation = (id) => {
        console.log(id)
        navigate(`/dashboard/detail/${id}`)
    }

    // 28-04-22 const propertyDetailApi = async () => {
    //     setLoader(true);
    //     await dashboardPropertyDetail(id)
    //         .then((res) => {
    //             if (res.status == 200) {
    //                 //dispatch(detailResponse(res.data.data))
    //                 //setDetailData(res.data.data)
    //                 //setimages(res.data.data.images)
    //                 setLoader(false);
    //                 var addressData = res.data.data.address;
    //                 var addressIndex = res.data.data.address.indexOf(",");
    //                 address1 = addressData.substring(0, addressIndex);
    //                 address2 = addressData.substring(addressIndex + 2);
    //                 setAddress({ ...setAddress, address1: address1, address2: address2 })
    //             }
    //         })
    // }


    //similar property details//
    const getSimilarProperty = async (id) => {
        await similarProperty(id)
            .then((res) => {
                setSimilar(res.data.data)
                // console.log("similar", res)
            })
    }

    //Property Activity Api//
    const getPropertyActivity = async (e) => {
        // console.log('hi',id)
        let params = {

            date_filter: e.target !== undefined ? e.target.value : "this_week"

        }
        await propertyActivity(id, params)
            .then((res) => {
                setActivityDetails(res.data.data)
                console.log("ProprtyActivity...", res)
            })
    }

    const [storage, setStorage] = useState(false);
    useEffect(() => {
        const storedData = localStorage.getItem("userInfo");
        if (!storedData) {

            setStorage(false);
        } else {
            setStorage(true);

        }
    }, []);

    const handleLike = (id) => {
        let userId = localStorage.getItem('userId')
        if (userId !== null) {
            setIslike(false)
            setLoader(true);
            imageLike(userId, id).then(async (res) => {
                await pageloader()
            })
        }
        else {
            setMessage("In order to favorite this property")
            setIslike(true)
            loginAlert()
            setTimeout(() => setClaimPopup({ ...claimpopup, beforeClaim: false}), 3000)

        }
    }
    const handleClaim = () => {
        if (userId !== null) {
            toggleShow()
        }
        else {
            setMessage("To claim this property")
            setIslike(false)
            loginAlert()
            setTimeout(() => setClaimPopup({ ...claimpopup, beforeClaim: false}), 3000)
        }
    }
    const toggleShowTour = () => {
        if (userId !== null) {
            setShowTour(p => !p)
        }
        else {
            setMessage("In order to schedule tour for this property")
            setIslike(false)
            loginAlert()
            setTimeout(() => setClaimPopup({ ...claimpopup, beforeClaim: false}), 3000)
        }
    }

    const pageloader = async () => {
        const response = await dashboardPropertyDetail(id);
        let userId = localStorage.getItem('userId')
        response.data.data.images.map((item) => {
            let isLike = item.likes.indexOf(userId)
            let isDisLike = item.dis_likes.indexOf(userId)
            if (isLike !== -1) {
                item.isLike = true
            }
            if (isDisLike !== -1) {
                item.isDisLike = true
            }
        })
        console.log('response', response.data.data.images)
        var result = {}
        if (userId !== null) {
            await imageLikeList(userId).then((res) => {
                var number = res.data.data.indexOf(response.data.data._id)
                if (number !== -1) {
                    let data = {
                        isLike: res.data.data[number]
                    }
                    let value = response.data.data
                    result = { ...data, ...value }
                }
                else {
                    result = response.data.data
                }
            })
        }
        else {
            result = response.data.data
        }
        setClaimdetail(result)
        setLoader(false)
        await dispatch(storeResult(result))
    }


    //like and dislike property

    const handleLikeAndDislike = (image_id, action) => {
        // setLoader(true)
        if (userId === null) {
            setMessage("In order to like or dislike an image of this property,")
            loginAlert()
            setTimeout(() => setClaimPopup({ ...claimpopup, beforeClaim: false}), 3000)

        }
        else {
            let params = {
                user_id: userId,
                property_img_id: image_id,
                action: action
            }
            // console.log("like ...", params)

            favoritePicture(userId, params)
                .then(async (res) => {
                    console.log(action, res)
                    pageloader()
                })
        }

    }
    return (
        <div>
            <Navbar isLogin={storage} />
            <ToastContainer />
            {loader ? <Loader /> : null}
            <ClaimPopup show={show} toggleShow={toggleShow} propertyId={id} />
            {showTour && <TourPopup show={showTour} toggleShow={toggleShowTour} propertyId={id} propertyDetails={claimdetail} location={claimdetail.location} claimId={Object.keys(claimdetail).length !== 0 && claimdetail.claim_data.length !== 0 ? claimdetail.claim_data[0] : null} />}
            <ChatPopup show={showChat} toggleShow={toggleShowChat} />
            <AcceptPopup success={claimpopup.beforeClaim} toggleSuccess={loginAlert} claimAlertMessage={true} message={message} />
            {detailLoading ? <Loader /> :
                <div>
                    {Object.keys(claimdetail).length ?
                        <div>
                            <div className='dashboardbackicon cursor-pointer' onClick={() => navigate(-1)}>
                                <RiArrowLeftLine style={{ fill: '' }} size="25px" />
                                <p className='backtext m-0 ps-1'>Back</p>
                            </div>
                            <div className="row m-0">
                                <div className="col-md-8">
                                    <img src={claimdetail.thumbnail_image} alt='mask38' className={style1.mask381} />
                                    <div className="row m-0 overflow-auto" style={{ height: '684px' }}>
                                        {
                                            claimdetail.images.length ?
                                                claimdetail.images.map((item, index) => {
                                                    return (
                                                        <div className="col-md-6" key={index}>
                                                            <img src={item.url} alt='mask39 ' className="detailhome" />
                                                            <div className={style1.imagetext}>
                                                                <div>
                                                                    <p>{item.image_name}</p>
                                                                </div>
                                                                <div>
                                                                    <span onClick={() => handleLikeAndDislike(item._id, 'like')} className="cursor-pointer">
                                                                        {item.isLike ? <span><i className="fa thin fa-thumbs-up me-1"></i>{item.likes.length}</span>
                                                                            : <i className="fa fa-thumbs-o-up"  ></i>}
                                                                    </span>
                                                                    <span onClick={() => handleLikeAndDislike(item._id, 'dis_like')} className="cursor-pointer ps-4">
                                                                        {item.isDisLike ? <i className="fa thin fa-thumbs-down"></i>
                                                                            : <i className="fa fa-thumbs-o-down"  ></i>}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                : null
                                        }
                                    </div>

                                </div>
                                <div className="col-md-4">
                                    <div className="row m-0">
                                        <div className="col-md-8 p-0">
                                            <p className={style1.housetext}>HOUSE FOR SALE</p>
                                            <p className={style1.houseSale}>{claimdetail.address.substring(0, claimdetail.address.indexOf(","))}</p>
                                            <p className={style1.houseSale}>{claimdetail.address.substring(claimdetail.address.indexOf(",") + 2)}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <div>
                                                <p className={style1.memberSale}>{claimdetail.symbol}{String(claimdetail.price.$numberDecimal).replace(/(.)(?=(\d{3})+$)/g, '$1,')}</p>
                                                <div className={style1.memberdetails}>
                                                    {/* <button type="button" className={style1.memberbut} > <img src={memberIcon} alt="memberIcon" className={style1.memberIcon} /> Members only</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className={style1.incredibletext}>{claimdetail.description}</p>

                                    </div>
                                    <div className={style1.detailIcon}>
                                        {userDetails.role !== "agent" &&
                                            <span className={styles.circle} onClick={() => handleLike(claimdetail._id)}>
                                                <i className="fa fa-heart" style={{ color: claimdetail.isLike !== undefined ? "red" : "#0490fb" }}></i>
                                            </span>
                                        }
                                        <RWebShare
                                            data={{
                                                text: "",
                                                url: location.href,
                                                // url:"http://107.21.137.14/dashboard/detail/6253da39e548c445cb10ec71"
                                                title: "Share your property",
                                            }}
                                            onClick={() => console.log("shared successfully!")}
                                        >
                                            <img src={Group236} alt="group236" style={{ marginLeft: "13px", width: "60px" }} />
                                        </RWebShare>
                                    </div>
                                    <div>
                                        <Card className={style1.detCard} style={{ borderRadius: "15px", boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)" }}>
                                            <div className="row m-0">
                                                <div className="col-md-4 cardtext2 mt-3">
                                                    <p><b>{claimdetail.beds}</b></p>
                                                    <p style={{ color: "#898686" }}>Beds</p>
                                                </div>
                                                <div className="col-md-4 cardtext2 mt-3">
                                                    <p><b>{claimdetail.baths}</b></p>
                                                    <p style={{ color: "#898686" }}>Baths</p>
                                                </div>
                                                <div className="col-md-4 cardtext2 mt-3">
                                                    <p><b>{claimdetail.square_feet.$numberDecimal}</b></p>
                                                    <p style={{ color: "#898686" }}>Sq. Feet</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                    <div className={style1.schedulbut}>
                                        {/* {claimdetail.claimed ?
                                        <>
                                            <button type="button" className={style1.tourbut} >Schedule Tour</button>
                                            <button type="button" className={style1.chatbut} onClick={toggleShowChat} >Chat with Listing Agent</button>
                                        </>
                                        :
                                        <button type="button" className={style1.tourbut} onClick={Object.values(userDetails).length > 0 ? toggleShow : loginAlert}>Claim Ownership</button>
                                    } */}
                                        {userDetails.role !== "agent" &&
                                            isUserId === -1 &&
                                            <>{
                                                (claimdetail.claim_data.length === 0) ?
                                                    <button id="claim-btn" type="button" className={style1.tourbut} onClick={handleClaim}>Claim Ownership</button>
                                                    :
                                                    <>
                                                        <button type="button" className={style1.tourbut} onClick={toggleShowTour}>Schedule Tour</button>
                                                        <button type="button" className={style1.chatbut} onClick={toggleShowChat} >Chat with Listing Agent</button>
                                                    </>
                                            }</>

                                        }
                                    </div>
                                    <div className={style1.activity}>
                                        <div >
                                            <p className="pt-3"><b>Activity</b></p>
                                        </div>
                                        <div >
                                            <select className={style1.week} name="calender" id="calender" onChange={getPropertyActivity}>
                                                <option value="this_week">This Week</option>
                                                <option value="this_month">This Month</option>
                                                <option value="six_month">Six Month</option>
                                                <option value="this_year">This Year</option>
                                                <option value="all_year">All Year</option>
                                            </select>
                                        </div>
                                    </div>
                                    < div>
                                        <Bar activity={activityDetails} />
                                    </div>
                                    <div className="row m-0 pt-5 mb-4">
                                        <div className="col-md-5 wid100">
                                            <div className={style1.viewdetails}>
                                                <div>
                                                    <p className={style1.viewtext}>Viewership</p>
                                                    <p style={{ fontFamily: "DejaVuSansBold" }}>25%</p>
                                                </div>
                                                <div>
                                                    <p className={style1.viewtext}>Downloads</p>
                                                    <p style={{ fontFamily: "DejaVuSansBold" }}>3</p>
                                                </div>
                                                <div>
                                                    <p className={style1.viewtext}>Offers</p>
                                                    <p style={{ fontFamily: "DejaVuSansBold" }}>1</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7 wid100">
                                            <button className={style1.otherbut} type="button" >2 other people are viewing this property now</button>
                                        </div>
                                    </div>

                                    <button type="button" className={style1.viewbut}>View  Disclosures & Reports</button>


                                </div>
                            </div>

                            <div className={style1.similarback}>
                                <h6 className={style1.similar}>Similar Properties</h6>
                                <SimilarCarousel similar={similar} />
                            </div>
                        </div>
                        : null}

                    <Footer isLogin={storage} />
                </div>
            }
        </div>

    )
}
export default ClaimDetail
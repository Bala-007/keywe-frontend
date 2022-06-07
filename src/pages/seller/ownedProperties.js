import React, { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import * as styles from "../../pages/seller/sellerProp.module.css"
import "react-multi-carousel/lib/styles.css"
import "bootstrap/dist/css/bootstrap.css"
import { Link } from "gatsby";
import { Card } from "react-bootstrap"
import "./ownedPropDetails.css"
import Seo from "../../components/seo"
import OwnedPropDetails from "./OwnedPropDetails"
import { dashboardPropertyDetail, claimPropertyList, unclaimPropertyList, imageLikeList } from "../../components/Api/ListingApi"
import Loader from "../../components/Loader"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux"
import { fetchdetail } from "../../state/detailSlice"
import Cards from "../../components/card/card"
import CommonPopup from "../../components/popup/commonPopup";



function OwnedProperties(props) {
  var detailArr = [];
  const [isOpen, setIsopen] = useState(false)
  const [isShowPopUp, setIsShowPopUp] = useState(false)
  const [listingDatas, setListingDatas] = useState([]);
  const [userId, setUserId] = useState(null)
  const [claimDatas, setClaimDatas] = useState([]);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isdataFounded, setisDataFounded] = useState(false)
  const getParams = {
    select: 'property_name,address,price,thumbnail_image,beds,baths,square_feet,symbol,is_active',
  };

  useEffect(async () => {
    await listingApis();
    // await dataSet();
  }, [])

  // useEffect(()=>{
  // },[propertyDetail])

  const userDetails = useSelector(state => state.user.userDetail);
  const propertyDetail = useSelector(state => state.detail.result);
  const dispatch = useDispatch()
  const [property_id, setPropertyId] = useState(null)

  const handleImageLikeList = async (userId) => {
    var value = []
    await imageLikeList(userId).then((res) => {
      value = res.data.data
    })
    return value
  }

  const listingApis = async () => {
    let userId = localStorage.getItem('userId')
    if (userId !== null) {
      setUserId(userId)
      var response = await handleImageLikeList(userId)
    }
    setLoader(true);
    await claimPropertyList({ id: userDetails._id, status: 'Approve' })
      .then(async (res) => {
        if (res.status == 200) {
          var data = [...res.data.data]
          data.length !== 0 ? setisDataFounded(false) : setisDataFounded(true)
          if (userId !== null) {
            if (response.length !== 0) {
              response.map((item) => {
                data.map((item2) => {
                  if (item === item2.property_id._id) {
                    item2.isLike = item
                  }
                })
              })
            }
          }
          setClaimDatas(data);
          setIsopen(true);
          setListingDatas(data);
          setLoader(false);
          // dataSet(claimData);
        }
      })
  }

  const dataSet = async (claimDatass) => {
    let claimData = claimDatass;

    if (claimData.length) {
      var countI = 0;
      claimData.forEach(async (data, index) => {


        await dashboardPropertyDetail(data.property_id)
          .then((res) => {
            if (res.status == 200) {
              detailArr.push(res.data.data);

              countI = countI + 1;

              if (claimData.length == countI) {
                setIsopen(true);
                setListingDatas(detailArr);
              }
            } else {
              setLoader(false);
              toast.error(res.data.data.message, {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
              });
            }
          })
      })
    }

  }

  const showDetail = () => {
    setOpen(true)
  }
  // const openNav = () => {
  //   document.getElementById("mySidenav").style.width = "521px"
  //   document.getElementById("main").style.marginRight = "105px"
  // }

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0"
    document.getElementById("main").style.marginRight = "0"
  }

  const handleUnClaim = async () => {
    setLoader(true)
    await unclaimPropertyList(property_id).then((res) => {
      setOpen(false)
      listingApis()
    })
  }
  const handleProperty = async (id) => {
    setLoader(true)
    await dispatch(fetchdetail(id))
    setLoader(false)
  }
  const para1 = 'Are you sure you want to unclaim'
  const para2 = 'this property?'
  const hanldeClosePopUp = () => {
    setIsShowPopUp(p => !p)
  }

  return (
    <Layout>
      <Seo title="Owned Properties" />
      {loader ? <Loader /> : null}
      <ToastContainer />
      <CommonPopup open={isShowPopUp} close={hanldeClosePopUp} para1={para1} para2={para2} hanldeYes={handleUnClaim} />
      <div >
        <div className="row ms-3">
          <div className={`${open ? 'col-md-8' : 'col-md-12'}`}>
            <div className="row">

              {listingDatas.length !== 0 &&
                listingDatas.map((data, i) => {
                  var dollar = data.property_id ? data.property_id.price.$numberDecimal : null;
                  let dollarUSLocale = String(dollar).replace(/(.)(?=(\d{3})+$)/g, '$1,')
                  //console.log("--address1--", address1);
                  //console.log("--address2--", address2);

                  return (
                    <>
                      {
                        data.property_id &&
                        <div className={`${open ? 'col-md-5' : 'col-md-3'}`} key={i}>
                          <div className={styles.carouselResList}>
                            <div >
                              <div className={styles.CarouselCard1}>
                                <div onClick={() => setOpen(true)}>
                                  <Cards data={data} reLoadPage={listingApis} agentDetails={() => handleProperty(data.property_id._id)} loader={() => setLoader(true)} />
                                </div>
                                <p className={styles.claim} style={{ cursor: 'pointer' }} onClick={() => { setPropertyId(data._id); hanldeClosePopUp(); }}>Unclaim</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </>
                  )
                })
              }
            </div>
            {isdataFounded && <div className='no-result' style={{marginTop:"10%"}}>Please Claim a property to list out here.</div>}
          </div>
          {open ? (
            <div className="col-lg-4 col-xl-4 col-md-4 p-0">
              {/* <div id="mySidenav" className="sidenav"> */}
              <OwnedPropDetails data={propertyDetail} />
              {/* </div> */}
            </div>
          ) : null}
        </div>
        {isdataFounded && <div className='no-result'>Result not found</div>}
      </div>
    </Layout>
  )
}

export default OwnedProperties
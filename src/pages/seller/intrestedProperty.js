import React, { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import * as styles from "../../pages/seller/sellerProp.module.css"
import "react-multi-carousel/lib/styles.css"
import "bootstrap/dist/css/bootstrap.css"
import IntrestedPropertyDetail from "../seller/intrestedPropertyDetail"
import { imageLike, intrestedPropertyDetail, similarProperty } from "../../components/Api/ListingApi"
import Loader from "../../components/Loader"
import Cards from "../../components/card/card"
import SimilarCarousel from "../../components/Carousel/similarCarousel"
import * as style1 from '../dashboard/detail.module.css';
function IntrestedProperty(props) {
  const [open, setOpen] = useState(false)
  const [loader, setLoader] = useState(false);
  const [agentDetails, setAgentDetails] = useState([])
  const [userId, setUserId] = useState('')
  const [similar, setSimilar] = useState([])
  const [detailList, setDetailList] = useState([])
  const [isdataFounded, setisDataFounded] = useState(false)

  const showDetail = () => {
    setOpen(true)
  }

  useEffect(() => {
    getIntresentedPropertyDetails()
  }, [])
  const getIntresentedPropertyDetails = async () => {
    setOpen(false)
    let userId = localStorage.getItem('userId')
    setUserId(userId)
    setLoader(true)
    await intrestedPropertyDetail(userId).then((res) => {
      console.log('intresent property', res)
      let data = [...res.data.data]
      data.length !== 0 ? setisDataFounded(false) : setisDataFounded(true)
      data.map((item) => {
        item.isLike = item.property_id._id
      })
      setDetailList(data)
      setLoader(false)
    })
  }

  const handleAgentDetails = async (data) => {
    console.log(data)
    setAgentDetails(data)
    await similarProperty(data.property_id._id).then((res) => {
      console.log("simailr property",res.data.data)
      setSimilar(res.data.data)
    })
    showDetail()
  }
  return (
    <>
      {loader && <Loader />}
      <Layout>
        <div className="row ms-3">
        <div className={`${open ? 'col-md-8' : 'col-md-12'}`}>
            <div className="row">
              {detailList.map((item, index) => (
                <div className={`${open ? 'col-md-5' : 'col-md-3 py-2 px-1'}`} key={index}>


                  <div className={styles.CarouselCard1} style={{marginBottom:"50px"}} >
                    <Cards data={item} reLoadPage={getIntresentedPropertyDetails} agentDetails={() => handleAgentDetails(item)} loader={() => setLoader(true)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {open ? (
            <div className="col-lg-4 col-xl-4 col-md-4 mt-0 pe-0" >
              <IntrestedPropertyDetail data={agentDetails} similarProperty={similar} />
            </div>
          ) : null}
        </div>
        {open ? ( 
        <div className="w-100">
          <div style={{backgroundColor: '#efefef'}}>
            <p className={style1.similar}>Similar Properties</p>
            <SimilarCarousel similar={similar} />
          </div>
        </div>
        ):null}
        {isdataFounded &&<div className='no-result' style={{marginTop:"10%"}}>Please Favorite a property to list out here.</div>}
      </Layout>
    </>
  )
}

export default IntrestedProperty

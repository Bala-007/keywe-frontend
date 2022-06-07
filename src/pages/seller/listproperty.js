import React, { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import * as styles from "../../pages/seller/sellerProp.module.css"
import "react-multi-carousel/lib/styles.css"
import "bootstrap/dist/css/bootstrap.css"
import { Card } from "react-bootstrap"
import home1 from "../../../static/images/home1.png"
import { listedProperty } from "../../components/Api/ListingApi"

import Seo from "../../components/seo"

import ListPropDetails from "./ListPropDetails"
function ListedProperty() {
  const [open, setOpen] = useState(false)
  const showDetail = () => {
    setOpen(true)
  }

  // const openNav = () => {
  //   document.getElementById("mySidenav").style.width = "521px"
  //   // document.getElementById("main").style.marginRight = "521px"
  // }

  // const closeNav = () => {
  //   document.getElementById("mySidenav").style.width = "0"
  //   document.getElementById("main").style.marginRight = "0"
  // }

  const [listing, setListing] = useState([])
  const [listingDetails, SetListingDetails] = useState({})
  useEffect(async () => {
    await listingApi();

  }, [])
  const listingApi = async () => { 
    let userId = localStorage.getItem('userId')
    await listedProperty(userId).then((res) => {
      setListing(res.data.data)
      console.log("listing property...", res.data.data)

    })
  }


  return (
    <div>
      <div id="mySidenav" className="sidenav">
        {/* <ListPropDetails /> */}
      </div>
      <Layout>
        <Seo title="Listed Properties" />
        <div className="row ms-3">
          <div className={`${open ? 'col-md-8' : 'col-md-12'}`}>

            <div className="row"  >
              {listing.map((data, i) =>
                data.property_id !== null &&
                <div className={`${open ? 'col-md-5' : 'col-md-3'}`} key={i} onClick={() => { SetListingDetails(data); }}>
                  <div className={styles.carouselResList}>
                    <div>
                      <div className={styles.CarouselCard1}>
                        <Card
                          className={styles.carouselCard}
                          style={{
                            borderRadius: "25px",
                            boxShadow:
                              "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)",
                          }}
                          onClick={showDetail}
                        >
                          <div className={styles.favorite}>
                            <img src={data.property_id.thumbnail_image} alt="home1" className={styles.carouselImage} />
                            <div className={styles.favorite1}>
                              <span className={styles.circle}>
                                <i
                                  className="fa fa-heart"
                                  style={{ color: "white" }}
                                ></i>
                              </span>
                            </div>
                          </div>
                          <div className="row m-0">
                            <div className="col-md-8 cardtext1">
                              <p>{data.property_id.address.split(',').slice(0).shift()}</p>
                              <p>{data.property_id.address.split(",").slice(1).join(",")}</p>
                            </div>
                            <div className="col-md-4 cardtext1">
                              <div className={styles.dashboardActive}>
                                <i
                                  className="fa fa-circle"
                                  style={{ color: "green" }}
                                ></i>
                                <p style={{ marginLeft: "5px" }}>Active</p>
                              </div>
                            </div>
                          </div>
                          <div className="row m-0">
                            <div className="col-md-4 owner-bold ">
                              <p>${data.property_id.price.$numberDecimal}</p>
                            </div>
                            <div className="col-md-8 cardtext2">
                              <div className={styles.beds}>
                                <div>
                                  <p style={{ fontFamily: "DejaVuSansBold" }}>{data.property_id.beds}</p>
                                  <p style={{ color: "#898686" }}>Beds</p>
                                </div>
                                <div>
                                  <p style={{ fontFamily: "DejaVuSansBold" }}>{data.property_id.baths}</p>
                                  <p style={{ color: "#898686" }}>Baths</p>
                                </div>
                                <div>
                                  <p style={{ fontFamily: "DejaVuSansBold" }}>{data.property_id.square_feet.$numberDecimal}</p>
                                  <p style={{ color: "#898686" }}>Sq.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
          {open ? (
            <div className="col-md-4 mt-0">
              <ListPropDetails data={listingDetails} />
            </div>
          ) : null}

        </div>
      </Layout>
    </div>
  )
}

export default ListedProperty

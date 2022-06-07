import React, { useState, useEffect } from 'react';
import { Card } from "react-bootstrap";
import home1 from '../../../static/images/home1.png';
import { Link } from "gatsby";
import * as styles from '../../pages/dashboard/dashboard.module.css';
import { dashboardPropertyList } from '../Api/ListingApi';
import Loader from '../Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import Pagination from '../Pagination';

var currentPage = 1;

export default function DashboardImageView(props) {
  var imageHeader = 'Bath room';
  var searchFilter = {
    selectText: 'property_name,address,price,thumbnail_image,beds,baths,square_feet,symbol,is_active',
    searchText: '',
    photo_view: imageHeader
  }
  const [searchFields, setSearchFields] = useState(searchFilter);
  const [listingDatas, setListingDatas] = useState([]);
  const [listHeaderDatas, setListHeaderDatas] = useState([]);
  const [loader, setLoader] = useState(false);
  //pagination
  const [pageCount, setPageCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const { search, priceValue, bed, bath, homeType, squareFeetMin, squareFeetMax, lotSizeMin, lotSizeMax, yearBuildMin, yearBuildMax, HOAFees, amenities, houseView, storiesMin, storiesMax, poolType, walkScore, bikeScore,pricesqftMin,pricesqftMax } = props;

  // const handlePageClick = async (event) => {
  async function handlePageClick(event) {
    // console.log("page select",event);
    currentPage = event.selected + 1;
    await listingApi();
  };

  useEffect(async () => {
    // alert("am in image view");

    await listingApi();
  }, [props.loading])

  console.log("--props-DashboardImageView--", props);
  const listingApi = async (searchHeader = "") => {
    // console.log("--searchFields-2", searchFields);
    // console.log("--searchFilter-2", searchFilter);

    let getParams = {
      select: searchFields.selectText,
      search: search,
      min_price: priceValue.min,
      max_price: priceValue.max,
      photo_view: searchHeader,
      beds: bed,
      baths: bath,
      home_type: homeType,
      min_square_feet: squareFeetMin,
      max_square_feet: squareFeetMax,
      min_lot_size: lotSizeMin,
      max_lot_size: lotSizeMax,
      min_year_built: yearBuildMin,
      max_year_built: yearBuildMax,
      amenities: amenities,
      house_view: houseView,
      min_stories: storiesMin,
      max_stories: storiesMax,
      min_price_per_sqft:pricesqftMin,
      max_price_per_sqft:pricesqftMax,
      pool_type:poolType,
      hoa_fees:HOAFees,
      walk_score:walkScore,
      bike_score:bikeScore,
      page: currentPage
    };
    console.log('getParams',getParams)

    setLoader(true);
    await dashboardPropertyList(getParams)
      .then((res) => {
        console.log("res", res);
        if (res.status == 200) {
          setLoader(false);
          setListingDatas(res.data.data);
          // console.log("----",res.data.Photo_Views[0])
          // setSearchFields({...searchFilter, photo_view:res.data.Photo_Views[0]});
          setListHeaderDatas(res.data.Photo_Views);
          setPageCount(res.data.Paging.total_page);
          setSelectedPage(res.data.Paging.current_page - 1);
          let priceMin = res.data.Price_Min.$numberDecimal;
          let priceMax = res.data.Price_Max.$numberDecimal;
          var priceArr = [priceMin, priceMax];
          //console.log("--priceArr---", priceArr);
          priceCall(priceArr);
        } else {
          setLoader(true);
          toast.error(res.data.data.message, {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
          });
        }
      })
  }
  // console.log("--listingDatas---", listingDatas);
  const priceCall = (priceArr) => {
    //console.log("--priceArr22---", priceArr);
    props.priceRange(priceArr);
  }
  async function myFunction(e) {
    // console.log("--e--",e.target.innerText);
    imageHeader = e.target.innerText;
    setSearchFields({ ...searchFilter, photo_view: e.target.innerText });
    var activeclass = document.querySelectorAll('#icon-layout li');

    for (var i = 0; i < activeclass.length; i++) {
      activeclass[i].classList.remove('active');
    }
    e.target.classList.add('active');


    await listingApi(e.target.innerText);
  }
  console.log("keyweimage",process.env.API_IMAGE_URL);

  return (
    <>
      {loader ? <Loader /> : null}
      <ToastContainer />
      <div className='dashboard-card-imglist'>
        <div className='row'>
          <div className='col-lg-12 col-xl-12 col-md-12'>
            <div className='imagelist-menu' id="icon-layout">
              <ul onClick={(e) => myFunction(e)} id="navList">
                {
                  listHeaderDatas.map((data, index) => {
                    // console.log("--header data--",data);
                    return (
                      <li key={index} >{data}</li>
                      // className={index == 0 ? "active" : ""}
                    )
                  })
                }
                {/* <li>Exterior</li>
              <li>Kitchen</li>
              <li>Master Bed</li>
              <li>Master Bathroom</li>
              <li>Living Room</li>
              <li>Dining Room</li>
              <li>Bedroom2</li>
              <li>Bedroom3</li>
              <li>Backyard</li>
              <li>Garage</li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className='row'>
          {listingDatas.length > 0 ?
            listingDatas.map((data, i) => {
              // console.log("--data--", data);
              var addressData = data.address;
              var addressIndex = data.address.lastIndexOf(",");
              var address1 = addressData.substring(0, addressIndex);
              var address2 = addressData.substring(addressIndex + 1);
              var dollar = data.price.$numberDecimal;
              let dollarUSLocale = String(dollar).replace(/(.)(?=(\d{3})+$)/g,'$1,')

              var imagePath = data.images;
              var imageUrl = data.thumbnail_image;
              // console.log(imagePath);
              if (imagePath) {
                imagePath.forEach((data, index) => {
                  // console.log("--",data.url);
                  imageUrl = data.url;
                })
              }



              return (
                <div className='col-lg-3 col-xl-3 col-md-3 list-cardview' key={i} title={data.property_name}>
                  <div className="CarouselCard1List" style={{ padding: "15px" }}> {/* className={styles.CarouselCard1List}  */}
                    <Link to={`/dashboard/detail/${data._id}`} style={{ textDecoration: "none" }}>
                      <Card
                        className={styles.carouselCard}
                        style={{
                          borderRadius: "25px",
                          boxShadow:
                            "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)",
                        }}
                      >
                        <div className={styles.favorite}>

                          <img
                            src={imageUrl}
                            alt="home1"
                            className={styles.carouselImage}
                          />
                          <div className={styles.favorite1}>
                            <span className={styles.circle}>
                              <i className="fa fa-heart" style={{ color: "white" }}></i>
                            </span>
                          </div>
                        </div>
                        <div className="row m-0">
                          <div className="col-md-8 cardtext1">
                            <p>{address1}</p>
                            <p>{address2}</p>
                          </div>
                          <div className="col-md-4 cardtext1">
                            <div className={styles.dashboardActive}>
                              {data.is_active ?
                                <>
                                  <i
                                    className="fa fa-circle"
                                    style={{ color: "#03B45B" }}
                                  ></i>
                                  <p style={{ marginLeft: "5px" }}>Active</p>
                                </>
                                :
                                <>
                                  <i
                                    className="fa fa-circle"
                                    style={{ color: "orange" }}
                                  ></i>
                                  <p style={{ marginLeft: "5px" }}>Inactive</p>
                                </>
                              }
                            </div>
                          </div>
                        </div>
                        <div className="row m-0">
                          <div className="col-md-6 cardtext2">
                            <p className={styles.homePrice} >
                            {data.symbol}{dollarUSLocale}
                            </p>
                          </div>
                          <div className="col-md-6 cardtext2">
                            <div className={styles.beds}>
                              <div>
                                <p>
                                  <b>{data.beds}</b>
                                </p>
                                <p style={{ color: "#898686" }}>Beds</p>
                              </div>
                              <div>
                                <p>
                                  <b>{data.baths}</b>
                                </p>
                                <p style={{ color: "#898686" }}>Baths</p>
                              </div>
                              <div>
                                <p>
                                  <b>{data.square_feet.$numberDecimal}</b>
                                </p>
                                <p style={{ color: "#898686" }}>Sq.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </div>
                </div>
              )
            })
            : <div className='no-result'>Result not found</div>
          }
        </div>
      </div>
      {listingDatas.length > 0 ? <Pagination pageCount={pageCount} handlePageClick={handlePageClick} forcePage={selectedPage} /> : null}
    </>
  )
}

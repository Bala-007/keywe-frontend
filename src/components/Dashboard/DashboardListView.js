import React, { useState, useEffect } from 'react';
import { Card } from "react-bootstrap";
import home1 from '../../../static/images/home1.png';
import { Link } from "gatsby";
import * as styles from '../../pages/dashboard/dashboard.module.css';
import { dashboardPropertyList, imageLike, imageLikeList } from '../Api/ListingApi';
import Loader from '../Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import Pagination from '../Pagination';
import AcceptPopup from '../popup/AcceptPopup';
import { useDispatch, useSelector } from "react-redux";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

var currentPage = 1;
export default function DashboardListView(props) {
  var searchFilter = {
    selectText: 'property_name,address,price,thumbnail_image,beds,baths,square_feet,symbol,is_active',
    searchText: '',
    min_price: '',
    max_price: '',

  }
  const [searchFields, setSearchFields] = useState(searchFilter);
  const [userId, setUserId] = useState(null)
  const [listingDatas, setListingDatas] = useState([]);
  const [openPopup, setOpenPopup] = useState(false)
  const [loader, setLoader] = useState(false);
  const [isdataFounded, setisDataFounded] = useState(false)
  const userDetails = useSelector(state => state.user.userDetail);
  console.log("user details..",userDetails)
  //pagination
  const [pageCount, setPageCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const { search, priceValue, bed, bath, homeType, squareFeetMin, squareFeetMax, lotSizeMin, lotSizeMax, yearBuildMin, yearBuildMax, HOAFees, amenities, houseView, storiesMin, storiesMax, poolType, walkScore, bikeScore, pricesqftMin, pricesqftMax } = props;

  async function handlePageClick(event) {
    currentPage = event.selected + 1;
    await listingApi();
  };

  useEffect(async () => {
    setLoader(true);
    // alert("am in list view");
    await listingApi();
    // props.priceRange('test');
  }, [])

  useEffect(async () => {
    setLoader(true);
    // alert("am in list view");
    await listingApi();
    // props.priceRange('test');
  }, [props.loading])

  // console.log("--props-DashboardListView--", props);

  const handleImageLikeList = async (userId) => {
    // let userId = localStorage.getItem('userId')
    // setUserId(userId)
    var value = []
    console.log('userId', userId)
    await imageLikeList(userId).then((res) => {
      value = res.data.data
    })
    return value
  }

  const listingApi = async () => {
    // let getParams = {sort_field:"_id", sort_value: -1,is_deleted: false, page: currentPage,search:searchFilter.selectText, role: searchFilter.role};
    let userId = localStorage.getItem('userId')
    if (userId !== null) {
      setUserId(userId)
      var response = await handleImageLikeList(userId)
    }
    let getParams = {
      select: searchFields.selectText,
      search: search,
      min_price: priceValue.min,
      max_price: priceValue.max,
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
      min_price_per_sqft: pricesqftMin,
      max_price_per_sqft: pricesqftMax,
      pool_type: poolType,
      hoa_fees: HOAFees,
      walk_score: walkScore,
      bike_score: bikeScore,
      page: currentPage,
      sort_field: "square_feet",
      sort_value: -1
    };
    setLoader(true);
    await dashboardPropertyList(getParams)
      .then((res) => {
        if (res.status == 200) {
          var data = [...res.data.data]
          data.length !== 0 ? setisDataFounded(false) : setisDataFounded(true)
          if (userId !== null) {
            if (response.length !== 0) {
              response.map((item) => {
                data.map((item2) => {
                  if (item === item2._id) {
                    item2.isLike = item
                  }
                })
              })
            }
          }
          setListingDatas(data);
          setPageCount(res.data.Paging.total_page);
          setSelectedPage(res.data.Paging.current_page - 1);
          let priceMin = res.data.Price_Min.$numberDecimal;
          let priceMax = res.data.Price_Max.$numberDecimal;
          var priceArr = [priceMin, priceMax];
          priceCall(priceArr);
          setSearchFields({ ...searchFields, min_price: priceMin, max_price: priceMax });
          setLoader(false);
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
  //console.log("--listingDatas---", listingDatas);

  const priceCall = (priceArr) => {
    //console.log("--priceArr22---", priceArr);
    props.priceRange(priceArr);
  }
  const hanldeOpenPopup = () => {
    setOpenPopup(p => !p)
  }
  const handleClickLike = (id) => {
    if (userId !== null) {
      setLoader(true);
      imageLike(userId, id).then(() => {
        listingApi()
      })
    }
    else {
      hanldeOpenPopup()
      setTimeout(()=>hanldeOpenPopup(),3000)
    }
  }
  return (
    <>
      {loader ? <Loader /> : null}
      {/* <Loader />  */}
      <ToastContainer />
      <AcceptPopup success={openPopup} toggleSuccess={hanldeOpenPopup} claimAlertMessage={true} message={"In order to favorite this property"} />
      <div className='row dashboard-card-list' style={{hight:"125vh"}}>
        {listingDatas.length > 0 ?
          listingDatas.map((data, i) => {
            // console.log("--data--", data);
            var addressData = data.address;
            var addressIndex = data.address.lastIndexOf(",");
            var address1 = addressData.substring(0, addressIndex);
            var address2 = addressData.substring(addressIndex + 1);
            var dollar = data.price.$numberDecimal;
            let dollarUSLocale = String(dollar).replace(/(.)(?=(\d{3})+$)/g, '$1,')
            //console.log("--address1--", address1);
            //console.log("--address2--", address2);

            return (
              <div className='col-lg-3 col-xl-3 col-md-3 list-cardview' key={i} title={data.property_name} >
                <div className="CarouselCard1List" style={{ padding: "15px" }}> {/* className={styles.CarouselCard1List}  */}
                  <Card
                    className={styles.carouselCard}
                    style={{
                      borderRadius: "25px",
                      boxShadow:
                        "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)",
                    }}
                  >
                    <div className={styles.favorite}>
                      <Link to={`/dashboard/detail/${data._id}`} style={{ textDecoration: "none" }}>
                        <>
                          <img
                            src={data.thumbnail_image}
                            alt="home1"
                            className={styles.carouselImage}
                          />
                        </>
                      </Link>
                      {userDetails.role !== "agent" &&
                        <div className={styles.favorite1} onClick={() => handleClickLike(data._id)}>
                          <span className={styles.circle}>
                            <i className="fa fa-heart" style={{ color: data.isLike !== undefined ? "red" : "white" }}></i>
                          </span>
                        </div>
                      }
                    </div>
                    <Link to={`/dashboard/detail/${data._id}`} style={{ textDecoration: "none" }}>
                      <>
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
                      </>
                    </Link>
                  </Card>
                </div>
              </div>
            )
          })
          : <div className='no-result'>{isdataFounded && 'Result not found'}</div>
        }
      </div>

      {listingDatas.length > 0 ? <Pagination pageCount={pageCount} handlePageClick={handlePageClick} forcePage={selectedPage} /> : null}
      {/* <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        pageClassName="page-item"
        breakClassName="page-item"
        nextClassName="page-item"
        previousClassName="page-item"
        previousLabel={<>&laquo;</>}
        nextLabel={<>&raquo;</>}
        forcePage={selectedPage} 
      /> */}
    </>
  )

}

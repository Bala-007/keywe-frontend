import React, { useEffect, useState, useRef } from 'react';
import GoogleMapReact, { Marker } from 'google-map-react';
import { Card, } from "react-bootstrap";
import * as styles from '../../pages/dashboard/dashboard.module.css';
import { Link } from 'gatsby';
import { dashboardPropertyList, imageLike, imageLikeList } from '../Api/ListingApi';
import MapMarker from "./MapMarker";
import Loader from '../Loader';
import Pagination from '../Pagination';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";




var currentPage = 1;
const KEY = "AIzaSyAbQxNOlxvLU3I_XZAluQeFBAPrj6Ua2Jk";
var selectedField = 'square_feet', selectedText = 'Z - A', descValue = '-1';
function DashboardMapView(props) {
  var searchFilter = {
    selectText: 'property_name,address,price,thumbnail_image,beds,baths,square_feet,symbol,is_active,location',
    searchText: '',

  }
  const [searchFields, setSearchFields] = useState(searchFilter);
  var cardDetailItems = {
    pagination: 0,
    highlightId: ''
  }
  const [cardDetails, setCardDetails] = useState(cardDetailItems);
  const [userId, setUserId] = useState(null)
  const [sortName, setSortName] = useState('A - Z')
  const [dropDown, setDropDown] = useState(false)
  const [isdataFounded, setisDataFounded] = useState(false)
  //const [listingDatas, setListingDatas] = useState([]);
  const userDetails = useSelector(state => state.user.userDetail);
  console.log("user details..", userDetails)
  const [markers, setMarkers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [text, settext] = useState(selectedText);
  const [mapLocation, setMapLocation] = useState([])
  const inputEl = useRef(null);
  const { search, priceValue, bed, bath, homeType, squareFeetMin, squareFeetMax, lotSizeMin, lotSizeMax, yearBuildMin, yearBuildMax, HOAFees, amenities, houseView, storiesMin, storiesMax, poolType, walkScore, bikeScore, pricesqftMin, pricesqftMax, mapSearch } = props;
  useEffect(async () => {
    // alert("am in map view");

    await listingApi();
  }, [props.loading])

  const handleImageLikeList = async (userId) => {

    var value = []
    await imageLikeList(userId).then((res) => {
      value = res.data.data
    })
    return value
  }


  const listingApi = async () => {
    let userId = localStorage.getItem('userId')
    if (userId !== null) {
      setUserId(userId)
      var response = await handleImageLikeList(userId)
    }
    // let getParams = {sort_field:"_id", sort_value: -1,is_deleted: false, page: currentPage,search:searchFilter.selectText, role: searchFilter.role};
    let getParams = {
      select: searchFields.selectText,
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
      search: search,
      min_stories: storiesMin,
      max_stories: storiesMax,
      min_price_per_sqft: pricesqftMin,
      max_price_per_sqft: pricesqftMax,
      pool_type: poolType,
      hoa_fees: HOAFees,
      walk_score: walkScore,
      bike_score: bikeScore,
      sort_field: selectedField,
      sort_value: descValue,
      page: currentPage,
    };
    setLoader(true);
    await dashboardPropertyList(getParams)
      // .then((response)=>response.json())
      .then((res) => {
        console.log("res", res);
        if (res.status == 200) {
          setLoader(false);
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
          setMarkers(data);
          // var pageItemsTotal = res.data.Paging.total_items/res.data.Paging.total_page;
          var pageItemsTotal = res.data.Paging.total_items;
          setCardDetails({ ...cardDetails, pagination: pageItemsTotal });
          setPageCount(res.data.Paging.total_page);
          setSelectedPage(res.data.Paging.current_page - 1);
          let priceMin = res.data.Price_Min.$numberDecimal;
          let priceMax = res.data.Price_Max.$numberDecimal;
          var priceArr = [priceMin, priceMax];
          // console.log("--priceArr---", priceArr);
          priceCall(priceArr);

        } else {
          setLoader(true);

          alert("error");
          // toast.error(res.data.data.message, {
          //   position: "top-right",
          //   autoClose: 3000,
          //   closeOnClick: true,
          // });
        }
      })
    if (search !== '') {
      let data = { ...getParams, ...{ pagesize: null } }
      console.log('params', data)
      await dashboardPropertyList(getParams).then((res) => {
        setMapLocation(res.data.data)
        setLoader(false)
      }).catch((error) => {
        setLoader(false)
      })
    }

  }
  const handleDropDown = () => {
    setDropDown(!dropDown)
  }
  const handleSort = (e) => {
    var sort = e.target.value;
    setSortName(e.target.value)

    setDropDown(!dropDown)
  }
  const mapSorting = async (e) => {
    let value = e.target.value;

    if (value != '') {
      selectedField = e.target.options[e.target.selectedIndex].getAttribute('data-field');
      selectedText = e.target.options[e.target.selectedIndex].text;
      console.log("--selectedText--", selectedText);
      settext(selectedText);
      if (value == 1 || value == 4) {
        descValue = '1';
      } else {
        descValue = '-1';

      }
      await listingApi();
    }
  }
  const priceCall = (priceArr) => {
    //console.log("--priceArr22---", priceArr);
    props.priceRange(priceArr);
  }
  //console.log("--markers---", markers);
  async function handlePageClick(event) {
    //console.log("page select",event);
    currentPage = event.selected + 1;
    await listingApi();
  };
  const markerDetail = (center) => {
    //alert("child");
    //console.log("--child selectedCardId--", selectedCardId);
    setCardDetails({ ...cardDetails, highlightId: center._id });
    // let data = []
    // data = [center]
    // setMarkers([center])
  }

  // console.log("--highlightId--", cardDetails);
  const [selected, setSelected] = useState("Sortby:")

  const handleClickLike = (id) => {
    if (userId !== null) {
      setLoader(true);
      imageLike(userId, id).then(() => {
        listingApi()
      })
    }
  }

  const scrollList = () => {
    inputEl.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {loader ? <Loader /> : null}
      {/* // Important! Always set the container height explicitly */}
      <div style={{ display: "flex", marginTop: "-67px" }}>
        <div style={{ width: '70%', height: "800px", position: "relative" }}>
          <MapMarker
            recycleCenters={search !== "" ? mapLocation : markers}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAbQxNOlxvLU3I_XZAluQeFBAPrj6Ua2Jk&libraries&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `800px`, width: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            markerDetail={markerDetail}
            mapSearch={mapSearch}
            scrollList={scrollList}
          />
        </div>
        <div style={{ width: "30%", background: "white", padding: "20px", height: "800px", overflow: "auto" }}>

          <div className={styles.searchprice}>
            <p>Search Result:  <b>{markers.length > 0 ? cardDetails.pagination : 0} Homes</b></p>
            <div className='position-relative'>
              <select name="miles" id="miles" style={{ width: "171px" }} className='form-select form-field f-13' onChange={(e) => mapSorting(e)}>
                <option className='sortvalue' value="">--select--</option>
                {/* 05-04-2022 <option className='sortvalue' value="1" data-field="address" >A - Z</option>
                <option className='sortvalue' value="2" data-field="address" >Z - A</option> */}
                <option className='sortvalue' value="3" data-field="price" >Price (High to Low)</option>
                <option className='sortvalue' value="4" data-field="price" >Price (Low to High)</option>
                <option className='sortvalue' value="5" data-field="beds" >Beds</option>
                <option className='sortvalue' value="6" data-field="baths" >Baths</option>
                <option className='sortvalue' value="7" data-field="square_feet" >Square Feet</option>

              </select>
            </div>
          </div>
          {markers.length > 0 ?
            markers.map((data, i) => {
              //console.log("--data--", data);
              //console.log("--highlightId-2222-", cardDetails.highlightId);
              let selectedCard = cardDetails.highlightId;

              var addressData = data.address;
              var addressIndex = data.address.lastIndexOf(",");
              var address1 = addressData.substring(0, addressIndex);
              var address2 = addressData.substring(addressIndex + 1);
              var dollar = data.price.$numberDecimal;
              let dollarUSLocale = String(dollar).replace(/(.)(?=(\d{3})+$)/g, '$1,')
              return (
                <div className="CarouselCard1List" style={{ padding: "15px" }} key={i} title={data.property_name}>
                  <Card
                    // {selectedCard == data._id ? style={{border: "1px solid blue!important"}} : }
                    // className={styles.carouselCard}
                    className={(selectedCard === data._id) ? 'itemSelcted' : ''}
                    style={{
                      // border: selectedCard == data._id ? '2px solid blue!important' : 'none' ,
                      borderRadius: "25px",
                      boxShadow:
                        "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)",

                    }}
                    ref={(selectedCard === data._id) ? inputEl : null}
                  >
                    <div className={styles.favorite}>
                      <Link to={`/dashboard/detail/${data._id}`} style={{ textDecoration: "none" }}>
                        <img
                          src={data.thumbnail_image}
                          alt="home1"
                          className={styles.carouselImage}
                        />
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
              )
            })
            : <div className='no-result'>{isdataFounded && 'Result not found'}</div>
          }
          {markers.length > 0 ? <div className='map_pagination'><Pagination pageCount={pageCount} handlePageClick={handlePageClick} forcePage={selectedPage} /></div> : null}
        </div>
      </div>

    </>
  );
}

export default DashboardMapView;
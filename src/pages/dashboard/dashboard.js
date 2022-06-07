import React, { useEffect,useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import * as styles from "./dashboard.module.css"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import "bootstrap/dist/css/bootstrap.css"
import { Card } from "react-bootstrap"
import searchIcon from "../../../static/images/Icon feather-search.png"
import house1 from "../../../static/images/house1.png"
import house2 from "../../../static/images/house1.png"
import entrance from "../../../static/images/entrance.png"
import hexagon1 from "../../../static/images/hexagon1.png"
import home1 from "../../../static/images/home1.png"
import home2 from "../../../static/images/home2.png"
import home3 from "../../../static/images/home3.png"
import home4 from "../../../static/images/home4.png"
import james from "../../../static/images/james.png"
import Mia from "../../../static/images/Mia.png"
import noah from "../../../static/images/noah.png"
import robert from "../../../static/images/robert.png"
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import SkeletonProductLib from '../../components/skeleton/SkeletonProductLib'
import { Link } from "gatsby"
import Footer from "../../components/Footer"
import Seo from "../../components/seo";
import VerticalCarousel from "../../components/Carousel/verticalCarousel"


function Dashboard() {
  // const userDetails = useSelector(state => state.user.userDetail);
  // const [footData,setFootData] =useState();
  // useEffect(()=>{
  //   console.log("--hi--", userDetails);
  
  //   if (!footData) {
  //       setFootData(false);
  //       console.log("hello",footData)
  //   }else{
  //     setFootData(true);
        
  //   }

  // },[]);
  const [storage,setStorage] =useState(false);

   //console.log("--userType--",userType);
   const storedData =localStorage.getItem("userInfo") ;

    useEffect(() => {
         if (!storedData) {
          
             setStorage(false);
         }else{
            setStorage(true);
           
         }
    },[storedData]);

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  }
  const [loader, setLoader] = useState(false);
  useEffect(() => {
      setLoader(true);
      setTimeout(() => { setLoader(false) }, 1000)

  }, []);

  return (

    <div>
      <Seo title="Home" />
      <Navbar positionRelative="true" isLoginOf={storage} />
      <div style={{height:'600px'}}>
      {loader && <div ><SkeletonProductLib /></div>}
            {!loader &&
      <VerticalCarousel />
            }
      </div>
      <div className="px-5 mt-50">
        <h3 className={styles.home}>Featured Properties</h3>

        <div className={styles.carouselRes}>
          <Carousel
            swipeable={false}
            draggable={false}
            // showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            // infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            <div>
              <div className={styles.CarouselCard1}>
                {/* <Link to="/dashboard/detail" style={{ textDecoration: "none" }}> */}
                  <Card
                    className={styles.carouselCard}
                    style={{
                      borderRadius: "25px",
                      boxShadow:
                        "0px 5px 8px #ddd",
                    }}
                  >
                    <div className={styles.favorite}>
                       <img
                        src={home1}
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
                        <p>916 Spring St,</p>
                        <p>Des Monia, IA 50315</p>
                      </div>
                      <div className="col-md-4 cardtext1">
                        <div className={styles.dashboardActive}>
                          <i
                            className="fa fa-circle"
                            style={{ color: "#03B45B" }}
                          ></i>
                          <p style={{ marginLeft: "5px" }}>Active</p>
                        </div>
                      </div>
                    </div>
                    <div className="row m-0">
                      <div className="col-md-4 cardtext2">
                        <p className={styles.homePrice}>
                          $120,000
                        </p>
                      </div>
                      <div className="col-md-8 cardtext2">
                        <div className={styles.beds}>
                          <div>
                            <p>
                              <b>2</b>
                            </p>
                            <p style={{ color: "#898686" }}>Beds</p>
                          </div>
                          <div>
                            <p>
                              <b>2</b>
                            </p>
                            <p style={{ color: "#898686" }}>Baths</p>
                          </div>
                          <div>
                            <p>
                              <b>1,650</b>
                            </p>
                            <p style={{ color: "#898686" }}>Sq.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                {/* </Link> */}
              </div>
            </div>
            <div className={styles.CarouselCard1}>
              {/* <Link to="/dashboard/detail" style={{ textDecoration: "none" }}> */}
                <Card
                  className={styles.carouselCard}
                  style={{
                    borderRadius: "25px",
                    boxShadow:
                      "0px 5px 8px #ddd",
                  }}
                >
                  <div className={styles.favorite}>
                    <img
                      src={home2}
                      alt="home2"
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
                      <p>1007 Emma Ave,</p>
                      <p>Des Monia, IA 50315</p>
                    </div>
                    <div className="col-md-4 cardtext1">
                      <div className={styles.dashboardActive}>
                        <i className="fa fa-circle" style={{ color: "#03B45B" }}></i>
                        <p style={{ marginLeft: "5px" }}>Active</p>
                      </div>
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-md-4 cardtext2">
                      <p className={styles.homePrice}>$135,000</p>
                    </div>
                    <div className="col-md-8 cardtext2">
                      <div className={styles.beds}>
                        <div>
                          <p>
                            <b>4</b>
                          </p>
                          <p style={{ color: "#898686" }}>Beds</p>
                        </div>
                        <div>
                          <p>
                            <b>2</b>
                          </p>
                          <p style={{ color: "#898686" }}>Baths</p>
                        </div>
                        <div>
                          <p>
                            <b>2,250</b>
                          </p>
                          <p style={{ color: "#898686" }}>Sq.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              {/* </Link> */}
            </div>
            <div className={styles.CarouselCard1}>
              {/* <Link to="/dashboard/detail" style={{ textDecoration: "none" }}> */}
                <Card
                  className={styles.carouselCard}
                  style={{
                    borderRadius: "25px",
                    boxShadow:
                      "0px 5px 8px #ddd",
                  }}
                >
                  <div className={styles.favorite}>
                    <img
                      src={home3}
                      alt="home3"
                      className={styles.carouselImage}
                    />
                    <div className={styles.favorite1}>
                      <span className={styles.circle}>
                        <i className="fa fa-heart" style={{ color: "white" }}></i>
                      </span>
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-sm-8 cardtext1">
                      <p>5507 SE 1st Ct,</p>
                      <p>Des Monia, IA 50315</p>
                    </div>
                    <div className="col-sm-4 cardtext1">
                      <div className={styles.dashboardActive}>
                        <i className="fa fa-circle" style={{ color: "#03B45B" }}></i>
                        <p style={{ marginLeft: "5px" }}>Active</p>
                      </div>
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-sm-4 cardtext2">
                      <p className={styles.homePrice}>$164,000</p>
                    </div>
                    <div className="col-md-8 cardtext2">
                      <div className={styles.beds}>
                        <div>
                          <p>
                            <b>3</b>
                          </p>
                          <p style={{ color: "#898686" }}>Beds</p>
                        </div>
                        <div>
                          <p>
                            <b>2</b>
                          </p>
                          <p style={{ color: "#898686" }}>Baths</p>
                        </div>
                        <div>
                          <p>
                            <b>1,250</b>
                          </p>
                          <p style={{ color: "#898686" }}>Sq.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              {/* </Link> */}
            </div>
            <div className={styles.CarouselCard1}>
              {/* <Link to="/dashboard/detail" style={{ textDecoration: "none" }}> */}
                <Card
                  className={styles.carouselCard}
                  style={{
                    borderRadius: "25px",
                    boxShadow:
                      "0px 5px 8px #ddd",
                  }}
                >
                  <div className={styles.favorite}>
                    <img
                      src={home4}
                      alt="home4"
                      className={styles.carouselImage}
                    />
                    <div className={styles.favorite1}>
                      <span className={styles.circle}>
                        <i className="fa fa-heart" style={{ color: "white" }}></i>
                      </span>
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-sm-8 cardtext1">
                      <p>916 Spring St,</p>
                      <p>Des Monia, IA 50315</p>
                    </div>
                    <div className="col-sm-4 cardtext1">
                      <div className={styles.dashboardActive}>
                        <i className="fa fa-circle" style={{ color: "#03B45B" }}></i>
                        <p style={{ marginLeft: "5px" }}>Active</p>
                      </div>
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-sm-4 cardtext2">
                      <p className={styles.homePrice}>$120,000</p>
                    </div>
                    <div className="col-md-8 cardtext2">
                      <div className={styles.beds}>
                        <div>
                          <p>
                            <b>2</b>
                          </p>
                          <p style={{ color: "#898686" }}>Beds</p>
                        </div>
                        <div>
                          <p>
                            <b>2</b>
                          </p>
                          <p style={{ color: "#898686" }}>Baths</p>
                        </div>
                        <div>
                          <p>
                            <b>1,650</b>
                          </p>
                          <p style={{ color: "#898686" }}>Sq.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              {/* </Link> */}
            </div>
            <div className={styles.CarouselCard1}>
              {/* <Link to="/dashboard/detail" style={{ textDecoration: "none" }}> */}
                <Card
                  className={styles.carouselCard}
                  style={{
                    borderRadius: "25px",
                    boxShadow:
                      "0px 5px 8px #ddd",
                  }}
                >
                  <div className={styles.favorite}>
                    <img
                      src={home3}
                      alt="home3"
                      className={styles.carouselImage}
                    />
                    <div className={styles.favorite1}>
                      <span className={styles.circle}>
                        <i className="fa fa-heart" style={{ color: "white" }}></i>
                      </span>
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-sm-8 cardtext1">
                      <p>5507 SE 1st Ct,</p>
                      <p>Des Monia, IA 50315</p>
                    </div>
                    <div className="col-sm-4 cardtext1">
                      <div className={styles.dashboardActive}>
                        <i className="fa fa-circle" style={{ color: "#03B45B" }}></i>
                        <p style={{ marginLeft: "5px" }}>Active</p>
                      </div>
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-sm-4 cardtext2">
                      <p className={styles.homePrice}>$164,000</p>
                    </div>
                    <div className="col-md-8 cardtext2">
                      <div className={styles.beds}>
                        <div>
                          <p>
                            <b>3</b>
                          </p>
                          <p style={{ color: "#898686" }}>Beds</p>
                        </div>
                        <div>
                          <p>
                            <b>2</b>
                          </p>
                          <p style={{ color: "#898686" }}>Baths</p>
                        </div>
                        <div>
                          <p>
                            <b>1,250</b>
                          </p>
                          <p style={{ color: "#898686" }}>Sq.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              {/* </Link> */}
            </div>
          </Carousel>
        </div>
      </div>
      <div className="px-5">
        <h3 className={styles.exclusiv}>Exclusive Properties</h3>
        <div className="row m-2">
          <div className="col-md-6">
            <div className={styles.houses}>
              <img src={house1} alt="house1" className={styles.house1} />
              <div className={styles.innerbutton1}>
                <button type="button" className={styles.memberbutton}>
                  Members only
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.houses}>
              <img src={house2} alt="house2" className={styles.house2} />
              <div className={styles.innerbutton1}>
                <button type="button" className={styles.memberbutton}>
                  Members only
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-2 pt-3">
          <div className="col-md-4">
            <div className={styles.houses}>
              <StaticImage
                src="../../../static/images/house3.png"
                alt="house3"
                className={styles.house3}
              />
              <div className={styles.innerbutton1}>
                <button type="button" className={styles.memberbutton}>
                  Members only
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles.houses}>
              <StaticImage
                src="../../../static/images/house4.png"
                alt="house4"
                className={styles.house4}
              />
              <div className={styles.innerbutton1}>
                <button type="button" className={styles.memberbutton}>
                  Members only
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles.houses}>
              <StaticImage
                src="../../../static/images/house5.png"
                alt="house4"
                className={styles.house4}
              />
              <div className={styles.innerbutton1}>
                <button type="button" className={styles.memberbutton}>
                  Members only
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hexogon position-relative w-100">
        <img src={hexagon1} alt="hexagon" className={styles.hexagon}  />
        <div className={styles.hexagonInner}>
          <h2 className={styles.hexagonInnerText1}>
            Join the Broker Metaverse
          </h2>
          <div className={styles.hexagonContain}>
            <h2 className={styles.hexagonInnerText2}>REDEFINE WHAT REAL</h2>
            <h2 className={styles.hexagonInnerText2}>ESTATE MEANS</h2>
            <Link to="/agentsignup">
            <button type="button" className={styles.joinbutton}>
              Join Now
            </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="px-5 testReview">
        <h3 className={styles.testimonial}>Testmonials & Reviews</h3>
        <div className={styles.carouselRes}>
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            <div>
              <div className={styles.CarouselCard2}>
                <Card className={styles.card}>
                  <i
                    className="fa fa-quote-left"
                    style={{ fontSize: "32px", color: "#0590fb" }}
                  ></i>
                  <p className={styles.cardtext}>
                    Simple and elegant design with a lots of facilities. Easy to
                    set up and provides a beautiful professional looking. Simple
                    and elegant design with a lots of facilities. Easy to set up
                    and provides a beautiful professional looking.
                  </p>
                  <div className={styles.cardimage2}>
                    <img src={james} alt="james" className={styles.mia} />
                    <h5 className={styles.cardname}>James Lucas</h5>
                  </div>
                </Card>
              </div>
            </div>
            <div className={styles.CarouselCard2}>
              <Card className={styles.card}>
                <i
                  className="fa fa-quote-left"
                  style={{ fontSize: "32px", color: "#0590fb" }}
                ></i>
                <p className={styles.cardtext}>
                  Top design and best customer support I have ever experienced. Top design and the best customer support I have experienced. Top design and the best customer support I have experienced.
                </p>
                <div className={styles.cardimage2}>
                  <img src={robert} alt="robert" className={styles.noah} />
                  <h5 className={styles.cardname}>Robert Anderson</h5>
                </div>
              </Card>
            </div>
            <div className={styles.CarouselCard2}>
              <Card className={styles.card}>
                <i
                  className="fa fa-quote-left"
                  style={{ fontSize: "32px", color: "#0590fb" }}
                ></i>
                <p className={styles.cardtext}>
                  Simple and elegant design with a lots of facilities. Easy to
                  set up and provides a beautiful professional looking. Simple
                  and elegant design with a lots of facilities. Easy to set up
                  and provides a beautiful professional looking.
                </p>
                <div className={styles.cardimage2}>
                  <img src={Mia} alt="mia" className={styles.mia} />
                  <h5 className={styles.cardname}>Mia Olivia</h5>
                </div>
              </Card>
            </div>
            <div className={styles.CarouselCard2}>
              <Card className={styles.card}>
                <i
                  className="fa fa-quote-left"
                  style={{ fontSize: "32px", color: "#0590fb" }}
                ></i>
                <p className={styles.cardtext}>
                  Top design and best customer support I have ever experienced. Top design and the best customer support I have experienced. Top design and the best customer support I have experienced.
                </p>
                <div className={styles.cardimage2}>
                  <img src={noah} alt="noah" className={styles.noah} />
                  <h5 className={styles.cardname}>Robert Noah </h5>
                </div>
              </Card>
            </div>
            <div className={styles.CarouselCard2}>
              <Card className={styles.card}>
                <i
                  className="fa fa-quote-left"
                  style={{ fontSize: "32px", color: "#0590fb" }}
                ></i>
                <p className={styles.cardtext}>
                  Top design and best customer support I have ever experienced. Top design and the best customer support I have experienced. Top design and the best customer support I have experienced.
                </p>
                <div className={styles.cardimage2}>
                  <img src={robert} alt="robert" className={styles.noah} />
                  <h5 className={styles.cardname}>Robert Anderson</h5>
                </div>
              </Card>
            </div>
            <div className={styles.CarouselCard2}>
              <Card className={styles.card}>
                <i
                  className="fa fa-quote-left"
                  style={{ fontSize: "32px", color: "#0590fb" }}
                ></i>
                <p className={styles.cardtext}>
                  Top design and best customer support I have ever experienced. Top design and the best customer support I have experienced. Top design and the best customer support I have experienced.
                </p>
                <div className={styles.cardimage2}>
                  <img src={noah} alt="noah" className={styles.noah} />
                  <h5 className={styles.cardname}>Robert Noah </h5>
                </div>
              </Card>
            </div>
            <div className={styles.CarouselCard2}>
              <Card className={styles.card}>
                <i
                  className="fa fa-quote-left"
                  style={{ fontSize: "32px", color: "#0590fb" }}
                ></i>
                <p className={styles.cardtext}>
                  Top design and best customer support I have ever experienced. Top design and the best customer support I have experienced. Top design and the best customer support I have experienced.
                </p>
                <div className={styles.cardimage2}>
                  <img src={noah} alt="noah" className={styles.noah} />
                  <h5 className={styles.cardname}>Robert Noah </h5>
                </div>
              </Card>
            </div>
            <div className={styles.CarouselCard2}>
              <Card className={styles.card}>
                <i
                  className="fa fa-quote-left"
                  style={{ fontSize: "32px", color: "#0590fb" }}
                ></i>
                <p className={styles.cardtext}>
                  Top design and best customer support I have ever experienced. Top design and the best customer support I have experienced. Top design and the best customer support I have experienced.
                </p>
                <div className={styles.cardimage2}>
                  <img src={noah} alt="noah" className={styles.noah} />
                  <h5 className={styles.cardname}>Robert Noah </h5>
                </div>
              </Card>
            </div>


          </Carousel>
        </div>
      </div>
      <Footer isLogin={storage} />
    </div>

  )
}
export default Dashboard

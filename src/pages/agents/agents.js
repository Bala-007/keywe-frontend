import React from "react";
import * as styles from '../dashboard/dashboard.module.css';
import * as style from './agent.module.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Row, Col, Container } from "react-bootstrap";
import home1 from '../../../static/images/home1.png';
import home2 from '../../../static/images/home2.png';
import home3 from '../../../static/images/home3.png';
import home4 from '../../../static/images/home4.png';
import mask from '../../../static/images/Mask Group 22.png';
import showcase1 from '../../../static/images/showcase1.png';
import showcase2 from '../../../static/images/showcase2.png';
import showcase3 from '../../../static/images/showcase3.png';
import showcase4 from '../../../static/images/showcase4.png';
import showcase5 from '../../../static/images/showcase5.png';
import johnsmith from '../../../static/images/john-smith.png';
import testmonial1 from '../../../static/images/testimonial1.png'
import testmonial2 from '../../../static/images/testimonial2.png';
import testmonial3 from '../../../static/images/testimonial3.png';
import { Link } from "gatsby";
import Layout from "../../components/Layout";
import Seo from "../../components/seo";
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

function Agents() {


    const responsive = {
        desktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <div>
            <Navbar positionRelative="true" isAgent="true" />
            <Seo title="Agents" />

            <div className="position-relative w-100 imageZipcode">
                <img src={mask} alt="mask" className="mask w-100"/>
                <div className={style.maskText}>
                    <h1 className={style.maskText2}>Making Good</h1>
                    <h1 className={style.maskText2}>things happen</h1>
                    <Link to="/agentsignup">
                    <button type="button" className={style.signup1}>Sign up</button>
                    </Link>
                </div>
            </div>
            <div className="px-5 mt-50">
            <div className={style.homes}> 
            <h3 className={style.home}>Featured Properties</h3>
                
                <div className={styles.carouselRes}>
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        // showDots={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
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
              <Link to="/dashboard/detail" style={{ textDecoration: "none" }}>
                <Card className={styles.carouselCard} style={{borderRadius:"25px",boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)"}}>
                  <div className={styles.favorite}>
                    <img src={home1} alt="home1" className={styles.carouselImage} />
                    
                  </div>
                  <div className="row m-0">
                    <div className="col-md-8 cardtext1">
                      <p>916 Spring St,</p>
                      <p>Des Monia, IA 50315</p>
                    </div>
                    <div className="col-md-4 cardtext1">
                      <div className={styles.dashboardActive}>
                      <i className="fa fa-circle" style={{color:"green"}}></i>
                        <p style={{marginLeft:"5px"}}>Active</p>
                      </div>
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-md-4">
                    <p className={style.homePrice}>$120,000</p>
                    </div>
                    <div className="col-md-8 cardtext2">
                      <div className={styles.beds}>
                        <div>
                          <p><b>2</b></p>
                          <p style={{color:"#898686"}}>Beds</p>
                        </div>
                        <div>
                          <p><b>2</b></p>
                          <p style={{color:"#898686"}}>Baths</p>
                        </div>
                        <div>
                          <p><b>1,650</b></p>
                          <p style={{color:"#898686"}}>Sq.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                </Link>
              </div>
            </div>
            <div className={styles.CarouselCard1}>
            <Link to="/dashboard/detail" style={{ textDecoration: "none" }}>
              <Card className={styles.carouselCard} style={{borderRadius:"25px",boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)"}}>
                <div className={styles.favorite}>
                  <img src={home2} alt="home2" className={styles.carouselImage} />
                 
                </div>
                <div className="row m-0">
                  <div className="col-md-8 cardtext1">
                    <p>1007 Emma Ave,</p>
                    <p>Des Monia, IA 50315</p>
                  </div>
                  <div className="col-md-4 cardtext1">
                    <div className={styles.dashboardActive}>
                    <i className="fa fa-circle" style={{color:"green"}}></i>
                      <p style={{marginLeft:"5px"}}>Active</p>
                    </div>
                  </div>
                </div>
                <div className="row m-0">
                  <div className="col-md-4">
                  <p className={style.homePrice}>$135,000</p>
                  </div>
                  <div className="col-md-8 cardtext2">
                    <div className={styles.beds}>
                      <div>
                        <p><b>4</b></p>
                        <p style={{color:"#898686"}}>Beds</p>
                      </div>
                      <div>
                        <p><b>2</b></p>
                        <p style={{color:"#898686"}}>Baths</p>
                      </div>
                      <div>
                        <p><b>2,250</b></p>
                        <p style={{color:"#898686"}}>Sq.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              </Link>
              </div>
            <div className={styles.CarouselCard1}>
            <Link to="/dashboard/detail" style={{ textDecoration: "none" }}>
              <Card className="carouselCard" style={{borderRadius:"25px",boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)"}}>
                <div className={styles.favorite}>
                  <img src={home3} alt="home3" className={styles.carouselImage} />
                 
                </div>
                <div className="row m-0">
                  <div className="col-sm-8 cardtext1">
                    <p>5507 SE 1st Ct,</p>
                    <p>Des Monia, IA 50315</p>
                  </div>
                  <div className="col-sm-4 cardtext1">
                    <div className={styles.dashboardActive}>
                    <i className="fa fa-circle" style={{color:"green"}}></i>
                      <p style={{marginLeft:"5px"}}>Active</p>
                    </div>
                  </div>
                </div>
                <div className="row m-0">
                  <div className="col-sm-4">
                  <p className={style.homePrice}>$164,000</p>
                  </div>
                  <div className="col-md-8 cardtext2">
                    <div className={styles.beds}>
                      <div>
                        <p><b>3</b></p>
                        <p style={{color:"#898686"}}>Beds</p>
                      </div>
                      <div>
                        <p><b>2</b></p>
                        <p style={{color:"#898686"}}>Baths</p>
                      </div>
                      <div>
                        <p><b>1,250</b></p>
                        <p style={{color:"#898686"}}>Sq.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              </Link></div>
            <div className={styles.CarouselCard1}>
            <Link to="/dashboard/detail" style={{ textDecoration: "none" }}>
              <Card className={styles.carouselCard} style={{borderRadius:"25px",boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)"}}>
                <div className={styles.favorite}>
                  <img src={home4} alt="home4" className={styles.carouselImage} />
                  
                </div>
                <div className="row m-0">
                  <div className="col-sm-8 cardtext1">
                    <p>916 Spring St,</p>
                    <p>Des Monia, IA 50315</p>
                  </div>
                  <div className="col-sm-4 cardtext1">
                    <div className={styles.dashboardActive}>
                    <i className="fa fa-circle" style={{color:"green"}}></i>
                      <p style={{marginLeft:"5px"}}>Active</p>
                    </div>
                  </div>
                </div>
                <div className="row m-0">
                  <div className="col-sm-4">
                  <p className={style.homePrice}>$120,000</p>
                  </div>
                  <div className="col-md-8 cardtext2">
                    <div className={styles.beds}>
                      <div>
                        <p><b>2</b></p>
                        <p style={{color:"#898686"}}>Beds</p>
                      </div>
                      <div>
                        <p><b>2</b></p>
                        <p style={{color:"#898686"}}>Baths</p>
                      </div>
                      <div>
                        <p><b>1,650</b></p>
                        <p style={{color:"#898686"}}>Sq.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              </Link>
              </div>
                    </Carousel>
                </div>
            
            </div>
            </div>
            <div className={style.johnback}>
                <div className="row m-0 ">
                    <div className="col-md-5 " >
                        <img src={johnsmith} alt="john" className={style.johnImage} />
                    </div>
                    <div className="col-md-6" style={{marginLeft:"43px"}}>
                        <div>
                            <h3 className={style.johnText}>About John Smith</h3>
                            <h4 className={style.headbelText}>At Property Real Estate company, we believe that when it comes to 
                            finding a home what's outside the front door is just as importtant as what's behind it.</h4>
                        </div>
                        <div>
                            <p className={style.johncontent}>That's why we go beyond the typical listing,by sourcing insight from local and
                            offering over 34 neighborhood map overlays, to give people a deeper understanding of what
                           living in a home and neighborhood is realy like.</p>
                        </div>
                        <div>
                            <p className={style.johncontent}>We're committed to helping them discover a place where they will love to live and where
                          they will feel more connected to the community and to each other.it's why we strive every
                          day to help build a more neighborly world.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5">
                <h3 className={style.myshow}>My Showcase</h3>
                <div className="row m-0">
                    <div className="col-md-4">
                        <div className="position-relative">
                            <img src={showcase1} alt="showcase" className={style.showcase} />
                            <div className={style.showcasetext}>
                                <div className="cardtext1 mt-0">
                                    <p className="text-white">916 Spring St,</p>
                                    <p className="text-white">Des Minines, IA 50315</p>
                                    <p className={style.homePrice1}>$120,000</p>
                                </div>
                                <div className="row m-0 mt-5 cardtext2">
                                <div className="col-md-2">
                                        <p className="text-white">2</p>
                                        <p className="text-white">Beds</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p className="text-white">2</p>
                                        <p className="text-white">baths</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p className="text-white">1,650</p>
                                        <p className="text-white">sq.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="position-relative">
                            <img src={showcase2} alt="showcase" className={style.showcase} />
                            <div className={style.showcasetext}>
                            <div className="cardtext1 mt-0">
                                    <p className="text-white">916 Spring St,</p>
                                    <p className="text-white">Des Minines, IA 50315</p>
                                    <p className={style.homePrice1}>$120,000</p>
                                </div>
                                <div className="row m-0 mt-5 cardtext2">
                                <div className="col-md-2">
                                        <p className="text-white">2</p>
                                        <p className="text-white">Beds</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p className="text-white">2</p>
                                        <p className="text-white">baths</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p className="text-white">1,650</p>
                                        <p className="text-white">sq.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">

                        <div className="position-relative">
                            <img src={showcase3} alt="showcase" className={style.showcase} />
                            <div className={style.showcasetext}>
                            <div className="cardtext1 mt-0">
                                    <p className="text-white">916 Spring St,</p>
                                    <p className="text-white">Des Minines, IA 50315</p>
                                    <p className={style.homePrice1}>$120,000</p>
                                </div>
                                <div className="row m-0 mt-5 cardtext2">
                                    <div className="col-md-2">
                                        <p className="text-white">2</p>
                                        <p className="text-white">Beds</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p className="text-white">2</p>
                                        <p className="text-white">baths</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p className="text-white">1,650</p>
                                        <p className="text-white">sq.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row m-0 mb-4">
                    <div className="col-md-6">
                        <div className="position-relative">
                            <img src={showcase4} alt="showcase" className={style.showcase} />
                            <div className={style.showcasetext}>
                            <div className="cardtext1 mt-0">
                                    <p className="text-white">916 Spring St,</p>
                                    <p className="text-white">Des Minines, IA 50315</p>
                                    <p className={style.homePrice1}>$120,000</p>
                                </div>
                                <div className="row m-0 mt-5 cardtext2">
                                <div className="col-md-2">
                                        <p className="text-white">2</p>
                                        <p className="text-white">Beds</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p className="text-white">2</p>
                                        <p className="text-white">baths</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p className="text-white">1,650</p>
                                        <p className="text-white">sq.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="position-relative">
                            <img src={showcase5} alt="showcase" className={style.showcase} />
                            <div className={style.showcasetext}>
                            <div className="cardtext1 mt-0">
                                    <p className="text-white">916 Spring St,</p>
                                    <p className="text-white">Des Minines, IA 50315</p>
                                    <p className={style.homePrice1}>$120,000</p>
                                </div>
                                <div className="row m-0 mt-5 cardtext2">
                                    <div className="col-md-2">
                                        <p className="text-white">2</p>
                                        <p className="text-white">Beds</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p className="text-white">2</p>
                                        <p className="text-white">baths</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p className="text-white">1,650</p>
                                        <p className="text-white">sq.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.signupimage}>
         
                <div className="container signtext">
                    <div className="row m-0 w-100">
                        <div className="col-md-9">
                            <h3 className={style.signText}>Sign up as an agent on Keywe.</h3>
                            <p className={style.thisText}>This text is for sample purposes only, it will be replaced with the actual later.</p>
                        </div>
                        <div className="col-md-3 text-center align-self-center">
                        <Link to="/agentsignup">
                            <button type="button" className={style.signup}>Sign up Today</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.bgtestimonial}>
                <h3 className={style.reviewtest}>Testmonials</h3>
                <div className={style.testmonial} >
                    <Container>
                <Row>
                <Col md={4}>
                    <Card className={style.testCard}>
                        <div>
                        <img src={testmonial1} alt="quotes" className={style.testImage} />
                        <p className={style.testtext}>We have chosen to work extensively with HomePress because of their On-the-Job Training program and other employer</p>
                        <h6 className={style.cardname}>Madison Estrada</h6>
                       <span className={style.quote}><i className='fa fa-quote-left' style={{fontSize:"30px", color:"#0590fb"}}></i></span> 
                        </div>
                    </Card>
                    </Col>
                    <Col md={4}>
                    <Card className={style.testCard}>
                        <div>
                            <img src={testmonial2} alt="quotes" className={style.testImage} />
                            <p className={style.testtext}>Top design and best customer support I have ever experienced. Top design and the best customer support I have ever experienced.Top design and the best customer support I have ever experienced.Top design and the best customer support </p>
                            <h6 className={style.cardname}>Joe Williams</h6>
                            <span className={style.quote}><i className='fa fa-quote-left' style={{fontSize:"30px", color:"#0590fb"}}></i></span> 
                        </div>
                    </Card>
                    </Col>
                    <Col md={4}>
                    <Card className={style.testCard}>
                        <div>
                            <img src={testmonial3} alt="quotes" className={style.testImage} />
                            <p className={style.testtext}>HomePress WP comes upwith result that are actually implementable. That is their strength compared to other cunsulting companies. HomePress WP comes upwith result that are actually implementable.</p>
                            <h6 className={style.cardname}>Arthur Jensen</h6>
                            <span className={style.quote}><i className='fa fa-quote-left' style={{fontSize:"30px", color:"#0590fb"}}></i></span> 
                        </div>
                    </Card>
                    </Col>
                    </Row>
                    </Container>
                </div>
            </div>
          <Footer />

        </div>

    )
}
export default Agents;
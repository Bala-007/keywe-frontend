import { navigate } from '@reach/router';
import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import * as style1 from '../../pages/dashboard/detail.module.css';
import { Card } from "react-bootstrap";
export default function SimilarCarousel(props) {
    const {similar}=props
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
    const handleNavigation=(id)=>{
        console.log(id)
        navigate(`/dashboard/detail/${id}`)
    }
    return (
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
            containerClass="carousel-container simlilar"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            {similar && similar.map((data, index) => {
                return (
                    <div className={style1.simhead} key={index} onClick={() => handleNavigation(data._id)}>
                        <div className="row">
                            <div className="col">
                                <div>
                                    <Card className={style1.simheadCard}>
                                        <div style={{ padding: "10px" }}>
                                            <img src={data.thumbnail_image} alt="image95" height={100} width={180} className={style1.propImage} />
                                            <div className={style1.simproperties}>
                                                <p>{data.address.split(',').slice(0).shift()}</p>
                                                <p>{data.address.split(",").slice(1).join(",")}</p>
                                                <p style={{ fontFamily: "DejaVuSansBold" }}>${data.price.$numberDecimal}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            })}

        </Carousel>
    )
}

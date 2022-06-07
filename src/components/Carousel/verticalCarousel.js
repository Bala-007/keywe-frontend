import React, { useState, useEffect } from "react";
import * as styles from "../../pages/dashboard/dashboard.module.css";
import entrance from "../../../static/images/entrance.png";
import entrance2 from "../../../static/images/entrance2.png";
import entrance3 from "../../../static/images/entrance3.png";
import entrance4 from "../../../static/images/entrance4.png";
import searchIcon from "../../../static/images/Icon feather-search.png"
import { Link, navigate } from "gatsby";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './verticalCarousel.css'
import { usePlacesWidget } from "react-google-autocomplete";
import { useDispatch } from "react-redux";
import { dashboardGoogleSearch, dashboardPage, dashboardSearch } from "../../state/dashboardViewAction";



// import { useHistory } from "react-router-dom";

function VerticalCarousel(props) {
    const dispatch = useDispatch()

    const handleSubmit = () => {
        // let search = ref.current.value.split(',')[0]
        dispatch(dashboardSearch({name:ref.current.value.split(',')[0],displayName:ref.current.value}))
        dispatch(dashboardPage({ map: false, list: true, image: false }))
        navigate(
            "/dashboard",
        )
    }

    const { ref } = usePlacesWidget({
        apiKey: 'AIzaSyAbQxNOlxvLU3I_XZAluQeFBAPrj6Ua2Jk',
        onPlaceSelected: (places) => {
            console.log("condition", places)
            if(places.geometry !== undefined){
                let data = {
                    lat: places.geometry.location.lat(),
                    lng: places.geometry.location.lng(),
                    zoom: 13
                }
                dispatch(dashboardGoogleSearch(data))
                var text=places.formatted_address.split(',')[0]
            }
            handleSubmit()

        },
        options: {
            types: ["(regions)"],
            componentRestrictions: { country: "us" },
        },
    });


    return (

        <div className="position-relative w-100 imageZipcode" >

            <Carousel axis="vertical" style={{ height: '600px !important' }}>
                <img
                    src={entrance}
                    alt="entrance"
                    className="entrance w-100"
                    height="600"
                />
                <img
                    src={entrance2}
                    alt="entrance"
                    className="entrance w-100"
                    height="600"
                />
                <img
                    src={entrance3}
                    alt="entrance"
                    className="entrance w-100"
                    height="600"
                />
                <img
                    src={entrance4}
                    alt="entrance"
                    className="entrance w-100"
                    height="600"
                />
            </Carousel>


            <div className={styles.innerImageContent}>
                <h2 className={styles.dashhead}>Find your perfect home</h2>
                <div className={styles.search1}>
                    <input
                        ref={ref}
                        className={styles.search}
                        placeholder="Enter an address, City or Zip code"
                    ></input>

                    <div className={styles.searchIcon}>
                        <img src={searchIcon} alt="Icon feather-search.png" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>

    )
}
export default VerticalCarousel
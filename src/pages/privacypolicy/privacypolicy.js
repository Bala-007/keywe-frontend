import React, { useState, useEffect } from "react";
import * as styles from "./privacy.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import { privacyPolicy } from '../../components/Api/ListingApi';



function PrivacyPolicy() {
    const [privacy, setPrivacy] = useState("")
    const [changeData, setChangeData] = useState()
    

    useEffect(async () => {
        await listingApis();

    }, [])
    const listingApis = async () => {


        await privacyPolicy("privacy-policy").then(async (res) => {
            setPrivacy(res.data.data)
            console.log("privacy-policy", res)
        })
    }

    return (
        <Layout>
            <div className="container terms">
                <div className="row">
                    <div className="col-lg-12" dangerouslySetInnerHTML={{ __html: privacy.content }} />
                        
                   
                </div>
            </div>
        </Layout>
    )
}
export default PrivacyPolicy
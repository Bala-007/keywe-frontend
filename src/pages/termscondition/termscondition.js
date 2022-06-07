import React, { useEffect, useState } from "react";
import * as styles from "./termscondition.module.css";
import Layout from "../../components/Layout";
import { termsCondition } from '../../components/Api/ListingApi';



function TermsCondition() {

    const [condition, setCondition] = useState("")

    useEffect(async () => {
        await listingApis();

    }, [])
    const listingApis = async () => {
        await termsCondition("terms-and-conditions").then(async (res) => {
            setCondition(res.data.data)
            console.log("termscondion",res)
        })
    }


    return (
        <Layout>
            <div className="container terms">
                <div className="row">
                    <div className="col-lg-12" dangerouslySetInnerHTML={{ __html: condition.content }}>
                        
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default TermsCondition
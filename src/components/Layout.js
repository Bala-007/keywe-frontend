import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    const [storage, setStorage] = useState(false);
    const [userType, setUserType] = useState("");
    //console.log("--userType--",userType);

    useEffect(() => {
        const storedData = localStorage.getItem("userInfo");
        if (!storedData) {
            console.log('Local storage is empty');
            setStorage(false);
        } else {
            setStorage(true);
            let loggedUserType = JSON.parse(localStorage.getItem('userInfo')).userType;
            setUserType(loggedUserType);
        }
    }, []);
    return (
        <div className="container-fluid" style={{ background: "#f2f2f2", padding: '0px' }}>
            {userType == "agent" ? null : <Navbar isLogin={storage} />}
            <div className="row m-0" style={{ minHeight: "100vh" }}>
                {storage ? <Sidebar userType={userType} /> : null}
                <div className="col-xl-10 col-md-10 col-sm-10" >
                    {children}
                </div>
            </div>
            <Footer isLogin={storage} />
        </div>
    )
}




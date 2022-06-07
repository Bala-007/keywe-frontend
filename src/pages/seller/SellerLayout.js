import React from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
import '../../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SellerNavbar from "./SellerNavbar";

export default function SellerLayout({children}){
    return(
        <div>
        <div className="layout">
            <SellerNavbar />
      
        </div>
        <div>
        {/* <Footer /> */}
        </div>
            {children}
            {/* <Footer /> */}
        </div>
    )
}
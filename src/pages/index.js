import React from "react"
import "react-multi-carousel/lib/styles.css"
import Layout from "../components/Layout"
import Dashboard from "../pages/dashboard/dashboard";
import "antd/dist/antd.css"

import "font-awesome/css/font-awesome.min.css"
import App from "./app";

function Index() {
  console.log(process.env.API_IMAGE_URL);
  return (
    <section>
     
      <App />
    </section>
  )
}
export default Index
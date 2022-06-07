import React from "react"
import { navigate } from "gatsby"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    const storedData =localStorage.getItem("userInfo") ;
  if (!storedData) {
    navigate("/signin")
    return null
  }
  return <Component {...rest} />
}
export default PrivateRoute
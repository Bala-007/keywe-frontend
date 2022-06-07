import React, { useState } from "react"

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar"

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa"
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi"
import { RiPencilLine } from "react-icons/ri"
import { BiCog } from "react-icons/bi"
import { Link } from "gatsby"
//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css"
import "../pages/seller/SideBarNav.css"
import { blue } from "@mui/material/colors"

const SideNavBar = () => {
  const [menuCollapse, setMenuCollapse] = useState(false)

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(true) : setMenuCollapse(false)
  }

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                <Link to="/seller/ownedProperties" style={{ color: "blue" }}>
                  Owned Properties
                </Link>
              </MenuItem>
              <MenuItem icon={<FaList />}>
                <Link
                  to="/seller/listproperty"
                  style={{}}
                  onClick={menuIconClick}
                >
                  Listed Properties
                </Link>
              </MenuItem>
              <MenuItem icon={<FaRegHeart />}>
                <Link to="/seller/myAgent" style={{}}>
                  My Agent
                </Link>
              </MenuItem>
              <MenuItem icon={<RiPencilLine />}>
                <Link to="/seller/property" style={{}}>
                  Tours
                </Link>
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  )
}

export default SideNavBar

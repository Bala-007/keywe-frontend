import React, { useState } from "react"
import { Link } from "gatsby"
import { ProSidebar, Menu, MenuItem, SidebarContent } from "react-pro-sidebar"
import { FaShoppingBag, FaUserTie, FaRegBell } from "react-icons/fa"
import { FiMessageSquare, FiUserCheck } from "react-icons/fi"
import { TiEyeOutline } from "react-icons/ti"
import "../components/newside.css"
const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const [isBlue, setIsBlue] = useState(false)
  return (
    <ProSidebar image={false} rtl={rtl} collapsed={collapsed}>
      <SidebarContent className="sideBarList">
        <Menu onClick={() => setIsBlue(!isBlue)} active={true}>
          <MenuItem
            active={true}
            icon={
              <FaShoppingBag
              // fill={isBlue ? "blue" : "grey"}
              />
            }
          >
            Buyers
          </MenuItem>
          <MenuItem icon={<FaUserTie />}>
            Sellers
            <Link to="/seller/ownedProperties" />
          </MenuItem>
          <MenuItem icon={<FaRegBell />}>
            {" "}
            Notification
            <Link to="/seller/ownedProperties" />
          </MenuItem>
          <MenuItem icon={<FiMessageSquare />}>
            {" "}
            Messages
            <Link to="/seller/ownedProperties" />
          </MenuItem>
          <MenuItem icon={<FiUserCheck />}>
            {" "}
            Find Agents
            <Link to="/seller/ownedProperties" />
          </MenuItem>
          <MenuItem icon={<TiEyeOutline />}>
            {" "}
            Tours
            <Link to="/seller/ownedProperties" />
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  )
}

export default Aside

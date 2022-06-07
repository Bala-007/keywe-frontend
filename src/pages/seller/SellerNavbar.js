import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React from "react"
// import * as styles from '../pages/dashboared/dashboard.module.css'
import * as styles from "./sellerProp.module.css"
import profileImage from "../../../static/images/profile_1.png"

import { Icon } from "@iconify/react"

export default function SellerNavbar() {
  return (
    <nav>
      <div className="row">
        <div className="col-lg-12 col-xl-12 col-md-12">
          <div className={styles.navbarList}>
            <div className={styles.logo}>
              <StaticImage src="../../static/images/llogo.png" alt="logo" />
            </div>
            <div className={styles.link}>
              <Link to="/"></Link>
              <Link to="/seller/findagent" className={styles.LinkList}>
                Find An Agent
              </Link>
              <Link to="/seller/sell" className={styles.LinkList}>
                Sell My Home
              </Link>
            </div>
            <div className={styles.profileImage}>
              <img src={profileImage} alt="../../static/images/profile_1.png" />
            </div>
            <Icon icon="akar-icons:chevron-down" className={styles.dropIcon} />
          </div>
        </div>
      </div>
    </nav>
  )
}

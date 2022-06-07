import React, { useEffect, useState } from "react"
import { Icon } from "@iconify/react";
import * as styles from './header.module.css';
import firebase from 'gatsby-plugin-firebase';
import { Link, navigate } from "gatsby";
import { profileView } from "./Api/ListingApi"
import user from "../../static/images/james.png"
import logo from "../../static/images/logo.png"
import AvatarImage from "./Avatar/avatarImage";
import { calenderResponse } from "../state/calenderPopUp";
import { useSelector, useDispatch } from "react-redux";



export default function Sidebar({ userType }) {
  const [menu, setMenu] = useState([])
  const dispatch = useDispatch()
  //console.log("--userType--",userType);
  const [showProfile, setShowProfile] = useState(false);
  const userDetails = useSelector(state => state.user.userDetail);
  console.log("--userDetails--", userDetails);
  const handleLogoutFirebase = async () => {
    await firebase
      .auth()
      .signOut()
    localStorage.removeItem("persist:root");
    localStorage.removeItem("userInfo");
    localStorage.removeItem('userId')
    navigate("/");
    dispatch(calenderResponse([]))

    //history.push("/signin");
  }
  const showProfilePopup = () => {
    setShowProfile(!showProfile);
  }
  useEffect(() => {
    if (userType == "agent") {
      var menuArr = [
        {
          id: 1,
          name: "Buyers",
          path: "/buyers",
          icon: (
            <img className="navimage" alt="buyerIcon" src="/images/buyerIcon.png" />,
            <img className="navimage" alt="buyerIcon" src="/images/buyeractive.png" />
          ),
        },
        {
          id: 2,
          name: "Sellers",
          path: "/sellers",
          icon: (
            <img className="navimage" alt="sellerIcon" src="/images/sellerIcon.png" />,
            <img className="navimage" alt="sellerIcon" src="/images/selleractive.png" />
          ),
        },
        {
          id: 3,
          name: "My Referrals",
          path: "/referralFee",
          icon: (
            <img className="navimage" alt="referralIcon" src="/images/referralfeeicon.png" />,
            <img className="navimage" alt="referralIcon" src="/images/referralfeeicon1.png" />
          ),
        },
        {
          id: 4,
          name: "Notifications",
          path: "/notifications",
          icon: (
            <img className="navimage" alt="buyerIcon" src="/images/notification.png" />,
            <img className="navimage" alt="buyerIcon" src="/images/notificationactive.png" />
          ),
        },
        {
          id: 5,
          name: "Messages",
          path: "/messages",
          icon: (
            <img className="navimage" alt="buyerIcon" src="/images/messageIcon.png" />,
            <img className="navimage" alt="buyerIcon" src="/images/messageactive.png" />
          ),
        },
        {
          id: 6,
          name: "Find Agents",
          path: "/findagent",
          icon: (<img className="navimage" alt="buyerIcon" src="/images/findagent.png" />,
            <img className="navimage" alt="buyerIcon" src="/images/findagentactive.png" />
          ),
        },
        {
          id: 7,
          name: "Tours",
          path: "/agenttour",
          icon: (
            <img className="navimage" alt="buyerIcon" src="/images/tourIcon.png" />,
            <img className="navimage" alt="buyerIcon" src="/images/touractive.png" />
          ),
        },
        {
          id: 8,
          name: "Network",
          path: "/network",
          icon: (
            <img className="navimage" alt="buyerIcon" src="/images/network.png" />,
            <img className="navimage" alt="buyerIcon" src="/images/networkactive.png" />
          ),
        },

      ]
      setMenu(menuArr)
    } else if (userType == "user") {
      var menuArr = [
        // {
        //   id: 1,
        //   name: "Dashboard",
        //   path: "/dashboard",
        //   icon: <AppstoreOutlined />,
        // },
        {
          id: 2,
          name: "Owned Properties",
          path: "/ownedproperties",
          icon: (
            <img className="navimage" alt="buyerIcon" src="/images/ownedproperty.png" />,
            <img className="navimage" alt="buyerIcon" src="/images/ownedpropertyactive.png" />
          ),
        },
        {
          id: 3,
          name: "Listed Properties",
          path: "/listproperty",
          icon: (
            <img className="navimage" alt="buyerIcon" src="/images/listproperty.png" />,
            <img className="navimage" alt="buyerIcon" src="/images/listpropertyactive.png" />
          ),
        },
        {
          id: 4,
          name: "Interested Properties",
          path: "/intrestedproperty",
          icon: (
            <img className="navimage" alt="buyerIcon" src="/images/intrestedproperty.png" />,
            <img className="navimage" alt="buyerIcon" src="/images/intrestedpropertyactive.png" />
          ),
        },
        {
          id: 5,
          name: "My Agents",
          path: "/myAgent",
          icon: (
            <img className="navimage" alt="buyerIcon" src="/images/myagent.png" />,
            <img className="navimage" alt="buyerIcon" src="/images/myagentactive.png" />
          ),
        },
        // { id: 6, name: 'Tours', path: '/seller/property', icon: <i className="fa fa-eye"></i> },
        {
          id: 6,
          name: "Tours",
          path: "/tours",
          icon: (
            <img className="navimage" alt="buyerIcon" src="/images/tourIcon.png" />,
            <img className="navimage" alt="buyerIcon" src="/images/touractive.png" />
          ),
        },

      ]
      setMenu(menuArr)
    }
  }, [])
  //console.log(menu);

  const [profile, setProfile] = useState("");
  useEffect(() => {
    async function fetchData() {
      await listingApis();
    }
    fetchData()

  }, [])
  const listingApis = async () => {
    let firebaseUid = JSON.parse(localStorage.getItem('userInfo'))
    console.log(firebaseUid)
    await profileView(firebaseUid.uid).then(async (res) => {
      console.log('agent profile....', res.data.data)
      setProfile(res.data.data)
    })
  }

  return (
    <div className="col-xl-2  col-md-2 col-sm-2">
      <div >
        <nav>
          {userType == "agent" ? (
            <Link to="/">
              <div style={{ padding: "25px 40px" }}>
                <img src={logo} alt="logo" />
              </div>
            </Link>
          ) : null}
          <div
            className="nav flex-column nav-pills py-3"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            {menu.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className="nav-links"
                activeStyle={{
                  background: "#fff",
                  color: "#0490fb",
                  padding: "10px 20px",
                  borderRadius: "30px",
                  textDecoration: "none",
                  boxShadow: "1px 2px 3px 2px lightgrey",
                  fontWeight: 900,
                }}>
                <span style={{ fontSize: "20px", padding: "0px 20px 0 10px" }}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </div>
          {userType == "agent" ? (
            <div style={{ marginTop: "200px" }}>
              <div style={{ display: "flex", flexDirection: "row", padding: "0px 20px", alignItems: "center", }}>
                <div style={{ padding: "0px 7px" }}>
                  {userDetails.img ?
                    <img alt="no_image" src={process.env.API_IMAGE_URL + userDetails.img} style={{ borderRadius: "7px", width: "50px", height: "50px" }} />
                    : <>{userDetails.name ? <div style={{ width: '88px', height: '88px' }}><AvatarImage fontSize={'40px'} data={userDetails.name ? userDetails.name : ''} /></div>
                      : null}</>
                  }
                </div>
                <>
                  <div style={{ padding: "0px 7px" }}>
                    <div className={styles.sidebarlogout}>
                      <div style={{ fontSize: "15px", padding: "5px 0px" }} className="text-capitalize">
                        {profile.name}
                      </div>
                      <div className="position-relative">

                        <Icon icon="akar-icons:chevron-down" className={styles.dropIcon} onClick={showProfilePopup} />
                        {showProfile ? (
                          <div className='col-lg-12 col-xl-12 col-md-12 m-0 logout-dropdown' id="logout-dropdown">
                            <Link to="/" className={`userLogout ${styles.Link}`} onClick={handleLogoutFirebase} >Logout</Link>
                          </div>
                        ) : null}

                      </div>
                    </div>

                    <Link to="/viewprofile">
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#0d6efd",
                          cursor: "pointer",
                        }}
                      >
                        View Profile <i className="fa fa-eye"></i>
                      </div>
                    </Link>
                  </div>
                </>
              </div>
            </div>
          ) : null}
        </nav>
      </div>
    </div>
  )
}

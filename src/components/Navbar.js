import { Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useContext, useEffect, useState } from "react";
import * as styles from './header.module.css';
import firebase from 'gatsby-plugin-firebase';
// import { AuthContext } from '../context/auth';
// import * as styles from "./sellerProp.module.css"
import profileImage from "../../static/images/profile_1.png";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { profileView } from './Api/ListingApi';
import * as styles2 from "../pages/seller/profileDetails.module.css";
import AvatarImage from "./Avatar/avatarImage";
import { useSelector, useDispatch } from "react-redux";
import { singlePropertyClear } from "../state/detailSlice";
import { logout } from "../state/userSlice";
import { calenderResponse } from "../state/calenderPopUp";

export default function Navbar(props) {
    const [profile, setProfile] = useState("");
    const history = useHistory();
    const [showProfile, setShowProfile] = useState(false);
    const dispatch = useDispatch()
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
        //history.push("/signin");
        dispatch(singlePropertyClear())
        dispatch(logout())
        dispatch(calenderResponse([]))
        setShowProfile(false)
    }

    const showProfilePopup = () => {
        setShowProfile(!showProfile);
    }

    console.log('props datas', props);

    useEffect(() => {
        async function fetchData() {
            await listingApis();
        }
        fetchData()
    }, [])
    const listingApis = async () => {
        let firebaseUid = JSON.parse(localStorage.getItem('userInfo'))
        if (firebaseUid !== null) {
            console.log(firebaseUid)
            await profileView(firebaseUid.uid).then(async (res) => {
                console.log('profileview', res.data.data)
                setProfile(res.data.data)
            })
        }
    }
    // console.log("--isLogin---", props.isLogin);
    // console.log("--isAgent---", props.isAgent);
    return (
        <nav className={props.positionRelative ? '' : styles.navbarBorder}>
            <div className='row m-0'>
                <div className='col-lg-2 col-xl-2 col-md-2 logoprofile'>
                    <Link to={"/"}>
                        <div className={styles.logo}>
                            {props.isAgent ?
                                <img className="register-logo" src="/images/agentlogo.png" alt="logo" style={{ marginTop: "14px" }} /> :
                                <img className="register-logo" src="/images/llogo.png" alt="logo" />
                            }
                        </div>
                    </Link>
                </div>
                <div className='col-lg-10 col-xl-10 col-md-10 Headprofile'>
                    <div className={props.positionRelative ? styles.navbarDashboard : styles.navbar}>
                        <div className={styles.link} style={{ display: "flex", alignItems: 'center' }}>
                            {/* {!user ?  */}
                            {!props.isLogin ?
                                <>
                                    {props.isAgent || props.isAgent !== undefined ?
                                        <>

                                            <Link to="#" className={props.positionRelative ? styles.LinkDashboard : styles.Link}>
                                                Listings<Icon icon="akar-icons:chevron-down" className={styles.dropIcon} />
                                            </Link>
                                            <Link to="#" className={props.positionRelative ? styles.LinkDashboard : styles.Link}>
                                                Property<Icon icon="akar-icons:chevron-down" className={styles.dropIcon} />
                                            </Link>
                                        </>
                                        :
                                        <>{!props.isLoginOf ? <>{props.positionRelative ? <Link to="/agents" className={props.positionRelative ? styles.LinkDashboard : styles.Link}>Agents</Link> : null}
                                            <Link to="/signin" className={props.positionRelative ? styles.LinkDashboard : styles.Link} >Sign In</Link><Link to="/contact" className={props.positionRelative ? styles.LinkDashboard : styles.Link} >Contact</Link></> : null}
                                        </>
                                    }
                                    {/* {props.positionRelative &&
                                        <Link to="/contact" className={props.positionRelative ? styles.LinkDashboard : styles.Link} >Contact</Link>
                                    } */}
                                    {props.positionRelative === "true"  && props.isLoginOf &&
                                        <>
                                            <Link to="/contact" className={props.positionRelative ? styles.LinkDashboard : styles.Link} >Contact</Link>
                                            <Link to={userDetails.role !== 'agent' ? "/findagentseller" : '/findagent'} className={styles.Link}>
                                                Find an Agent
                                            </Link>
                                            <Link to="/sellmyhome" className={styles.Link}>
                                                Sell My Home
                                            </Link>
                                            <Link to={userDetails.role !== 'agent' ? "/ProfileOverview/" : "/viewprofile"} className={styles.ProfileImg}>
                                                {/* <img src={profileImage} alt="../../static/images/profile_1.png" /> */}
                                                {userDetails.img ?
                                                    <img src={process.env.API_IMAGE_URL + userDetails.img} alt="kimberly" className={styles2.kimberlyimage} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                                    : <>{userDetails.name ? <div style={{ width: '58px', height: '58px' }}><AvatarImage fontSize={'25px'} data={userDetails.name ? userDetails.name : ''} /></div>
                                                        : null}</>
                                                }
                                            </Link>
                                            <Icon icon="akar-icons:chevron-down" className={styles.dropIcon} onClick={showProfilePopup} />
                                            {showProfile ?
                                                <div className='col-lg-12 col-xl-12 col-md-12 m-0' id="profile-dropdown">
                                                    <Link to="/signin" className={`userLogout ${styles.Link}`} onClick={handleLogoutFirebase} >Logout</Link>
                                                </div>
                                                :
                                                null
                                            }
                                        </>
                                    }

                                </>
                                :
                                <>
                                    <Link to={userDetails.role !== 'agent' ? "/findagentseller" : '/findagent'} className={styles.Link}>
                                        Find an Agent
                                    </Link>
                                    <Link to="/sellmyhome" className={styles.Link}>
                                        Sell My Home
                                    </Link>
                                    <Link to="/ProfileOverview/" className={styles.ProfileImg}>
                                        {/* <img src={profileImage} alt="../../static/images/profile_1.png" /> */}
                                        {userDetails.img ?
                                            <img src={process.env.API_IMAGE_URL + userDetails.img} alt="kimberly" className={styles2.kimberlyimage} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                            : <>{userDetails.name ? <div style={{ width: '58px', height: '58px' }}><AvatarImage fontSize={'25px'} data={userDetails.name ? userDetails.name : ''} /></div>
                                                : null}</>
                                        }
                                    </Link>
                                    <Icon icon="akar-icons:chevron-down" className={styles.dropIcon} onClick={showProfilePopup} />
                                    {showProfile ?
                                        <div className='col-lg-12 col-xl-12 col-md-12 m-0' id="profile-dropdown">
                                            <Link to="/" className={`userLogout ${styles.Link}`} onClick={handleLogoutFirebase} >Logout</Link>
                                        </div>
                                        :
                                        null
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
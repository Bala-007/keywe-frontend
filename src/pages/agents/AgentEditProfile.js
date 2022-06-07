import React, { useState, useEffect } from "react"
import * as style from "./agent.module.css"
import Layout from "../../components/Layout"
import { FaPencilAlt, FaPlus } from "react-icons/fa"
import agentProfile from "../../../static/images/AgentProfile.png"
import Seo from "../../components/seo"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { BiQuestionMark } from "react-icons/bi"
import CreateGroupPopup from "../../components/popup/CreateGroupPopup"
import JoinGroupPopup from "../../components/popup/JoinGroupPopup"
import { SocialMediaIconsReact } from "social-media-icons-react"
import { Button } from "react-bootstrap"
import { profileUpdate } from "../../components/Api/formApi"
import { useSelector, useDispatch } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { stateList, uploadFile } from "../../components/Api/ListingApi"
import AvatarImage from "../../components/Avatar/avatarImage"
import { userResponse } from "../../state/userSlice"
import { locale } from "moment"
import { ConstructionOutlined } from "@mui/icons-material"
import { v4 as uuidv4 } from "uuid"

function AgentEditProfile() {
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const toggleShowJoin = () => setShowJoin(p => !p)
  const toggleShowCreate = () => setShowCreate(p => !p)
  const userDetails = useSelector(state => state.user.userDetail)
  const [stateDetails, setStateDetails] = useState([])
  console.log("--userDetails--", userDetails)
  const dispatch = useDispatch()
  const [picture, setPicture] = useState(false)
  const [imgData, setImgData] = useState({})
  const [userState, setuserState] = useState({})

  const [updateProfile, setUpdateProfile] = useState({
    name: userDetails.name,
    phone_number: userDetails.phone_number,
    address: userDetails.address,
    address_city: userDetails.address_city,
    address_state: userDetails.address_state,
    address_county: userDetails.address_county,
    address_postalcode: "",
    facebook_link: null,
    instagram_link: null,
    linkedin_link: null,
    twitter_link: null,
    img: userDetails.img,
  })
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(),  updateProfile,
      address_state:userDetails.address_state }
  ])
console.log("inputFields", inputFields)
  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(),updateProfile,
      address_state: userDetails.address_state }])
  }

  console.log("InputFields", inputFields)
  const profileApis = async (uid, data) => {
    console.log("userProfileUpdate", data)
    profileUpdate(uid, data).then(res => {
      console.log(res)
      dispatch(userResponse(res.data.data))
      toast.success("Updated Successfully", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      })
      setPicture(false)
    })
  }
  const handleChange = e => {
    let name = e.target.name
    let value = e.target.value
    setUpdateProfile({ ...updateProfile, [name]: value })
  }

  const handleSubmit = async () => {
    let uid = localStorage.getItem("userInfo")
    uid = JSON.parse(uid)
    if (userDetails.img !== updateProfile.img) {
      delete updateProfile["img"]
      await uploadFile(imgData).then(res => {
        let data = { ...updateProfile, ...{ img: res.data.data } }
        setUpdateProfile({ ...updateProfile, img: res.data.data })
        profileApis(uid.uid, data)
      })
    } else {
      profileApis(uid.uid, updateProfile)
    }
  }

  useEffect(async () => {
    await stateApis()
  }, [])

  const stateApis = async () => {
    await stateList().then(res => {
      setStateDetails(res.data.data)
      // setuserState(res.data.data)

      // console.log("userState", userState)
    })
  }
  console.log("satateDetails", stateDetails)

  //   useEffect (()=>{
  //     stateDetails.map((data)=>setuserState(data))
  //   })
  // console.log("userState", userState)
  const onChangePicture = e => {
    // if (e.target.files[0]) {
    //   console.log("picture: ", e.target.files);
    //   setPicture(e.target.files[0]);
    //   const reader = new FileReader();
    //   reader.addEventListener("load", () => {
    //     setUpdateProfile({...updateProfile,img:reader.result})
    //   });
    //   reader.readAsDataURL(e.target.files[0]);
    // }
    const formData = new FormData()
    formData.append("name", e.target.files[0].name)
    formData.append("file", e.target.files[0])
    setImgData(formData)
    setPicture(true)
    setUpdateProfile({
      ...updateProfile,
      img: URL.createObjectURL(e.target.files[0]),
    })
  }
  // useEffect(()=>{
  //   stateDetails.map((data,i)=>{
  //     console.log("index", stateDetails[i].name)

  //   })
  // })

  return (
    <Layout>
      <div>
        <ToastContainer />
        <div>
          <CreateGroupPopup show={showCreate} toggleShow={toggleShowCreate} />
          <JoinGroupPopup show={showJoin} toggleShow={toggleShowJoin} />
          {/* <button onClick={()=>console.log('updateprofile',updateProfile)}>click</button> */}
          <p className={style.proText}>Edit Profile</p>
          <div className={style.profilePanel}>
            <div>
              {updateProfile.img ?
                <img src={picture? updateProfile.img :process.env.API_IMAGE_URL+updateProfile.img} alt="agentProfile" className={style.profilelImage} />
                : <>{updateProfile.name ? <div style={{ width: '98px', height: '98px' ,position:"relative"}}><AvatarImage fontSize={'38px'} data={updateProfile.name ? updateProfile.name : ''} /></div>
                  : null}</>
              }

            </div>

            <div className={style.editIcon}>
              <span className={style.iconBack}>
                <FaPencilAlt
                  fill="#fff"
                  style={{ width: "19px", height: "19px", marginTop: "4px" }}
                />
                <input
                  className="choosefileimage"
                  type="file"
                  id="myfile"
                  onChange={onChangePicture}
                  name="myfile"
                ></input>
              </span>
            </div>
          </div>
          <div className={style.secondBack}>
            <div className="row">
              <div className="col-lg-11">
                <div className="row">
                  <div className="col-md-3">
                    <label className={style.textInputs}>Name</label>
                    <input
                      type="text"
                      value={updateProfile.name}
                      onChange={handleChange}
                      placeholder="Name"
                      name="name"
                      className={style.textInputs1}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="email" className={style.textInputs}>
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Email Address"
                      name="email"
                      value={userDetails.email}
                      className={style.textInputs1}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className={style.textInputs}>Phone Number</label>
                    <input
                      type="number"
                      value={updateProfile.phone_number}
                      onChange={handleChange}
                      placeholder=""
                      name="phone_number"
                      className={style.textInputs1}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className={style.textInputs}>Address</label>
                    <input
                      type="text"
                      value={updateProfile.address}
                      onChange={handleChange}
                      placeholder="Address"
                      name="address"
                      className={style.textInputs1}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-1">
                <div className={style.buttonBack}>
                  <div className={style.plusBack}>
                    {/* <span className={style.rect}>
                      <FaPlus size={20} fill={"black"} />
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.secondBack}>
            <div className="row">
              <div className="col-lg-11">
                <div className="row" style={{ justifyContent: "right" }}>
                  <div className="col-md-3">
                    <label className={style.textInputs}>City</label>
                    <input
                      type="text"
                      value={updateProfile.address_city}
                      onChange={handleChange}
                      placeholder="city"
                      name="address_city"
                      className={style.textInputs1}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className={style.textInputs}>Country</label>
                    <select
                      value={updateProfile.address_county}
                      name="address_county"
                      className="form-control"
                      onChange={handleChange}
                    >
                      <option>--Select Country--</option>
                      <option>USA</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className={style.textInputs}>Select State </label>
                    <select
                      name="state"
                      className="form-control"
                      onChange={e =>
                        setUpdateProfile({
                          ...updateProfile,
                          address_state: e.target.value,
                        })
                      }
                    >
                      <option>
                        {updateProfile.address_state !== null &&
                        updateProfile.address_state !== ""
                          ? updateProfile.address_state
                          : "--Select State --"}
                      </option>
                      {stateDetails.map((data, i) => (
                        <option value={data.name}>{data.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className={style.textInputs}>License Number</label>
                    <input
                      type="number"
                      placeholder=""
                      name="number"
                      className={style.textInputs1}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-1">
                <div className={style.buttonBack}>
                  <div className={style.plusBack}>
                    <span className={style.rect} onClick={handleAddFields}>
                      <FaPlus size={18} fill={"black"} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-11">
              <div className="row">
                <label className={style.aboutText}>About me</label>
                <textarea
                  rows="4"
                  name="about me"
                  className={style.aboutMe}
                ></textarea>
              </div>
            </div>
          </div>
          <div className={style.secondBack}>
            <div className="row">
              <div className="col-lg-11">
                <label className={style.textInputs}>Social Media Links</label>
                <div className="row">
                  <div className="col-md-3">
                    <div className={style.socialIcon}>
                      <SocialMediaIconsReact
                        borderColor="#3b5a9a"
                        icon="facebook"
                        iconColor="rgba(255,255,255,1)"
                        backgroundColor="#3b5a9a"
                        size="23"
                      />
                    </div>
                    <input
                      type="url"
                      value={updateProfile.facebook_link}
                      onChange={handleChange}
                      name="facebook_link"
                      className={style.textInputs2}
                      style={{ paddingLeft: "20px" }}
                    ></input>
                  </div>
                  <div className="col-md-3">
                    <div className={style.socialIcon}>
                      <SocialMediaIconsReact
                        borderColor="#3d739c"
                        icon="instagram"
                        iconColor="rgba(255,255,255,1)"
                        backgroundColor="#3d739c"
                        size="23"
                      />
                    </div>
                    <input
                      type="url"
                      className={style.textInputs2}
                      value={updateProfile.instagram_link}
                      name="instagram_link"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <div className={style.socialIcon}>
                      <SocialMediaIconsReact
                        borderColor="#117bb8"
                        icon="linkedin"
                        iconColor="rgba(255,255,255,1)"
                        backgroundColor="#117bb8"
                        size="23"
                      />
                    </div>
                    <input
                      type="url"
                      className={style.textInputs2}
                      value={updateProfile.linkedin_link}
                      name="linkedin_link"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <div className={style.socialIcon}>
                      <SocialMediaIconsReact
                        borderColor="#23aae1"
                        icon="twitter"
                        iconColor="rgba(255,255,255,1)"
                        backgroundColor="#23aae1"
                        size="23"
                      />
                    </div>
                    <input
                      type="url"
                      className={style.textInputs2}
                      value={updateProfile.twitter_link}
                      name="twitter_link"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.secondBack}>
            <div className="row">
              <div className="col-lg-11">
                <div className="row">
                  <div className="col-md-3">
                    <label className={style.textInputs}>
                      Brokerage Company
                    </label>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      className={style.textInputs1}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className={style.textInputs}>
                      # of Years Licensed
                    </label>

                    <input
                      type="number"
                      placeholder="Enter years"
                      name="number"
                      className={style.textInputs1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.secondBack}>
            <div className="row">
              <div className="col-md-2">
                <div className={style.createBack}>
                  <div>
                    <Button
                      className={style.groupButton1}
                      variant="primary"
                      size="sm"
                      onClick={toggleShowCreate}
                    >
                      Create Group
                    </Button>
                  </div>
                  <div className={style.favorite1}>
                    <span className={style.circle}>
                      <BiQuestionMark size={20} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className={style.joinBack}>
                  <div>
                    <Button
                      className={style.groupButton2}
                      variant="primary"
                      size="sm"
                      onClick={toggleShowJoin}
                    >
                      Join Group
                    </Button>
                  </div>
                  <div className={style.favorite1}>
                    <span className={style.circle}>
                      <BiQuestionMark size={20} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <Button
                  className={style.groupButton1}
                  variant="primary"
                  size="sm"
                  onClick={handleSubmit}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </Layout>
  )
}
export default AgentEditProfile

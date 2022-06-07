import React, { useState, useEffect } from "react"
import Layout from "../../components/Layout";
import * as styles2 from "../seller/profileDetails.module.css";
import * as styles from '../dashboard/dashboard.module.css'
import "react-multi-carousel/lib/styles.css"
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "gatsby";
import phone from "../../../static/images/phone.png";
import ProgressBar from "@ramonak/react-progress-bar";
import edit from "../../../static/images/edit.png";
import Seo from "../../components/seo";
import UnclaimPopup from '../../components/popup/UncliamPopup';
import { fileUpload, profileView, uploadFile } from "../../components/Api/ListingApi";
import AvatarImage from "../../components/Avatar/avatarImage";
import { RiCameraLine } from "react-icons/ri";
import Iconmail from '../../../static/images/Icon mail.png'
import { useDispatch, useSelector } from "react-redux";
import { profileUpdate } from "../../components/Api/formApi";
import 'font-awesome/css/font-awesome.min.css';
import { userResponse } from "../../state/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from "@material-ui/core";
import Loader from "../../components/Loader";

function Profile() {
  const [userSuccess, setUserSucess] = useState(false)
  const toggleUserSuccess = () => setUserSucess(p => !p)
  console.log("claim", userSuccess)
  const [profile, setProfile] = useState("");
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [buyersVisible, setBuyersVisible] = useState(true);
  const userDetails = useSelector(state => state.user.userDetail);
  console.log("--userDetails--", userDetails);
  const [picture, setPicture] = useState(false);
  const [imgData, setImgData] = useState({});
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData(){
      await listingApis();
  }
  fetchData()

  }, [])
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    phone_number: Yup.number().required('Please enter the Phone number').min(999999999, 'Please enter correct value').max(9999999999, 'Please enter correct value'),
    name: Yup.string().required('Name is Required').max(15, 'Please enter correct value'),
  });

  const listingApis = async () => {
    let firebaseUid = JSON.parse(localStorage.getItem('userInfo'))
    console.log(firebaseUid)
    await profileView(firebaseUid.uid).then(async (res) => {
      console.log('profileview', res.data.data)
      setProfile(res.data.data)
    })
  }
  const [updateProfile, setUpdateProfile] = useState({
    name: userDetails.name,
    phone_number: userDetails.phone_number,
    img: userDetails.img
  })


  const profileApis = async (uid,data) => {
    console.log('userData',data,uid)
    await profileUpdate(uid, data).then((res) => {
      console.log(res)
      if (res.status === 200) {
        toast.success('Updated Successfully', {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        });
        dispatch(userResponse(res.data.data));
        setPicture(false)
        back()
        setLoader(false)
      }
    }).catch((error) => {
      console.log(error)
      setLoader(false)
    })
  }

  const handleSave = async (value) => {
    setLoader(true)
    setUpdateProfile({ ...updateProfile, name: value.name, phone_number: value.phone_number })
    var uid = localStorage.getItem('userInfo')
    uid = JSON.parse(uid)
    if (updateProfile.img !== userDetails.img) {
      await uploadFile(imgData).then(async(res) => {
        let data={...value,...{img: res.data.data}}
        await profileApis(uid.uid,data)
      })
    }
    else{
      let data={...value,...{img:userDetails.img}}
      profileApis(uid.uid,data)
    }
  }

//list clicking
  const listClick = () => {
    setDetailsVisible(true)
    setBuyersVisible(false)
  }

  const back = () => {
    setDetailsVisible(false)
    setBuyersVisible(true)
  }

  const onChangePicture = e => {
    const formData = new FormData();
    formData.append("name", e.target.files[0].name);
    formData.append("file", e.target.files[0]);
    setImgData(formData)
    setPicture(true)
    setUpdateProfile({ ...updateProfile, img: URL.createObjectURL(e.target.files[0]) })
  };

  const hanldFileUpload=async(e)=>{
    console.log(e.target.files[0])
    const formData = new FormData()
    formData.append("name", e.target.files[0].name)
    formData.append("file", e.target.files[0])
    await fileUpload(formData).then((res) => {
      console.log('files',res)
    })
  }
  

  return (
    <Layout>
      <ToastContainer />
      <Seo title="Profile" />
      {loader ? <Loader /> : null}
      <UnclaimPopup userSuccess={userSuccess} toggleUserSuccess={toggleUserSuccess} />
      <div>
        <div className={styles2.profiles}>
          <div className={styles2.profilebar}>
            <h6 className={styles2.profilestatus}>Buyer Profile Status</h6>
            <h6 className={styles2.statusupdate}>{profile.profile_status}%</h6>
          </div>
          <ProgressBar completed={profile.profile_status} bgColor="#0490fb" height="30px"></ProgressBar>
        </div>
        <div className="row" style={{ marginBottom: "5%" }}>
          <div className="col-md-4 position-relative">
            <div className={styles2.profilehead}>
              <i className="fa fa-file-text"></i>
              <p style={{ marginLeft: "10px" }}>Pre-Approval Letter</p>
            </div>
            <p style={{color:"#4B91FB"}}>Upload</p>
            <input className="fileupload" type="file" id="profilePic"  name="myfile" onChange={hanldFileUpload} />
          </div>
          <div className="col-md-4  position-relative" >
            <div className={styles2.profilehead}>
              <i className="fa fa-file-text"></i>
              <p style={{ marginLeft: "10px" }}>Proof of fund</p>
            
            </div>
            <p style={{color:"#4B91FB"}}>Upload</p>
            <input className="fileupload" type="file" id="profilePic"  name="myfile" onChange={hanldFileUpload} />
          </div>
          <div className="col-md-4  position-relative">
            <div className={styles2.profilehead}>
              <i className="fa fa-file-text"></i>
              <p style={{ marginLeft: "10px" }}>Intro Letter</p>
            </div>
            <p style={{color:"#4B91FB"}}>Upload</p>
            <input className="fileupload" type="file" id="profilePic" name="myfile" onChange={hanldFileUpload}  />
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-6">
            <h5><b>Intrested Properties</b></h5>
            <hr />
            <div className="col-md-6">
              <Card className={styles.carouselCard} style={{ borderRadius: "25px", boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)" }}>
                <div className={styles.favorite}>
                  <img src={home3} alt="home3" className={styles.carouselImage} />
                  <div className={styles.favorite1}>
                    <span className={styles.circle}><i class="fa fa-heart" style={{ color: "white" }}></i></span>
                  </div>
                </div>
                <div className="row m-0">
                  <div className="col-sm-8 cardtext1">
                    <p>5507 SE 1st Ct,</p>
                    <p>Des Monia, IA 50315</p>
                  </div>
                  <div className="col-sm-4 cardtext1">
                    <div className={styles.dashboardActive}>
                      <i class="fa fa-circle" style={{ color: "green" }}></i>
                      <p style={{ marginLeft: "5px" }}>Active</p>
                    </div>
                  </div>
                </div>
                <div className="row m-0">
                  <div className="col-sm-4 cardtext2">
                    <p><b>$164,000</b></p>
                  </div>
                  <div className="col-md-8 cardtext2">
                    <div className={styles.beds}>
                      <div>
                        <p><b>3</b></p>
                        <p style={{ color: "#898686" }}>Beds</p>
                      </div>
                      <div>
                        <p><b>2</b></p>
                        <p style={{ color: "#898686" }}>Baths</p>
                      </div>
                      <div>
                        <p><b>1,250</b></p>
                        <p style={{ color: "#898686" }}>Sq.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="col-md-6">
            <h6><b>Claimed Properties</b></h6>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <Card className={styles.carouselCard} style={{ borderRadius: "25px", boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)" }}>
                  <div className={styles.favorite}>
                    <img src={home1} alt="home1" className={styles.carouselImage} />
                    <div className={styles.favorite1}>
                      <span className={styles.circle}><i class="fa fa-heart" style={{ color: "white" }}></i></span>
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-md-8 cardtext1">
                      <p>916 Spring St,</p>
                      <p>Des Monia, IA 50315</p>
                    </div>
                    <div className="col-md-4 cardtext1">
                      <div className={styles.dashboardActive}>
                        <i class="fa fa-circle" style={{ color: "green" }}></i>
                        <p style={{ marginLeft: "5px" }}>Active</p>
                      </div>
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-md-4 cardtext2">
                      <p><b>$120,000</b></p>
                    </div>
                    <div className="col-md-8 cardtext2">
                      <div className={styles.beds}>
                        <div>
                          <p><b>2</b></p>
                          <p style={{ color: "#898686" }}>Beds</p>
                        </div>
                        <div>
                          <p><b>2</b></p>
                          <p style={{ color: "#898686" }}>Baths</p>
                        </div>
                        <div>
                          <p><b>1,650</b></p>
                          <p style={{ color: "#898686" }}>Sq.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                <Link to="" style={{ textDecoration: "none", float: "right" }} onClick={toggleUserSuccess}>Unclaim</Link>
              </div>
              <div className="col-md-6">
                <Card className={styles.carouselCard} style={{ borderRadius: "25px", boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)" }}>
                  <div className={styles.favorite}>
                    <img src={home2} alt="home2" className={styles.carouselImage} />
                    <div className={styles.favorite1}>
                      <span className={styles.circle}><i class="fa fa-heart" style={{ color: "white" }}></i></span>
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-md-8 cardtext1">
                      <p>1007 Emma Ave,</p>
                      <p>Des Monia, IA 50315</p>
                    </div>
                    <div className="col-md-4 cardtext1">
                      <div className={styles.dashboardActive}>
                        <i class="fa fa-circle" style={{ color: "green" }}></i>
                        <p style={{ marginLeft: "5px" }}>Active</p>
                      </div>
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-md-4 cardtext2">
                      <p><b>$135,000</b></p>
                    </div>
                    <div className="col-md-8 cardtext2">
                      <div className={styles.beds}>
                        <div>
                          <p><b>4</b></p>
                          <p style={{ color: "#898686" }}>Beds</p>
                        </div>
                        <div>
                          <p><b>2</b></p>
                          <p style={{ color: "#898686" }}>Baths</p>
                        </div>
                        <div>
                          <p><b>2,250</b></p>
                          <p style={{ color: "#898686" }}>Sq.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                <Link to="" style={{ textDecoration: "none", float: "right" }} onClick={toggleUserSuccess}>Unclaim</Link>
              </div>
            </div>

          </div>
        </div> */}
        {/* <div className="row">
          <div className="col-md-6">
            <h6><b>Claimed Agent</b></h6>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <Card className={styles.carouselCard} style={{ borderRadius: "25px", boxShadow: "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)" }}>
                  <div className={styles.favorite}>
                    <img src={agent} alt="agent" className={styles2.agentImage} />

                  </div>
                  <div className="row m-0">
                    <div className="col-md-8 cardtext1">
                      <h5><b>Bryan Contreras</b></h5>
                      <div className={styles2.phonenum}>
                        <img src={phone} alt="phone" className={styles2.phone} />
                        <p>(408)-539-6889</p>
                      </div>
                      <p>License#:56897542</p>
                    </div>
                    <div className="col-md-4 cardtext1">
                      <div className={styles.dashboardActive}>
                        <i class="fa fa-circle" style={{ color: "green" }}></i>
                        <p style={{ marginLeft: "5px" }}>Active</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="primary" className={styles2.agentbut}>
                    Claim Agent
                  </Button>
                </Card>
                <Link to="" style={{ textDecoration: "none", float: "right" }} onClick={toggleUserSuccess}  >Unclaim</Link>

              </div>

            </div>
            <hr />
          </div>
        </div> */}


        {
          !detailsVisible ?
            <>
              <div className="row" >
                <div className="col-md-12">
                  <h6 className={styles2.profiledetail}>Profile Details</h6>
                  <div>

                    <div className="row">

                      <div className="col-md-2">
                        {userDetails.img ?
                          <img src={process.env.API_IMAGE_URL+userDetails.img} alt="kimberly" className={styles2.kimberlyimage} style={{ width: "100%", height: "90%", borderRadius: '15px' }} />
                          : <>{userDetails.name ? <div style={{ width: '88px', height: '88px',position:"relative" }}><AvatarImage fontSize={48} data={userDetails.name ? userDetails.name : ''} /></div>
                            : null}</>
                        }
                      </div>
                      <div className="col-md-8" >
                        <h3 className="text-capitalize DejaVuSansBold" style={{ paddingLeft: '20px' }}>{profile.name}</h3>
                        <div style={{ paddingLeft: '20px' }}>
                          <div className={styles2.phonenum1}>
                            <i className="fa fa-phone" style={{ fontSize: "33px", color: "#7F7F7F", marginLeft: "-6px" }} ></i>
                            <p className={styles2.cardnumber}>{userDetails.phone_number}</p>
                          </div>
                        </div>
                        <div className={styles2.phonenum2} >
                          <img src={Iconmail} alt="Iconmail" className={styles2.Iconmail} />
                          <p style={{ paddingLeft: '20px' }}>{userDetails.email}</p>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <img src={edit} alt="edit" className={styles2.edit} />
                        <Link to="" style={{ marginLeft: "5px" }} onClick={listClick}>Edit profile</Link>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </>

            :
            <>
              <div className="row" >
                <div className="col-md-12">
                  <h6 className={styles2.profiledetail}>Profile Details</h6>
                  <div>

                    <div className="row">

                      <div className="col-md-2">
                        <div className="w-100 h-100 position-relative">
                          {updateProfile.img ?
                            <>
                              <img src={picture ? updateProfile.img:process.env.API_IMAGE_URL+updateProfile.img} alt="kimberly" className="kimberlyimage" />
                              <span style={{ position: "absolute", bottom: '22px', right: '9px', background: 'white', padding: '5px', borderRadius: '10px' }}><RiCameraLine style={{ fill: '#4B91FB' }} size="35px" />
                                <input className="imageupload" type="file" id="profilePic" onChange={onChangePicture} name="myfile" />
                              </span>
                            </>
                            :
                            <div style={{ width: '88px', height: '88px', position: "relative" }}>
                              <AvatarImage fontSize={48} data={updateProfile.name ? updateProfile.name : ''} />
                              <span style={{ position: "absolute", bottom: '-14px', right: '-14px', background: 'white', padding: '5px', borderRadius: '10px' }}><RiCameraLine style={{ fill: '#4B91FB' }} size="35px" />
                                <input className="imageupload" type="file" id="profilePic" onChange={onChangePicture} name="myfile" />
                              </span>
                            </div>
                          }
                        </div>
                      </div>
                      <Formik
                        initialValues={{
                          phone_number: userDetails.phone_number,
                          name: userDetails.name
                        }}
                        validationSchema={DisplayingErrorMessagesSchema}
                        onSubmit={values => handleSave(values)}>
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                          <>
                            <div className="col-md-8" >
                              <div className="mb-3">
                                <h6 className="ps-1 color-lightGray">Name</h6>
                                <input className={styles2.editname} value={values.name} onChange={handleChange('name')} type="text" name="name" />
                                {touched.name && errors.name &&
                                  <p className='text-danger mb-0 mt-1 f-14'>{errors.name}</p>
                                }
                              </div>

                              <div className="mb-3">
                                <h6 className="ps-1 color-lightGray">Phone</h6>
                                <input className={styles2.editname} value={values.phone_number} onChange={handleChange('phone_number')} type="number" name="phone_number" />
                                {touched.phone_number && errors.phone_number &&
                                  <p className='text-danger mb-0 mt-1 f-14'>{errors.phone_number}</p>
                                }
                              </div>

                              <div>
                                <h6 className="ps-1 color-lightGray">Email</h6>
                                <input className={styles2.editname} value={userDetails.email} type="text" id="lname" name="lname" />
                              </div>
                            </div>
                            <div className="col-md-2">
                              <img src={edit} alt="edit" className={styles2.edit} />
                              <Button variant="primary" type='submit' className='px-4' onClick={handleSubmit} >
                                Save
                              </Button>
                              {/* <Link to="" style={{ marginLeft: "5px" }} onClick={() => { back(); handleSubmit(); }}>Save</Link> */}
                            </div>
                          </>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </>
        }
      </div>
    </Layout>
  )
}

export default Profile

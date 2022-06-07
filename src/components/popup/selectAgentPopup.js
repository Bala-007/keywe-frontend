import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import *as style1 from '../../pages/dashboard/detail.module.css';
import './popup.css'
import { usePlacesWidget } from "react-google-autocomplete";
import { Formik} from 'formik';
import * as Yup from 'yup';
import { dashboardPropertyDetail, claimPropertyList, sendRequestToAgent } from "../../components/Api/ListingApi";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Autocomplete from "react-google-autocomplete";

export default function SelectAgentPopup(props) {
  const { show, toggleShow } = props;
  const [propertyId, setPropertyId] = useState(null)
  const [showSelectOption, setShowSelectOption] = useState(false)
  const [open, setOpen] = useState('')
  const [place, setPlace] = useState('')
  const [isPlace,setIsPlace]=useState(false)

  useEffect(() => {
    setShowSelectOption(false)
  }, [])

  const showDetail = (e) => {
    console.log('hi', e.target.value)
    setShowSelectOption(true)
    if (e.target.value === 'buy') {
      setOpen('buy')
    }
    else if (e.target.value === 'sell') {
      setOpen('sell')
    }
  };
  const showId = (id) => {
    setPropertyId(id)
  }

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    Budget: Yup.number().required('Please enter the budget') .max(9999999, 'Please enter correct value').min(99999, 'Please enter correct value'),
    // Prequalified: Yup.number().max(9999999, 'Please enter correct value').min(99999, 'Please enter correct value'),
    Prequalified: Yup.number().max(9999999, 'Please enter correct value'),
    Bed: Yup.number().required('Please enter the bed').max(15, 'Please enter correct value'),
    Bath: Yup.number().required('Please enter the bath').max(15, 'Please enter correct value'),
    Message: Yup.string()
  });
  const [listingDatas, setListingDatas] = useState([]);
  const [claimDatas, setClaimDatas] = useState([]);
  const userDetails = useSelector(state => state.user.userDetail);
  useEffect(async () => {
    await listingApis();
    // await dataSet();
  }, [])
  const listingApis = async () => {

    await claimPropertyList({ id: userDetails._id, status: 'Approve' })
      .then(async (res) => {
        console.log("-claimPropertyList-res", res);
        if (res.status == 200) {
          let claimData = res.data.data;
          if (claimData.length > 0) {
            setClaimDatas(claimData);

            console.log('selectAgentpopup', claimData)
            setListingDatas(claimData);
            // dataSet(claimData);
          } else {

          }
        }
      })
  }

  const handleSeller = async () => {
    if (propertyId !== '') {
      let userId = localStorage.getItem('userId')
      let data = {
        user_id: userId,
        agent_id: [props.agentId],
        type: 'sell',
        property_id: propertyId
      }
      await sendRequestToAgent(data).then((res) => {
        if (res.status === 200) {
          console.log(res)
          toast.success(res.data.message, { position: "top-right", autoClose: 3000, closeOnClick: true, })
        }
        if (res.status === 400) {
          toast.error(res.data.message, { position: "top-right", autoClose: 3000, closeOnClick: true, })
        }
      })
      toggleShow()
      setPropertyId(null)
      setShowSelectOption(false)
    }
  }

  const handleData=async(values)=>{
    if(place === ''){
      setIsPlace(true)
    }
    else{
      let userId = localStorage.getItem('userId')
      let data={
        area:place,
        user_id:userId,
        agent_id:[props.agentId],
        type:'buy',
        pre_qualified:values.Prequalified === '' ?1:values.Prequalified,
        beds:values.Bed,
        baths:values.Bath,
        message:values.Message,
        budget:values.Budget
      }
      await sendRequestToAgent(data).then((res)=>{
        if (res.status === 200) {
          console.log(res)
          toast.success(res.data.message, { position: "top-right", autoClose: 3000, closeOnClick: true, })
        }
        if (res.status === 400) {
          toast.error(res.data.message, { position: "top-right", autoClose: 3000, closeOnClick: true, })
        }
      })
      toggleShow()
      setShowSelectOption(false)
    }
  }
  return (
    <div>
      <ToastContainer />
      <Modal show={show} onHide={() => { toggleShow(); setShowSelectOption(false) }} >
        <Modal.Header closeButton className='justify-content-center'>
          <Modal.Title>Sending requset to agent</Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >


          <div className='row justify-content-center' style={{ marginBottom: !showSelectOption && '30px' }}>
            <p className={style1.agentText}>What are you looking to do</p>
            <select name="createGroup" className={style1.selectdet} aria-label="--Select--" onChange={(e) => showDetail(e)} >
              <option>--Select--</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
            <p className='error-msg'></p>

          </div>
          {open === 'buy' && showSelectOption ?
            <Formik
              initialValues={{
                Budget: '',
                Prequalified: "",
                Bed: '',
                Bath: '',
                Message: ''
              }}
              validationSchema={DisplayingErrorMessagesSchema}
              onSubmit={values => handleData(values)}>
              {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <div className='mb-3'>
                  <div className='d-flex'>
                    <div className='w-100 p-2 popUpGooglePlace'>
                      <p className='DejaVuSansBold'>Area <span className='error-msg'>*</span></p>
                      <Autocomplete
                        apiKey={'AIzaSyAbQxNOlxvLU3I_XZAluQeFBAPrj6Ua2Jk'}
                        onPlaceSelected={(place) => {
                          setPlace(place.formatted_address)
                          setIsPlace(false)
                        }}
                      />
                      {isPlace===true &&
                        <p className='text-danger mb-0'>Please enter the location</p>
                      }
                    </div>
                  </div>

                  <div className='d-flex'>
                    <div className='w-50 p-2 '>
                      <p className='DejaVuSansBold'>Budget <span className='error-msg'>*</span></p>
                      <div className='position-relative'>
                        <input type="number" className='w-100 form-control pl-22' name="Budget" onChange={handleChange('Budget')} value={values.Budget} />
                        <p className='position-absolute bottom-1 left-12'>$</p>
                      </div>

                      {touched.Budget && errors.Budget &&
                        <p className='text-danger mb-0'>{errors.Budget}</p>
                      }
                    </div>
                    <div className='w-50 p-2'>
                      <p className='DejaVuSansBold'>Prequalified </p>
                      <div className='position-relative'>
                        <input type="number" className='w-100 form-control pl-22' name="Prequalified" onChange={handleChange('Prequalified')} value={values.Prequalified} />
                        <p className='position-absolute bottom-1 left-12'>$</p>
                      </div>
                      {touched.Prequalified && errors.Prequalified &&
                        <p className='text-danger mb-0'>{errors.Prequalified}</p>
                      }
                    </div>
                  </div>

                  <div className='d-flex'>
                    <div className='w-50 p-2'>
                      <p className='DejaVuSansBold'>Bath <span className='error-msg'>*</span></p>
                      <input type="number" className='w-100  form-control' name="Bath" onChange={handleChange('Bath')} value={values.Bath} />
                      {touched.Bath && errors.Bath &&
                        <p className='text-danger mb-0'>{errors.Bath}</p>
                      }
                    </div>

                    <div className='w-50 p-2'>
                      <p className='DejaVuSansBold'>Bed <span className='error-msg'>*</span></p>
                      <input type="number" className='w-100 form-control' name="Bed" onChange={handleChange('Bed')} value={values.Bed} />
                      {touched.Bed && errors.Bed &&
                        <p className='text-danger mb-0'>{errors.Bed}</p>
                      }
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div className='w-100 p-2'>
                      <p className='DejaVuSansBold'>Message</p>
                      <textarea className="form-control w-100" name="Message" onChange={handleChange('Message')} value={values.Message} />
                    </div>
                  </div>
                  <div className='d-flex justify-content-center p-2'>
                    <Button variant="primary" type='submit' className='px-4' onClick={handleSubmit} >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </Formik>

            :
            <>
              {open === 'sell' && showSelectOption &&
                <div className='d-flex flex-column'>
                  {listingDatas.length !== 0 ?
                  <div className='h-300 overflow-auto cursor'>
                    {listingDatas.map((data, i) => (
                      <div className='d-flex p-2' style={{ border: propertyId === data.property_id._id ? '5px solid #86C5F6' : 'none' }} key={i} onClick={() => showId(data.property_id._id)}>
                        <div className='w-25'>
                          <img src={data.property_id.thumbnail_image} width="100%" height="100%" />
                        </div>
                        <div className='px-3 w-75'>
                          <p className='mb-1 DejaVuSansBold'>{data.property_id.address}</p>
                          <p className='SFPro-regular'>Price:${data.property_id.price.$numberDecimal}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  :
                  <p className="text-center">No Records Found</p>
                    }
                  <Button variant="primary" onClick={handleSeller} className='px-4 my-3 mx-auto w-25'>
                    Submit
                  </Button>
                </div>
              }
            </>
          }

        </Modal.Body>
      </Modal>
    </div>
  )
}

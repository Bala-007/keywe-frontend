import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from '@hassanmojab/react-modern-calendar-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableTime, scheduleAppointment } from '../Api/ListingApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function BuyerScheduleCalender(props) {
    const { click, closeTour, toggleClick, data, details, propertyId } = props;
    const [dateState, setDateState] = useState({})
    const [timeList, setTimeList] = useState([])
    const [selectIndex, setSelectIndex] = useState(null)
    const userDetails = useSelector(state => state.user.userDetail);

    // const [dates, setDate] = useState([])
    // const changeDate = (value) => {
    //     setDateState(value)
    //     let data1 = value.month + '/' + value.day + '/' + value.year
    //     let date=new Date(data1)
    //     // handleClickDate(value,data1,date)
    // }
    useEffect(() => {
        if (Object.keys(details.data).length !== 0) {
            let date = new Date()
            let value = {
                year: JSON.parse(moment(date).format('YYYY')),
                month: JSON.parse(moment(date).format('M')),
                day: JSON.parse(moment(date).format('D'))
            }
            setDateState(value)
            var today = moment(new Date()).format('MM-DD-YYYY')
            var tommarow = moment(today).add(1, 'days')
            handleGetAppoinmentList(today, tommarow)
        }

        // var data1 = moment(date).format('M/D/YYYY')
        // handleClickDate(value,data1,date)
        // var data1 = moment(date).format('M/D/YYYY')
        // setDateState(value)
        // let time = []
        // Object.keys(data.date.time[0]).map((key) => {
        //     if (data1 === key) {
        //         let value=data.date.time[0][key]
        //         time.push(value)
        //     }
        // })
        // setDate(time[0])
        // if(time.length===0){
        //     Object.keys(data).map((key)=>{
        //         if(moment(date).format('ddd').toLowerCase() === key ){
        //             console.log(data[key].time)
        //             time.push(data[key].time)
        //         }
        //     })
        //     setDate(time[0])
        // }
        // console.log('props data', time)
    }, [details])
    const handleGetAppoinmentList = (today, tommarow) => {
        let formData = {
            dateFrom: new Date(today),
            dateTo: new Date(tommarow),
            staffIds: details.list === "listingAgent" ? details.data.meta_id.staff_id : details.data.user_id !== null ? details.data.user_id.meta_id.staff_id : 0
        }
        getAvailableTime(formData).then((res) => {
            console.log('available time', res.data.data.data)
            setTimeList(res.data.data.data)
        }).catch((error) => console.log(error))
    }
    const changeDate = (date) => {
        setDateState(date)
        console.log(date)

        var today = moment(new Date(`${date.month}-${date.day}-${date.year}`)).format('MM-DD-YYYY')
        var tommarow = moment(today).add(1, 'days')
        handleGetAppoinmentList(today, tommarow)
    }
    // const handleClickDate =(value,data1,date)=>{
    //     setDateState(value)
    //     let time = []
    //     Object.keys(data.date.time[0]).map((key) => {
    //         if (data1 === key) {
    //             let value=data.date.time[0][key]
    //             time.push(value)
    //         }
    //     })
    //     setDate(time[0])
    //     if(time.length===0){
    //         Object.keys(data).map((key)=>{
    //             if(moment(date).format('ddd').toLowerCase() === key ){
    //                 console.log(data[key].time)
    //                 time.push(data[key].time)
    //             }
    //         })
    //         setDate(time[0])
    //     }
    //     console.log('props data', time)
    // }
    const handleTimeList = (time) => {
        var datetime = new Date(time).toLocaleString("en-IN", { timeZone: 'Asia/Kolkata' })
        let data = datetime.split(',').pop().replace(':00', '')
        return data
    }
    const handleSelect = (time) => {
        console.log(time)
        setSelectIndex(time)
    }
    const handleSubmit = async () => {
        if (selectIndex !== "") {
            let data = {
                "datetime": selectIndex,
                "staff_id": details.list === "listingAgent" ? details.data.meta_id.staff_id : details.data.user_id.meta_id.staff_id,
                "name": details.data.name,
                "email": details.data.email,
                "phone": details.data.phone_number !== null ? details.data.phone_number : 0,
                "property_id": propertyId,
                "agent_id": details.list === "listingAgent" ? details.data._id : details.data.user_id._id,
                "user_id": userDetails._id,
                "timezone": ""
            }
            console.log('data', data)
            await scheduleAppointment(data).then((res) => {
                console.log(res)
                toggleClick()
                closeTour()
                toast.success('Appointment scheduled successfully', {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                });
            }).catch((error) => console.log(error))
        }
    }
    return (
        <div>
            <ToastContainer />
            <Modal show={click} onHide={toggleClick} className="special_modal" dialogClassName="my-modal">
                <Modal.Header closeButton className="calendar-popup-margin teampopup-title" >
                    <Modal.Title className='form-field-label form-label-team' style={{ fontFamily: "DejaVuSansBold" }}>Pick a Date to Tour</Modal.Title>
                </Modal.Header>
                <Modal.Body className="team-popup-margin pb-0" >
                    <div className="tourAvailiablePopUp">
                        <Calendar
                            value={dateState}
                            onChange={(date) => changeDate(date)}
                            className={style1.Calendar}
                            minimumDate={utils().getToday()}
                        />
                        {timeList.length !== 0 ?
                            <>
                                <p className='mt-3' style={{ fontFamily: "DejaVuSansBold" }}>Select a Time</p>
                                <div className='d-flex w-100 flex-wrap'>

                                    {timeList.map((item, index) => (
                                        // <div className='d-flex w-50 flex-wrap' key={index}>
                                        // <button className='btn primaryColorOutline w-25 DejaVuSansCondensed m-2' key={index}>{handleTimeList(item)}</button>
                                        // </div>
                                        <div className={`${selectIndex === item.time ? 'scheduleTimeContainerActive cursor-pointer' : "scheduleTimeContainer cursor-pointer"}`} key={index} onClick={() => handleSelect(item.time)}>
                                            <p className={`${selectIndex === item.time ? 'scheduleTimeActive' : 'scheduleTime'}`}>{handleTimeList(item.time)}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                            : <p className='my-3 text-center'>Time not available</p>
                        }

                    </div>
                </Modal.Body>
                <Modal.Footer className="team-popup-margin teampop-footer" >
                    <Button variant="primary" className='teamnext-submit-btn row col-lg-12 col-xl-12 col-md-12' onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

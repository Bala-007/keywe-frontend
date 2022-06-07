import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../popup/popup.css'
import CalendarPopup from './CalendarPopup';
import { useDispatch, useSelector } from 'react-redux';
import { calenderResponse } from '../../state/calenderPopUp';
import moment from 'moment';
import { data } from 'jquery';
import { createSchedule, getScheduler, profileView, updateScheduler } from '../Api/ListingApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { scheduleAppoinment } from '../Api/formApi'
import { userResponse } from '../../state/userSlice';



export default function TourAvailablePopup(props) {
    const { show, toggleShow, property_id } = props;
    const defaultWeek = [
        { week: 'sunday', enabled: false, hours: { from: "09:00", to: "17:00" }, breaks: [] },
        { week: 'monday', enabled: false, hours: { from: "09:00", to: "17:00" }, breaks: [] },
        { week: 'tuesday', enabled: false, hours: { from: "09:00", to: "17:00" }, breaks: [] },
        { week: 'wednesday', enabled: false, hours: { from: "09:00", to: "17:00" }, breaks: [] },
        { week: 'thursday', enabled: false, hours: { from: "09:00", to: "17:00" }, breaks: [] },
        { week: 'friday', enabled: false, hours: { from: "09:00", to: "17:00" }, breaks: [] },
        { week: 'saturday', enabled: false, hours: { from: "09:00", to: "17:00" }, breaks: [] },
    ]
    const [date, setDate] = useState([])
    const userDetails = useSelector(state => state.user.userDetail);
    const [dropDownStart, setDropDownStart] = useState({
        from: null,
        startMetaDate: null
    })
    const [dropDownEnd, setDropDownEnd] = useState({
        to: null,
        endMetaDate: null
    })
    const [dropDownBreakStart, setDropDownBreakStart] = useState({
        from: null,
        startMetaDate: null
    })
    const [dropDownBreakEnd, setDropDownBreakEnd] = useState({
        to: null,
        endMetaDate: null
    })
    const [errorMessage, setErrorMessage] = useState({
        index1: null,
        index2: null,
        message: ''
    })
    const [errorTime, setErrorTime] = useState({
        index1: null,
        message: ''
    })
    const [ErrorDropDownStart, setErrorDropDownStart] = useState({
        from: null,
        startMetaDate: null,

    })
    const [calendarDetails, setCalenderDetails] = useState([])
    const [ErrorDropDownEnd, setErrorDropDownEnd] = useState({
        to: null,
        endMetaDate: null
    })
    const dispatch = useDispatch()
    const calendar = useSelector(state => state.calender.calenderDetails)
    const [dateFormat, setDateFormat] = useState([])
    // const defaultWeek = [
    //     { week: 'sun', date: [], enabled: false },
    //     { week: 'mon', date: [{ from: '7:00am', to: '8:00am' }], enabled: true },
    //     { week: 'tue', date: [{ from: '7:00am', to: '8:00am' }], enabled: true },
    //     { week: 'wed', date: [{ from: '7:00am', to: '8:00am' }], enabled: true },
    //     { week: 'thu', date: [{ from: '7:00am', to: '8:00am' }], enabled: true },
    //     { week: 'fri', date: [{ from: '7:00am', to: '8:00am' }], enabled: true },
    //     { week: 'sat', date: [], enabled: false },
    // ]

    useEffect(() => {
        if (userDetails.meta_id.staff_id !== null) {
            getScheduler(userDetails.meta_id.staff_id).then((res) => {
                console.log(res)
                if (res.data.data !== undefined || res.data.data !== null) {
                    let result = []
                    Object.keys(res.data.data.data.workingHours).map((key) => {
                        console.log(key)
                        let data = {
                            week: key,
                            hours: res.data.data.data.workingHours[key].hours,
                            breaks: res.data.data.data.workingHours[key].breaks,
                            enabled: res.data.data.data.workingHours[key].enabled
                        }
                        result.push(data)
                        date.push(data)
                    })
                    console.log('result', result)
                }

            }).catch((error) => {
                console.log('schedule data error')
                setDate([...defaultWeek])
            })
        }
        else {
            console.log('defaultWeek')
            setDate([...defaultWeek])
        }

    }, [])

    // useEffect(()=>{
    //     if(calendar.length !==0){
    //         setDate(calendar)  
    //     }

    // },[calendar])

    // useEffect(() => {
    //     getScheduler(property_id).then((res) => {
    //         if (res.data.data !== null) {
    //             console.log(res.data.data)
    //             var value = []
    //             if (res.data.data.date.time.length !== 0) {
    //                 Object.keys(res.data.data.date.time[0]).map((key) => {
    //                     let data = {
    //                         date: key,
    //                         time: res.data.data.date.time[0][key]
    //                     }
    //                     value.push(data)
    //                 })
    //                 console.log(value)
    //             }
    //             dispatch(calenderResponse(value))
    //             let data = [
    //                 { week: 'sunday', date: res.data.data.sun.time, enabled: res.data.data.sun.enabled },
    //                 { week: 'monday', date: res.data.data.mon.time, enabled: res.data.data.mon.enabled },
    //                 { week: 'tuesday', date: res.data.data.tue.time, enabled: res.data.data.tue.enabled },
    //                 { week: 'wednesday', date: res.data.data.wed.time, enabled: res.data.data.wed.enabled },
    //                 { week: 'thursday', date: res.data.data.thu.time, enabled: res.data.data.thu.enabled },
    //                 { week: 'friday', date: res.data.data.fri.time, enabled: res.data.data.fri.enabled },
    //                 { week: 'saturday', date: res.data.data.sat.time, enabled: res.data.data.sat.enabled },
    //             ]
    //             console.log('calender', data)
    //             let date = [...data]
    //             setDate(date)
    //         }
    //         else {
    //             dispatch(calenderResponse([]))
    //             setDate(defaultWeek)
    //         }
    //     })
    // }, [property_id])
    // useEffect(() => {
    //     if (calendar.length !== 0) {
    //         // var values=[]
    //         // var date=[]
    //         // if(calendar.length >=2){
    //         //     calendar.map((item,index)=>{
    //         //         if(index>=1){
    //         //             let storeDate1=new Date(calendar[index -1].date)
    //         //             let checkDate= moment(storeDate1).format('DD MMM YYYY')
    //         //             storeDate1.setDate(storeDate1.getDate()+1)
    //         //             let storeDate2=moment(storeDate1).format('DD MMM YYYY')
    //         //             console.log(storeDate2)
    //         //             let calendarDate=onChangeDate(item.date)
    //         //             if(storeDate2 === calendarDate){
    //         //                 if( JSON.stringify(calendar[index-1].time) === JSON.stringify(item.time)){
    //         //                     console.log('successDate',checkDate,calendarDate)
    //         //                     console.log('successTime',item.time)
    //         //                     let data1={
    //         //                         date:checkDate,
    //         //                         value:item.time
    //         //                     }
    //         //                     let data2={
    //         //                         data:calendarDate,
    //         //                         value:item.time
    //         //                     }

    //         //                     date.push(data1)
    //         //                     date.push(data2)
    //         //                     console.log('dates',date)
    //         //                 }
    //         //                 else{
    //         //                     values.push(date)
    //         //                 }
    //         //             }
    //         //             else{
    //         //                 values.push(date)
    //         //             }
    //         //         }
    //         //         console.log('vlaues',date)
    //         //     })
    //         // }
    //         console.log('clender', calendar)
    //         setCalenderDetails(calendar)
    //     }
    //     else {
    //         setCalenderDetails([])
    //     }
    // }, [calendar])


    const [isAddTime, setIsAddTime] = useState(false)
    const [calenderPopUpOpen, setCalenderPopUpOpen] = useState(false)
    // const [time, setTime] = useState(['12:00am', "12:30am", '1:00am', "1:30am", "2:00am", "2:30am", "3:00am",
    //     '3:30am', '4:00am', '4:30am', '5:00am', '5:30am', '6:00am', '6:30am', '7:00am'
    //     , '7:30am', '8:00am', '8:30am', '9:00am', '9:30am', '10:00am', '10:30am', '11:00am',
    //     '11:30am', '12:00pm', "12:30pm", '1:00pm', "1:30pm", "2:00pm", "2:30pm", "3:00pm", '3:30pm',
    //     '4:00pm', '4:30pm', '5:00pm', '5:30pm', '6:00pm', '6:30pm', '7:00pm', '7:30pm',
    //     '8:00pm', '8:30pm', '9:00pm', '9:30pm', '10:00pm', '10:30pm', '11:00pm', '11:30pm',])
    const defaultTime = ['01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00',
        '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00',
        '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00']
    const [time, setTime] = useState(defaultTime)

    // const handleDateAdded = (index) => {
    //     let data = [...date]
    //     if (data[index].breaks.length === 0) {
    //         data[index].breaks.push({ from: '7:00am', to: '8:00am' })
    //     }
    //     else {
    //         if (data[index].enabled === false) {
    //             data[index].enabled = true
    //         }
    //         else {
    //             let list = data[index].breaks[data[index].breaks.length - 1]
    //             console.log('list,endData', list.to)
    //             let value = time.indexOf(list.to)

    //             let startTime = value + 2
    //             let endTime = value + 4
    //             if (startTime >= 48) {
    //                 startTime = startTime - 48
    //             }
    //             if (endTime >= 48) {
    //                 console.log(endTime)
    //                 endTime = endTime - 48
    //             }
    //             let uniquive = data[index].breaks.map((item) => item.from)
    //             let values = Array.from(new Set(uniquive))
    //             console.log(values, uniquive)
    //             if (values.length !== uniquive.length) {
    //                 setIsAddTime(true)
    //                 setDropDownStart({ from: index, startMetaDate: data[index].breaks.length - 1 })
    //             }
    //             else {
    //                 setIsAddTime(false)
    //             }
    //             data[index].breaks.push({ from: time[startTime], to: time[endTime] })
    //         }
    //     }
    //     console.log('add date', data)
    //     setDate(data)
    // }
    const handleDateAdded = (index) => {
        let data = [...date]
        let startHour = defaultTime.findIndex(a => a === data[index].hours.from)
        let endHour = defaultTime.findIndex(a => a === data[index].hours.to)
        let result = defaultTime.filter((i, index) => startHour < index && endHour > index)
        console.log(result)
        if (result.length >= 2) {
            if (data[index].breaks.length !== 0) {
                let start = data[index].breaks[data[index].breaks.length - 1].from
                let end = data[index].breaks[data[index].breaks.length - 1].to
                if (errorMessage.message === '' && (start !== '' && end !== "")) {
                    data[index].breaks.push({ from: '', to: '' })
                }
            }
            else {
                data[index].breaks.push({ from: '', to: '' })
            }
            setDate(data)
        }
    }

    const handleDateDelete = (index, index2) => {
        if (errorMessage.index1 === index && errorMessage.index2 === index2) {
            setErrorMessage({ ...errorMessage, index1: null, index2: null, message: "" })
        }
        let data = [...date]
        data[index].breaks.splice(index2, 1)
        setDate(data)
    }

    const handleStartDropDown = (index, i) => {
        let data = [...date]
        let endDate = data[index].hours.to
        if (endDate !== "") {
            let endIndex = defaultTime.findIndex((i) => i === endDate)
            let result = defaultTime.filter((a, i) => i < endIndex)
            setTime([...result])
            console.log(result)
        }
        else {
            setTime([...defaultTime])
        }
        setDropDownStart({ from: index, startMetaDate: i })
    }
    const handleEndDropDown = (index, i) => {
        let data = [...date]
        let startDate = data[index].hours.from
        if (startDate !== "") {
            let startIndex = defaultTime.findIndex((i) => i === startDate)
            let result = defaultTime.filter((a, i) => i > startIndex)
            setTime([...result])
            console.log(result)
        }
        else {
            setTime([...defaultTime])
        }
        setDropDownEnd({ to: index, endMetaDate: i })
    }
    const handleBreakStartDropDown = (index, index2) => {
        let data = [...date]
        if (data[index].breaks[index2].to !== "") {
            let endHour = defaultTime.findIndex((i) => i === data[index].breaks[index2].to)
            let startHour = defaultTime.findIndex((i) => i === data[index].hours.from)
            let result = defaultTime.filter((i, index) => startHour < index && endHour > index)
            setTime([...result])
        }
        else {
            let endHour = defaultTime.findIndex((i) => i === data[index].hours.to)
            let startHour = defaultTime.findIndex((i) => i === data[index].hours.from)
            let result = defaultTime.filter((i, index) => startHour < index && endHour > index)
            setTime([...result])
        }



        // if (data[index].breaks[index2].from !== "") {
        //     let startBreak=defaultTime.findIndex((i)=> i ===data[index].breaks[index2].from)
        //     let result = defaultTime.indexOf(data[index].breaks[index2].from,endHour)
        //     console.log('result 1', result)
        // }
        // else {
        //     let startHour=defaultTime.findIndex((i)=> i ===data[index].hours.from)
        //     let result=defaultTime.filter((i,index)=>startHour < index && endHour >index)
        //     // defaultTime.map((i,index)=>{
        //     //     if(8 < index && 10>index){
        //     //         console.log(i)
        //     //     }
        //     // })
        //     setDate([...result])
        //     console.log('result 2', result)
        // }
        // let startHour=defaultTime.findIndex((i)=> i ===data[index].hours.from)
        // let endHour=defaultTime.findIndex((i)=>i ===data[index].hours.to)
        // let startBreak=defaultTime.findIndex((i)=> i ===data[index].breaks[index2].from)

        setDropDownBreakStart({ from: index, startMetaDate: index2 })
    }
    const handleBreakEndDropDown = (index, index2) => {
        let data = [...date]
        if (data[index].breaks[index2].from !== "") {
            let startHour = defaultTime.findIndex((i) => i === data[index].breaks[index2].from)
            let endHour = defaultTime.findIndex((i) => i === data[index].hours.to)
            let result = defaultTime.filter((i, index) => startHour < index && endHour > index)
            setTime([...result])
        }
        else {
            let endHour = defaultTime.findIndex((i) => i === data[index].hours.to)
            let startHour = defaultTime.findIndex((i) => i === data[index].hours.from)
            let result = defaultTime.filter((i, index) => startHour < index && endHour > index)
            setTime([...result])
        }
        setDropDownBreakEnd({ to: index, endMetaDate: index2 })
    }


    const hanldeCloseStartDropDown = () => {
        if ((dropDownStart.from !== null && dropDownStart.startMetaDate !== null) || (dropDownEnd.to !== null && dropDownEnd.endMetaDate !== null)) {
            setDropDownStart({ from: null, startMetaDate: null })
            setDropDownEnd({ to: null, endMetaDate: null })
        }
        if ((dropDownBreakStart.from !== null && dropDownBreakStart.startMetaDate !== null) || (dropDownBreakEnd.to !== null && dropDownBreakEnd.endMetaDate !== null)) {
            setDropDownBreakStart({ from: null, startMetaDate: null })
            setDropDownBreakEnd({ to: null, endMetaDate: null })
        }
    }
    const handleSelectStartTime = (index, timeData) => {
        console.log(index, time)
        let data = [...date]
        data[index].hours.from = timeData
        // let startDate = data[index].hours.to
        // if(startDate !==""){
        //     let startTime = time.findIndex((i) => i === data[index].hours.to)
        //     let endTime = time.findIndex((i) => i === timeData)
        //     if (startTime > endTime) {
        //         setErrorTime({ ...errorMessage, index1: null, message: "" })
        //         data[index].hours.from = timeData
        //     }
        //     else {
        //         setErrorTime({ ...errorMessage, index1: index, message: "Please select valid time" })
        //     }
        // }
        // else{
        //     data[index].hours.from = timeData
        // }
        // let data = [...date]
        // hanldeDuplicateTimeFind(data, index, i, time)
        // setDate(data)
    }
    // const hanldeDuplicateTimeFind = (data, index, i, time) => {
    //     let uniquive = data[index].date.map((item) => item.from)
    //     let endData = data[index].date.map((item) => item.to)
    //     let endDataValue = endData.findIndex((a) => a === time)
    //     let value = Array.from(new Set(uniquive))
    //     console.log(value, uniquive)
    //     console.log(endDataValue, endData)
    //     if ((value.length !== uniquive.length) || (endDataValue !== -1)) {
    //         setErrorDropDownStart({ from: index, startMetaDate: i })
    //         console.log('duplicate')
    //     }
    //     else {
    //         setErrorDropDownStart({ from: null, startMetaDate: null })
    //     }
    // }
    const handleSelectEndTime = (index, timeData) => {
        let data = [...date]
        data[index].hours.to = timeData
        // let startDate = data[index].hours.from
        // if(startDate !==""){
        //     let endHours = time.findIndex((i) => i === data[index].hours.from)
        //     let endBreak = time.findIndex((i) => i === timeData)
        //     if (endHours < endBreak) {
        //         setErrorTime({ ...errorMessage, index1: null, message: "" })
        //         data[index].hours.to = timeData
        //     }
        //     else {
        //         setErrorTime({ ...errorMessage, index1: index, message: "Please select valid time" })
        //     }
        // }
        // else{
        //     data[index].hours.to = timeData
        // }

        // let uniquive = data[index].date.map((item) => item.to)
        // let from = data[index].date.map((item) => item.from)
        // let fromValue = from.findIndex((a) => a === time)
        // let value = Array.from(new Set(uniquive))
        // console.log(value, uniquive)
        // if ((value.length !== uniquive.length) || (fromValue !== -1)) {
        //     setErrorDropDownEnd({ to: index, endMetaDate: i })
        //     console.log('duplicate')
        // }
        // else {
        //     setErrorDropDownEnd({ to: null, endMetaDate: null })
        // }
    }
    const handleSelectStartBreakTime = (index, index2, timeData) => {
        let data = [...date]
        data[index].breaks[index2].from = timeData
        setDate(data)
        // let startHours = time.findIndex((i) => i === data[index].hours.from)
        // let startBreak = time.findIndex((i) => i === timeData)
        // if (startHours < startBreak) {
        //     if (endDate !== '') {
        //         let value = time.findIndex((a) => a === endDate)
        //         let value2 = time.findIndex((a) => a === timeData)
        //         console.log('value', value, value2, endDate)
        //         if (value > value2) {
        //             setErrorMessage({ ...errorMessage, index1: null, index2: null, message: "" })
        //             data[index].breaks[index2].from = timeData
        //         }
        //         else {
        //             setErrorMessage({ ...errorMessage, index1: index, index2: index2, message: "Please select valid time" })
        //         }
        //     }
        //     else {
        //         data[index].breaks[index2].from = timeData
        //     }
        // }
        // else {
        //     setErrorMessage({ ...errorMessage, index1: index, index2: index2, message: "Please select valid time" })
        // }
    }

    const handleSelectEndBreakTime = (index, index2, timeData) => {
        let data = [...date]
        data[index].breaks[index2].to = timeData
        // let startDate = data[index].breaks[index2].from
        // let endHours = time.findIndex((i) => i === data[index].hours.to)
        // let endBreak = time.findIndex((i) => i === timeData)
        // if (endHours > endBreak) {
        //     if (startDate !== '') {
        //         let value = time.findIndex((a) => a === startDate)
        //         let value2 = time.findIndex((a) => a === timeData)
        //         console.log('value', value, value2)
        //         if (value < value2) {
        //             setErrorMessage({ ...errorMessage, index1: null, index2: null, message: "" })
        //             data[index].breaks[index2].to = timeData
        //         }
        //         else {
        //             setErrorMessage({ ...errorMessage, index1: index, index2: index2, message: "Please select valid time" })
        //         }
        //     }
        //     else {
        //         data[index].breaks[index2].to = timeData
        //     }
        // }
        // else {
        //     setErrorMessage({ ...errorMessage, index1: index, index2: index2, message: "Please select valid time" })
        // }
    }
    const handleCheckBox = (index) => {
        let data = [...date]
        data[index].enabled = !data[index].enabled
        data[index].hours.from = '09:00';
        data[index].hours.to = '17:00';
        setDate(data)

    }
    const handleCalenderPopUp = () => {
        setCalenderPopUpOpen(p => !p)
    }
    const hanldeDelectCalender = (index) => {
        let data = [...calendar]
        data.splice(index, 1)
        console.log(data)
        dispatch(calenderResponse(data))
    }
    const onChangeDate = (date) => {
        let dateFormat = moment(date).format('DD MMM YYYY')
        return dateFormat
    }
    const handleCalenderDate = (date) => {
        let dateFormat = date.split('/')
        let value = [{
            year: JSON.parse(dateFormat[2]),
            month: JSON.parse(dateFormat[0]),
            day: JSON.parse(dateFormat[1])
        }]
        setDateFormat(value)
        handleCalenderPopUp()
    }
    // const hanldeSubmit = () => {
    //     var option = {}
    //     date.map((item) => {
    //         let data = {
    //             enabled: item.enabled,
    //             time: item.date
    //         }
    //         option[item.week] = data
    //     })
    //     var option2 = {}
    //     var value = {}
    //     calendar.map((item) => {
    //         option2[item.date] = item.time
    //         value = {
    //             date: {
    //                 time: [
    //                     option2
    //                 ]
    //             }
    //         }
    //     })

    //     let propertyId = {
    //         property_id: property_id,
    //         agent_id: localStorage.getItem('userId')
    //     }
    //     let store = { ...option, ...value, ...propertyId }
    //     console.log('store', JSON.stringify(store))
    //     createSchedule(store).then((res) => {
    //         toast.success(res.data.message, {
    //             position: "top-right",
    //             autoClose: 3000,
    //             closeOnClick: true,
    //         });
    //         toggleShow()
    //         console.log('res', res)
    //     })
    // }
    const createAgentSchedular = (data) => {
        createSchedule(data).then((res) => {
            toggleShow()
            console.log('tourSchedule', res)
            toast.success("Schedular Successfully", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
            });
            let firebaseUid = JSON.parse(localStorage.getItem('userInfo'))
            console.log(firebaseUid)
            profileView(firebaseUid.uid).then(async (res) => {
                console.log('profileview', res.data.data)
                dispatch(userResponse(res.data.data))
            })
        }).catch((error) => {
            console.log('error', error)
        })
    }
    const updateAgentSchedular = (data) => {
        updateScheduler(userDetails.meta_id.staff_id, data).then((res) => {
            toggleShow()
            console.log('tourSchedule', res)
            toast.success("Schedular Update Successfully", {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
            });
        }).catch((error) => {
            console.log('error', error)
            createAgentSchedular(data)
        })
    }
    const hanldeSubmit = () => {
        if (errorMessage.message === '' && errorTime.message === '') {
            var option = {}
            date.map((item) => {
                let data = {
                    enabled: item.enabled,
                    hours: item.hours,
                    breaks: item.breaks
                }
                option[item.week] = data
            })
            var data = {
                name: userDetails.name,
                email: userDetails.email,
                workingHours: option,
                agent_id: userDetails._id
            }
            console.log(JSON.stringify(data))
            if (userDetails.meta_id.staff_id === null) {
                createAgentSchedular(data)
            }
            else {
                updateAgentSchedular(data)
            }
        }
    }
    return (
        <div>
            <ToastContainer />
            <Modal show={show} onHide={toggleShow} size="lg">
                <Modal.Header closeButton className="team-popup-margin teampopup-title" >
                    <Modal.Title className='form-field-label form-label-team '>Tour Availability</Modal.Title>
                </Modal.Header>
                <CalendarPopup click={calenderPopUpOpen} toggleClick={handleCalenderPopUp} dateFormat={dateFormat} />
                <Modal.Body className="team-popup-margin pb-0" >
                    <div className='row tourAvailablePopup'>
                        <div className='col-12' onClick={hanldeCloseStartDropDown}>
                            <p>Set Availability</p>
                            <div className='d-flex '>
                                <p style={{ width: '20%' }} className="text-center mb-0">Weekdays</p>
                                <p style={{ width: '30%' }} className="text-center mb-0">Hours</p>
                                <p style={{ width: '40%', paddingLeft: '5%' }} className="text-center mb-0">Breaks</p>
                            </div>
                            {date.map((item, index) => (
                                <div className='d-flex  my-3' key={index}>
                                    <input type="checkbox" checked={item.enabled} className="mt-20 cursor-pointer" onChange={() => handleCheckBox(index)} />
                                    <label className="ps-2 f-16 mt-14 text-capitalize" style={{ width: '20%' }}>{item.week}</label>
                                    {item.enabled === false ? <p style={{ width: "70%" }} className="mt-14">Unavailable</p>
                                        :
                                        <>

                                            <div style={{ width: '30%' }}>
                                                <div className='d-flex flex-row py-1 align-items-center position-relative' >
                                                    <input value={item.hours.from !== "" ? item.hours.from : "00:00"} class="form-control" style={{ height: '43px', borderRadius: '6px' }} onClick={() => handleStartDropDown(index)} />
                                                    <span className='px-2'>-</span>
                                                    <input value={item.hours.to !== "" ? item.hours.to : "00:00"} class="form-control" style={{ height: '43px', borderRadius: '6px' }} onClick={() => handleEndDropDown(index)} />
                                                    {dropDownStart.from === index &&
                                                        <div style={styles.dateList}>
                                                            {time.map((item, timeIndex) => (
                                                                <p className='m-0 cursor-pointer' key={timeIndex} onClick={() => handleSelectStartTime(index, item)}>{item}</p>
                                                            ))}
                                                        </div>
                                                    }
                                                    {dropDownEnd.to === index &&
                                                        <div style={styles.dateList2}>
                                                            {time.map((item, timeIndex) => (
                                                                <p className='m-0 cursor-pointer' key={timeIndex} onClick={() => handleSelectEndTime(index, item)}>{item}</p>
                                                            ))}
                                                        </div>
                                                    }
                                                </div>
                                                {errorTime.index1 === index &&
                                                    <p className='error-msg mb-0'>{errorTime.message}</p>}
                                                {(ErrorDropDownStart.from === index) &&
                                                    <p className='error-msg f-12'>Times overlap with another set of times.</p>
                                                }
                                                {(ErrorDropDownEnd.to === index) &&
                                                    <p className='error-msg f-12'>Times overlap with another set of times.</p>
                                                }
                                            </div>
                                            <div style={{ width: '40%', paddingLeft: '5%' }}>
                                                {item.breaks.map((item2, index2) => (
                                                    <>
                                                        <div className='d-flex flex-row py-1 align-items-center position-relative' key={index2}>
                                                            <input value={item2.from !== "" ? item2.from : "00:00"} class="form-control" style={{ height: '43px', borderRadius: '6px' }} onClick={() => handleBreakStartDropDown(index, index2)} />
                                                            <span className='px-2'>-</span>
                                                            <input value={item2.to !== "" ? item2.to : "00:00"} class="form-control" style={{ height: '43px', borderRadius: '6px' }} onClick={() => handleBreakEndDropDown(index, index2)} />
                                                            <FontAwesomeIcon icon="fa-solid fa-trash" size="lg" className='ms-3 cursor-pointer' onClick={() => handleDateDelete(index, index2)} />
                                                            {dropDownBreakStart.from === index && dropDownBreakStart.startMetaDate === index2 &&
                                                                <div style={styles.dateList}>
                                                                    {time.map((item, timeIndex) => (
                                                                        <p className='m-0 cursor-pointer' key={timeIndex} onClick={() => handleSelectStartBreakTime(index, index2, item)}>{item}</p>
                                                                    ))}
                                                                </div>
                                                            }
                                                            {dropDownBreakEnd.to === index && dropDownBreakEnd.endMetaDate === index2 &&
                                                                <div style={styles.dateList2}>
                                                                    {time.map((item, timeIndex) => (
                                                                        <p className='m-0 cursor-pointer' key={timeIndex} onClick={() => handleSelectEndBreakTime(index, index2, item)}>{item}</p>
                                                                    ))}
                                                                </div>
                                                            }
                                                        </div>
                                                        {errorMessage.index1 === index && errorMessage.index2 === index2 &&
                                                            <p className='error-msg mb-0'>{errorMessage.message}</p>}
                                                    </>
                                                ))}
                                            </div>
                                        </>
                                    }
                                    <FontAwesomeIcon icon="fa-solid fa-plus" size="lg" className='ms-4 cursor-pointer mt-3' onClick={() => handleDateAdded(index)} />
                                </div>
                            ))}

                        </div>
                        {/* <div className='col-6'>
                            <p>Add Date Overrides</p>
                            <div className="col-12 mt-2">
                                <button className="btn primaryColorOutline w-100 f-14 DejaVuSansCondensed br-50" onClick={() => { setDateFormat([]); handleCalenderPopUp() }}>Add Date Overrides</button>
                                <div className='h-410 overflow-y-auto overflow-x-hidden px-2'>
                                    {calendarDetails.length !== 0 &&
                                        <>

                                            {calendarDetails.map((item, index) => (
                                                <div className='row mt-3 cursor-pointer' >
                                                    <div className='col-5' key={index} onClick={() => handleCalenderDate(item.date)}>
                                                        <p className='mb-0 text-capitalize'>{onChangeDate(item.date)}</p>
                                                    </div>
                                                    <div className='col-5 ps-0' onClick={() => handleCalenderDate(item.date)}>
                                                        {item.time.map((item2, i) => (
                                                            <div className='d-flex flex-row ' key={i}>
                                                                <p className='mb-0' >{item2.from}</p>
                                                                <p className='mb-0 px-3' >-</p>
                                                                <p className='mb-0'>{item2.to}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className='col-1 ps-4'>
                                                        <FontAwesomeIcon icon="fa-solid fa-trash" size="lg" className='cursor-pointer' onClick={() => hanldeDelectCalender(index)} />
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    }
                                </div>
                            </div>
                        </div> */}
                    </div>
                </Modal.Body>
                <Modal.Footer className="team-popup-margin teampop-footer justify-content-center" >
                    <button className='btn btn-secondary w-25' onClick={toggleShow}>Cancel</button>
                    <button className='btn primaryColor w-25' onClick={hanldeSubmit}>Submit</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
const styles = {
    dateList: {
        left: '2px',
        top: '49px',
        background: 'white',
        padding: '13px',
        boxShadow: '1px 2px 8px 0 rgb(0 0 0 / 20%)',
        width: '50%',
        border: '1px solid gray',
        borderRadius: '5px',
        position: "absolute",
        height: '126px',
        overflow: 'auto',
        zIndex: '1'
    },
    dateList2: {
        left: '113px',
        top: '49px',
        background: 'white',
        padding: '13px',
        boxShadow: '1px 2px 8px 0 rgb(0 0 0 / 20%)',
        width: '50%',
        border: '1px solid gray',
        borderRadius: '5px',
        position: "absolute",
        height: '126px',
        overflow: 'auto',
        zIndex: '1'
    }
}
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';
import TourConfirmPopup from '../popup/tourConfirmPopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from '@hassanmojab/react-modern-calendar-datepicker';
// import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar, utils } from "react-modern-calendar-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import { calenderResponse } from '../../state/calenderPopUp';

export default function CalendarPopup(props) {
  const [confirm, setConfirm] = useState(false);
  const [dateState, setDateState] = useState([])
  const [date,setDate]=useState([])
  const [isSelect, setIsSelect] = useState(false)
  const [calendar, setCalender] = useState([])
  const calendarData = useSelector(state => state.calender.calenderDetails)
  const [isTrue, setIsTrue] = useState(true)

  const { click, toggleClick,dateFormat } = props;

  useEffect(() => {
    if (calendarData.length !== 0) {
      setCalender(calendarData)
    }
    else {
      setCalender([])
    }
  }, [calendarData])

  useEffect(()=>{
    if(dateFormat !== undefined && dateFormat.length !==0){
      changeDate(dateFormat)
      console.log(dateFormat)
    }
    else{
      setDateState([])
    }
  },[dateFormat])
  const changeDate = (e) => {
    console.log(e)
    if (e.length !== 0) {
      setIsTrue(false)
      var sortPicker = []
      e.map((item) => {
        let date = item.month + '/' + item.day + '/' + item.year
        sortPicker.push(date)
      })
      setDate(sortPicker)
      if (isTrue) {
        if (calendar.length !== 0) {
          let data = calendar.find(time => time.date === sortPicker[0])
          console.log(data)
          if (data !== undefined) {
            data.time.map((item) => {
              let data = {
                from: item.from,
                to: item.to
              }
              hour.push(data)
            })
          }
          else {
            hour.push({ from: '7:00am', to: '9:00am' })
          }
        }
        else {
          hour.push({ from: '7:00am', to: '9:00am' })
        }
      }
      setIsSelect(true)
      setDateState(e)
    }
    else {
      setIsTrue(true)
      setHour([])
      setIsSelect(false)
      setDateState(e)
    }

  }
  const [hour, setHour] = useState([])
  const [dropDownStart, setDropDownStart] = useState(null)
  const [dropDownEnd, setDropDownEnd] = useState(null)
  const [ErrorDropDownStart, setErrorDropDownStart] = useState(null)
  const [ErrorDropDownEnd, setErrorDropDownEnd] = useState(null)
  const toggleConfirm = () => setConfirm(p => !p);
  const [time, setTime] = useState(['12:00am', "12:30am", '1:00am', "1:30am", "2:00am", "2:30am", "3:00am",
    '3:30am', '4:00am', '4:30am', '5:00am', '5:30am', '6:00am', '6:30am', '7:00am'
    , '7:30am', '8:00am', '8:30am', '9:00am', '9:30am', '10:00am', '10:30am', '11:00am',
    '11:30am', '12:00pm', "12:30pm", '1:00pm', "1:30pm", "2:00pm", "2:30pm", "3:00pm", '3:30pm',
    '4:00pm', '4:30pm', '5:00pm', '5:30pm', '6:00pm', '6:30pm', '7:00pm', '7:30pm',
    '8:00pm', '8:30pm', '9:00pm', '9:30pm', '10:00pm', '10:30pm', '11:00pm', '11:30pm',])

  console.log('props', props)
  const dispatch = useDispatch()
  const handleAddHours = () => {
    let data = [...hour]
    if (data.length === 0) {
      data.push({ from: '7:00am', to: '9:00am' })
    }
    else {
      let list = data[data.length - 1]
      console.log('add list', list)
      let value = time.indexOf(list.to)
      let startTime = value + 2
      let endTime = value + 4
      if (startTime >= 48) {
        startTime = startTime - 48
      }
      if (endTime >= 48) {
        console.log(endTime)
        endTime = endTime - 48
      }
      let uniquive = data.map((item) => item.from)
      let values = Array.from(new Set(uniquive))
      console.log(values, uniquive)
      data.push({ from: time[startTime], to: time[endTime] })
    }
    console.log('Add data', data)
    setHour(data)
  }

  const hanldeDeleteHours = (index) => {
    let data = [...hour]
    data.splice(index, 1)
    setHour(data)
  }
  const hanldeClickFrom = (index) => {
    setDropDownStart(index)
  }
  const handleClickTo = (index) => {
    setDropDownEnd(index)
  }
  const handleCloseDropDown = () => {
    if (dropDownStart !== null || dropDownEnd !== null) {
      setDropDownStart(null)
      setDropDownEnd(null)
    }
  }

  const handleSelectStartTime = (index, time) => {
    console.log(index, time)
    let data = [...hour]
    console.log(data)
    data[index].from = time
    let uniquive = data.map((item) => item.from)
    let value = Array.from(new Set(uniquive))
    console.log(value, uniquive)
    if (value.length !== uniquive.length) {
      setErrorDropDownStart(index)
      console.log('duplicate')
    }
    else {
      setErrorDropDownStart(null)
    }
    setHour(data)
  }
  const handleSelectEndTime = (index, time) => {
    let data = [...hour]
    data[index].to = time
    let uniquive = data.map((item) => item.to)
    let value = Array.from(new Set(uniquive))
    console.log(value, uniquive)
    if (value.length !== uniquive.length) {
      setErrorDropDownEnd(index)
      console.log('duplicate')
    }
    else {
      setErrorDropDownEnd(null)
    }
    setHour(data)
  }
  const hanldeSubmitTour = () => {
    let value = [...calendar]
    date.map((item) => {
      value.map((item2, index) => {
        if (item === item2.date) {
          value.splice(index, 1)
        }
      })
    })
    console.log('values', value)
    date.map((item) => {  
      let data = {
        date: item,
        time: hour
      }
      value.push(data)
    })
    value.sort((a,b)=>new Date(a.date) - new Date(b.date))
    console.log(value)
    dispatch(calenderResponse(value))
    toggleClick()
    setDateState([])
    setIsTrue(true)
    setHour([])
    setIsSelect(false)
  }
  const handlePopUpClose=()=>{
    setDateState([])
    setIsTrue(true)
    setIsSelect(false)
    setHour([])
    toggleClick()
  }
  return (
    <div >
      <TourConfirmPopup confirm={confirm} toggleConfirm={toggleConfirm} />
      <Modal show={click} onHide={handlePopUpClose} className="special_modal" dialogClassName="my-modal">
        <Modal.Header closeButton className="calendar-popup-margin teampopup-title" >
          <Modal.Title className='form-field-label form-label-team' style={{ fontFamily: "DejaVuSansBold" }}>Pick a Date to Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
          <div onClick={handleCloseDropDown} className="tourAvailiablePopUp">
            <Calendar
              value={dateState}
              onChange={(date) => changeDate(date)}
              className={style1.Calendar}
              minimumDate={utils().getToday()}
            />
            {isSelect === true &&
              <>

                <p className='mt-3' style={{ fontFamily: "DejaVuSansBold" }}>Select a Time</p>
                <div className='d-flex w-100' >
                  {hour.length !== 0 ?
                    <div className='w-60'>
                      {hour.map((item, index) => (
                        <>
                          <div className='d-flex flex-row py-1 align-items-center position-relative' key={index}>
                            <input className="form-control" value={item.from} style={{ height: '43px', borderRadius: '6px' }} onClick={() => hanldeClickFrom(index)} />
                            <span className='px-2'>-</span>
                            <input className="form-control" value={item.to} style={{ height: '43px', borderRadius: '6px' }} onClick={() => handleClickTo(index)} />
                            <FontAwesomeIcon icon="fa-solid fa-trash" size="lg" className='ms-3 cursor-pointer' onClick={() => hanldeDeleteHours(index)} />
                            {dropDownStart === index &&
                              <div style={styles.dateList}>
                                {time.map((item, timeIndex) => (
                                  <p className='m-0 cursor-pointer' key={timeIndex} onClick={() => handleSelectStartTime(index, item)}>{item}</p>
                                ))}
                              </div>
                            }
                            {dropDownEnd === index &&
                              <div style={styles.dateList2}>
                                {time.map((item, timeIndex) => (
                                  <p className='m-0 cursor-pointer' key={timeIndex} onClick={() => handleSelectEndTime(index, item)}>{item}</p>
                                ))}
                              </div>
                            }
                          </div>
                          <div>
                            {ErrorDropDownStart === index &&
                              <p className='error-msg f-12'>Times overlap with another set of times.</p>
                            }
                            {ErrorDropDownEnd === index &&
                              <p className='error-msg f-12'>Times overlap with another set of times.</p>
                            }
                          </div>
                        </>
                      ))}
                    </div>
                    : <p className='mt-3'>Unavailable</p>
                  }
                  <FontAwesomeIcon icon="fa-solid fa-plus" size="lg" className='ms-4 cursor-pointer mt-3 ms-auto' onClick={handleAddHours} />
                </div>
              </>}
          </div>
        </Modal.Body>
        <Modal.Footer className="team-popup-margin teampop-footer" >
          <Button variant="primary" onClick={hanldeSubmitTour} className='teamnext-submit-btn row col-lg-12 col-xl-12 col-md-12'>
            Apply
          </Button>
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
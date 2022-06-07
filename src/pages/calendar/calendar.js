
import React, {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import * as style1 from '../../pages/dashboard/detail.module.css'

export default function App() {
  const [dateState, setDateState] = useState(new Date())
  const changeDate = (e) => {
    setDateState(e)
    console.log(e)
  }
  return (
    <>
      <Calendar 
      value={dateState}
      onChange={changeDate}
      className={style1.Calendar}
      minDate={new Date()}
      selectRange={true}
      />
    {/* <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p> */}
    </>
  )
}
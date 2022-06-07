import React,{useState} from "react";
import * as styles from '../seller/seller.module.css';
import sendimage from '../../../static/images/Group327.png';


export default function Chat() {
  const [open, setOpen] = useState(false)
  const toggleClose=()=>{
    setOpen(false);
  }
  return (
    <div className="chattingback">
   
      <div className="chatbackground d-flex justify-content-between position-relative">
      <p className="chatting">Chatting</p>
      <i className="fa fa-close" style={{position:"absolute",right:"16px",top:"14px",color:"white"}} onClick={toggleClose}></i>
      </div>
      <div className="chatinput">
        <input type="text" name="createGroup" placeholder="Message" className="chatfield" />
        <img src={sendimage} alt="sendimage" className="send" />
      </div>

    </div>
  )
}
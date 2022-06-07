import React,{useState} from "react";
import { Modal, Button,Card } from 'react-bootstrap';
import * as style1 from '../../pages/dashboard/detail.module.css';
import TourDetailHome from '../../../static/images/TourDetailHome.png'
import calendar from '../../../static/images/Iconfeather-calendar.png'
import clock from '../../../static/images/Iconfeather-clock.png'
import user from '../../../static/images/Iconfeather-user.png'

function DeclinePopup(props) {
    const {detail, toggleDetail} = props;
  
  
  
  return (
    <div>
      <Modal show={detail} onHide={toggleDetail}>
        <Modal.Header closeButton className="team-popup-margin teampopup-title " >
          <Modal.Title className='form-field-label form-label-team '>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="team-popup-margin pb-0" >
          <div>
              <img src={TourDetailHome} alt="TourDetailHome" className={style1.TourDetailHomeImage} />
              <div className={style1.tourDetailcard}>
         <div className={style1.tourAddress}>
             <h5 className={style1.tourAddressText}>1890 Fulton St</h5>
             <h5 className={style1.tourAddressText}>Saratoga, CA 95071</h5>
             <h5 className={style1.tourAddressText}>$2,900,000</h5>
         </div>
         <div>
          <Card
            className={style1.tourCard}
            style={{
              borderRadius: "5px",
              boxShadow:
                "0 1px 4px rgb(82 80 80 / 40%), inset 0 0 40px rgb(135 128 128 / 8%)",
            }}
          >
            <div className="row m-0">
              <div className="col-md-4 cardtext2 mt-3">
                <p>
                  <b>4</b>
                </p>
                <p style={{ color: "#898686" }}>Beds</p>
              </div>
              <div className="col-md-4 cardtext2 mt-3">
                <p>
                  <b>4</b>
                </p>
                <p style={{ color: "#898686" }}>Baths</p>
              </div>
              <div className="col-md-4 cardtext2 mt-3">
                <p>
                  <b>2,819</b>
                </p>
                <p style={{ color: "#898686" }}>Sq. Feet</p>
              </div>
            </div>
          </Card>
        </div>
        </div>
         <div>
             <h5 className={style1.tourHead}>Tour Details</h5>
             <div className={style1.tourdetails}>
             <div className={style1.tourdetailtext}>
             <img src={calendar} alt="calendar" className={style1.calendarImage} />
             <h6 className={style1.tourName}>Wed.Feb 13</h6>
             </div>
             <div className={style1.tourdetailtext}>
             <img src={clock} alt="clock" className={style1.clockImage} />
             <h6 className={style1.tourName}>02:00 PM</h6>
             </div>
             <div className={style1.tourdetailtext}>
             <img src={user} alt="user" className={style1.userImage} />
             <h6 className={style1.tourName}>Julie Parker</h6>
             </div>
             </div>
         </div>
          </div>
          
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default DeclinePopup
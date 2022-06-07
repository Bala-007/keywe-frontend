import React from "react";
import { Card } from "react-bootstrap";
import marugarite from '../../../static/images/Mask Group 56.png';
import sendimage from '../../../static/images/Group327.png';
import elips from '../../../static/images/Ellipse163.png';
import * as styles from '../seller/seller.module.css'
import { ListItem } from "@material-ui/core";
function MessageDetail(props) {
  
  const { message, email } = props;
  const isOwnMessage = message.author === email;
  return (
    // <div className={styles.cardback}>
    //     <Card style={{
    //             borderRadius: "25px",
    //             boxShadow:
    //               "0px 5px 8px #ddd",
    //               border: "none",
    //               minHeight: "100%"
    //           }}>
    //         <div className={styles.marugaritedetails}>
    //             <div >
    //                 <img src={marugarite} alt="marugarite" />
    //             </div>
    //             <div className={styles.onlineName}>
    //                 <p style={{fontFamily:"DejaVuSansBold"}}>Marguerite Goodwin</p>
    //                 <div className={styles.eliptext}>
    //                 <i class="fa fa-circle" style={{ color: "#6DD400" }}></i>
    //                     <p style={{fontFamily:"DejaVuSansCondensed", marginLeft:"5px"}}>Online</p>
    //                 </div>
    //             </div>
    //         </div>
    //         <Card className={styles.chatCard1}>
    //           <p className={styles.chattext1}>This text is for sample purposes only, it will be replaced with the actual text later.</p>
    //           <p className={styles.chattime1}>4:24 pm</p>
    //         </Card>
    //         <Card className={styles.chatCard2}>
    //         <p className={styles.chattext2}>This text is for sample purposes only.</p>
    //         <p className={styles.chattime2}>4:26 pm</p>
    //         </Card>
    //         <Card className={styles.chatCard1}>
    //           <p className={styles.chattext1}>This text is for sample purposes only, it will be replaced with the actual text later.</p>
    //           <p className={styles.chattime1}>4:31 pm</p>
    //         </Card>
    //         <Card className={styles.chatCard2}>
    //         <p className={styles.chattext2}>This text is for sample purposes only.</p>
    //         <p className={styles.chattime2}>4:35 pm</p>
    //         </Card>
    //         <Card className={styles.chatCard1}>
    //           <p className={styles.chattext1}>This text is for sample purposes only.</p>
    //           <p className={styles.chattime1}>4:36 pm</p>
    //         </Card>
    //         <Card className={styles.chatCard2}>
    //         <p className={styles.chattext2}>This text is for sample purposes only.</p>
    //         <p className={styles.chattime2}>4:52 pm</p>
    //         </Card>
    //         <Card className={styles.chatCard1}>
    //           <p className={styles.chattext1}>This text is for sample purposes only, it will be replaced with the actual text later.</p>
    //           <p className={styles.chattime1}>5:02 pm</p>
    //         </Card>
    //         <div className={styles.chatinput}>
    //         <input type="text" name="createGroup" placeholder="Message" className={styles.chatfield} />
    //         <img src={sendimage} alt="sendimage" className={styles.sendimage} />
    //         </div>
    //     </Card>
    // </div>
    <div>
      <ListItem style={style.listItem(isOwnMessage)}>
        <div style={style.author}>{message.author}</div>
        <div style={style.container(isOwnMessage)}>
          {message.body}
          <div style={style.timestamp}>
            {new Date(message.dateCreated.toISOString()).toLocaleString()}
          </div>
        </div>
      </ListItem>
    </div>

  )
}
const style = {
  listItem: (isOwnMessage) => ({
    flexDirection: "column",
    alignItems: isOwnMessage ? "flex-end" : "flex-start",
  }),
  container: (isOwnMessage) => ({
    maxWidth: "75%",
    borderRadius: 12,
    padding: 16,
    color: "white",
    fontSize: 12,
    backgroundColor: isOwnMessage ? "#054740" : "#262d31",
  }),
  author: { fontSize: 10, color: "gray" },
  timestamp: { fontSize: 8, color: "white", textAlign: "right", paddingTop: 4 },
};
export default MessageDetail
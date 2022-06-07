import React, { useState } from "react"
import { VscArrowRight } from "react-icons/vsc"
import * as styles from "../../pages/seller/sellerProp.module.css"
function PropActivity() {
  const activity = [
    {
      name: "11 % Decrease in Tours",
      dataone: "2 Upcoming Tours Scheduled",
    },
    {
      name: "12 Propspect Buyers",
      dataone: "1 buyer has left the market",
    },
    {
      name: "2 New comparables",
    },
    {
      name: "3 % Decrease in viewership",
      dataone: "#16 This Week",
    },
    {
      name: "2 Downloads this week",
    },
  ]
  return (
    <div className="row m-0">
      <table>
        {activity.map(act => (
          <tr
            style={{
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <td>
              <p className={styles.docOne2}>
                {act.name}
                <br />
                <span className={styles.docOne3}>{act.dataone}</span>
              </p>
            </td>
            <td>
              <VscArrowRight size={30} style={{ display: "flex" }} />
            </td>
          </tr>
        ))}
      </table>
      <p style={{ color: "#0490fb", margin: "0", padding: "20px 0" }}>
        View All Activity
      </p>
    </div>
  )
}

export default PropActivity

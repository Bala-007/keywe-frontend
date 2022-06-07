import React from "react"
import * as styles from "../../pages/seller/sellerProp.module.css"
import { Button } from "react-bootstrap"
function RealVitalize() {
  return (
    <div className="row m-0">
      <div style={{ paddingTop: "20px" }}>
        <p className={styles.vitalize}>RealVitalize</p>
        <hr />
      </div>
      <p className={styles.vitalizetext}>
        You can raise the price of your home by making updates.
        <br />
        View RealVitalize to see your options.
      </p>

      <div>
        <Button
          className="viewvitalize-btn"
          variant="primary"
          style={{ fontFamily: "DejaVuSansCondensed" }}
        >
          Add RealVitalize
        </Button>
        <hr />
      </div>
    </div>
  )
}
export default RealVitalize

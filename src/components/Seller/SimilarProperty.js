import React from "react"
import * as styles from "../../pages/seller/sellerProp.module.css"
import { Card } from "react-bootstrap"
import image90 from "../../../static/images/Image 90.png"

function SimilarProperty() {
  const data = [
    {
      data1: 44,
      data2: 12,
    },
  ]
  const renderProductList = () => {
    let products = []
    let remainder = 2

    for (let i = 1; i <= remainder; i++) {
      products.push(
        <div key={i}>
          <Card className={styles.propCard1}>
            <div>
              <img src={image90} alt="image90" className={styles.propImage} />
              <div className="cardtext1">
                <p
                  style={{
                    fontSize: "11px",
                    fontFamily: "DejavuSansCondensed",
                  }}
                >
                  1070 Ogwuh Path
                  <br />
                  Saratoga, CA 95071
                  <br />
                  <span
                    style={{ fontSize: "11px", fontFamily: "DejavuSansBold" }}
                  >
                    $2,799,000
                  </span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      )
    }
    return products
  }
  return (
    <div className="row m-0">
      <div className={styles.similarback1}>
        <p className={styles.similar}>Simlilar Properties</p>
        <div className={styles.simCard2}>{renderProductList()}</div>
      </div>
    </div>
  )
}
export default SimilarProperty

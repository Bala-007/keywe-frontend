import React from "react"
import * as styles from "../../pages/seller/sellerProp.module.css"

function RecentlySold() {
  const soldData = [
    {
      image: (
        <img
          className={styles.imageList}
          src="/images/image 33.png"
          alt="image30"
        />
      ),

      price: "2,600,000",
      adrsFir: "885 Ronec Way",
      adrsSec: " Saratoga, CA 95070",
      bed: 3,
      bath: 3,
    },
    {
      image: (
        <img
          className={styles.imageList}
          src="/images/image 35.png"
          alt="image30"
        />
      ),
      price: "2,830,000",
      adrsFir: "1003 Betu Path",
      adrsSec: "Saratoga, CA 95070",
      bed: 3,
      bath: "2.5",
    },
  ]
  return (
    <div className="row m-0">
      <div className={styles.similarback3}>
        <p className={styles.similarRecent}>Recently Sold Comparables</p>

        {soldData.map(sold => (
          <div className="row" style={{ marginBottom: "30px" }}>
            <div
              className="col-md-3"
              style={{
                width: "112px",
                height: "87px",
                position: "relative",
                justifyContent: "space-evenly",
              }}
            >
              {sold.image}
            </div>

            <div
              className="col-md-5"
              style={{
                fontSize: "12px",
                position: "relative",
                left: "50px",
                paddingTop: "10px",
              }}
            >
              <span className={styles.recently}>
                <b>${sold.price}</b>
              </span>{" "}
              <br />
              <span className={styles.recently1}>{sold.adrsFir}</span> <br />
              <span className={styles.recently1}>{sold.adrsSec}</span> <br />
              <span
                style={{ fontSize: "12px", fontFamily: "DejaVuSansCondensed" }}
              >
                {sold.bed}bed,&nbsp;{sold.bath} bath
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default RecentlySold

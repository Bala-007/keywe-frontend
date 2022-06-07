import React from "react"
import * as styles from "../../pages/seller/sellerProp.module.css"
import Prop3 from "../../../static/images/Prop3.png"
import Prop4 from "../../../static/images/Prop4.png"
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi"
function GalleryActivity() {
  const galleryData = [
    {
      image: (
        <img
          className={styles.imageList}
          src="/images/image 31.png"
          alt="image30"
        />
      ),
      like: 42,
      dislike: 12,
    },
    {
      image: (
        <img
          className={styles.imageList}
          src="/images/image 31.png"
          alt="image31"
        />
      ),
      like: 12,
      dislike: 2,
    },
    {
      image: (
        <img
          className={styles.imageList}
          src="/images/image 31.png"
          alt="image30"
        />
      ),
      like: 12,
      dislike: 2,
    },
  ]

  return (
    <div className="row m-0">
      <div className={styles.similarback2}>
        <p className={styles.activeOffer}>Gallery Activity</p>
        <div>
          <ul className={styles.ulList}>
            {galleryData.map(gal => (
              <li className={styles.liList}>
                {gal.image}

                <div
                  className="row"
                  style={{
                    paddingLeft: "40px",
                    fontSize: "12px",
                    fontFamily: "DejaVuSansCondensed",
                    color: "#747373",
                  }}
                >
                  <div className="col-md-4">
                    <FiThumbsDown className={styles.iconUp} />
                  </div>
                  {gal.like}
                  <div className="col-md-4">
                    <FiThumbsDown className={styles.iconUp} />
                  </div>
                  {gal.dislike}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default GalleryActivity

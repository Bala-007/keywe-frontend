import React from "react"
import { render } from "react-dom"
import _ from "lodash"
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import * as styles from "../../pages/seller/sellerProp.module.css"
import { height } from "@mui/system"
function RadialSeparator(props) {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        transform: `rotate(${props.turns}turn)`,
      }}
    >
      <div style={props.style} />
    </div>
  )
}

function RadialSeparators(props) {
  return props.values.map(value => (
    <RadialSeparator turns={value} style={props.style} />
  ))
}

function RoundBar() {
  const percentage = 50
  const strokeWidth = 10
  const rotation = 0.625
  const circleRatio = 0.75
  const val = 0.94
  const numSeparators = 20
  const numSeparators1 = 5
  const meterData = 5
  return (
    <div
      style={{
        width: "210px",
        height: "212px",
        margin: "0 auto",
        paddingTop: "40px",
      }}
    >
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={strokeWidth}
        circleRatio={circleRatio}
        styles={buildStyles({
          strokeLinecap: "round",
          rotation: rotation,
          trailColor: "#f2f2f2",
          pathColor: "#0fab81",
        })}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RadialSeparators
            values={_.range(numSeparators + 1).map(
              index => (circleRatio / numSeparators) * index + rotation
            )}
            style={{
              background: "#d3d3d3",
              width: "2px",
              height: "2%",
              marginTop: -10,
            }}
          />

          <div className={styles.BarInfo}>
            <span
              style={{
                display: "flex",
                fontSize: "14px",
                alignitems: "center",
                justifyContent: "center",
                color: "#404040",
                fontFamily: "SFPro-regular",
              }}
            >
              KeyWe Ranking
            </span>

            <span
              style={{
                fontSize: "50px",
                fontWeight: "bold",
                color: "#0fab81",
                display: "flex",
                alignitems: "center",
                justifyContent: "center",
                fontFamily: "unset",
                marginTop: "-7px",
              }}
            >
              {percentage}
            </span>
          </div>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  )
}

export default RoundBar

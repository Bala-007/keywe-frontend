import React, { Component, useState } from "react"
import GoogleMapReact from "google-map-react"

const AnyReactComponent = ({ text }) => <div className="mapView"><i className="fa fa-map-marker f-24 color-red" aria-hidden="true"></i>
</div>

function PropMap(props) {
  const data={
    lat:props.location.coordinates[1],
    lng:props.location.coordinates[0] 
  }
  console.log('location',data)

    return (
      // Important! Always set the container height explicitly
      <div style={{ display: "flex" }}>
        <div style={{ width: "440px", height: "350px", overflow: "visible" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAbQxNOlxvLU3I_XZAluQeFBAPrj6Ua2Jk",
            }}
            center={data}
            defaultZoom={11}
          >
            <AnyReactComponent
              lat={data.lat}
              lng={data.lng}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    )
}

export default PropMap

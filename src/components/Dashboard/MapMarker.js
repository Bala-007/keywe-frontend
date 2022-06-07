// import React, { useEffect, useState } from "react";
// import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
// const Map = withGoogleMap((props) => {
//     const [location, setLocation] = useState({
//         lat: 39.6693,
//         lng: -98.3476
//     })
//     // const [mapCenter, setMapCenter] = useState({})
//     const recycleCenters = props.recycleCenters;
//     // const mapSearch = props.mapSearch
//     // console.log('mapSearch',mapSearch)
//     // useEffect(() => {
//     //     console.log('hi')
//     //     if (mapSearch !== undefined && Object.keys(mapSearch).length !==0) {
//     //         console.log('google',mapSearch)
//     //         let data = {
//     //             lat: mapSearch.lat,
//     //             lng: mapSearch.lng,
//     //             zoom: mapSearch.zoom
//     //         }
//     //         setMapCenter(data)
//     //     }
//     //     else {
//     //         console.log('google',mapSearch)
//     //         let data = {
//     //             lat: 39.6693,
//     //             lng: -98.3476,
//     //             zoom: 4.5
//     //         }
//     //         setMapCenter(data)
//     //     }
//     // }, [mapSearch])

//     //console.log("recycleCenters", recycleCenters);
//     // {recycleCenters.map(center => (
//     //     // console.log("center",center)
//     //     console.log("center",center.location.coordinates[0],center.location.coordinates[1])
//     // ))};

//     // const [highlightId, setHighlightId] = useState('');

//     // const markerDetail = (selectedCardId) => {
//     //     alert("here");
//     //     setHighlightId( selectedCardId);
//     // }
//     const hanldeGoogleMap = (center) => {
//         if (center._id) {
//             console.log('lat', center.location.coordinates[1], center.location.coordinates[0])
//             setLocation({ ...location, lat: center.location.coordinates[1], lng: center.location.coordinates[0] })
//         }
//     }

//     return (
//         <>
//             <GoogleMap zoom={4} defaultCenter={{ lat: location.lat, lng: location.lng }} >
//                 {/* <GoogleMap zoom={11} center={ { lat:  59.95, lng: 30.33 } } > */}

//                 {recycleCenters.map(center => {
//                     //console.log("center",center.location.coordinates[0],center.location.coordinates[1]);
//                     return (
//                         <Marker
//                             key={center._id}
//                             id={center._id}
//                             position={{
//                                 lat: center.location.coordinates[1],
//                                 lng: center.location.coordinates[0]
//                             }}
//                             labelStyle={{ width: "50px", height: "50px" }}
//                             icon={{
//                                 url: '/images/marker.png',
//                                 //anchor: new google.maps.Point(5, 58),
//                             }}
//                             onClick={() => { props.markerDetail(center._id); hanldeGoogleMap(center) }}

//                         />
//                     )
//                 })}
//             </GoogleMap>
//         </>
//     )
// })
// export default Map;


import React, { useEffect, useState } from "react"
import GoogleMapReact from "google-map-react"
import { useDispatch, useSelector } from 'react-redux';

function PropMap(props) {
    const [location, setLocation] = useState({
        lat: 39.6693,
        lng: -98.3476,
        zoom:5
    })
    const defaultLocation={
        lat: 39.6693,
        lng: -98.3476,
        zoom:5
    }
    const recycleCenters = props.recycleCenters;
    const googleSearch = useSelector(state => state.dashboard.googleSearch)
    console.log('recycleCenter',recycleCenters)

    const handleScrollView=async(center)=>{
        setLocation({...location,lat:center.location.coordinates[1],lng:center.location.coordinates[0],zoom:14})
        await props.markerDetail(center)
        await props.scrollList()
    }

    useEffect(()=>{
        if(googleSearch!== undefined && Object.keys(googleSearch).length !==0 && googleSearch.lat !==null){
            setLocation({...location,lat:googleSearch.lat,lng:googleSearch.lng,zoom:googleSearch.zoom})
        }else{
            setLocation({...location,lat:defaultLocation.lat,lng:defaultLocation.lng,zoom:defaultLocation.zoom})
        }
    },[googleSearch])
    const AnyReactComponent = ({ center }) => <div className="mapView" onClick={() => handleScrollView(center)}>
        <i className="fa fa-circle cursor-pointer" style={{ color: "#FF0A00", fontSize: '15px', border: '2px solid white', borderRadius: '50%' }}></i>
    </div>

    return (

        <div style={{ width: "100%", height: "800px", overflow: "visible" }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyAbQxNOlxvLU3I_XZAluQeFBAPrj6Ua2Jk",
                }}
                zoom={location.zoom}
                center={{ lat: location.lat, lng: location.lng }}
            >
                {recycleCenters.map(center => (
                    <AnyReactComponent  lat={center.location.coordinates[1]}  lng={center.location.coordinates[0]}  center={center} />
                ))}
            </GoogleMapReact>
        </div>
    )
}

export default PropMap


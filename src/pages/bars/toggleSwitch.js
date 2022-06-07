import React, { useState } from "react";
import { Switch } from "antd";

function ToggleSwitch() {
    const [toggle, setToggle]=useState(false);

    const toggler=()=>{
        toggle ? setToggle(false):setToggle(true);
    }
    return (
        <Switch style={{marginLeft:"10px",marginTop:"12px", }} onClick={toggler}  />
    )
}
export default ToggleSwitch

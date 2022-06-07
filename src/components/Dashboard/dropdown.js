import React,{ useState } from "react";
import  './dashboardlist.css';

function Dropdown({selected,setSelected}){
    const [isActive,setIsActive]=useState(false);
    const options =["A-Z","Z-A","Price","Beds","Baths","SquareFeet"];
    return(
        <div className='dropdown'>
        <div className='dropdown-btn' onClick={(e)=>
            setIsActive(!isActive)}>
                {selected}
                <span className="fa fa-caret-down"></span>
                </div>
        {isActive && (
        <div className='dropdown-content'>
            {options.map((option)=>(
          <div onClick={(e)=>{
              setSelected(option)
               setIsActive(false)
               }} 
               className='dropdown-item'>
           {option}
          </div>
         ))}
        </div>
        
        )}  
        </div>
    )
}
export default Dropdown
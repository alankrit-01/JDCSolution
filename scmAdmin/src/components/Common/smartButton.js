import React from "react";
const SmartButton = (props) =>{
    return(
        <>
        <button className={props.className} type={props.type}>{props.btnValue}</button>
        </>
    )
}
export default SmartButton; 
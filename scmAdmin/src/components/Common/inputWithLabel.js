import React from "react";
const InputWithLabel = (props) =>{
    return(
        <>
        <label className={props.labelTitle}  style={props.style}>{props.labelTitle}</label>
        <input type={props.type} name={props.name} className={props.className} value={props.value} onChange={(e) => props.fun(e.target.value)} placeholder={props.inputPlaceHolder} />
        {(props.error)?<span className="errorMessage">{props.error}</span>:'' }
        </>
    )
}
export default InputWithLabel 
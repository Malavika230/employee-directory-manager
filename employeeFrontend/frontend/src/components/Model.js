import React from 'react'
import './Model.css'
import { GrClose } from "react-icons/gr";

function Model({open, children, onClose}) {
    if(!open)
    return null;
    return (
    <>
    <div className='overlay'/>
    <div className='empPopup'>
    <button className="buttonClose" onClick={onClose}>< GrClose /></button>
    {children}
    </div>
    </>
  )
}

export default Model
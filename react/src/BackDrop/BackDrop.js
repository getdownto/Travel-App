import React from 'react'
import '../BackDrop/BackDrop.css'
const Backdrop = (props) => {
    return (
    <div className="Backdrop" onClick={props.show}>{props.children}</div>
    )
}
export default Backdrop
import React from 'react'
import './AdditionalTrip.css'

const AdditionalTrip = (props) => {
    return (
        <div className="ItemCart Aligned">
            <div className="CartContent">
                <p>{props.destination}</p>
                <p className="InlinePrice">${props.price}</p>
            </div>
            <button className="Btn" id={props.id} onClick={props.clicked}>Add</button>
            {props.visible ? <img className="confirmIcon" src="/confirm.svg"></img> : null}
        </div>
    )
}
export default AdditionalTrip
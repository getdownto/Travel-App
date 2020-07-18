import React from 'react'
import './DynamicInput.css'

const DynamicInput = (props) => {
    return (
        <div className="Dynamic">
            <input type="text" name="trip" placeholder="Destination" value={props.tripValue} onChange={props.changed}></input>
            <input className="PriceField" type="text" name="price" placeholder="Price" value={props.priceValue} onChange={props.changed}></input>
            <button className="InnerBtn" onClick={props.delete}>REMOVE</button>
        </div >
    )
}
export default DynamicInput
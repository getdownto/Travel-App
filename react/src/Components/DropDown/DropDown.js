import React from 'react'

const DropDown = (props) => {
    return (
        <div>
            <select name="status" value={props.status} onChange={props.handleSelect}>
            <option id="0" >NEW</option>
            <option id="1" >CONFIRMED</option>
            <option id="1" >CANCELLED</option>
        </select>
        </div>
    )
}
export default DropDown
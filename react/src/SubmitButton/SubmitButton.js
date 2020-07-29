import React from 'react'
import './SubmitButton.css'

const SubmitButton = (props) => {
    return (
        <div>
            <button className="SubmitBtn" onClick={props.submit}>{props.children}</button>
        </div>
    )
}
export default SubmitButton
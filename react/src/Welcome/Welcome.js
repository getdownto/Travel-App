import React from 'react'
import './Welcome.css'

const Welcome = (props) => {
    return (
        <div className="WelcomeBox">
            <div className="Yellow"></div>
            <div>
                <h1 className="Welcome">{props.welcome}</h1>
                <h5>The Wilderness is Waiting for You</h5>
            </div>
        </div>
    )
}
export default Welcome
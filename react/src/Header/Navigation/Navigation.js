import React from 'react'
import './Navigation.css'

const Navigation = (props) => {
    return (
        <nav>
            <div className="Navigation">
                <p className="Logo">OFF THE MAP</p>
                <ul className="Menu">
                    <li><a href="#home">HOME</a></li>
                    <li><a href="#about">ABOUT</a></li>
                    <li><a href="#contacts">CONTACTS</a></li>
                </ul>
                <button className="LoginBtn">LOGIN</button>
            </div>
        </nav>
    )
}
export default Navigation
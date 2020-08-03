import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import {Link} from 'react-router-dom'
import Aux from '../hoc/Auxiliary'
import '../Header/Header.css'

const Header = (props) => {
    return (

        <Aux>
        <div className="HeroText">
            <h4>OFF THE MAP</h4>
            <h1>Explore the Wilderness</h1>
            <h5>Visit the places from your wildest dreams</h5>
        </div>
        <div className="Tabs">
            <div><Link to="/calendar" >CALENDAR</Link></div>
            <div><Link to="/destinations" >DESTINATIONS</Link></div>
            <div><Link to="/lastminute">LAST MINUTE</Link></div>
        </div>
        <SearchBar />
    </Aux>
    )
}
export default Header
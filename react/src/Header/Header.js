import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import Navigation from './Navigation/Navigation'
import '../Header/Header.css'

const Header = (props) => {
    return (
        <header>
            <Navigation className="Navigation" isLogged={props.isLogged} />
            <div className="HeroText">
                <h4>OFF THE MAP</h4>
                <h1>Explore the Wilderness</h1>
                <h5>Visit the places from your wildest dreams</h5>
            </div>
            <div className="Tabs">
                <div>CALENDAR</div>
                <div>DESTINATIONS</div>
                <div>LAST MINUTE</div>
            </div>
            <SearchBar />
        </header>
    )
}
export default Header
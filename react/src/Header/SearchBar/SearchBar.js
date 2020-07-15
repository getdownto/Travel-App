import React from 'react'
import './SearchBar.css'

const SearchBar = (props) => {
    return (
        <div className="Search">
            <input className="SearchBox" type="text" value={props.search} onChange={props.searchOnChange} onKeyPress={props.enter}></input>
            <input type="button" className="SearchBtn" onClick={props.clicked} value="SEARCH"></input>
        </div>
    )
}
export default SearchBar
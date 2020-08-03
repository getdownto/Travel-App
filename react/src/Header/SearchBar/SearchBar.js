import React from 'react'
import { Redirect } from 'react-router-dom'
import travelService from '../../services/travel-service'
import './SearchBar.css'

class SearchBar extends React.Component {
    state = {
        search: '',
        trips: []
    }

    searchChangeHandler = (e) => {
        this.setState({ search: e.target.value })
    }

    submitOnEnter = (e) => {
        const key = e.keyCode || e.which;
        if (key == 13) {
            this.submitSearch();
        }
    }

    submitSearch = () => {
        const search = this.state.search
        // let trips = [...this.state.trips]
        // trips = trips.filter(a => a.destination.toLowerCase().includes(this.state.search.toLowerCase()) || a.description.toLowerCase().includes(this.state.search.toLowerCase()))
        // this.setState({ trips: [...trips] })
        travelService.load().then(trips => {
            trips = trips.filter(a => a.destination.toLowerCase().includes(this.state.search.toLowerCase()) || a.description.toLowerCase().includes(this.state.search.toLowerCase()))
            this.setState({ trips, search })
            console.log(trips)
        })
        // console.log(this.state.search)
        // console.log('trips', this.state.trips)
    }

    render() {
        return (
            <div className="Search" search={this.state.search}>
                <input className="SearchBox" type="text" value={this.state.search} onChange={this.searchChangeHandler} onKeyPress={this.submitOnEnter} ></input>

                <input type="button" className="SearchBtn" onClick={this.submitSearch} value="SEARCH"></input>
                {this.state.trips.length > 0 &&
          <Redirect to={{
            pathname: '/search',
            state: { trips: this.state.trips, search: this.state.search }
          }}/>
        }
            </div>
        )
    }
}
export default SearchBar
import React from 'react'
import { Redirect } from 'react-router-dom'
import travelService from '../../services/travel-service'
import styles from './SearchBar.module.css'

class SearchBar extends React.Component {
    state = {
        search: '',
        trips: null
    }

    searchChangeHandler = (e) => {
        this.setState({ search: e.target.value })
    }

    submitOnEnter = (e) => {
        const key = e.keyCode || e.which;
        if (key === 13) {
            this.submitSearch();
        }
    }

    submitSearch = () => {
        const search = this.state.search
        travelService.load().then(trips => {
            trips = trips.filter(a => a.destination.toLowerCase().includes(this.state.search.toLowerCase()) || a.description.toLowerCase().includes(this.state.search.toLowerCase()))
            this.setState({ trips, search })
        })
    }

    render() {
        return (
            <div className={styles.Search} search={this.state.search}>
            <input className={styles.SearchBox} type="text" value={this.state.search} onChange={this.searchChangeHandler} onKeyPress={this.submitOnEnter} ></input>

                <input type="button" className={styles.SearchBtn} onClick={this.submitSearch} value="SEARCH"></input>
                {this.state.trips !== null &&
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
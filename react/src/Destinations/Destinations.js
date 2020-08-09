import React from 'react'
import Aux from '../hoc/Auxiliary'
import Welcome from '../Welcome/Welcome'
import FilteredDest from '../FilteredDest/FilteredDest'
import travelService from '../services/travel-service'
import styles from './Destinations.module.css'

class Destinations extends React.Component {
    state = {
        destinations: null,
        selectedDestination: null
    }

    componentDidMount() {
        travelService.load().then(trips => {
            trips = trips.map(trip => trip.destination)
            console.log(trips)
            this.setState({ destinations: Array.from(new Set(trips)) })
        })
    }

    clickHandler = (e) => {
        this.setState({ selectedDestination: e.target.innerText.toLowerCase() })
    }

    render() {
        console.log('d', this.state.selectedDestination)
        let classString = ''
        // const monthTiles = currentMonthArr.map((curr, index) => {
        //     this.state.selectedMonth === curr.toLowerCase() ? classString = 'SingleTile Selected' : classString = 'SingleTile'
        //     return <div className={classString} id={index} key={curr} onClick={this.clickHandler} >{curr}</div>

        // })
        const destinationsList = this.state.destinations ? this.state.destinations.map((destination, index) => {
            this.state.selectedDestination === destination.toLowerCase() ? classString = [styles.SingleTile, styles.Selected] : classString = [styles.SingleTile]
            return <li className={classString.join(' ')} key={index} id={index} onClick={this.clickHandler}>{destination}</li>
        }) : null
        return (
            <Aux>
                <Welcome welcome={styles.Destinations} />
                <ul className={styles.DestinationsList}>
                    {destinationsList}
                </ul>
                <FilteredDest filterD={this.state.selectedDestination} />
            </Aux>
        )
    }
}
export default Destinations
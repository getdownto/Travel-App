import React from 'react'
import Aux from '../../hoc/Auxiliary'
import Welcome from '../../Components/Welcome/Welcome'
import FilteredDest from '../../Components/Items/FilteredDest'
import travelService from '../../services/travel-service'
import styles from './Destinations.module.css'

class Destinations extends React.Component {
    state = {
        destinations: null,
        selectedDestination: null
    }

    componentDidMount() {
        travelService.load().then(trips => {
            trips = trips.map(trip => trip.destination)
            this.setState({ destinations: Array.from(new Set(trips)) })
        })
    }

    clickHandler = (e) => {
        this.setState({ selectedDestination: e.target.innerText.toLowerCase() })
    }

    render() {
        let classString = ''
        const destinationsList = this.state.destinations ? this.state.destinations.map((destination, index) => {
            this.state.selectedDestination === destination.toLowerCase() ? classString = [styles.SingleTile, styles.Selected] : classString = [styles.SingleTile]
            return <li className={classString.join(' ')} key={index} id={index} onClick={this.clickHandler}>{destination}</li>
        }) : null
        return (
            <Aux>
                <Welcome welcome="Destinations" />
                <ul className={styles.DestinationsList}>
                    {destinationsList}
                </ul>
                <FilteredDest filterD={this.state.selectedDestination} />
            </Aux>
        )
    }
}
export default Destinations
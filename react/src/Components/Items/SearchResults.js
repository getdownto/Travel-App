import React from 'react'
import ItemCart from '../ItemCart/ItemCart'
import SearchBar from '../SearchBar/SearchBar'
import Aux from '../../hoc/Auxiliary'
import Welcome from '../Welcome/Welcome'
import '../Items/Items.css'
import moment from 'moment'

class SearchResults extends React.Component {
    state = {}

    render() {
        const trips = null
        if (this.props.location.state !== undefined) {
            trips = this.props.location.state.trips
        }
        const endDate = moment().add(7, 'days')
        // console.log('val', this.state.search)
        // console.log('tr', this.state.trips)
        const renderedTrips = trips !== null && trips !== undefined && trips.length > 0 ?
        trips.map(trip => {
            let discount = false
            if(moment(trip.startDate).isBetween(moment(), endDate)) {
                discount = true
            }
             return <ItemCart
                destination={trip.destination}
                imageUrl={trip.imageUrl}
                startDate={moment(trip.startDate).format('DD/MM/YYYY')}
                duration={trip.duration}
                price={trip.price} 
                key={trip._id}
                id={trip._id}
                discount={discount} />
        }) : <div>No trips found.</div>
        return (
            <Aux>
                <Welcome welcome="Search Results" />
                <SearchBar value={this.state.search} />
                <div className="Background">
                    <div className="CartContainer">
                        {renderedTrips}
                    </div>
                </div>
            </Aux>
        )
    }
}

export default SearchResults
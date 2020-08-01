import React from 'react'
import ItemCart from '../ItemCart/ItemCart'
import '../Items/Items.css'
import moment from 'moment'
import travelService from '../services/travel-service'

class Items extends React.Component {
    state = {
        trips: null
    }

    componentDidMount() {
        travelService.load().then(trips => {
            trips = trips.filter(trip => trip.destination.toLowerCase() === this.props.filterD)
            this.setState({ trips })
        })
    }

    componentDidUpdate(prevState) {
        if(prevState.trips !== this.state.trips) {
            travelService.load().then(trips => {
                trips = trips.filter(trip => trip.destination.toLowerCase() === this.props.filterD)
                this.setState({ trips })
            })
        }
    }
    

    render() {
        const trips = this.state.trips
        const renderedTrips = trips !== null && trips.length > 0 ?
            trips.map(trip =>
                <ItemCart
                    destination={trip.destination}
                    imageUrl={trip.imageUrl}
                    startDate={moment(trip.startDate).format('DD/MM/YYYY')}
                    duration={trip.duration}
                    price={trip.price} 
                    key={trip._id}
                    id={trip._id} />)
            : <div>No trips found.</div>
        return (
            <div className="Background">
                <div className="CartContainer">
                    {renderedTrips}
                </div>
            </div>
        )
    }
}

export default Items
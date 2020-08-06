import React from 'react'
import ItemCart from '../ItemCart/ItemCart'
import './Items.css'
import moment from 'moment'
import travelService from '../services/travel-service'

class Items extends React.Component {
    state = {
        trips: null
    }

    componentDidMount() {
        travelService.load().then(trips => {
            trips = trips.filter(trip => moment(trip.startDate).isSameOrAfter(moment()))
            this.setState({ trips })
        })
    }

    render() {
        const endDate = moment().add(7, 'days')
        const trips = this.state.trips
        const renderedTrips = trips ?
            trips.map(trip => {
                let discount = false
                if(moment(trip.startDate).isBetween(moment(), endDate)) {
                    discount = true
                    //console.log(trip.destination, ' ', trip.startDate)
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
            })
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
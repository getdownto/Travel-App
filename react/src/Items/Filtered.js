import React from 'react'
import ItemCart from '../Components/ItemCart/ItemCart'
import '../Items/Items.css'
import moment from 'moment'
import travelService from '../services/travel-service'

class Items extends React.Component {
    state = {
        trips: null
    }

    componentDidMount() {
        travelService.load().then(trips => {
            trips = trips.filter(trip => moment(trip.startDate).format('MMMM').toLowerCase() === this.props.filter && moment(trip.startDate).isSameOrAfter(moment()))
            this.setState({ trips })
            console.log(trips)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.filter !== this.props.filter) {
            travelService.load().then(trips => {
                trips = trips.filter(trip => moment(trip.startDate).format('MMMM').toLowerCase() === this.props.filter && moment(trip.startDate).isSameOrAfter(moment()))
                console.log(trips);
                this.setState({ trips })
            })
        }
    }
    

    render() {
        const endDate = moment().add(7, 'days')
        const trips = this.state.trips
        const renderedTrips = trips !== null && trips.length > 0 ?
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
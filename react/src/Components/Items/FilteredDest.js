import React from 'react'
import ItemCart from '../ItemCart/ItemCart'
import Aux from '../../hoc/Auxiliary'
import Loading from '../Loading/Loading'
import '../Items/Items.css'
import moment from 'moment'
import travelService from '../../services/travel-service'

class Items extends React.Component {
    state = {
        trips: null,
        oldTrips: null,
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            travelService.load().then(trips => {
                const oldTrips = trips.filter(trip => trip.destination.toLowerCase() === this.props.filterD && moment(trip.startDate).isBefore(moment()))
                trips = trips.filter(trip => trip.destination.toLowerCase() === this.props.filterD && moment(trip.startDate).isSameOrAfter(moment()))
                this.setState({ trips, oldTrips, loading: false })
            })
        })
    }

    componentDidUpdate(prevprops, prevState) {
        if (prevprops.filterD !== this.props.filterD) {
            this.setState({loading: true}, () => {
                travelService.load().then(trips => {
                    const oldTrips = trips.filter(trip => trip.destination.toLowerCase() === this.props.filterD && moment(trip.startDate).isBefore(moment()))
                    trips = trips.filter(trip => trip.destination.toLowerCase() === this.props.filterD && moment(trip.startDate).isSameOrAfter(moment()))
                    this.setState({ trips, oldTrips, loading: false })
                })
            })
        }
    }


    render() {
        const endDate = moment().add(7, 'days')
        const trips = this.state.trips
        const oldTrips = this.state.oldTrips
        const renderedTrips = trips !== null && trips.length > 0 ?
            trips.map(trip => {
                let discount = false
                if (moment(trip.startDate).isBetween(moment(), endDate)) {
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
            : <div>No upcoming trips.</div>
        const renderedOldTrips = oldTrips !== null && oldTrips.length > 0 ?
            oldTrips.map(trip =>
                <ItemCart
                    destination={trip.destination}
                    imageUrl={trip.imageUrl}
                    startDate={moment(trip.startDate).format('DD/MM/YYYY')}
                    duration={trip.duration}
                    price={trip.price}
                    key={trip._id}
                    id={trip._id} />)
            : <div>No past trips.</div>
        return (
            <Aux>
                <div className="Background">
                    <div className="CartContainer">
                        <h3>UPCOMING</h3>
                        {this.state.loading ? <Loading /> : renderedTrips}
                    </div>
                </div>
                <div className="CartContainer">
                    <h3>PAST</h3>
                    {this.state.loading ? <Loading /> : renderedOldTrips}
                </div>
            </Aux>
        )
    }
}

export default Items
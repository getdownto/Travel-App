import React from 'react'
import ItemCart from '../ItemCart/ItemCart'
import Loading from '../Loading/Loading'
import Pagination from '../Pagination/Pagination'
import Aux from '../../hoc/Auxiliary'
import './Items.css'
import moment from 'moment'
import travelService from '../../services/travel-service'

class Items extends React.Component {
    state = {
        trips: [],
        loading: false,
        currentPage: 1,
        postsPerPage: 6,

    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            travelService.load().then(trips => {
                trips = trips.filter(trip => moment(trip.startDate).isSameOrAfter(moment()))
                this.setState({ trips, loading: false })
            })
        })
    }

    paginate = (page) => {
        this.setState({ currentPage: page })
    }

    prevPage = () => {
        const page = this.state.currentPage
        if(page > 1) {
            this.setState({ currentPage: page - 1 })
        }
    }

    nextPage = () => {
        const page = this.state.currentPage
        if(page < Math.ceil(this.state.trips.length / this.state.postsPerPage)) {
            this.setState({ currentPage: page + 1 })
        }
    }

    render() {
        const endDate = moment().add(7, 'days')
        const trips = this.state.trips
        const indexOfLastTrip = this.state.currentPage * this.state.postsPerPage
        const indexOfFirstTrip = indexOfLastTrip - this.state.postsPerPage
        const currentTrips = trips ? trips.slice(indexOfFirstTrip, indexOfLastTrip) : null
        const renderedTrips = currentTrips ?
            currentTrips.map(trip => {
                let discount = false
                if (moment(trip.startDate).isBetween(moment(), endDate)) {
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
            <Aux>
                <div className="Background">
                    <div className="CartContainer">
                        {this.state.loading ? <Loading /> : renderedTrips}
                    </div>
                </div>
                <Pagination
                    totalPosts={this.state.trips.length}
                    postsPerPage={this.state.postsPerPage}
                    paginate={this.paginate}
                    currentPage={this.state.currentPage}
                    prevPage={this.prevPage}
                    nextPage={this.nextPage} />
            </Aux>
        )
    }
}

export default Items
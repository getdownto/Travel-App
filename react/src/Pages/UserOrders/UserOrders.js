import React from 'react'
import OrderCart from '../../Components/OrderCart/OrderCart'
import Welcome from '../../Components/Welcome/Welcome'
import Aux from '../../hoc/Auxiliary'
import Loading from '../../Components/Loading/Loading'
import moment from 'moment'
import userService from '../../services/user-service'

class UserOrders extends React.Component {
    state = {
        username: null,
        orders: null,
        loading: false
    }

    componentDidMount() {
        const id = this.props.match.params.id
        console.log('id', this.props);
        this.setState({ loading: true }, () => {
            userService.load(id).then(user => {
                this.setState({ username: user.username, orders: user.trips, loading: false })
            })
        })
    }

    render() {
        const orders = this.state.orders
        const renderedOrders = orders !== null && orders.length > 0 ? orders.map(order => <OrderCart
            mainTrip={order.destination}
            totalPrice={order.totalPrice}
            imageUrl={order.imageUrl}
            mainTripPrice={Number(order.mainTripPrice).toFixed(2)}
            startDate={moment(order.startDate).format('DD/MM/YYYY')}
            duration={order.duration}
            additionalTrips={order.additionalTrips}
            key={order._id} />) : <p>No orders yet.</p>

        return (
            <Aux>
            <Welcome welcome="User Orders" />
            <div className="Background" style={{display: 'block'}}>
                {this.state.loading ? <Loading/> : renderedOrders}
            </div>
        </Aux>
        )
    }
}

export default UserOrders
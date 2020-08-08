import React from 'react'
import userService from '../services/user-service'
import Welcome from '../Welcome/Welcome'
import orderService from '../services/order-service'
import { Link } from 'react-router-dom'
import moment from 'moment'
import OrderCart from '../OrderCart/OrderCart'
import history from '../history'
import Aux from '../hoc/Auxiliary'
import './UserProfile.css'
import AuthContext from '../Context'

class UserProfile extends React.Component {
    state = {
        username: null,
        orders: null
    }

    static contextType = AuthContext

    logout = () => {
        userService.logout().then(() => {
            this.context.logOut()
            history.push('/')
        })
    }

    componentDidMount() {
        console.log('context', this.context.id)
        const id = this.props.match.params.id
        userService.load(id).then(user => {
            console.log('user', user.username)
            this.setState({ username: user.username, orders: user.trips })
        })
    }

    render() {
        const orders = this.state.orders
        console.log('state orders', orders !== null && orders[0].additionalTrips)
        return (
            <Aux>
                <Welcome welcome="My Profile" />
                <div className="Background">
                    <div className="ProfileConatiner col span-1-of-4 box">
                        <h3 className="ProfileHeading">PROFILE</h3>
                        <p>Hello {this.state.username}!</p>
                        <h3 className="ProfileHeading">MY ORDERS</h3>
                        <p>Upcomming Trips</p>
                        <p>Past Trips</p>
                        <button className="Logout" onClick={this.logout}>Logout</button>
                    </div>
                    <div className="col span-3-of-4 box">
                        {orders !== null ? orders.map(order => <OrderCart 
                        mainTrip={order.mainTrip.destination} 
                        totalPrice={order.totalPrice} 
                        imageUrl={order.mainTrip.imageUrl} 
                        mainTripPrice={order.mainTrip.price.toFixed(2)}
                        startDate={moment(order.mainTrip.startDate).format('DD/MM/YYYY')}
                        duration={order.mainTrip.duration}
                        additionalTrips={order.additionalTrips}
                        key={order._id} />) : null}
                        
                    </div>
                </div>
            </Aux>
        )
    }
}
export default UserProfile
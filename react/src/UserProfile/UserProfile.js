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
        orders: null,
        renderedOrders: null,
        text: null,
        users: null,
        updated: false
    }

    static contextType = AuthContext

    logout = () => {
        userService.logout().then(() => {
            this.context.logOut()
            history.push('/')
        })
    }

    componentDidMount() {
        // console.log('context', this.context.id)
        const isAdmin = this.context.isAdmin
        const id = this.context.id
        userService.load(id).then(user => {
            console.log('user', user.username)
            this.setState({ username: user.username, orders: user.trips, renderedOrders: user.trips, text: 'All Orders' })
        })
        if (isAdmin) {
            userService.loadAll().then(users => {
                this.setState({ users, text: 'All Users' })
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const isAdmin = this.context.isAdmin
        if (isAdmin && this.state.updated !== prevState.updated) {
            userService.loadAll().then(users => {
                this.setState({ users, text: 'All Users' })
                console.log('loop?')
            })
        }
    }

    showNew = (e) => {
        const all = this.state.orders
        const renderedOrders = all && all.filter(order => moment(order.mainTrip.startDate).isSameOrAfter(moment())) || null
        this.setState({ renderedOrders, text: e.target.innerText })
    }

    showOld = (e) => {
        const all = this.state.orders
        const renderedOrders = all && all.filter(order => moment(order.mainTrip.startDate).isBefore(moment())) || null
        this.setState({ renderedOrders, text: e.target.innerText })
    }

    makeAdmin = (e) => {
        const id = e.target.id
        console.log('is this my id', id);
        userService.makeAdmin(id).then(user => {
            console.log('made admin', user);
            this.setState({updated: true})
        })
    }

    render() {
        const orders = this.state.renderedOrders
        const users = this.state.users
        const isAdmin = this.context.isAdmin
        console.log('state orders', orders !== null && orders)
        return (
            <Aux>
                <Welcome welcome={isAdmin ? "Admin Panel" : "My Profile"} />
                <div className="Background">
                    <div className="ProfileConatiner col span-1-of-5 box">
                        <h3 className="ProfileHeading">PROFILE</h3>
                        <p>Hello {this.state.username}!</p>
                        <h3 className="ProfileHeading">{isAdmin ? 'MY ACTIONS' : 'MY ORDERS'}</h3>
                        {!isAdmin && <p className="Clickable" onClick={this.showNew}>Upcoming Trips</p>}
                        {!isAdmin && <p className="Clickable" onClick={this.showOld}>Past Trips</p>}
                        {isAdmin && <Link to="/create" className="Clickable" >Create Trip</Link>}
                        <button className="Logout" onClick={this.logout}>Logout</button>
                    </div>
                    {!isAdmin &&
                        <div className="Border col span-3-of-4 box">
                            <h2 className="mainHeading">{this.state.text}</h2>
                            {orders !== null && orders.length > 0 ? orders.map(order => <OrderCart
                                mainTrip={order.mainTrip.destination}
                                totalPrice={order.totalPrice}
                                imageUrl={order.mainTrip.imageUrl}
                                mainTripPrice={order.mainTrip.price.toFixed(2)}
                                startDate={moment(order.mainTrip.startDate).format('DD/MM/YYYY')}
                                duration={order.mainTrip.duration}
                                additionalTrips={order.additionalTrips}
                                key={order._id} />) : <p>No orders yet.</p>}
                        </div>}
                    {isAdmin &&
                        <div className="Border col span-3-of-4 box">
                            <h2 className="mainHeading">{this.state.text}</h2>
                            {users !== null ? users.map(user =>
                                <div className="UserContainer">
                                    <div className="GridItem">{user.username}</div>
                                    <div className="GridItem">{user.trips.length} orders</div>
                                    {!user.isAdmin ? <button className="GridItem GridBtn" id={user._id} onClick={this.makeAdmin}>Make Admin</button>: <p className="GridItem">ADMIN</p>}
                                </div>) : <p>No users found.</p>}
                        </div>}
                </div>
            </Aux>
        )
    }
}
export default UserProfile
import React from 'react'
import userService from '../../services/user-service'
import Welcome from '../../Components/Welcome/Welcome'
import { Link } from 'react-router-dom'
import moment from 'moment'
import OrderCart from '../../Components/OrderCart/OrderCart'
import history from '../../history'
import Aux from '../../hoc/Auxiliary'
import './UserProfile.css'
import AuthContext from '../../Context'
import Loading from '../../Components/Loading/Loading'

class UserProfile extends React.Component {
    state = {
        username: null,
        orders: null,
        renderedOrders: null,
        text: null,
        users: null,
        updated: false,
        loading: false
    }

    static contextType = AuthContext

    logout = () => {
        userService.logout().then(() => {
            this.context.logOut()
            history.push('/')
        })
    }

    componentDidMount() {
        const isAdmin = this.context.isAdmin
        const id = this.context.id
        this.setState({ loading: true }, () => {
            userService.load(id).then(user => {
                console.log('user', user.username)
                this.setState({ username: user.username, orders: user.trips, renderedOrders: user.trips, text: 'All Orders', loading: false })
            })
        })
        if (isAdmin) {
            this.setState({ loading: true }, () => {
                userService.loadAll().then(users => {
                    this.setState({ users, text: 'All Users', loading: false })
                })
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const isAdmin = this.context.isAdmin
        if (isAdmin && this.state.updated !== prevState.updated) {
            this.setState({ loading: true }, () => {
                userService.loadAll().then(users => {
                    this.setState({ users, text: 'All Users', loading: false })
                })
            })
        }
    }

    showNew = (e) => {
        const all = this.state.orders
        const renderedOrders = all ? all.filter(order => moment(order.startDate).isSameOrAfter(moment())) || null : null
        this.setState({ renderedOrders, text: e.target.innerText })
    }

    showOld = (e) => {
        const all = this.state.orders
        const renderedOrders = all ? all.filter(order => moment(order.startDate).isBefore(moment())) || null : null
        this.setState({ renderedOrders, text: e.target.innerText })
    }

    makeAdmin = (e) => {
        const id = e.target.id
        console.log('is this my id', id);
        userService.makeAdmin(id).then(user => {
            this.setState({updated: true})
        })
    }

    render() {
        const orders = this.state.renderedOrders
        const users = this.state.users
        const isAdmin = this.context.isAdmin

        const userView = !isAdmin &&
        <div className="Border col span-3-of-4 box">
            <h2 className="mainHeading">{this.state.text}</h2>
            {orders !== null && orders.length > 0 ? orders.map(order => <OrderCart
                mainTrip={order.destination}
                totalPrice={order.totalPrice}
                imageUrl={order.imageUrl}
                mainTripPrice={Number(order.mainTripPrice).toFixed(2)}
                startDate={moment(order.startDate).format('DD/MM/YYYY')}
                duration={order.duration}
                additionalTrips={order.additionalTrips}
                key={order._id} />) : <p>No orders yet.</p>}
        </div>
        const adminView = isAdmin &&
        <div className="Border col span-3-of-4 box">
            <h2 className="mainHeading">{this.state.text}</h2>
            {users !== null ? users.map(user =>
                <div className="UserContainer">
                    <div className="GridItem">{user.username}</div>
                    <div className="GridItem">{user.trips.length} orders</div>
                    {!user.isAdmin ? <button className="GridItem GridBtn" id={user._id} onClick={this.makeAdmin}>Make Admin</button>: <p className="GridItem">ADMIN</p>}
                </div>) : <p>No users found.</p>}
        </div>
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
                    {this.state.loading ? <Loading/> : userView || adminView}
                    {/* {this.state.loading ? <Loading/> : adminView} */}
                </div>
            </Aux>
        )
    }
}
export default UserProfile
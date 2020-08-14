import React from 'react'
import OrderCart from '../../Components/OrderCart/OrderCart'
import Welcome from '../../Components/Welcome/Welcome'
import Aux from '../../hoc/Auxiliary'
import Loading from '../../Components/Loading/Loading'
import moment from 'moment'
import userService from '../../services/user-service'
import Modal from '../../Components/Modal/Modal'
import SubmitButton from '../../Components/SubmitButton/SubmitButton'
import history from '../../history'
import orderService from '../../services/order-service'

class UserOrders extends React.Component {
    state = {
        username: null,
        orders: null,
        loading: false,
        deleted: false,
        deleteId: null
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

    confirmDelete = (e) => {
        const id = e.target.id
        console.log('id to delete', e.target.id);
        this.setState({ deleted: !this.state.deleted, deleteId: id })
    }

    deleteOrder = () => {
        const id = this.state.deleteId
        orderService.delete(id).then(deleted => {
            console.log('deleted', deleted)
            history.push('/')
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
            key={order._id}
            id={order._id}
            deleteOrder={this.confirmDelete} />) : <p>No orders yet.</p>

        return (
            <Aux>
                {this.state.deleted ?
                    <Modal show={this.confirmDelete}>
                        <div>
                            <h3>DELETING ORDER</h3>
                            <p>Are you sure you want to delete this order?</p>
                            <SubmitButton submit={this.deleteOrder}>DELETE</SubmitButton>
                        </div>
                    </Modal> : null}
                <Welcome welcome="User Orders" />
                <div className="Background" style={{ display: 'block' }}>
                    {this.state.loading ? <Loading /> : renderedOrders}
                </div>
            </Aux>
        )
    }
}

export default UserOrders
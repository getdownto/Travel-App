import React from 'react'
import travelService from '../services/travel-service'
import Welcome from '../Welcome/Welcome'
import Aux from '../hoc/Auxiliary'
import AdditionalTrip from '../AdditionalTrip/AdditionalTrip'
import SubmitButton from '../SubmitButton/SubmitButton'
import Modal from '../Modal/Modal'
import Loading from '../Loading/Loading'
import OrderSummary from '../OrderSummary/OrderSummary'
import AuthContext from '../Context'
import orderService from '../services/order-service'
import history from '../history'
import styles from './Details.module.css'
import moment from 'moment'
import { Link } from 'react-router-dom'

const endDate = moment().add(7, 'days')

class Details extends React.Component {
    state = {
        loadedTrip: null,
        totalPrice: 0,
        additionalTrips: null,
        visible: {},
        purchased: false,
        discount: false,
        expired: false
    }

    static contextType = AuthContext

    componentDidMount() {
        let discount = false
        let expired = false
        console.log(this.props.match.params.id)
        const id = this.props.match.params.id
        travelService.details(id).then(loadedTrip => {
            if (moment(loadedTrip.startDate).isBetween(moment(), endDate)) {
                discount = true
            }
            if(moment(loadedTrip.startDate).isBefore(moment())) {
                expired = true
            }
            this.setState({ loadedTrip, totalPrice: discount ? 0.85 * loadedTrip.price : loadedTrip.price, discount, expired })
        })
    }

    additionalClickHandler = (e) => {
        const loadedTrip = this.state.loadedTrip
        const visible = { ...this.state.visible }
        const current = {}
        let text = e.target.innerText
        if (text === 'Add') {
            const oldPrice = this.state.totalPrice
            let totalPrice = oldPrice + Number(loadedTrip.additionalTrips[e.target.id].price)
            visible[e.target.id] = true
            current[loadedTrip.additionalTrips[e.target.id].trip] = loadedTrip.additionalTrips[e.target.id].price
            const additionalTrips = [...this.state.additionalTrips || [], current]
            this.setState({ totalPrice, visible, additionalTrips })
            // console.log('state after add', this.state.additionalTrips);
            e.target.innerText = 'Remove'
        } else {
            const oldPrice = this.state.totalPrice
            const trips = [...this.state.additionalTrips]
            let totalPrice = oldPrice - loadedTrip.additionalTrips[e.target.id].price
            visible[e.target.id] = false
            current[loadedTrip.additionalTrips[e.target.id].trip] = loadedTrip.additionalTrips[e.target.id].price
            console.log('state', this.state.additionalTrips);
            console.log('additional trips before', trips);
            const index = this.state.additionalTrips.map(a => Object.keys(a)[0]).indexOf(loadedTrip.additionalTrips[e.target.id].trip)
            trips.splice(index, 1)
            console.log('current', current);
            console.log('index', index);
            console.log('additional trips', trips);
            this.setState({ totalPrice, visible, additionalTrips: trips })
            e.target.innerText = 'Add'
        }
    }

    submitHandler = (e) => {
        console.log('state after submit', this.state)
        this.setState({ purchased: !this.state.purchased })
    }

    confirmOrder = () => {
        orderService.create(this.state.loadedTrip._id, this.state.totalPrice, this.state.additionalTrips, this.context.id)
            .then(history.push('/'))
    }

    render() {
        let trips = null
        const id = this.props.match.params.id
        const button = this.context.isAdmin === true ? <SubmitButton><Link to={`/edit/${id}`}>EDIT</Link></SubmitButton> : <SubmitButton submit={this.submitHandler}>SUBMIT</SubmitButton>
        const notAvailable = <div className={styles.NotAvailable}>This trip is no longer available for purchase.</div>
        console.log('details props', this.props);
        const content = this.state.loadedTrip ?
            <Aux>
                {this.state.purchased ?
                    <Modal show={this.submitHandler}>
                        <OrderSummary
                            mainTrip={this.state.loadedTrip.destination}
                            mainTripPrice={this.state.discount ? 0.85 * this.state.loadedTrip.price : this.state.loadedTrip.price}
                            additionalTrips={this.state.additionalTrips}
                            totalPrice={this.state.totalPrice}
                            submit={this.confirmOrder} />
                    </Modal> : null}
                <div className={styles.Details}>
                    <h2 className={styles.Title}>{this.state.loadedTrip.destination}</h2>
                    <div className={styles.Image}>
                        <img className={styles.Cover} src={this.state.loadedTrip.imageUrl} alt="img" />
                    </div>
                    <div className={styles.ItemCart}>
                        <h2>Date and Price</h2>
                        <div className={styles.DateContainer}>
                            {this.state.discount ? <div className={styles.PriceContainer}>
                                <p className={styles.Price}>${(0.85 * this.state.loadedTrip.price).toFixed(2)}</p>
                                <p className={styles.OldPrice}>${this.state.loadedTrip.price.toFixed(2)}</p>
                            </div> : <p className={styles.Price}>${this.state.loadedTrip.price.toFixed(2)}</p>}
                            <p className={styles.DateP}>{moment(this.state.loadedTrip.startDate).format('DD/MM/YYYY')}</p>
                            <div className={styles.DurationContainer}>
                                <img className={styles.Calendar} src="/calendar.svg" alt="img" />
                                <p>{this.state.loadedTrip.duration} days</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ItemCart}>
                        <h2>Trip Description</h2>
                        <p>{this.state.loadedTrip.description}</p>
                    </div>
                    {this.state.loadedTrip.additionalTrips.length > 0 ?
                        <h2 className={styles.Title}>Additional Trips</h2> : null}
                    {this.state.loadedTrip.additionalTrips.length > 0 ?
                        trips = this.state.loadedTrip.additionalTrips.map((trip, index) => {
                            return <AdditionalTrip
                                id={index}
                                key={index}
                                destination={trip.trip}
                                price={Number(trip.price).toFixed(2)}
                                clicked={this.additionalClickHandler}
                                visible={this.state.visible && this.state.visible[index]}
                                expired={this.state.expired} />
                        }) : null}
                    {this.state.expired ? notAvailable: button}
                </div>
            </Aux>
            : <Loading />
        console.log(this.state.loadedTrip)
        return (
            <Aux>
                <Welcome welcome="Details" />
                {content}
            </Aux>
        )
    }
}
export default Details
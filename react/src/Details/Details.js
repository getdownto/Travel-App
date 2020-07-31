import React from 'react'
import travelService from '../services/travel-service'
import Welcome from '../Welcome/Welcome'
import Aux from '../hoc/Auxiliary'
import AdditionalTrip from '../AdditionalTrip/AdditionalTrip'
import SubmitButton from '../SubmitButton/SubmitButton'
import Modal from '../Modal/Modal'
import OrderSummary from '../OrderSummary/OrderSummary'
import './Details.css'
import moment from 'moment'

class Details extends React.Component {
    state = {
        loadedTrip: null,
        totalPrice: 0,
        additionalTrips: null,
        visible: {},
        purchased: false
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        const id = this.props.match.params.id
        travelService.details(id).then(loadedTrip => {
            this.setState({ loadedTrip, totalPrice: loadedTrip.price })
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
            e.target.innerText = 'Remove'
        } else {
            const oldPrice = this.state.totalPrice
            let totalPrice = oldPrice - loadedTrip.additionalTrips[e.target.id].price
            visible[e.target.id] = false
            const index = this.state.additionalTrips.map(a => a.trip).indexOf()
            const additionalTrips = this.state.additionalTrips.splice(index, 1)
            this.setState({ totalPrice, visible, additionalTrips })
            e.target.innerText = 'Add'
        }
    }

    submitHandler = (e) => {
        console.log(this.state)
        this.setState({ purchased: !this.state.purchased })
    }

    render() {
        let trips = null
        const content = this.state.loadedTrip ?
            <Aux>
                {this.state.purchased ?
                    <Modal show={this.submitHandler}>
                        <OrderSummary
                            mainTrip={this.state.loadedTrip.destination}
                            mainTripPrice={this.state.loadedTrip.price}
                            additionalTrips={this.state.additionalTrips}
                            totalPrice={this.state.totalPrice} />
                    </Modal> : null}
                <div className="Details">
                    <h2 className="Title">{this.state.loadedTrip.destination}</h2>
                    <div className="Image">
                        <img className="Cover" src={this.state.loadedTrip.imageUrl} />
                    </div>
                    <div className="ItemCart">
                        <h2>Date and Price</h2>
                        <div className="DateContainer">
                            <p className="Price">${this.state.loadedTrip.price}</p>
                            <p className="DateP">{moment(this.state.loadedTrip.startDate).format('DD/MM/YYYY')}</p>
                            <div className="DurationContainer">
                                <img className="Calendar" src="/calendar.svg" alt="img" />
                                <p>{this.state.loadedTrip.duration} days</p>
                            </div>
                        </div>
                    </div>
                    <div className="ItemCart">
                        <h2>Trip Description</h2>
                        <p>{this.state.loadedTrip.description}</p>
                    </div>
                    {this.state.loadedTrip.additionalTrips.length > 0 ?
                        <h2 className="Title">Additional Trips</h2> : null}
                    {this.state.loadedTrip.additionalTrips.length > 0 ?
                        trips = this.state.loadedTrip.additionalTrips.map((trip, index) => {
                            return <AdditionalTrip
                                id={index}
                                key={index}
                                destination={trip.trip}
                                price={trip.price}
                                clicked={this.additionalClickHandler}
                                visible={this.state.visible && this.state.visible[index]} />
                        }) : null}
                    <SubmitButton submit={this.submitHandler}>SUBMIT</SubmitButton>
                </div>
            </Aux>
            : <p>Loading...</p>
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
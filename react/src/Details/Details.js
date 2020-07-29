import React from 'react'
import travelService from '../services/travel-service'
import Welcome from '../Welcome/Welcome'
import Aux from '../hoc/Auxiliary'
import AdditionalTrip from '../AdditionalTrip/AdditionalTrip'
import SubmitButton from '../SubmitButton/SubmitButton'
import './Details.css'
import moment from 'moment'

class Details extends React.Component {
    state = {
        loadedTrip: null,
        totalPrice: 0
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        const id = this.props.match.params.id
        travelService.details(id).then(loadedTrip => {
            this.setState({ loadedTrip, totalPrice: loadedTrip.price })
            console.log(id)
            console.log(this.state.loadedTrip.destination)
        })
    }

    additionalClickHandler = (e) => {
        const loadedTrip = this.state.loadedTrip
        let text = e.target.innerText
        if (text === 'Add') {
            const oldPrice = this.state.totalPrice
            let totalPrice = oldPrice + Number(loadedTrip.additionalTrips[e.target.id].price)
            this.setState({ totalPrice })
            e.target.innerText = 'Remove'
            console.log(this.state.totalPrice)
        } else {
            const oldPrice = this.state.totalPrice
            let totalPrice = oldPrice - loadedTrip.additionalTrips[e.target.id].price
            this.setState({ totalPrice })
            e.target.innerText = 'Add'
            console.log(this.state.totalPrice)
        }
    }

    submitHandler = (e) => {
        console.log(this.state.totalPrice)
    }

    render() {
        let trips = null
        console.log(this.state.loadedTrip)
        const content = this.state.loadedTrip ?
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
                            text={this.state.btnText} />
                    }) : null}
                <SubmitButton submit={this.submitHandler}>SUBMIT</SubmitButton>
            </div>
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
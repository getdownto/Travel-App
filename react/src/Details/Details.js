import React from 'react'
import travelService from '../services/travel-service'
import Welcome from '../Welcome/Welcome'
import Aux from '../hoc/Auxiliary'
import './Details.css'
import moment from 'moment'

class Details extends React.Component {
    state = {
        loadedTrip: null
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        const id = this.props.match.params.id
        travelService.details(id).then(loadedTrip => {
            this.setState({ loadedTrip })
            console.log(id)
            console.log(this.state.loadedTrip.destination)
        })
    }

    render() {
        const content = this.state.loadedTrip ?
            <div className="Details">
                <h2>{this.state.loadedTrip.destination}</h2>
                <div className="Image">
                    <img className="Cover" src={this.state.loadedTrip.imageUrl} />
                </div>
                <h2>Date and Price</h2>
                <div className="ItemCart">
                    <div className="DateContainer">
                        <p className="Price">${this.state.loadedTrip.price}</p>
                        <p className="DateP">{moment(this.state.loadedTrip.startDate).format('DD/MM/YYYY')}</p>
                        <div className="DurationContainer">
                            <img className="Calendar" src="/calendar.svg" alt="img" />
                            <p>{this.state.loadedTrip.duration} days</p>
                        </div>
                    </div>
                </div>
                <h2>Trip Description</h2>
                <div className="ItemCart">
                    <p>{this.state.loadedTrip.description}</p>
                </div>
                {this.state.loadedTrip.additionalTrips.length > 0 ?
                    <p>additionalTrips</p> : null}
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
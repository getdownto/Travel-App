import React from 'react'
import DatePicker from "react-datepicker";
import DynamicInput from '../CreateTrip/DynamicInput/DynamicInput'
import Welcome from '../Welcome/Welcome'
import history from '../history'
import "react-datepicker/dist/react-datepicker.css"
import './EditTrip.css'
import travelService from '../services/travel-service'

class CreateTrip extends React.Component {
    state = {
        destination: '',
        price: '',
        imageUrl: '',
        startDate: null,
        duration: '',
        description: '',
        additionalTrips: []
    }

    componentDidMount() {
        const id = this.props.match.params.id
        travelService.details(id).then(loadedTrip => {
            console.log(loadedTrip)
            const date = new Date(loadedTrip.startDate)
            this.setState({
                destination: loadedTrip.destination,
                price: loadedTrip.price,
                imageUrl: loadedTrip.imageUrl,
                startDate: new Date(date.toUTCString()),
                duration: loadedTrip.duration,
                description: loadedTrip.description,
                additionalTrips: [...loadedTrip.additionalTrips]
            })
            console.log(this.state)
        })
    }

    changeFiealdHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSelect = (date) => {
        this.setState({startDate: date})
    }

    handleChange = (date) => {
        this.setState({startDate: date})
    }

    changeHandler = (e, index) => {
        const { name, value } = e.target
        let trips = [...this.state.additionalTrips]
        trips[index][name] = value
        this.setState({ additionalTrips: trips })
    }

    addFielsHandler = (e) => {
        e.preventDefault()
        let trips = [...this.state.additionalTrips, { trip: '', price: '' }]
        this.setState({ additionalTrips: trips })
    }

    deleteFieldHandler = (e, i) => {
        e.preventDefault()
        let trips = [...this.state.additionalTrips]
        trips.splice(i, 1)
        this.setState({ additionalTrips: trips })
    }

    submitForm = (e) => {
        const id = this.props.match.params.id
        e.preventDefault()
        console.log(this.state)
        travelService.update(id, this.state.destination, this.state.price, this.state.imageUrl, this.state.startDate, this.state.duration, this.state.description, this.state.additionalTrips).then(() => {
            history.push(`/${id}`)
        })
    }

    render() {
        console.log(this.state.additionalTrips)
        const inputFiellds = this.state.additionalTrips ? this.state.additionalTrips.map((a, i) => {
            return <DynamicInput
                tripValue={a.trip}
                priceValue={a.price}
                changed={(e) => this.changeHandler(e, i)}
                removeButton={this.state.additionalTrips.length > 1}
                add={(e) => this.addFielsHandler(e)}
                delete={(e) => this.deleteFieldHandler(e, i)} />
        }) : <p>Loading...</p>
        return (
            <div>
                <Welcome welcome="Edit Trip" />
                <form className="CreateTrip">
                    <input type="text" name="destination" placeholder="Destination" value={this.state.destination} onChange={this.changeFiealdHandler} />
                    <input type="text" name="price" placeholder="Price" value={this.state.price} onChange={this.changeFiealdHandler} />
                    <input type="text" name="imageUrl" placeholder="Image URL" value={this.state.imageUrl} onChange={this.changeFiealdHandler} />
                    <DatePicker
                        selected={this.state.startDate}
                        onSelect={this.handleSelect} //when day is clicked
                        onChange={this.handleChange} //only when value has changed
                        dateFormat='dd-MMM-yyyy'
                        placeholderText="Start Date"
                    />
                    <input type="number" name="duration" placeholder="Duration" value={this.state.duration} onChange={this.changeFiealdHandler} />
                    <label>Description</label>
                    <textarea rows="6" name="description" value={this.state.description} onChange={this.changeFiealdHandler} />
                    <button className="Additional" onClick={(e) => this.addFielsHandler(e)}>Add Additional Trips</button>
                    {inputFiellds}
                    <button className="Submit" onClick={(e) => this.submitForm(e)}>Edit Trip</button>
                </form>
            </div>
        )
    }

}
export default CreateTrip
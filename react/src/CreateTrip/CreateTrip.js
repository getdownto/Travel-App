import React from 'react'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import DynamicInput from './DynamicInput/DynamicInput'
import "react-datepicker/dist/react-datepicker.css"
import './CreateTrip.css'

class CreateTrip extends React.Component {
    state = {
        destination: '',
        price: '',
        startDate: null,
        duration: '',
        additional: []
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
        let trips = [...this.state.additional]
        trips[index][name] = value
        this.setState({ additional: trips })
    }

    addFielsHandler = (e) => {
        e.preventDefault()
        let trips = [...this.state.additional, { trip: '', price: '' }]
        this.setState({ additional: trips })
    }

    deleteFieldHandler = (e, i) => {
        e.preventDefault()
        let trips = [...this.state.additional]
        trips.splice(i, 1)
        this.setState({ additional: trips })
    }

    submitForm = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    render() {
        const inputFiellds = this.state.additional.map((a, i) => {
            return <DynamicInput
                tripValue={a.trip}
                priceValue={a.price}
                changed={(e) => this.changeHandler(e, i)}
                removeButton={this.state.additional.length > 1}
                add={(e) => this.addFielsHandler(e)}
                delete={(e) => this.deleteFieldHandler(e, i)} />
        })
        return (
            <div>
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
                    <button className="Submit" onClick={(e) => this.submitForm(e)}>CreateTrip</button>
                </form>
            </div>
        )
    }

}
export default CreateTrip
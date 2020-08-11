import React from 'react'
import DatePicker from "react-datepicker";
import DynamicInput from '../../Components/DynamicInput/DynamicInput'
import Welcome from '../../Components/Welcome/Welcome'
import history from '../../history'
import * as yup from 'yup'
import "react-datepicker/dist/react-datepicker.css"
import './EditTrip.css'
import travelService from '../../services/travel-service'

const schema = yup.object({
    destination: yup.string('Destination must be a string')
        .required('Destination is required'),
    price: yup.string('Price must be number')
        .required('Price is required'),
    startDate: yup.string('Date must be a string')
        .required('Date is required')
        .nullable(),
    imageUrl: yup.string('Image URL must be a string')
        .required('Image URL is required'),
    duration: yup.string('Duration must be number')
        .required('Duration is required'),
    description: yup.string('Description must be a string')
        .required('Description is required')
        .min(20, 'Description must be at least 20 chars long')

})

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
        schema.validate(this.state, { abortEarly: false })
        .then(() => {
            this.setState({ errors: null })
            travelService.update(id, this.state.destination, this.state.price, this.state.imageUrl, this.state.startDate, this.state.duration, this.state.description, this.state.additionalTrips).then(() => {
                history.push(`/details/${id}`)
            })
        })
        .catch(err => {
            console.log(err)
            const errors = err.inner.reduce((acc, { path, message }) => {
                acc[path] = (acc[path] || []).concat(message)
                return acc
            }, {})
            this.setState({ errors })
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
            <Welcome welcome="Create Trip" />
            <form className="CreateTrip">
                <div className="FieldContainer">
                    <input type="text" name="destination" placeholder="Destination" value={this.state.destination} onChange={this.changeFiealdHandler} />
                    {this.state.errors && this.state.errors['destination'] ? <img className="errorIcon" src="/close.svg" alt="error"></img> : null}
                </div>
                {this.state.errors && this.state.errors['destination'] ? <p className="ErrorMessage">{this.state.errors.destination[0]}</p> : null}
                <div className="FieldContainer">
                <input type="number" name="price" placeholder="Price" value={this.state.price} onChange={this.changeFiealdHandler} />
                {this.state.errors && this.state.errors['price'] ? <img className="errorIcon" src="/close.svg" alt="error"></img> : null}
                </div>
                {this.state.errors && this.state.errors['price'] ? <p className="ErrorMessage">{this.state.errors.price[0]}</p> : null}
                <div className="FieldContainer">
                <input type="text" name="imageUrl" placeholder="Image URL" value={this.state.imageUrl} onChange={this.changeFiealdHandler} />
                {this.state.errors && this.state.errors['imageUrl'] ? <img className="errorIcon" src="/close.svg" alt="error"></img> : null}
                </div>
                {this.state.errors && this.state.errors['imageUrl'] ? <p className="ErrorMessage">{this.state.errors.imageUrl[0]}</p> : null}
                <DatePicker
                    selected={this.state.startDate}
                    onSelect={this.handleSelect} //when day is clicked
                    onChange={this.handleChange} //only when value has changed
                    dateFormat='dd-MMM-yyyy'
                    placeholderText="Start Date"
                />
                {this.state.errors && this.state.errors['startDate'] ? <p className="ErrorMessage">{this.state.errors.startDate[0]}</p> : null}
                <div className="FieldContainer">
                <input type="number" name="duration" placeholder="Duration" value={this.state.duration} onChange={this.changeFiealdHandler} />
                {this.state.errors && this.state.errors['duration'] ? <img className="errorIcon" src="/close.svg" alt="error"></img> : null}
                </div>
                {this.state.errors && this.state.errors['duration'] ? <p className="ErrorMessage">{this.state.errors.duration[0]}</p> : null}
                <label>Description</label>
                <textarea rows="6" name="description" value={this.state.description} onChange={this.changeFiealdHandler} />
                {this.state.errors && this.state.errors['description'] ? <p className="ErrorMessage">{this.state.errors.description[0]}</p> : null}
                <button className="Additional" onClick={(e) => this.addFielsHandler(e)}>Add Additional Trips</button>
                {inputFiellds}
                <button className="Submit" onClick={(e) => this.submitForm(e)}>CreateTrip</button>
            </form>
        </div>
        )
    }

}
export default CreateTrip
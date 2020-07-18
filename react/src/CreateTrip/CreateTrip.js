import React from 'react'
import {Link} from 'react-router-dom'
import DynamicInput from './DynamicInput/DynamicInput'
import './CreateTrip.css'

class CreateTrip extends React.Component {
    state = {
        destination: '',
        price: '',
        additional: []
    }

    changeUsernameHandler = (e) => {
        this.setState({
            destination: e.target.value
        })
    }

    changePasswordHandler = (e) => {
        this.setState({
            price: e.target.value
        })
    }

    changeHandler = (e, index) => {
        const {name, value} = e.target
        let trips = [...this.state.additional]
        trips[index][name] = value
        this.setState({ additional: trips })
    }

    addFielsHandler = (e) => {
        e.preventDefault()
        let trips = [...this.state.additional, { trip: '', price: '' }]
        this.setState({additional: trips})
    }

    deleteFieldHandler = (e, i) => {
        e.preventDefault()
        let trips = [...this.state.additional]
        trips.splice(i, 1)
        this.setState({additional: trips})
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
                    <input type="text" name="destination" placeholder="Destination" value={this.state.destination} onChange={this.changeUsernameHandler} />
                    <input type="text" name="price" placeholder="Price" value={this.state.price} onChange={this.changePasswordHandler} />
                    <button className="Additional" onClick={(e) => this.addFielsHandler(e)}>Add Additional Trips</button>
                    {inputFiellds}
                    <button onClick={(e) => this.submitForm(e)}>CreateTrip</button>
                </form>
            </div>
        )
    }

}
export default CreateTrip
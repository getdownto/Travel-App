import React from 'react'
import SubmitButton from '../SubmitButton/SubmitButton'
import './OrderSummary.css'

const OrderSummary = (props) => {
    console.log(props.additionalTrips)
    return (
        <div className="OrderSummary">
            <h3>ORDER CONFIRMATION</h3>
            <p className="Thanks">Thank you for yout order</p>
            <div className="Headings Columns">
                <h6>ORDER SUMMARY</h6>
                <h6>PRICE</h6>
            </div>
            <div className="MainTrip Columns">
                <p>{props.mainTrip}</p>
                <p>${props.mainTripPrice}</p>
            </div>
            {props.additionalTrips !== null && props.additionalTrips.length > 0 ?
                <ul>
                    {props.additionalTrips.map(trip => {
                        for (const key in trip) {
                            return <li className='additionalTrips Columns'>
                                <p>+ {key}</p>
                                <p>${trip[key]}</p>
                            </li>
                        }
                    })}
                </ul> : null}
            <div className="Columns Total">
                <p>Total:</p>
                <p>{props.totalPrice}</p>
            </div>
            <SubmitButton>CONFIRM</SubmitButton>
        </div>
    )
}
export default OrderSummary
import React from 'react'
import { Link } from 'react-router-dom'
import './OrderCart.css'

const OrderCart = (props) => {
    const additionaTripsRendered = props.additionalTrips && props.additionalTrips.length > 0 &&
        props.additionalTrips.map(trip => {
            const name = Object.keys(trip)[0]
            const price = trip[name]
            return <div className="AddContainer">
                <p>+ {name}</p>
                <p>${Number(price).toFixed(2)}</p>
            </div>
        })
    return (
        <Link to={`/${props.id}`}>
            <div className="OrderCart">
                <div className="SmallImage">
                    <img className="Cover" src={props.imageUrl} alt="img" />
                </div>
                <div className="Beside">
                    <p className="OrderHeading">{props.mainTrip}</p>
                    <div className="MainTripDetails">
                    <p className="MDate">{props.startDate}</p>
                        <div className="MDuration">
                            <img className="Icon" src="/calendar.svg" alt="img" />
                            <p>{props.duration} days</p>
                        </div>
                    </div>
                    {additionaTripsRendered ?
                        <div className="AdditionalTr">
                            <h3 className="AddHeading">Additional Trips Added</h3>
                            {additionaTripsRendered}
                        </div> : <h3 className="AddHeading">No Additional Trips Added</h3>}
                        <div className="TotalPriceContainer">
                            <p>TOTAL:</p>
                            <p className="TotalPrice">${props.totalPrice.toFixed(2)}</p>
                        </div>
                </div>
            </div>
        </Link>
    )
}
export default OrderCart
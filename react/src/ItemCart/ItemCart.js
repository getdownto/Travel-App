import React from 'react'
import './ItemCart.css'

const ItemCart = (props) => {
    return (
        <div className="Cart col span-1-of-3 box">
            <p className="Heading">{props.destination}</p>
            <p className="Date">{props.startDate}</p>
            <div className="Image">
                <img className="Cover" src={props.imageUrl} alt="img" />
            </div>
            <div className="Lower">
                <p className="Price">$ {props.price}</p>
                <div className="Duration">
                    <img className="Icon" src="/calendar.svg" alt="img" />
                    <p>{props.duration} days</p>
                </div>
            </div>

        </div>
    )
}
export default ItemCart
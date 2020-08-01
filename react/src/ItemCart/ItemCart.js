import React from 'react'
import {Link} from 'react-router-dom'
import './ItemCart.css'

const ItemCart = (props) => {
    return (
        <Link to={`/${props.id}`} className="Cart col span-1-of-3 box">
            <p className="Heading">{props.destination}</p>
            <p className="Date">{props.startDate}</p>
            <div className="FullImage">
                <img className="Cover" src={props.imageUrl} alt="img" />
            </div>
            <div className="Lower">
                <p className="Price">${props.price.toFixed(2)}</p>
                <div className="Duration">
                    <img className="Icon" src="/calendar.svg" alt="img" />
                    <p>{props.duration} days</p>
                </div>
            </div>

        </Link>
    )
}
export default ItemCart
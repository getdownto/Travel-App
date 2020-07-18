import React from 'react'
import './ItemCart.css'

const ItemCart = (props) => {
    return (
        <div className="Cart col span-1-of-3 box">
            <p className="Heading">Coral Reefs Scuba Diving</p>
            <p className="Date">21.07.2020</p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgq_fkEr-Zg-ek25UYBvCDWjkBm-rlPXOASA&usqp=CAU" alt="img" />
            <div className="Lower">
                <p className="Price">$1200</p>
                <div className="Duration">
                    <img className="Icon" src="/calendar.svg" alt="img" />
                    <p>7 days</p>
                </div>
            </div>

        </div>
    )
}
export default ItemCart
import React from 'react'
import './ItemCart.css'

const ItemCart = (props) => {
    return (
        <div className="Cart col span-1-of-3 box">
            <p>Coral Reefs Scuba Diving</p>
            <img src="" alt="img" />
            <div>
                <p>$1200</p>
                <div>
                    <img src="" alt="img" />
                    <p>7 days</p>
                </div>
            </div>
        </div>
    )
}
export default ItemCart
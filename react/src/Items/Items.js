import React from 'react'
import ItemCart from '../ItemCart/ItemCart'
import './Items.css'

class Items extends React.Component {
    render() {
        return (
            <div className="Background">
                <div className="CartContainer">
                    <ItemCart />
                    <ItemCart />
                    <ItemCart />
                    <ItemCart />
                    <ItemCart />
                    <ItemCart />
                </div>
            </div>
        )
    }
}

export default Items
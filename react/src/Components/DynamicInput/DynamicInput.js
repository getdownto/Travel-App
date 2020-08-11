import React from 'react'
import styles from './DynamicInput.module.css'

const DynamicInput = (props) => {
    return (
        <div className={styles.Dynamic}>
            <input type="text" name="trip" placeholder="Destination" value={props.tripValue} onChange={props.changed}></input>
            <input className={styles.PriceField} type="text" name="price" placeholder="Price" value={props.priceValue} onChange={props.changed}></input>
            <button className={styles.InnerBtn} onClick={props.delete}>REMOVE</button>
        </div >
    )
}
export default DynamicInput
import React from 'react'
import styles from './AdditionalTrip.module.css'

const AdditionalTrip = (props) => {
    console.log(props);
    return (
        <div className={`${styles.ItemCart} ${styles.Aligned}`}>
            <div className={styles.CartContent}>
                <p>{props.destination}</p>
                <p className={styles.InlinePrice}>${props.price}</p>
            </div>
            {!props.expired ? <button className={styles.Btn} id={props.id} onClick={props.clicked}>Add</button> : null}
            {props.visible ? <img className={styles.confirmIcon} src="/confirm.svg"></img> : null}
        </div>
    )
}
export default AdditionalTrip
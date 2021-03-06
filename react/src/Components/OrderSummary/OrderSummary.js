import React from 'react'
import SubmitButton from '../../Components/SubmitButton/SubmitButton'
import styles from './OrderSummary.module.css'

const OrderSummary = (props) => {
    return (
    <div className={styles.OrderSummary}>
            <h3>ORDER CONFIRMATION</h3>
            <p className={styles.Thanks}>Thank you for yout order</p>
            <div className={`${styles.Headings} ${styles.Columns}`}>
                <h6>ORDER SUMMARY</h6>
                <h6>PRICE</h6>
            </div>
            <div className={`${styles.MainTrip} ${styles.Columns}`}>
                <p>{props.mainTrip}</p>
                <p>${Number(props.mainTripPrice).toFixed(2)}</p>
            </div>
            {props.additionalTrips !== null && props.additionalTrips.length > 0 ?
                <ul>
                    {props.additionalTrips.map((trip, index) => {
                         for (const key in trip) {
                            return <li className={`${styles.additionalTrips} ${styles.Columns}`} key={index}>
                                <p>+ {key}</p>
                                <p>${Number(trip[key]).toFixed(2)}</p>
                            </li>
                        }
                    })}
                </ul> : null}
            <div className={`${styles.Total} ${styles.Columns}`}>
                <p>Total:</p>
                <p>${props.totalPrice.toFixed(2)}</p>
            </div>
            <SubmitButton submit={props.submit} >CONFIRM</SubmitButton>
        </div>
    )
}
export default OrderSummary
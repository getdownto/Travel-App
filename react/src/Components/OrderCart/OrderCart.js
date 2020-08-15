import React from 'react'
import {Link} from 'react-router-dom'
import styles from './OrderCart.module.css'

const OrderCart = (props) => {
    const additionaTripsRendered = props.additionalTrips && props.additionalTrips.length > 0 &&
        props.additionalTrips.map((trip, index) => {
            const name = Object.keys(trip)[0]
            const price = trip[name]
            return <div className={styles.AddContainer} key={index}>
                <p>+ {name}</p>
                <p>${Number(price).toFixed(2)}</p>
            </div>
        })

    return (
        <div>
            <div className={styles.OrderCart}>
                <div className={styles.SmallImage}>
                    <img className={styles.Cover} src={props.imageUrl} alt="img" />
                </div>
                <div className={styles.Beside}>
                    <div className={styles.HeadingContainer}>
                    <p className={styles.OrderHeading}>{props.mainTrip}</p>
                    {props.isAdmin === true ? <div className={styles.EditIcons}>
                        <Link to={`/editOrder/${props.id}`}><img src='/edit.svg' alt='edit' /></Link>
                        <img src='/delete.svg' alt='delete' onClick={props.deleteOrder} id={props.id} />
                    </div> : null}
                    </div>
                    <div className={styles.MainTripDetails}>
                        <p className={styles.Date}>{props.startDate}</p>
                        <div className={styles.Duration}>
                            <img className={styles.Icon} src="/calendar.svg" alt="img" />
                            <p>{props.duration} days</p>
                        </div>
                        <p>${props.mainTripPrice}</p>
                    </div>
                    {additionaTripsRendered ?
                        <div className={styles.AdditionalTr}>
                            <h3 className={styles.AddHeading}>Additional Trips Added</h3>
                            {additionaTripsRendered}
                        </div> : <h3 className={styles.AddHeading}>No Additional Trips Added</h3>}
                    <div className={styles.TotalPriceContainer}>
                        <p>TOTAL:</p>
                        <p className={styles.TotalPrice}>${props.totalPrice.toFixed(2)}</p>
                    </div>
                    <div className={styles.StatusContainer}>
                            <p>ORDER STATUS:</p>
                            <p className={styles.TotalPrice}>{props.status}</p>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default OrderCart
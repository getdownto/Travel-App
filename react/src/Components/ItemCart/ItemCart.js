import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ItemCart.module.css'
import '../../Grid.css'

const ItemCart = (props) => {
    return (
        <Link to={`/details/${props.id}`} className={`${styles.Cart} col span-1-of-3 box`}>
            <p className={styles.Heading}>{props.destination}</p>
            <p className={styles.Date}>{props.startDate}</p>
            <div className={styles.FullImage}>
                <img className={styles.Cover} src={props.imageUrl} alt="img" />
            </div>
            <div className={styles.Lower}>
                {props.discount ? <div className={styles.PriceContainer}>
                    <p className={styles.Price}>${(0.85 * props.price).toFixed(2)}</p>
                    <p className={styles.OldPrice}>${props.price.toFixed(2)}</p>
                </div> : <p className={styles.Price}>${props.price.toFixed(2)}</p>}
                <div className={styles.Duration}>
                    <img className={styles.Icon} src="/calendar.svg" alt="img" />
                    <p>{props.duration} days</p>
                </div>
            </div>

        </Link>
    )
}
export default ItemCart
import React from 'react'
import styles from './Contacts.module.css'
import Aux from '../../hoc/Auxiliary'
import Welcome from '../../Components/Welcome/Welcome'

const Contacts = (props) => {
    return (
        <Aux>
            <Welcome welcome="Contacts" />
            <div className={styles.Container}>
            <div className={styles.Left}>
                <h1>Let's do something wild.</h1>
                <h6>FIND US:</h6>
                <p>On the way Str. 77</p>
                <p>1234 City, Country</p>
                <p className={styles.Bold}>+359 123456789</p>
                <p className={styles.Divided}>off@map.com</p>
            </div>
            <div className={styles.Right}>
                <img className={styles.Cover} src="/915.jpg" alt="pic" />
            </div>
            </div>
        </Aux>
    )
}
export default Contacts
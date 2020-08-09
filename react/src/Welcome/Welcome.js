import React from 'react'
import styles from './Welcome.module.css'

const Welcome = (props) => {
    return (
        <div className={styles.WelcomeBox}>
            <div className={styles.Yellow}></div>
            <div>
                <h1 className={styles.Welcome}>{props.welcome}</h1>
                <h5>The Wilderness is Waiting for You</h5>
            </div>
        </div>
    )
}
export default Welcome
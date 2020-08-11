import React from 'react'
import styles from './BackDrop.module.css'
const Backdrop = (props) => {
    return (
    <div className={styles.Backdrop} onClick={props.show}>{props.children}</div>
    )
}
export default Backdrop
import React from 'react'
import styles from './SubmitButton.module.css'

const SubmitButton = (props) => {
    return (
        <div>
            <button className={styles.SubmitBtn} onClick={props.submit}>{props.children}</button>
        </div>
    )
}
export default SubmitButton
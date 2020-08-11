import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Error.module.css'

const Error = (props) => {
    return (
        <div>
            <h1 className={styles.Heading}>404</h1>
            <h3>PAGE NOT FOUND</h3>
            <Link to="/" ><div className={styles.Btn}>back to Home</div></Link>
        </div>
    )
}
export default Error
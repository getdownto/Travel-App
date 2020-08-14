import React from 'react'
import SubmitButton from '../SubmitButton/SubmitButton'
import styles from './UploadImage.module.css'

const UploadImage = (props) => {

        return (
            <div className={styles.Container}>
                <p>or</p>
                <SubmitButton submit={props.showWidget}>Choose a file</SubmitButton>
            </div>
        )
    }

export default UploadImage
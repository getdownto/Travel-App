import React from 'react'
import Aux from '../../hoc/Auxiliary'
import Welcome from '../../Components/Welcome/Welcome'
import styles from './About.module.css'
import '../../Grid.css'

const About = (props) => {
    return (
        <Aux>
            <Welcome welcome="About us" />
            <div className={styles.Container}>
                <h1>A TRIP TO REMEMBER</h1>
                <p>Phasellus dictum tempor metus venenatis ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque vitae tristique enim. Sed pharetra scelerisque gravida. Suspendisse commodo sapien massa, sit amet posuere mauris euismod quis. Nulla facilisi. Maecenas pulvinar porta magna vel volutpat. Maecenas et dui risus.</p>
            </div>
            <div className={styles.Container}>
                <div className={`${styles.IconContainer} col span-1-of-3 box`}>
                    <img src='/travel.svg' alt="travel" />
                    <h3>Pick a Destination</h3>
                    <p>Morbi condimentum turpis vitae sapien mollis condimentum. Vivamus eu lectus ut massa sollicitudin interdum quis non mauris.</p>
                </div>
                <div className={`${styles.IconContainer} col span-1-of-3 box`}>
                    <img src='/beach.svg' alt="travel" />
                    <h3>Enjoy Yourself</h3>
                    <p>Morbi condimentum turpis vitae sapien mollis condimentum. Vivamus eu lectus ut massa sollicitudin interdum quis non mauris.</p>
                </div>
                <div className={`${styles.IconContainer} col span-1-of-3 box`}>
                    <img src='/photo-camera.svg' alt="travel" />
                    <h3>Collect Memories</h3>
                    <p>Morbi condimentum turpis vitae sapien mollis condimentum. Vivamus eu lectus ut massa sollicitudin interdum quis non mauris.</p>
                </div>
            </div>
        </Aux>
    )
}
export default About
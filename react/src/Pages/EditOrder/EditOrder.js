import React from 'react'
import Welcome from '../../Components/Welcome/Welcome'
import styles from './EditOrder.module.css'
import orderService from '../../services/order-service'
import moment from 'moment'
import history from '../../history'
import DropDown from '../../Components/DropDown/DropDown'
import SubmitButton from '../../Components/SubmitButton/SubmitButton'

class EditOrder extends React.Component {
    state = {
        mainTrip: '',
        destination: '',
        imageUrl: '',
        startDate: null,
        duration: '',
        mainTripPrice: '',
        totalPrice: '',
        status: '',
        additionalTrips: []
    }

    componentDidMount() {
        const id = this.props.match.params.id
        orderService.details(id).then(loadedOrder => {
            const date = new Date(loadedOrder.startDate)
            this.setState({
                mainTrip: loadedOrder.mainTrip,
                destination: loadedOrder.destination,
                imageUrl: loadedOrder.imageUrl,
                startDate: new Date(date.toUTCString()),
                duration: loadedOrder.duration,
                mainTripPrice: loadedOrder.mainTripPrice,
                totalPrice: loadedOrder.totalPrice,
                status: loadedOrder.status,
                additionalTrips: [...loadedOrder.additionalTrips]
            })
        })
    }

    handleSelect = (e) => {
        this.setState({status: e.target.value})
    }

    submitHandler = () => {
        const id = this.props.match.params.id
        orderService.update(id, this.state.status).then(updated => {
            history.push('/')
        })
    }

    render() {
        const additionaTripsRendered = this.state.additionalTrips && this.state.additionalTrips.length > 0 &&
            this.state.additionalTrips.map((trip, index) => {
                const name = Object.keys(trip)[0]
                const price = trip[name]
                return <div className={styles.AddContainer} key={index}>
                    <p>+ {name}</p>
                    <p>${Number(price).toFixed(2)}</p>
                </div>
            })
        return (
            <div>
                <Welcome welcome="Edit Order" />
                <div className={styles.OrderCart}>
                    <div className={styles.SmallImage}>
                        <img className={styles.Cover} src={this.state.imageUrl} alt="img" />
                    </div>
                    <div className={styles.Beside}>
                        <div className={styles.HeadingContainer}>
                            <p className={styles.OrderHeading}>{this.state.destination}</p>
                        </div>
                        <div className={styles.MainTripDetails}>
                            <p className={styles.Date}>{moment(this.state.startDate).format('DD/MM/YYYY')}</p>
                            <div className={styles.Duration}>
                                <img className={styles.Icon} src="/calendar.svg" alt="img" />
                                <p>{this.state.duration} days</p>
                            </div>
                            <p>${Number(this.state.mainTripPrice).toFixed(2)}</p>
                        </div>
                        {additionaTripsRendered ?
                            <div className={styles.AdditionalTr}>
                                <h3 className={styles.AddHeading}>Additional Trips Added</h3>
                                {additionaTripsRendered}
                            </div> : <h3 className={styles.AddHeading}>No Additional Trips Added</h3>}
                        <div className={styles.TotalPriceContainer}>
                            <p>TOTAL:</p>
                            <p className={styles.TotalPrice}>${Number(this.state.totalPrice).toFixed(2)}</p>
                        </div>
                        <div className={styles.StatusContainer}>
                            <p>ORDER STATUS:</p>
                            <DropDown status={this.state.status} handleSelect={this.handleSelect} />
                        </div>
                        <SubmitButton submit={this.submitHandler}>SAVE</SubmitButton>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditOrder
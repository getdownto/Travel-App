import React from 'react'
import moment from 'moment'
import Aux from '../hoc/Auxiliary'
import Welcome from '../Welcome/Welcome'
import Filtered from '../Filtered/Filtered'
import './Calendar.css'

const date = moment(new Date(), 'YYYY/MMM/DD')
const currentMonth = date.format('MMMM')
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const currentIndex = months.indexOf(currentMonth)

const currentMonthArr = months.slice(currentIndex).concat(months.slice(0, currentIndex))

class Calendar extends React.Component {
    state = {
        selectedMonth: currentMonth.toLowerCase()
    }

    clickHandler = (e) => {
        this.setState({selectedMonth: e.target.innerText.toLowerCase()})
    }

    render() {
        let classString = ''
        const monthTiles = currentMonthArr.map((curr, index) => {
            this.state.selectedMonth === curr.toLowerCase() ? classString = 'SingleTile Active' : classString = 'SingleTile'
            return <div className={classString} id={index} key={curr} onClick={this.clickHandler} >{curr}</div>
            
        })
        return (
            <Aux>
                <Welcome welcome="Calendar" />
                <div className="Tiles">
                    {monthTiles}
                </div>
                <Filtered filter={this.state.selectedMonth} />
            </Aux>
        )
    }
}
export default Calendar
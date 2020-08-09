import React from 'react'
import userService from '../../services/user-service'
import history from '../../history'
import AuthContext from '../../Context'
import styles from './Navigation.module.css'
import {Link, Redirect} from 'react-router-dom'

class Navigation extends React.Component {

    state = {
        isSticky: false,
        classList: [styles.NavigationStandAlone, styles.Sticky]
    }

    static contextType = AuthContext

    // componentDidMount() {
    //     const classes = this.state.classList
    //     window.addEventListener('scroll', () => {
    //         const isTop = window.scrollY > 2
    //         const nav = document.getElementById('nav')

    //         if(isTop) {
    //             this.setState({classList: [...classes, styles.Sticky]})
    //         }
    //     })
    // }

    logout = () => {
        userService.logout().then(() => {
            this.context.logOut()
            history.push('/')
        })
    }

    render () {
        const id = this.context.id
        console.log('props', this.props)
        const userProfile = <Link to={`/profile`} className={styles.Profile}>
            <img src="/user.svg" alt="img" />
            <p>{this.context.isAdmin ? 'Admin Panel' : 'My Profile'}</p>
        </Link>
       // const loggedInBtn = this.props.isAdmin ? <button className="LoginBtn"><Link to='/create'>NEW TRIP</Link></button> : <button className="LogoutBtn" onClick={this.logout}>LOGOUT</button>
        return (
            <nav id="nav">
                <div className={ [...this.state.classList].join(' ') }>
                    <p className={styles.Logo}>OFF THE MAP</p>
                    <ul className={styles.Menu}>
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/about">ABOUT</Link></li>
                        <li><Link to="/contacts">CONTACTS</Link></li>
                    </ul>
                    {this.props.isLogged === false ? 
                    <button className={styles.LoginBtn}><Link to='/login'>LOGIN</Link></button> : userProfile }
                </div>
            </nav>
        )
    }
}
export default Navigation
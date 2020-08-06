import React from 'react'
import userService from '../../services/user-service'
import history from '../../history'
import AuthContext from '../../Context'
import './Navigation.css'
import {Link, Redirect} from 'react-router-dom'

class Navigation extends React.Component {

    state = {
        isSticky: false
    }

    static contextType = AuthContext

    componentDidMount() {
        window.addEventListener('scroll', () => {
            const isTop = window.scrollY > 2
            const nav = document.getElementById('nav')

            isTop ? nav.classList.add('Sticky') : nav.classList.remove('Sticky')
        })
    }

    logout = () => {
        userService.logout().then(() => {
            this.context.logOut()
            history.push('/')
        })
    }

    render () {
        return (
            <nav id="nav">
                <div className={this.props.className}>
                    <p className="Logo">OFF THE MAP</p>
                    <ul className="Menu">
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/about">ABOUT</Link></li>
                        <li><Link to="/contacts">CONTACTS</Link></li>
                    </ul>
                    {this.props.isLogged === false ? <button className="LoginBtn"><Link to='/login'>LOGIN</Link></button> : 
                    // <button className="LoginBtn"><Link to='/create'>NEW TRIP</Link></button> 
                    <button className="LogoutBtn" onClick={this.logout}>LOGOUT</button> }
                </div>
            </nav>
        )
    }
}
export default Navigation
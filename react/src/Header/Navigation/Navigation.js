import React from 'react'
import './Navigation.css'
import {Link} from 'react-router-dom'

class Navigation extends React.Component {
    state = {
        isSticky: false,
        classNames: ['Test']
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            const isTop = window.scrollY > 2
            const nav = document.getElementById('nav')

            isTop ? nav.classList.add('Sticky') : nav.classList.remove('Sticky')
        })
    }

    componentDidUnmount() {
        window.removeEventListener('scroll')
    }

    render () {
        return (
            <nav id="nav">
                <div className={this.props.className}>
                    <p className="Logo">OFF THE MAP</p>
                    <ul className="Menu">
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/test">ABOUT</Link></li>
                        <li><Link to="/contacts">CONTACTS</Link></li>
                    </ul>
                    <button className="LoginBtn"><Link to='/login'>LOGIN</Link></button>
                </div>
            </nav>
        )
    }
}
export default Navigation
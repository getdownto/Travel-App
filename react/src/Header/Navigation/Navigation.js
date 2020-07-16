import React from 'react'
import './Navigation.css'

class Navigation extends React.Component {
    state = {
        isSticky: false,
        classNames: ['Test']
    }

    // componentDidMount() {
    //     window.addEventListener('scroll', () => {
    //         const isTop = window.scrollY > window.innerHeight
    //         const nav = document.getElementById('nav')

    //         isTop ? nav.classList.add('Sticky') : nav.classList.remove('Sticky')
    //     })
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll')
    // }

    render () {
        return (
            <nav id="nav">
                <div className="Navigation">
                    <p className="Logo">OFF THE MAP</p>
                    <ul className="Menu">
                        <li><a href="#home">HOME</a></li>
                        <li><a href="#about">ABOUT</a></li>
                        <li><a href="#contacts">CONTACTS</a></li>
                    </ul>
                    <button className="LoginBtn">LOGIN</button>
                </div>
            </nav>
        )
    }
}
export default Navigation
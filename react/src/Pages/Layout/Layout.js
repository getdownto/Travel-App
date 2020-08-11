import React from 'react'
import Aux from '../../hoc/Auxiliary'
import Navigation from '../../Header/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'


class Layout extends React.Component {
    state = {
        
    }

    render() {
        return (
            <Aux>
                <Navigation isLogged={this.props.isLogged} isAdmin={this.props.isAdmin}  />
                <main>
                    {this.props.children}
                </main>
                <Footer />
            </Aux>
        )
    }
}

export default Layout
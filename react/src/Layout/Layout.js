import React from 'react'
import Aux from '../hoc/Auxiliary'
import '../Layout/Layout.css'


class Layout extends React.Component {
    state = {
        
    }

    render() {
        return (
            <Aux>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout
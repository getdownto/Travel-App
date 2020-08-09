import React from 'react'
import Aux from '../hoc/Auxiliary'


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
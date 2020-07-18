import React from 'react'
import {Link} from 'react-router-dom'
import './Login.css'

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }

    render() {
        return (
            <div className="FormContainer">
                <form className="Login">
                    <input type="text" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
                    <input type="text" placeholder="Password" value={this.state.username} onChange={this.changeHandler} />
                    <button>Login</button>
                    <p><Link to="/register">Not a member yet? Click here to register.</Link></p>
                </form>
            </div>
        )
    }

}
export default Login
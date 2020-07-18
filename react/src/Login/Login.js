import React from 'react'
import {Link} from 'react-router-dom'
import './Login.css'

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }

    changeUsernameHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    changePasswordHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitForm = () => {
        console.log(this.state)
    }

    render() {
        return (
            <div className="FormContainer">
                <form className="Login">
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeUsernameHandler} />
                    <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changePasswordHandler} />
                    <button>Login</button>
                    <p><Link to="/register">Not a member yet? Click here to register.</Link></p>
                </form>
            </div>
        )
    }

}
export default Login
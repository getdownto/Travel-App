import React from 'react'
import {Link} from 'react-router-dom'
import './Register.css'

class Register extends React.Component {
    state = {
        username: '',
        password: '',
        repeatPassword: ''
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

    changeRepeatPasswordHandler = (e) => {
        this.setState({
            repeatPassword: e.target.value
        })
    }

    submitForm = () => {
        console.log(this.state)
    }

    render() {
        return (
            <div className="FormContainer">
                <form className="Register">
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeUsernameHandler} />
                    <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changePasswordHandler} />
                    <input type="text" name="repeatPassword" placeholder="Repeat Password" value={this.state.repeatPassword} onChange={this.changeRepeatPasswordHandler} />
                    <button>Register</button>
                    <p><Link to="/login">Already a member? Click here to log in.</Link></p>
                </form>
            </div>
        )
    }

}
export default Register
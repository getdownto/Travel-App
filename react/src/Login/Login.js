import React from 'react'
import {Link} from 'react-router-dom'
import * as yup from 'yup'
import userService from '../services/user-service'
import './Login.css'
import history from '../history'

const schema = yup.object({
    username: yup.string('Username must be a string')
        .required('Username is required')
        .min(3, 'Username must be more than 3 chars long'),
    password: yup.string('Password must be a string')
        .required('Password is required')
        .min(3, 'Password must be more than 3 chars long')
})

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        errors: null
    }

    changeFieldHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitForm = (e) => {
        e.preventDefault()
        schema.validate(this.state, { abortEarly: false })
            .then(() => {
                this.setState({ errors: null })
                userService.login(this.state.username, this.state.password).then(() => {
                    history.push('/')
                })
            })
            .catch(err => {
                console.log(err)
                const errors = err.inner.reduce((acc, { path, message }) => {
                    acc[path] = (acc[path] || []).concat(message)
                    return acc
                }, {})
                this.setState({ errors })
            })
    }

    render() {
        return (
            <div className="FormContainer">
                <form className="Login">
                <div className="FieldContainer">
                        <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeFieldHandler} />
                        {this.state.errors && this.state.errors['username'] ? <img className="errorIcon" src="/close.svg"></img> : null}
                    </div>
                    {this.state.errors && this.state.errors['username'] ? <p className="ErrorMessage">{this.state.errors.username[0]}</p> : null}
                    <div className="FieldContainer">
                        <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changeFieldHandler} />
                        {this.state.errors && this.state.errors['password'] ? <img className="errorIcon" src="/close.svg"></img> : null}
                    </div>
                    {this.state.errors && this.state.errors['password'] ? <p className="ErrorMessage">{this.state.errors.password[0]}</p> : null}
                    <button onClick={this.submitForm}>Login</button>
                    <p><Link to="/register">Not a member yet? Click here to register.</Link></p>
                </form>
            </div>
        )
    }

}
export default Login
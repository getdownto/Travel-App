import React from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import userService from '../../services/user-service'
import SubmitButton from '../../Components/SubmitButton/SubmitButton'
import './Login.css'
import Welcome from '../../Components/Welcome/Welcome'
import Aux from '../../hoc/Auxiliary'
import history from '../../history'
import AuthContext from '../../Context'

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
        errors: null,
        isLogged: null
    }

    static contextType = AuthContext

    changeFieldHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitForm = (e) => {
        e.preventDefault()
        schema.validate(this.state, { abortEarly: false })
            .then(() => {
                this.setState({ errors: null })
                userService.login(this.state.username, this.state.password).then((user) => {
                    console.log('before if user', user);
                    if (user !== 'Invalid username or password') {
                        this.context.logIn(user)
                        history.push('/')
                        this.setState({ isLogged: true })
                        console.log('logged in user', user);
                    } else {
                        this.setState({isLogged: false})
                    }
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
            <Aux>
                <Welcome welcome="Sign in" />
                <div className="FormContainer">
                    <form className="Login">
                    {this.state.isLogged ===false && <div className="ErrorMessage">Invalid username or password!</div>}
                        <div className="FieldContainer">
                            <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeFieldHandler} />
                            {this.state.errors && this.state.errors['username'] ? <img className="errorIcon" src="/close.svg" alt="error"></img> : null}
                        </div>
                        {this.state.errors && this.state.errors['username'] ? <p className="ErrorMessage">{this.state.errors.username[0]}</p> : null}
                        <div className="FieldContainer">
                            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeFieldHandler} />
                            {this.state.errors && this.state.errors['password'] ? <img className="errorIcon" src="/close.svg" alt="error"></img> : null}
                        </div>
                        {this.state.errors && this.state.errors['password'] ? <p className="ErrorMessage">{this.state.errors.password[0]}</p> : null}
                        <SubmitButton submit={this.submitForm}>Login</SubmitButton>
                        <p><Link to="/register">Not a member yet? Click here to register.</Link></p>
                    </form>
                </div>
            </Aux>
        )
    }

}
export default Login
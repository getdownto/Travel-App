import React from 'react'
import { Link } from 'react-router-dom'
import SubmitButton from '../SubmitButton/SubmitButton'
import userService from '../services/user-service'
import './Register.css'
import history from '../history'

import * as yup from 'yup'

const schema = yup.object({
    username: yup.string('Username must be a string')
        .required('Username is required')
        .min(3, 'Username must be more than 3 chars long'),
    password: yup.string('Password must be a string')
        .required('Password is required')
        .min(3, 'Password must be more than 3 chars long'),
    repeatPassword: yup.string('Repeat password must be a string')
        .required('Repeat password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
})

class Register extends React.Component {
    state = {
        username: '',
        password: '',
        repeatPassword: '',
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
                userService.register(this.state.username, this.state.password).then(() => {
                   history.push('/login')
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

    // validateInputHandler = () => {
    //     schema.validate(this.state, {abortEarly: false})
    //     .catch(err => {
    //         console.log(err.error.inner)
    //         const errors = err.inner.reduce((acc, {path, message}) => {
    //             acc[path] = (acc[path] || []).concat(message)
    //             return acc
    //         }, {})
    //         this.setState({errors})
    //     })
    // }

    render() {
        return (
            <div className="FormContainer">

                <form className="Register">
                    <div className="FieldContainer">
                        <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeFieldHandler} />
                        {this.state.errors && this.state.errors['username'] ? <img className="errorIcon" src="/close.svg" alt="err"></img> : null}
                    </div>
                    {this.state.errors && this.state.errors['username'] ? <p className="ErrorMessage">{this.state.errors.username[0]}</p> : null}
                    <div className="FieldContainer">
                        <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changeFieldHandler} />
                        {this.state.errors && this.state.errors['password'] ? <img className="errorIcon" src="/close.svg" alt="err"></img> : null}
                    </div>
                    {this.state.errors && this.state.errors['password'] ? <p className="ErrorMessage">{this.state.errors.password[0]}</p> : null}
                    <div className="FieldContainer">
                        <input type="text" name="repeatPassword" placeholder="Repeat Password" value={this.state.repeatPassword} onChange={this.changeFieldHandler} />
                        {this.state.errors && this.state.errors['repeatPassword'] ? <img className="errorIcon" src="/close.svg" alt="err"></img> : null}
                    </div>
                    {this.state.errors && this.state.errors['repeatPassword'] ? <p className="ErrorMessage">{this.state.errors.repeatPassword[0]}</p> : null}
                    <SubmitButton submit={this.submitForm}>Register</SubmitButton>
                    <p><Link to="/login">Already a member? Click here to log in.</Link></p>
                </form>
            </div>
        )
    }

}
export default Register
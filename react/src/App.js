import React from 'react';
import AuthContext from './Context'
import './App.css';
import './Grid.css'
import userService from './services/user-service';

class App extends React.Component {

  state = {
    isLogged: false,
    isAdmin: false,
    user: null,
    id: null
  }

  parseCookiesHandler = () => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [cookieName, cookieValue] = cookie.split('=')
      acc[cookieName] = cookieValue
      return acc
    }, {})
    return cookies
  }

  logIn = (user) => {
    this.setState({ isLogged: true, isAdmin: JSON.parse(user).isAdmin, id: JSON.parse(user)._id, user: JSON.parse(user) })
    console.log('state after login', this.state)
  }

  logOut = () => {
    this.setState({ isLogged: false, user: null, isAdmin: false, id: null })
  }

  componentDidMount() {
    const cookies = this.parseCookiesHandler()
    console.log('all cookies', cookies['x-auth-token'])
    if (cookies['x-auth-token'] !== null && cookies['x-auth-token'] !== undefined) {
      const token = cookies['x-auth-token']
      if(!token) {
        this.logOut()
        return
      }
      userService.verify(token).then(data => {
        if (data.user !== undefined) {
          const user = data.user
          this.setState({ isLogged: true, id: user._id, isAdmin: user.isAdmin, user })
        }
      })
    }
  }

  render() {

    return (
      <AuthContext.Provider value={{ isLogged: this.state.isLogged, isAdmin: this.state.isAdmin, id: this.state.id, user: this.state.user, logIn: this.logIn, logOut: this.logOut }}>
        {this.props.children}
      </AuthContext.Provider>

    )
  }
}

export default App;

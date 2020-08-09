import React from 'react';
import ScrollToTop from './ScrollToTop'
import Layout from './Layout/Layout'
import Header from './Header/Header'
import Navigation from './Header/Navigation/Navigation'
import Welcome from './Welcome/Welcome'
import Items from './Items/Items'
import Footer from './Footer/Footer'
import Login from './Login/Login'
import Register from './Register/Register'
import UserProfile from './UserProfile/UserProfile'
import CreateTrip from './CreateTrip/CreateTrip'
import Calendar from './Calendar/Calendar'
import LastMinute from './/LastMinute/LastMinute'
import SearchResults from './SearchResults/SearchResults'
import Destinations from './Destinations/Destinations'
import EditTrip from './EditTrip/EditTrip'
import Details from './Details/Details'
import Loading from './Loading/Loading'
import { Router, Route, Switch } from 'react-router-dom'
import AuthContext from './Context'
import './App.css';
import './Grid.css'
import history from './history';
import Aux from './hoc/Auxiliary';
import { relativeTimeThreshold } from 'moment';
import userService from './services/user-service';

class App extends React.Component {

  state = {
    isLogged: null,
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
      //const id = cookies['x-auth-token'].split('%3A')[1]
      const token = cookies['x-auth-token']
      if(!token) {
        this.logOut()
        return
      }
      userService.verify(token).then(data => {
        console.log(data)
        if (data.user !== undefined) {
          const user = data.user
          console.log('is this my user', data)
          // userService.load(id).then(user => {
          this.setState({ isLogged: true, id: user._id, isAdmin: user.isAdmin, user })
          // })
        }
      })
      // console.log(id)
    }
  }

  render() {
    console.log('logged', this.state.user);
    console.log('state', this.state);

    // if (this.state.isLogged === null) {
    //   return <Loading />
    // }

    return (
      <AuthContext.Provider value={{ isLogged: this.state.isLogged, isAdmin: this.state.isAdmin, id: this.state.id, user: this.state.user, logIn: this.logIn, logOut: this.logOut }}>
        <Router history={history}>
          <div className="App">
            <ScrollToTop>
              <Layout>
                <Navigation isLogged={this.state.isLogged} isAdmin={this.state.isAdmin} />
                <Switch>
                  <Route path="/" exact>
                    <header>
                      <Header />
                    </header>
                    <Welcome welcome="CHOOSE YOUR DESTINATION" />
                    <Items />
                  </Route>
                  <Route path="/about">
                    <Welcome welcome="About" />
                    <h1>Testing Scroll</h1>
                    <h1>Testing Scroll</h1>
                    <h1>Testing Scroll</h1>
                    <h1>Testing Scroll</h1>
                    <h1>Testing Scroll</h1>
                    <h1>Testing Scroll</h1>
                    <h1>Testing Scroll</h1>
                    <h1>Testing Scroll</h1>
                    <h1>Testing Scroll</h1>
                    <h1>Testing Scroll</h1>
                    <h1>Testing Scroll</h1>
                    <h1>Testing Scroll</h1>
                  </Route>
                  <Route path='/login' history={this.props.history}>
                    {!this.state.isLogged ? <Login /> : <div>You have logged already!</div>}
                  </Route>
                  <Route path='/register' history={this.props.history}>
                    <Welcome welcome="Register" />
                    <Register />
                  </Route>
                  <Route path='/create' history={this.props.history} >
                    {this.state.isLogged ? <CreateTrip /> : <Login />}
                  </Route>
                  <Route path='/calendar' exact component={Calendar} />
                  <Route path='/lastminute' exact component={LastMinute} />
                  <Route path='/search' exact component={SearchResults} />
                  <Route path='/destinations' exact component={Destinations} />
                  <Route path='/profile/' exact component={this.state.isLogged ? UserProfile : Login} />
                  <Route path='/:id' exact component={this.state.isLogged ? Details : Login} isAdmin={this.state.isAdmin} />
                  <Route path='/edit/:id' exact component={this.state.isAdmin ? EditTrip : null} />

                </Switch>
              </Layout>
            </ScrollToTop>
            <Footer />
          </div>
        </Router>
      </AuthContext.Provider>

    )
  }
}

export default App;

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
import CreateTrip from './CreateTrip/CreateTrip'
import Calendar from './Calendar/Calendar'
import LastMinute from './/LastMinute/LastMinute'
import SearchResults from './SearchResults/SearchResults'
import Destinations from './Destinations/Destinations'
import EditTrip from './EditTrip/EditTrip'
import Details from './Details/Details'
import { Router, Route, Switch } from 'react-router-dom'
import AuthContext from './Context'
import './App.css';
import './Grid.css'
import history from './history';
import Aux from './hoc/Auxiliary';

class App extends React.Component {

  state = {
    isLogged: false,
    user: null
  }

  parseCookiesHandler = () => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [cookieName, cookieValue] = cookie.split('=')
      acc[cookieName] = cookieValue
      return acc
    }, {})
    return cookies['x-auth-token'] !== null && cookies['x-auth-token'] !== undefined
  }

  logIn = (user) => {
    this.setState({ isLogged: true, user })
  }

  logOut = () => {
    this.setState({ isLogged: false, user: null })
  }

  componentDidMount() {
    if(this.parseCookiesHandler()) {
      this.setState({isLogged: true})
    }
  }

  render() {
    console.log('logged', this.state.isLogged);
    return (
      <AuthContext.Provider value={{isLogged: this.state.isLogged, user: this.state.user, logIn: this.logIn, logOut: this.logOut}}>
        <Router history={history}>
          <div className="App">
            <ScrollToTop>
              <Layout>
                <Navigation className="NavigationStandAlone" isLogged={this.state.isLogged} />
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
                  <Route path='/:id' exact component={this.state.isLogged ? Details : Login} />
                  <Route path='/edit/:id' exact component={this.state.isLogged ? EditTrip : Login} />
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

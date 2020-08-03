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
import './App.css';
import './Grid.css'
import history from './history';
import Aux from './hoc/Auxiliary';

class App extends React.Component {
  parseCookiesHandler = () => {
    return document.cookie.split('; ').reduce((acc, cookie) => {
      const [cookieName, cookieValue] = cookie.split('=')
      acc[cookieName] = cookieValue
      return acc
    }, {})
  }

  render() {
    const cookies = this.parseCookiesHandler()
    const isLogged = cookies['x-auth-token'] !== null && cookies['x-auth-token'] !== undefined
    console.log(isLogged)
    console.log(cookies)
    return (
      <Router history={history}>
        <div className="App">
          <ScrollToTop>
            <Layout>
              <Navigation className="NavigationStandAlone" isLogged={isLogged} />
              <Switch>
                <Route path="/" exact>
                  <header>
                  <Header isLogged={isLogged} />
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
                  <Welcome welcome="Sign in" />
                  <Login />
                </Route>
                <Route path='/register' history={this.props.history}>
                  <Welcome welcome="Register" />
                  <Register />
                </Route>
                <Route path='/create'history={this.props.history} >
                  <Welcome welcome="Add new trip" />
                  <CreateTrip />
                </Route>
                <Route path='/calendar' exact component={Calendar} />
                <Route path='/lastminute' exact component={LastMinute} />
                <Route path='/search' exact component={SearchResults} />
                <Route path='/destinations' exact component={Destinations} />
                <Route path='/:id' exact component={Details} />
                <Route path='/edit/:id' exact component={EditTrip} />
              </Switch>
            </Layout>
          </ScrollToTop>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;

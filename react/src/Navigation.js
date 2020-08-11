import React from 'react';
import ScrollToTop from './ScrollToTop'
import Layout from './Pages/Layout/Layout'
import Header from './Header/Header'
import Welcome from './Components/Welcome/Welcome'
import Items from './Items/Items'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import UserProfile from './Pages/UserProfile/UserProfile'
import CreateTrip from './CreateTrip/CreateTrip'
import Calendar from './Components/Calendar/Calendar'
import LastMinute from './Items/LastMinute'
import SearchResults from './Items/SearchResults'
import Destinations from './Components/Destinations/Destinations'
import EditTrip from './Pages/EditTrip/EditTrip'
import Details from './Pages/Details/Details'
import Error from './Pages/Error/Error'
import { Router, Route, Switch } from 'react-router-dom'
import AuthContext from './Context'
import './App.css';
import './Grid.css'
import history from './history';

class Navigation extends React.Component {

    static contextType = AuthContext

  render() {

    return (
        <Router history={history}>
          <div className="App">
            <ScrollToTop>
              <Layout isLogged={this.context.isLogged} isAdmin={this.context.isAdmin} >
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
                    {!this.context.isLogged ? <Login /> : <div>You have logged already!</div>}
                  </Route>
                  <Route path='/register' history={this.props.history}>
                    <Welcome welcome="Register" />
                    <Register />
                  </Route>
                  <Route path='/create' history={this.props.history} >
                    {this.context.isLogged ? <CreateTrip /> : <Login />}
                  </Route>
                  <Route path='/calendar' exact component={Calendar} />
                  <Route path='/lastminute' exact component={LastMinute} />
                  <Route path='/search' exact component={SearchResults} />
                  <Route path='/destinations' exact component={Destinations} />
                  <Route path='/profile' exact component={this.context.isLogged ? UserProfile : Login} />
                  <Route path='/details/:id' component={this.context.isLogged ? Details : Login} isAdmin={this.context.isAdmin} />
                  <Route path='/edit/:id' component={this.context.isAdmin ? EditTrip : null} />
                  <Route component={Error} />
                </Switch>
              </Layout>
            </ScrollToTop>
          </div>
        </Router>
    )
  }
}

export default Navigation;

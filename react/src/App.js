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
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import './App.css';
import './Grid.css'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ScrollToTop>
            <Switch>
              <Route path="/" exact>
                <Header />
                <Welcome welcome="CHOOSE YOUR DESTINATION" />
                <Items />
              </Route>
              <Layout>
                <Navigation className="NavigationStandAlone" />
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
                <Route path='/login'>
                  <Welcome welcome="Sign in" />
                  <Login />
                </Route>
                <Route path='/register'>
                  <Welcome welcome="Register" />
                  <Register />
                </Route>
                <Route path='/create'>
                  <Welcome welcome="Add new trip" />
                  <CreateTrip />
                </Route>
              </Layout>
            </Switch>
          </ScrollToTop>
          <Footer />
        </div>
      </BrowserRouter>

    )
  }
}

export default App;

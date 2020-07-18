import React from 'react';
import Layout from './Layout/Layout'
import Header from './Header/Header'
import Navigation from './Header/Navigation/Navigation'
import Welcome from './Welcome/Welcome'
import Items from './Items/Items'
import Footer from './Footer/Footer'
import Login from './Login/Login'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import './App.css';
import './Grid.css'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <Header />
              <Welcome />
              <Items />
            </Route>
            <Layout>
              <Navigation className="NavigationStandAlone" />
              <Welcome />
              <Route path="/about">
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
              <Route path='/login' component={Login}/>
            </Layout>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>

    )
  }
}

export default App;

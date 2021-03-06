import React, { Suspense } from 'react';
import ScrollToTop from './ScrollToTop'
import Layout from './Pages/Layout/Layout'
import Header from './Components/Header/Header'
import About from './Pages/About/About'
import Contacts from './Pages/Contacts/Contacts'
import Welcome from './Components/Welcome/Welcome'
import Items from './Components/Items/Items'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import UserProfile from './Pages/UserProfile/UserProfile'
import CreateTrip from './Pages/CreateTrip/CreateTrip'
import Calendar from './Pages/Calendar/Calendar'
import LastMinute from './Components/Items/LastMinute'
import SearchResults from './Components/Items/SearchResults'
import Destinations from './Pages/Destinations/Destinations'
import EditTrip from './Pages/EditTrip/EditTrip'
import Details from './Pages/Details/Details'
import UserOrders from './Pages/UserOrders/UserOrders'
import EditOrder from './Pages/EditOrder/EditOrder'
import Error from './Pages/Error/Error'
import Loading from './Components/Loading/Loading'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
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
                <Suspense fallback={<Loading/>}>
                <Switch>
                  <Route path="/" exact>
                    <header>
                      <Header />
                    </header>
                    <Welcome welcome="CHOOSE YOUR DESTINATION" />
                    <Items />
                  </Route>
                  <Route path="/about" component={About} />
                  <Route path="/contacts" component={Contacts} />
                  <Route path='/login' history={this.props.history}>
                    {!this.context.isLogged ? <Login /> :  (<Redirect to="/" />)}
                  </Route>
                  <Route path='/register' history={this.props.history}>
                  {!this.context.isLogged ? <Register /> :  (<Redirect to="/" />)}
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
                  <Route path='/user/:id' component={this.context.isAdmin ? UserOrders : Login} />
                  <Route path='/edit/:id' component={this.context.isAdmin ? EditTrip : null} />
                  <Route path='/editOrder/:id' component={this.context.isAdmin ? EditOrder : null} />
                  <Route component={Error} />
                </Switch>
                </Suspense>
              </Layout>
            </ScrollToTop>
          </div>
        </Router>
    )
  }
}

export default Navigation;

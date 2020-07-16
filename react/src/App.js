import React from 'react';
import Layout from './Layout/Layout'
import Header from './Header/Header'
import Welcome from './Welcome/Welcome'
import Items from './Items/Items'
import './App.css';
import './Grid.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header />
          <Welcome />
          <Items />
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
        </Layout>
      </div>
    )
  }
}

export default App;

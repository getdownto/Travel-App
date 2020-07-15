import React from 'react';
import Layout from './Layout/Layout'
import Header from './Header/Header'
import './App.css';
import './Grid.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header />
        </Layout>
      </div>
    )
  }
}

export default App;

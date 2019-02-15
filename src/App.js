import React, { Component } from 'react';
import SignIn from './components/sign-in'
import MainContent from './components/main-content'

class App extends Component {
  state ={
    authenticated: true,
    isTokenReceived: false
  }

  render () {
      if(!this.props.isAuthenticated){
        return (
        <SignIn />
        )
      } else {
        return (
        <MainContent />
        )
      }
  }

}

export default App;
import React, { Component, Fragment } from 'react';
import Header from './components/header'
import Footer from './components/footer'
import SignIn from './components/sign-in'
import MainContent from './components/main-content'

class App extends Component {
  state ={
    authenticated: true,
    isTokenReceived: false
  }

  render () {
        return (
          <Fragment>
            <Header />
              { this.renderContent() }
            <Footer />
          </Fragment>
      )
  }
  renderContent= () => {
    const { isAuthenticated, isTokenFailure } =this.props
     if(!isAuthenticated ){
        return (
        <Fragment>
          <SignIn isTokenFailure = {isTokenFailure}/>
        </Fragment>
        )
      } else {
        return (
        <MainContent />
        )
      }

  }

}

export default App;
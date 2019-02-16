import React, { Component, Fragment } from 'react';
import Header from './components/header'
import Footer from './components/footer'
import SignIn from './components/sign-in'
import StarredContent from './components/starred-content'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  state ={
    authenticated: true,
    isTokenReceived: false
  }

  render () {
    const { isAuthenticated, isTokenFailure } =this.props
        return (
          <Fragment>
            <Header />
            <Switch>
              <Route exact path="/" render={() => <SignIn isTokenFailure = {isTokenFailure}/>} />
              <Route path="/starred" render={() => <StarredContent isAuthenticated = {isAuthenticated}/>} />
           </Switch>
            <Footer />
          </Fragment>
      )
  }

}

export default App;
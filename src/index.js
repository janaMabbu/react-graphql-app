import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { getQueryParam } from './ducks/helpers.js'
import { getOauthToken } from './ducks/authenticate.js'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const CLIENT_SECRET= "ffaab5c8962c44dc142be4ea6de99b26bd1ff819"
const CLIENT_ID= "13f8dbc254ebd4fc3311"
 const code = getQueryParam('code')
 let oauthToken
 let isTokenFailure = false

const renderApp = ()=>{

  oauthToken =localStorage.getItem('oToken')
  const client = new ApolloClient({
  uri: `https://api.github.com/graphql?access_token=${oauthToken}&client_secret=${CLIENT_SECRET}`
})


ReactDOM.render((
   <ApolloProvider client={client}>
   <Router>
      <App isAuthenticated={ !!oauthToken } isTokenFailure ={ isTokenFailure} />
    </Router>
  </ApolloProvider>),
document.getElementById("root"))
}
  if(code && !localStorage.getItem('oToken')) {
    async function getToken() {
    try {
        const response = await getOauthToken(CLIENT_ID, CLIENT_SECRET, code)
        const json = await response.json();
        if (json.access_token){
          localStorage.setItem('oToken', json.access_token)
        } else {
          isTokenFailure = true
        }
      } 
    catch {
        isTokenFailure = true
      } 
    finally{
        renderApp()
      }
    }
    getToken()
  } else {
    renderApp()
  }



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

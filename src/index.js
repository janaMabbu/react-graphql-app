import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
// import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const client = new ApolloClient({
  uri: "https://api.github.com/graphql?access_token=2f3ffa4a55f50c0e72bebf34e7857072a8f23d8f&client_secret=ffaab5c8962c44dc142be4ea6de99b26bd1ff819"
})


ReactDOM.render((
   <ApolloProvider client={client}>
    <App />
  </ApolloProvider>),
document.getElementById("root"));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
// import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
})

// client
//   .query({
//     query: gql`
//       {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

// const App = () => (
//   <ApolloProvider client={client}>
//     <div>
//       <h2>My first Apollo app 🚀</h2>
//     </div>
//   </ApolloProvider>
// );

ReactDOM.render((
   <ApolloProvider client={client}>
    <App />
  </ApolloProvider>),
document.getElementById("root"));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

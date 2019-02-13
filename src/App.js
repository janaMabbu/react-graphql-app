import React, { Component } from 'react';
import './App.css'


import { Query } from "react-apollo";
import gql from "graphql-tag";
class App extends Component {
  render () {
    return (
      <Query
        query={gql`
          {
            rates(currency: "USD") {
              currency
              rate
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return data.rates.map(({ currency, rate }) => (
            <div key={currency}>
              <p>{currency}: {rate}</p>
            </div>
          ));
        }}
      </Query>
      )
  }
}

export default App;
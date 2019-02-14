import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import './App.css';
class App extends Component {
  state ={
    authenticated: true
  }
  render () {
    const { authenticated } = this.state
    const variables = {
   "number_of_repos": 3
  }
      if(authenticated){
        return (
          <Query
        query={gql`
          {
user(login: "janaMabbu"){
        repositories(first: 50){
            nodes{
                id
                name
            }
        }
    }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
          <div>
            <a href="https://github.com/login/oauth/authorize?client_id=13f8dbc254ebd4fc3311">git AUTH</a>
              {data.user.repositories.nodes.map(({ id, name }) => (

              <div key={id}>
                <p>{name}</p>
              </div>
            ))}
          </div>
          );
        }}
      </Query>
        )
      } else {
        return <div> <a href="https://github.com/login/oauth/authorize?client_id=13f8dbc254ebd4fc3311">git AUTH</a> </div>
      }
  }
}

export default App;
import React, { Component } from 'react';
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import './App.css';
class App extends Component {
  state ={
    authenticated: true,
    isTokenReceived: false
  }
  componentDidMount () {
    const code = this.getQueryParam('code')
    if(code) {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const gitURL = 'https://github.com/login/oauth/access_token?client_id=13f8dbc254ebd4fc3311&client_secret=ffaab5c8962c44dc142be4ea6de99b26bd1ff819&code='
      + code
    fetch(proxyurl + gitURL, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin':'*',
      'Accept': 'application/json'
    }
  }).then(result => {
      result.json().then(
        json => {
          //grab the Oauth token from here and start buiding the app
         console.log(json)
        }
      ).catch(
        // response body cannot be parsed
        e => {
          console.log(e)
        }
      )
    })
    .catch(e => {
       console.log(e)
    })
  }
    }
  render () {
    const { authenticated } = this.state
      if(authenticated){
        return (
          <Query
        query={gql`
          {
 viewer {
    name
     repositories(first: 50) {
       nodes {
         name
         nameWithOwner
          description
        createdAt
        updatedAt
        isFork
        stargazers {
  totalCount
}
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
              {data.viewer.repositories.nodes.map((repo) => (

              <div key={repo.id}>
                <p>{repo.name}</p>
                <p>{repo.nameWithOwner}</p>
                <p>{repo.description}</p>
                <p>{repo.createdAt}</p>
                <p>{repo.updatedAt}</p>
                {repo.isFork ? <p>forked</p> : <p>not-forked</p>}
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
  getQueryParam = (name) => {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
}

export default App;
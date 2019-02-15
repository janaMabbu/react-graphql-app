import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export default class MainContent extends React.Component {

  render () {
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
  }
}

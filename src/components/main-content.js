import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import RepositoryList from './repository-list'

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
         id
         name
         url
        descriptionHTML
        viewerHasStarred
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
            <RepositoryList
          loading={loading}
          repositories={data.viewer.repositories}
        />
          );
        }}
      </Query>
    )
  }
}

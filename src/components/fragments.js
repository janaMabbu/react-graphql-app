import gql from 'graphql-tag';

export const REPOSITORY_FRAGMENT = gql`
  fragment repository on Repository {
        id
         name
         url
        descriptionHTML
        viewerHasStarred
        stargazers {
          totalCount
        }
  }
`

export const GET_ALL_STARRED = gql`
          {
 viewer {
    login
    name
    starredRepositories(first: 25) {
      edges {
        cursor
        node {
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
          }
        `

export const GET_YOUR_REPOS = gql`
          {
 viewer {
    name
     repositories(first: 25) {
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
        `

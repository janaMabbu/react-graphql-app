/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import RepositoryItem from '../repository-item'


 const client = new ApolloClient({
  uri: `snapshotclient`
})

const repositories =[
  {
      "id": "1",
      "name": "repo1",
      "url": "https://github.com/facebook/zstd",
      "descriptionHTML": "<div>snapshottestcases/div>",
      "viewerHasStarred": true,
      "stargazers": {
        "totalCount": 1,
        "__typename": "StargazerConnection"
      },
      "__typename": "Repository"
    },
    {
      "id": "2",
      "name": "repo2",
      "url": "https://github.com/facebook/zstd",
      "descriptionHTML": "<div>snapshottestcases 23/div>",
      "viewerHasStarred": true,
      "stargazers": {
        "totalCount": 1,
        "__typename": "StargazerConnection"
      },
      "__typename": "Repository"
    },
    {
      "id": "2",
      "name": "repo3",
      "url": "https://github.com/facebook/zstd",
      "descriptionHTML": "<div>snapshottestcases 45/div>",
      "viewerHasStarred": true,
      "stargazers": {
        "totalCount": 1,
        "__typename": "StargazerConnection"
      },
      "__typename": "Repository"
    }

]

describe(`Repository-tem:snapshots`, () => {
      repositories.forEach(repo => {
        test(`testing Repository-item-snapshots`, () => {
          const tree = renderer.create(
            <ApolloProvider client ={client}>
            <RepositoryItem { ...repo } />
            </ApolloProvider>
          ).toJSON()
          expect(tree).toMatchSnapshot()
        })
      })
})
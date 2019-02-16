import gql from 'graphql-tag';

const REPOSITORY_FRAGMENT = gql`
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
`;

export default REPOSITORY_FRAGMENT;

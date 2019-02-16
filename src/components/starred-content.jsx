import React, {Fragment} from 'react'
import { Query } from 'react-apollo'
import RepositoryList from './repository-list'
import { GET_ALL_STARRED } from './fragments'
import { withRouter} from 'react-router-dom'
import { REPOSITORY_FRAGMENT } from './fragments'
import gql from 'graphql-tag';
import { css } from 'emotion'
// import { onError } from "apollo-link-error";

// const link = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.map(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//       ),
//     );

//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });


const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query($organizationName: String!, $cursor: String) {
    organization(login: $organizationName) {
      repositories(first: 10, after: $cursor) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;
const search__form = css`
  width: 100%;
  padding: 25px;
 margin: auto;`

class StarredContent extends React.Component {
  state = {
    search: false
  }
  
  componentDidMount (){
    const {isAuthenticated, history } = this.props
    if(!isAuthenticated) {
       history.push({
        pathname: '/'
      })
    }
  }

  render () {
    console.log("rendering")
    return (
      <Fragment>
      <div className={ search__form } >
        <div className="input-group col-sm-12">
  <input id="search-box" type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
  <div className="input-group-append">
  </div>
  <button className={ 'btn btn-primary btn-lg btn-block ' + css`margin-top:50px;`} onClick={this.onClick} type="button">Search</button>
    { this.state.search && <button className="btn btn-primary btn-lg btn-block" onClick={this.onClick} type="button">Go Back</button> }
</div>
</div>
      { !this.state.search
       ? <Query query={ GET_ALL_STARRED }  errorPolicy="all" >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
              <Fragment>
              <h1>Your Starred Repositories!!!</h1>
              <RepositoryList repositories={data.viewer.starredRepositories} />
            </Fragment>
            );
          }}
        </Query>
      : <Query query={ GET_REPOSITORIES_OF_ORGANIZATION }
      errorPolicy="all"
      variables={{
      organizationName: document.getElementById("search-box").value,
    }}
    skip={document.getElementById("search-box").value === ''} >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>No Repositories found</p>;

          return (
            <Fragment>
            <h1>Your results!!</h1>
            <RepositoryList repositories={data.organization.repositories} />
          </Fragment>
          );
        }}
      </Query>
      }
      </Fragment>
    )
  }
  onClick =() =>{
    this.setState({
      search:!this.state.search
    })
    this.forceUpdate()
  }
}
export default withRouter (StarredContent);
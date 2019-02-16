import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'
import RepositoryList from './repository-list'
import { withRouter } from 'react-router-dom'
import { GET_ALL_STARRED, GET_REPOSITORIES_OF_ORGANIZATION } from './fragments'
import { css } from 'emotion'

const searchForm = css`
  width: 100%;
  padding: 25px;
  margin: auto;`

class StarredContent extends React.Component {
static propTypes = {
    isAuthenticated: PropTypes.bool,
    history:PropTypes.object
  }

  state = {
    search: false
  }

  componentDidMount () {
    const { isAuthenticated, history } = this.props
    if (!isAuthenticated) {
      history.push({
        pathname: '/'
      })
    }
  }

  render () {
    return (
      <Fragment>
        <div className={ searchForm } >
          <div className="input-group col-xs-12">
            <input id="search-box" type="text" className="form-control" placeholder="Organization Name .. ex:'webpack', 'facebook'" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
            <div className="input-group-append">
            </div>
            <button className={ 'btn btn-primary btn-lg btn-block ' + css`margin-top:50px;` } onClick={ this.onClick } type="button">Search</button>
            { this.state.search && <button className="btn btn-primary btn-lg btn-block" onClick={ this.onClick } type="button">Go Back</button> }
          </div>
        </div>
        { !this.state.search
          ? <Query query={ GET_ALL_STARRED } errorPolicy="all" >
            { ({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>
              if (error) return <p>Error :(</p>

              return (
                <Fragment>
                  <h1 className={ css`text-align:center;` }>Your Starred Repositories!!!</h1>
                  <RepositoryList repositories={ data.viewer.starredRepositories } />
                </Fragment>
              )
            } }
          </Query>
          : <Query query={ GET_REPOSITORIES_OF_ORGANIZATION }
            errorPolicy="all"
            variables={{
              organizationName: document.getElementById('search-box').value,
            }}
            skip={ document.getElementById('search-box').value === '' } >
            { ({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>
              if (error) return <p>No Repositories found</p>

              return (
                <Fragment>
                  <h1 className={ css`text-align:center;` }>Your results!!</h1>
                  <RepositoryList repositories={ data.organization.repositories } />
                </Fragment>
              )
            } }
          </Query>
        }
      </Fragment>
    )
  }

  onClick =() => {
    this.setState({
      search: !this.state.search
    })
    this.forceUpdate()
  }
}
export default withRouter(StarredContent)

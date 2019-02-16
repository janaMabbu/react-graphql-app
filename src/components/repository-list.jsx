import React, { Fragment } from 'react'
import RepositoryItem from './repository-item'
import { css } from 'emotion'

const respository_item = css`
  padding: 20px;
	border-top: 1px solid #000;`

export default class RepositoryList extends React.Component {

  render () {
    return (
    <Fragment>
    {this.props.repositories.edges.map(({node}) => (
      <div key={node.name} className={ respository_item }>
        <RepositoryItem {...node} />
      </div>
    ))}
  </Fragment>
    )
  }
}

import React, { Fragment } from 'react'
import RepositoryItem from './repository-item'
import { css } from 'emotion'

const respositoryItem = css`
  padding: 20px;
  border-top: 1px solid #000;`

export default class RepositoryList extends React.Component {
  render () {
    return (
      <Fragment>
        { this.props.repositories.edges.map(({ node }) => (
          <div key={ node.name } className={ respositoryItem }>
            <RepositoryItem { ...node } />
          </div>
        )) }
      </Fragment>
    )
  }
}

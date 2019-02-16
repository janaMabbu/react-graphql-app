import React, { Fragment } from 'react'
import RepositoryItem from './repository-item'
import { css } from 'emotion'

const respository_item = css`
  padding: 20px;
	border-top: 1px solid #000;`


const RepositoryList = ({
  repositories,
}) => (
  <Fragment>
    {repositories.edges.map(({node}) => (
      <div key={node.name} className={ respository_item }>
        <RepositoryItem {...node} />
      </div>
    ))}
  </Fragment>
)

export default RepositoryList

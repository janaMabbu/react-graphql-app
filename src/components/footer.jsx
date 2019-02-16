import React from 'react'
import { css } from 'emotion'

export default class Footer extends React.Component {

  render () {
    return (
      <div className={css`
      width: 100%;
      height: 100px;
      background-color: blue;
    `}> </div>
    )
  }
}

import React from 'react'
import { css } from 'emotion'

export default class Header extends React.Component {

  render () {
    return (
      <div className={css`
      width: 100%;
      height: 100px;
      background-color: #2e6da4;;
    `}>
    {this.props.isAuthenticated && <button type="button" className={'btn btn-primary btn-danger ' + css`
      margin: 30px;
    float: right;`}onClick={this.onClick}>Sign out</button>}
    </div>
    )
  }
  onClick= ()=> {
      localStorage.removeItem('oToken');
      window.location.assign('https://github.com/logout')
    }
}

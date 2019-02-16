import React from 'react'
import { css } from 'emotion'

const center_box = css`
  min-height:300px;
  );`

const center_btn = css`
  min-width:250px;
  position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);`
export default class SignIn extends React.Component {
  render () {
    return (
      <div className="container">
      { this.props.isTokenFailure && <div className="alert alert-danger">
          <strong>Some issue with Authenticating, please try logging in!</strong>
        </div> }
        <div className= { 'col-sm-12 ' + center_box }>
          <a href="https://github.com/login/oauth/authorize?client_id=13f8dbc254ebd4fc3311&scope=public_repo" type="button" className= { 'btn btn-primary btn-lg ' + center_btn } >GIT SignIn</a>
        </div>
      </div>
    )
  }
}

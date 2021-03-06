import React from 'react'
import { css } from 'emotion'

const centerBox = css`
  min-height: calc(100vh - 200px);
  );`

const centerBtn = css`
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
        <div className={ 'col-sm-12 ' + centerBox }>
          {!localStorage.getItem('oToken')
           ? <button onClick={ this.onClick } type="button" className={ 'btn btn-primary btn-lg ' + centerBtn } >GIT SignIn</button>
          : <button  disabled={true} type="button" className={ 'btn btn-primary btn-lg ' + centerBtn } >Already Signed-In</button> }
        </div>
      </div>
    )
  }

  onClick =() => {
    localStorage.removeItem('oToken')
    window.location.assign('https://github.com/login/oauth/authorize?client_id=13f8dbc254ebd4fc3311&scope=public_repo')
  }
}

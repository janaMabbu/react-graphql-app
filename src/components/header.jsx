import React from 'react'
import { css } from 'emotion'
import { withRouter } from 'react-router-dom'
// import { logOut } from '../ducks/authenticate'
class Header extends React.Component {
  render () {
    return (
      <div className={ css`
      width: 100%;
      height: 100px;
      background-color: #2e6da4;;
    ` }>
        { localStorage.getItem('oToken') && <button type="button" className={ 'btn btn-primary btn-danger ' + css`
      margin: 30px;
    float: right;` }onClick={ this.onClick }>Sign out</button> }
      </div>
    )
  }

  onClick= () => {
   localStorage.removeItem('oToken')
    // find a way to kill github session...
    // // navigate to the home route
    // this.props.history.push({
    //   pathname: '/'
    // })
    //logOut()
    window.location.assign('https://github.com/logout')
  }
}
export default withRouter (Header)

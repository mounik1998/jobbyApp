import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMessage: ' '}

  loginForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    console.log(username)
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      console.log(this.props)
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      const errorMsg = data.error_msg
      this.setState({errorMessage: errorMsg})
    }
  }

  setUsername = e => {
    this.setState({username: e.target.value})
  }

  setPassword = e => {
    this.setState({password: e.target.value})
  }

  render() {
    const {username, password, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    //  use jwtToken to redirect to home route when jwt token is already available in cookies
    return (
      <div className="mainCon">
        <form className="subCon" onSubmit={this.loginForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
          <br />
          <div>
            <label className="labelInputLogin" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              className="inputLogin"
              id="username"
              type="text"
              value={username}
              onChange={this.setUsername}
            />
            <br />
            <label className="labelInputLogin" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              className="inputLogin"
              id="password"
              type="password"
              value={password}
              onChange={this.setPassword}
            />
            <br />
            <p className="errorText">{errorMessage}</p>
          </div>

          <br />
          <button
            className="buttonLogin"
            type="submit"
            onClick={this.loginForm}
          >
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login

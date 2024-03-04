import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="mainCon2">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="listItems">
        <li>
          <Link className="listName" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="listName" to="/jobs">
            Jobs
          </Link>
        </li>
      </ul>
      <Link to="/login">
        <button className="button1" type="button" onClick={logOut}>
          Log out
        </button>
      </Link>
    </div>
  )
}
export default Header

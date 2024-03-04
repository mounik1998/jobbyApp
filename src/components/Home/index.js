import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="./login" />
  }
  return (
    <div className="mainCon3">
      <Header />
      <div className="subCon2">
        <h1 className="homeHead">
          Find The Job That
          <br /> Fits Your Life
        </h1>
        <p className="paraText">
          Millions of people are searching for jobs,salary
          <br /> information company reviews.find the job that fits your
          <br />
          abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="buttonFindJobs" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home

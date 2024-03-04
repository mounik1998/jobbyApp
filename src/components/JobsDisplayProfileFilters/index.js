import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link, Redirect} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {RiSuitcaseFill} from 'react-icons/ri'
import {IoLocation} from 'react-icons/io5'
import {IoIosStar} from 'react-icons/io'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA +',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA +',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA +',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA +',
  },
]

class JobsDisplayProfileFilters extends Component {
  state = {
    profileDetails: {},
    apiStatus: 'Loading',
    radioInput: '',
    checkBoxInput: [],
    jobsList: [],
    apiStatus1: 'Loading',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobsList()
  }

  getJobsList = async () => {
    const {searchInput, radioInput, checkBoxInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl2 = `https://apis.ccbp.in/jobs?employment_type=${checkBoxInput}&minimum_package=${radioInput}&search=${searchInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(apiUrl2, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const updatedData = data.jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        packagePerAnnum: item.package_per_annum,
        rating: item.rating,
        title: item.title,
      }))

      this.setState({jobsList: updatedData, apiStatus1: 'Success'})
    } else {
      this.setState({apiStatus1: 'Failure'})
    }
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const profileData = {
        name: data.profile_details.name,
        profileImgUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      console.log(profileData)

      this.setState({profileDetails: profileData, apiStatus: 'Success'})
    } else {
      this.setState({apiStatus: 'Failure'})
    }
  }

  renderLoader1 = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  renderSuccessView1 = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobsListCon">
        {jobsList.map(item => (
          <li className="eachJobList" key={item.id}>
            <Link to={`/jobs/${item.id}`} className="eachJob">
              <div>
                <div>
                  <img
                    className="image"
                    src={item.companyLogoUrl}
                    alt="company logo"
                  />
                  <div>
                    <div className="logoJobDetails">
                      <RiSuitcaseFill className="logoIcon" />
                      <h1>{item.title}</h1>
                    </div>
                    <div className="logoJobDetails">
                      <IoIosStar className="logoIcon" />
                      <p className="ratingLocationFont">{item.rating}</p>
                    </div>
                  </div>
                </div>
                <hr />
                <div>
                  <div className="logoJobDetails">
                    <IoLocation className="logoIcon" />
                    <p className="ratingLocationFont">{item.location}</p>
                  </div>

                  <p>{item.employmentType}</p>
                  <p>{item.packagePerAnnum}</p>
                </div>
                <hr />
                <h1>Description</h1>
                <p>{item.jobDescription}</p>
                <hr />
                <hr />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  retry1 = () => {
    this.getJobsList()
  }

  retry2 = () => {
    this.getProfile()
  }

  renderFailureView1 = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.retry1}>
        Retry
      </button>
    </div>
  )

  renderJobsList = () => {
    const {apiStatus1} = this.state

    switch (apiStatus1) {
      case 'Loading':
        return this.renderLoader1()
      case 'Success':
        return this.renderSuccessView1()
      case 'Failure':
        return this.renderFailureView1()
      default:
        return null
    }
  }

  getSearchInput = e => {
    this.setState({searchInput: e.target.value}, this.getJobsList)
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  getSuccessView = () => {
    const {profileDetails} = this.state

    return (
      <div>
        <img
          className="image"
          src={profileDetails.profileImgUrl}
          alt="profile"
        />
        <h1 className="profileHead">{profileDetails.name}</h1>
        <p className="profileDescription">{profileDetails.shortBio}</p>
      </div>
    )
  }

  getFailureView = () => (
    <div>
      <button type="button" onClick={this.retry2}>
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'Loading':
        return this.renderLoading()
      case 'Success':
        return this.getSuccessView()
      case 'Failure':
        return this.getFailureView()
      default:
        return null
    }
  }

  getRadioOption = e => {
    this.setState({radioInput: e.target.id})
  }

  getCheckBoxItem = e => {
    const {checkBoxInput} = this.state
    const checkBoxInputVal = e.target.id
    console.log(checkBoxInputVal)

    const InputValNotInList = checkBoxInput.filter(
      item => item === checkBoxInputVal,
    )
    if (InputValNotInList.length === 0) {
      this.setState(
        prevVal => ({
          checkBoxInput: [...prevVal.checkBoxInput, checkBoxInputVal],
        }),
        this.getJobsList,
      )
    } else {
      const removeList = checkBoxInput.filter(item => item !== checkBoxInputVal)
      this.setState({checkBoxInput: removeList}, this.getJobsList)
    }
  }

  render() {
    const {searchInput, checkBoxInput, radioInput, jobsList} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(searchInput)
    console.log(radioInput)
    console.log(checkBoxInput)

    if (jwtToken === undefined) {
      return <Redirect to="./login" />
    }

    return (
      <div className="container1">
        <div>
          <div className="jobs-display-container">
            <div className="filter-part">
              <div>{this.renderProfileDetails()}</div>
              <hr />
              <div>
                <h1 className="profileHead">Type of Employment</h1>
                <ul className="filterList">
                  {employmentTypesList.map(item => (
                    <li className="filterItem" key={item.employmentTypeId}>
                      <div className="inputFilter">
                        <input
                          type="checkbox"
                          id={item.employmentTypeId}
                          onChange={this.getCheckBoxItem}
                        />
                        <label
                          className="profileDescription"
                          htmlFor={item.employmentTypeId}
                        >
                          {item.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <hr />
              <div>
                <h1 className="profileHead">Salary Range</h1>
                <ul className="filterList">
                  {salaryRangesList.map(item => (
                    <li className="filterItem" key={item.salaryRangeId}>
                      <div className="inputFilter">
                        <input
                          name="option"
                          type="radio"
                          id={item.salaryRangeId}
                          onChange={this.getRadioOption}
                        />
                        <label
                          className="profileDescription"
                          htmlFor={item.salaryRangeId}
                        >
                          {item.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="jobs-part">
              <div className="searchBarAndJobsCon">
                <div className="searchJobs">
                  <input
                    className="searchBar"
                    type="search"
                    placeholder="search"
                    value={searchInput}
                    onChange={this.getSearchInput}
                  />
                  <button
                    className="searchButton"
                    type="button"
                    data-testid="searchButton"
                  >
                    <FaSearch alt="search" className="searchLogo" />
                  </button>
                </div>
                {jobsList.length === 0 && (
                  <div>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                      alt="no jobs"
                    />
                    <p>We could not find any jobs. Try other filters</p>
                  </div>
                )}
                <div>{this.renderJobsList()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default JobsDisplayProfileFilters

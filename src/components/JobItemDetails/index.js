import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {RiSuitcaseFill} from 'react-icons/ri'
import {IoLocation} from 'react-icons/io5'
import {IoIosStar} from 'react-icons/io'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {jobDetails: {}, similarJobs: [], apiStatus: 'Loading'}

  componentDidMount() {
    this.getJobCardDetails()
  }

  getJobCardDetails = async () => {
    const {match} = this.props
    // console.log(this.props)
    const {params} = match
    const {id} = params
    // console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    // console.log(response)
    const data = await response.json()
    // console.log(data)

    if (response.ok === true) {
      const jobCardJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(item => ({
          imageUrl: item.image_url,
          name: item.name,
        })),
        title: data.job_details.title,
      }

      const jobCardSimilarJobs = data.similar_jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        rating: item.rating,
        title: item.title,
      }))

      console.log(jobCardJobDetails)
      console.log(jobCardSimilarJobs)

      this.setState({
        jobDetails: jobCardJobDetails,
        similarJobs: jobCardSimilarJobs,
        apiStatus: 'Success',
      })
    } else {
      this.setState({apiStatus: 'Failure'})
    }
  }

  retry = () => {
    this.jobCardJobDetails()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="./login" />
    }
    return (
      <div className="fontColor backGroundColor">
        <div>
          <div>
            <img
              className="companyLogo2"
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
            />
            <div>
              <div className="logoDescriptionAlign">
                <RiSuitcaseFill className="icon" />
                <p>{jobDetails.title}</p>
              </div>
              <div className="logoDescriptionAlign">
                <IoLocation className="icon" />
                <p>{jobDetails.location}</p>
              </div>
              <div className="logoDescriptionAlign">
                <IoIosStar className="icon" />
                <p>{jobDetails.rating}</p>
              </div>
              <p>{jobDetails.employmentType}</p>
              <p>Package Per Annum - {jobDetails.packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div>
            <h1>Description</h1>
            <div>
              <a
                href={jobDetails.companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                Visit
              </a>
              <p>{jobDetails.jobDescription}</p>
            </div>
          </div>
          <div>
            <h1>Skills</h1>
            <div>
              <ul className="skillsList listItemsDotsRemove">
                {jobDetails.skills.map(item => (
                  <li key={item.id}>
                    <div className="skillLogo">
                      <img
                        className="companyLogo2"
                        src={item.imageUrl}
                        alt={item.name}
                      />
                      <p className="skillName">{item.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h1>Life at Company</h1>
            <div>
              <p>{jobDetails.lifeAtCompany.description}</p>
              <img
                className="companyLogo2"
                src={jobDetails.lifeAtCompany.imageUrl}
                alt="Life at Company"
              />
            </div>
          </div>
        </div>

        <div>
          <h1>Similar Jobs</h1>
          <ul className="similarJobs listItemsDotsRemove">
            {similarJobs.map(item => (
              <li className="eachSimilarJobCon" key={item.id}>
                <div>
                  <div>
                    <img
                      className="companyLogo2"
                      src={item.companyLogoUrl}
                      alt="similar job company logo"
                    />
                    <div>
                      <h1>{item.title}</h1>
                      <p>Rating: {item.rating}</p>
                    </div>
                  </div>
                  <div>
                    <h1>Description</h1>
                    <p>{item.jobDescription}</p>
                  </div>
                  <div>
                    <div className="logoDescriptionAlign">
                      <IoLocation />
                      <p>{item.location}</p>
                    </div>

                    <p>Employment Type : {item.employmentType}</p>
                  </div>
                  <hr />
                  <hr />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobCard = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'Loading':
        return this.renderLoader()
      case 'Success':
        return this.renderSuccessView()
      case 'Failure':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderJobCard()}
      </div>
    )
  }
}

export default JobItemDetails

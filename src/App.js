import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/jobs" component={Jobs} />
        <Route exact path="/jobs/:id" component={JobItemDetails} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App

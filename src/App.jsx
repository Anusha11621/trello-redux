import React, { Component } from 'react'
import Boards from './Components/Boards'
import Lists from './Components/Lists'
import { Switch,Route } from 'react-router-dom'
export default class App extends Component {
  render() {
    return (
      <Switch>
          <Route exact path="/" component={Boards} />
          <Route exact path="/:id" component={Lists} />
      </Switch>
    )
  }
}


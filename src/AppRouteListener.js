import React from 'react'
import { connect } from 'react-redux'
import { start3Ddemo } from './reducers/demo3dReducer'

class AppRouteListener extends React.Component {

  componentDidMount() {
    const route = this.props.match.params.route
    if (route === '3Dpop') this.props.start3Ddemo()
  }
  render() {
    return null
  }
}

const mapDispatchToProps = {
  start3Ddemo,
}

const connectedAppRouteListener = connect(null, mapDispatchToProps)(AppRouteListener)

export default connectedAppRouteListener

import React from 'react'
import { connect } from 'react-redux'

class MapControl extends React.Component {

  componentDidUpdate = async (prevProps) => {
    const { map } = this.props
    const { camera3d } = this.props.mapState

    if (camera3d && !prevProps.mapState.camera3d) map.easeTo({ pitch: 35 })
    if (!camera3d && prevProps.mapState.camera3d) map.easeTo({ pitch: 0, bearing: 0 })

  }

  render() { return null }
}

const mapStateToProps = (state) => ({
  mapState: state.map,
})

const ConnectedMapControl = connect(mapStateToProps)(MapControl)

export default ConnectedMapControl

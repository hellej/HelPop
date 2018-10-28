import React from 'react'
import { connect } from 'react-redux'
import * as constants from './../../constants'

class MapControl extends React.Component {

  componentDidUpdate = async (prevProps) => {
    const { map } = this.props
    const { basemap, camera3d, zoomToBbox } = this.props.mapState

    if (camera3d && !prevProps.mapState.camera3d) map.easeTo({ pitch: 30 })
    if (!camera3d && prevProps.mapState.camera3d) map.easeTo({ pitch: 0, bearing: 0 })
    if (zoomToBbox !== prevProps.mapState.zoomToBbox) map.fitBounds(zoomToBbox)
    if (zoomToBbox !== prevProps.mapState.zoomToBbox) map.fitBounds(zoomToBbox)
    if (basemap !== prevProps.mapState.basemap) map.setStyle(constants.BASEMAPS[basemap].url)
  }

  render() { return null }
}

const mapStateToProps = (state) => ({
  mapState: state.map,
})

const ConnectedMapControl = connect(mapStateToProps)(MapControl)

export default ConnectedMapControl

import React from 'react'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { connect } from 'react-redux'
import { updateAOI, deleteAOIs, drawModeChanged } from './../../reducers/AOIreducer'

class Draw extends React.Component {

  draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    }
  })

  componentDidMount() {
    const { map, updateAOI, deleteAOIs, drawModeChanged } = this.props

    map.on('load', () => map.addControl(this.draw, 'top-left'))

    map.on('draw.create', (e) => updateAOI(e.features))
    map.on('draw.update', (e) => updateAOI(e.features))
    map.on('draw.modechange', (e) => drawModeChanged(e.mode))
    map.on('draw.delete', deleteAOIs)
  }

  render() {
    return null
  }
}

const mapDispatchToProps = {
  updateAOI,
  deleteAOIs,
  drawModeChanged,
}

const ConnectedDraw = connect(null, mapDispatchToProps)(Draw)

export default ConnectedDraw

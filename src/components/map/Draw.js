import React from 'react'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { connect } from 'react-redux'
import { updateAOI, deleteAOIs, drawModeChanged } from './../../reducers/AOIreducer'
import { showTooltip } from './../../reducers/tooltipReducer'

class Draw extends React.Component {

  draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    }
  })

  componentDidMount() {
    const { map, updateAOI, deleteAOIs, drawModeChanged, showTooltip } = this.props

    map.on('load', () => map.addControl(this.draw, 'top-left'))

    map.on('draw.update', (e) => updateAOI(e.features))
    map.on('draw.modechange', (e) => drawModeChanged(e.mode))
    map.on('draw.delete', deleteAOIs)
    map.on('draw.create', (e) => {
      updateAOI(e.features)
      showTooltip('AOI created. Start editing by clicking a node. Drag polygon if it needs to be moved.', 1, 9)
    })
  }

  render() {
    return null
  }
}

const mapDispatchToProps = {
  updateAOI,
  deleteAOIs,
  drawModeChanged,
  showTooltip,
}

const ConnectedDraw = connect(null, mapDispatchToProps)(Draw)

export default ConnectedDraw

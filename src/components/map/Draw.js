import React from 'react'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { connect } from 'react-redux'
import { initializeDraw, drawModeChanged, drawSelectionChanged } from './../../reducers/drawReducer'
import { updateAOI, deleteAOI } from './../../reducers/aoiReducer'
import { showTooltip } from './../../reducers/tooltipReducer'

class Draw extends React.Component {

  draw = new MapboxDraw({
    displayControlsDefault: false
  })

  componentDidMount() {
    const { map, initializeDraw, updateAOI, deleteAOI,
      drawModeChanged, showTooltip, drawSelectionChanged } = this.props

    map.on('load', () => map.addControl(this.draw))
    initializeDraw(this.draw)

    map.on('draw.modechange', (e) => drawModeChanged(e.mode))
    map.on('draw.selectionchange', () => drawSelectionChanged())
    map.on('draw.delete', deleteAOI)
    map.on('draw.update', (e) => updateAOI(e.features))
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
  initializeDraw,
  updateAOI,
  deleteAOI,
  drawModeChanged,
  drawSelectionChanged,
  showTooltip,
}

const ConnectedDraw = connect(null, mapDispatchToProps)(Draw)

export default ConnectedDraw

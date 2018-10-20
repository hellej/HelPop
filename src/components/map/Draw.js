import React from 'react'
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js'
import { connect } from 'react-redux'
import { initializeDraw, drawSelectionChanged, createDrawAreas, updateDrawAreas } from './../../reducers/drawReducer'
import { showNotification } from './../../reducers/notificationReducer'

class Draw extends React.Component {

  draw = new MapboxDraw({
    displayControlsDefault: false
  })

  componentDidMount() {
    const { map, initializeDraw, drawSelectionChanged,
      createDrawAreas, updateDrawAreas } = this.props

    map.on('load', () => map.addControl(this.draw))
    initializeDraw(this.draw)

    map.on('draw.modechange', (e) => console.log('draw.modechange:', e.mode))
    map.on('draw.selectionchange', () => drawSelectionChanged())
    map.on('draw.delete', (e) => console.log('draw.delete:', e))
    map.on('draw.update', (e) => updateDrawAreas(e))
    map.on('draw.create', (e) => createDrawAreas(e))
  }

  render() {
    return null
  }
}

const mapDispatchToProps = {
  initializeDraw,
  drawSelectionChanged,
  showNotification,
  createDrawAreas,
  updateDrawAreas,
}

const ConnectedDraw = connect(null, mapDispatchToProps)(Draw)

export default ConnectedDraw

import React from 'react'
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js'
import { connect } from 'react-redux'
import { initializeDraw, drawSelectionChanged, createDrawAreas, updateDrawAreas } from './../../reducers/drawReducer'
import { removeAOIs, setMapHoveredAOI, unsetMapHoveredAOI } from './../../reducers/aoiReducer'
import { showNotification } from './../../reducers/notificationReducer'

class Draw extends React.Component {

  draw = new MapboxDraw({
    displayControlsDefault: false
  })

  componentDidMount() {
    const { map, initializeDraw, drawSelectionChanged,
      createDrawAreas, updateDrawAreas, removeAOIs,
      setMapHoveredAOI, unsetMapHoveredAOI } = this.props

    map.on('load', () => map.addControl(this.draw))
    initializeDraw(this.draw)

    map.on('draw.modechange', (e) => console.log('draw.modechange:', e.mode))
    map.on('draw.selectionchange', () => drawSelectionChanged())
    map.on('draw.delete', (e) => removeAOIs(e.features))
    map.on('draw.update', (e) => updateDrawAreas(e))
    map.on('draw.create', (e) => createDrawAreas(e))

    map.on('mouseenter', 'gl-draw-polygon-fill-inactive.cold', (e) => setMapHoveredAOI(e.features[0].properties.id))
    map.on('mouseleave', 'gl-draw-polygon-fill-inactive.cold', () => unsetMapHoveredAOI())
    map.on('mouseenter', 'gl-draw-polygon-fill-active.cold', (e) => setMapHoveredAOI(e.features[0].properties.id))
    map.on('mouseleave', 'gl-draw-polygon-fill-active.cold', () => unsetMapHoveredAOI())
    // map.on('mouseenter', 'gl-draw-polygon-fill-static.cold', (e) => { console.log('static.cold', e) })
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
  removeAOIs,
  setMapHoveredAOI,
  unsetMapHoveredAOI,
}

const ConnectedDraw = connect(null, mapDispatchToProps)(Draw)

export default ConnectedDraw

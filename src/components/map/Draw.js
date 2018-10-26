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

    map
      .on('draw.modechange', (e) => console.log('draw.modechange:', e.mode))
      .on('draw.selectionchange', () => drawSelectionChanged())
      .on('draw.delete', (e) => removeAOIs(e.features))
      .on('draw.update', (e) => updateDrawAreas(e))
      .on('draw.create', (e) => createDrawAreas(e))

    map
      .on('mouseenter', 'gl-draw-polygon-fill-inactive.cold', (e) => setMapHoveredAOI(e.features[0].properties.id))
      .on('mouseenter', 'gl-draw-polygon-fill-active.cold', (e) => setMapHoveredAOI(e.features[0].properties.id))
      .on('mouseenter', 'gl-draw-polygon-fill-static.cold', (e) => setMapHoveredAOI(e.features[0].properties.id))
      .on('mouseenter', 'gl-draw-polygon-fill-inactive.hot', (e) => setMapHoveredAOI(e.features[0].properties.id))
      .on('mouseenter', 'gl-draw-polygon-fill-active.hot', (e) => setMapHoveredAOI(e.features[0].properties.id))
      .on('mouseenter', 'gl-draw-polygon-fill-static.hot', (e) => setMapHoveredAOI(e.features[0].properties.id))
      .on('mouseleave', 'gl-draw-polygon-fill-inactive.cold', () => unsetMapHoveredAOI())
      .on('mouseleave', 'gl-draw-polygon-fill-active.cold', () => unsetMapHoveredAOI())
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

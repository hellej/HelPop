import React from 'react'
import { connect } from 'react-redux'
import * as censusFC from './../../data/vaesto-250m-2017.json'
import { initialize3Ddemo } from '../../reducers/demo3dReducer'
import { setMouseOnFeature } from '../../reducers/mapReducer'

class Demo3D extends React.Component {

  componentDidMount() {
    this.props.initialize3Ddemo()
  }

  componentDidUpdate = async (prevProps) => {
    const { layerId, visible, mbPaintStyle } = this.props.demo3d
    const { basemap } = this.props.mapState

    if (visible && !prevProps.demo3d.visible) this.addLayer(this.props.map, layerId, censusFC, mbPaintStyle)

    if (prevProps.mapState.basemap !== basemap) {
      this.props.map.on('style.load', () => {
        this.addLayer(this.props.map, layerId, censusFC, mbPaintStyle)
      })
    }

    if (!visible && prevProps.demo3d.visible) {
      this.props.map.off('mousemove', this.setMouseOnFeature)
      this.props.map.removeLayer(layerId)
    }
  }

  addLayer = async (map, layerId, data, mbPaintStyle) => {
    if (!this.props.demo3d.visible) return
    if (!map.getSource(layerId)) map.addSource(layerId, { type: 'geojson', data })
    if (!map.getLayer(layerId)) {
      map.addLayer({
        id: layerId,
        source: layerId,
        type: 'fill-extrusion',
        paint: mbPaintStyle
      })
    }
    this.props.map.on('mousemove', this.setMouseOnFeature)
  }

  setMouseOnFeature = (e) => {
    const features = this.props.map.queryRenderedFeatures(e.point, { layers: [this.props.demo3d.layerId] })
    this.props.setMouseOnFeature(features[0])
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  mapState: state.map,
  demo3d: state.demo3d,
})

const mapDispatchToProps = {
  initialize3Ddemo,
  setMouseOnFeature,
}

const ConnectedDemo3D = connect(mapStateToProps, mapDispatchToProps)(Demo3D)

export default ConnectedDemo3D

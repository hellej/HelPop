import React from 'react'
import { connect } from 'react-redux'
import censusFC from './../../data/vaesto-250m-2017.json'
import { initialize2Ddemo } from '../../reducers/demo2dReducer'
import { setMouseOnFeature } from '../../reducers/mapReducer'

class Demo2D extends React.Component {

  componentDidMount() {
    this.props.initialize2Ddemo()
  }

  componentDidUpdate = async (prevProps) => {
    const { layerId, visible, mbPaintStyle } = this.props.demo2d
    const { basemap } = this.props.mapState

    if (visible && !prevProps.demo2d.visible) this.addLayer(this.props.map, layerId, censusFC, mbPaintStyle)

    if (prevProps.mapState.basemap !== basemap) {
      this.props.map.on('style.load', () => {
        this.addLayer(this.props.map, layerId, censusFC, mbPaintStyle)
      })
    }

    if (!visible && prevProps.demo2d.visible) {
      this.props.map.off('mousemove', this.setMouseOnFeature)
      this.props.map.removeLayer(layerId)
    }
  }

  addLayer = async (map, layerId, data, mbPaintStyle) => {
    if (!this.props.demo2d.visible) return
    if (!map.getSource(layerId)) map.addSource(layerId, { type: 'geojson', data })
    if (!map.getLayer(layerId)) {
      map.addLayer({
        id: layerId,
        source: layerId,
        type: 'fill',
        paint: mbPaintStyle
      })
    }
    this.props.map.on('mousemove', this.setMouseOnFeature)
  }

  setMouseOnFeature = (e) => {
    const features = this.props.map.queryRenderedFeatures(e.point, { layers: [this.props.demo2d.layerId] })
    this.props.setMouseOnFeature(features[0])
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  mapState: state.map,
  demo2d: state.demo2d,
})

const mapDispatchToProps = {
  initialize2Ddemo,
  setMouseOnFeature,
}

const ConnectedDemo2D = connect(mapStateToProps, mapDispatchToProps)(Demo2D)

export default ConnectedDemo2D

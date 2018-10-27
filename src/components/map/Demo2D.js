import React from 'react'
import { connect } from 'react-redux'
import * as censusFC from './../../data/vaesto-250m-2017.json'
import { initialize2Ddemo } from './../../reducers/demo2dReducer'

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
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  mapState: state.map,
  demo2d: state.demo2d,
})

const ConnectedDemo2D = connect(mapStateToProps, { initialize2Ddemo })(Demo2D)

export default ConnectedDemo2D

import React from 'react'
import { connect } from 'react-redux'
import * as censusFC from './../../data/vaesto-250m-2017.json'

const paintStyle = {
  'fill-color': [
    'interpolate',
    ['linear'],
    ['get', 'ASUKKAITA'],
    0, '#F2F12D',
    10, '#EED322',
    50, '#E6B71E',
    100, '#DA9C20',
    200, '#CA8323',
    400, '#B86B25',
    800, '#A25626',
    1300, '#8B4225',
    1800, '#723122'
  ],
  'fill-opacity': 0.8
}

class Demo2D extends React.Component {

  layerId = '2Ddemo'

  addGridLayer = async (map, layerId, data, timeout) => {
    if (!map.isStyleLoaded()) {
      await new Promise(resolve => setTimeout(resolve, timeout * 1000))
    }
    map.addSource(layerId, { type: 'geojson', data })
    map.addLayer({
      id: layerId,
      source: layerId,
      type: 'fill',
      paint: paintStyle
    })
  }

  componentDidUpdate = async (prevProps) => {
    const { basemap, demo2d } = this.props.mapState
    if (demo2d && !prevProps.mapState.demo2d) {
      this.addGridLayer(this.props.map, this.layerId, censusFC, 0)
    }
    if (demo2d && prevProps.mapState.basemap !== basemap) {
      this.addGridLayer(this.props.map, this.layerId, censusFC, 2)
    }
    if (!demo2d && prevProps.mapState.demo2d) {
      this.props.map.removeLayer(this.layerId)
      this.props.map.removeSource(this.layerId)
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  mapState: state.map
})

const ConnectedDemo2D = connect(mapStateToProps, null)(Demo2D)

export default ConnectedDemo2D

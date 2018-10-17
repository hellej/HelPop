import React from 'react'
import { connect } from 'react-redux'
import * as censusFC from './../../data/vaesto-250m-2017.json'

const colors = [
  { color: '#EED322', value: 100 },
  { color: '#E6B71E', value: 500 },
  { color: '#B86B25', value: 900 },
  { color: '#8B4225', value: 2000 },
  { color: '#723122', value: null },
]

// const mbColors = (colors) => {
//   let mbColors = []
//   colors.forEach(item => {
//     mbColors.push(item.color)
//     if (item.value) { mbColors.push(item.value) }
//   })
//   return mbColors
// }

const paintStyle = {
  'fill-color': [
    'step',
    ['get', 'ASUKKAITA'],
    // ...mbColors(colors) this works too
    colors[0].color, colors[0].value,
    colors[1].color, colors[1].value,
    colors[2].color, colors[2].value,
    colors[3].color, colors[3].value,
    colors[4].color,
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
    // console.log('colors: ', mbColors(colors))
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

import React from 'react'
import { connect } from 'react-redux'

class AOI extends React.Component {

  componentDidMount() {
    const { layerId, FC } = this.props.aoi

    this.props.map.addSource(layerId, { type: 'geojson', data: FC })
    this.props.map.addLayer({
      id: layerId, source: layerId, type: 'line',
      paint: {
        'line-width': 8,
        'line-color': '#99f9ff',
        'line-opacity': 0.8,
      },
      layout: {
        'line-join': 'round',
      }
    })
  }

  componentDidUpdate = async (prevProps) => {
    const { layerId, FC, listHoveredId } = this.props.aoi

    const layer = this.props.map.getSource(layerId)
    if (layer) layer.setData(FC)

    if (listHoveredId !== '') {
      this.props.map.setFilter(layerId, ['match', ['get', 'name'], listHoveredId, true, false])
    } else { this.props.map.setFilter(layerId, ['==', '-', '']) }

  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  aoi: state.aoi,
})

const ConnectedAOI = connect(mapStateToProps)(AOI)

export default ConnectedAOI
import React from 'react'
import { connect } from 'react-redux'

class AOI extends React.Component {

  componentDidMount() {
    this.addLayer()
  }

  componentDidUpdate = async (prevProps) => {
    const { layerId, FC, listHoveredId } = this.props.aoi
    const { basemap } = this.props.mapState

    if (prevProps.mapState.basemap !== basemap) {
      this.props.map.on('style.load', () => {
        this.addLayer()
      })
    }

    const layer = this.props.map.getSource(layerId)
    if (layer) layer.setData(FC)

    if (!this.props.map.isStyleLoaded()) return

    if (prevProps.aoi.listHoveredId !== listHoveredId) {
      this.props.map.setFilter(layerId, ['match', ['get', 'name'], listHoveredId, true, false])
    } else { this.props.map.setFilter(layerId, ['==', '-', '']) }

  }

  addLayer = () => {
    const { layerId, FC } = this.props.aoi
    if (!this.props.map.getSource(layerId)) this.props.map.addSource(layerId, { type: 'geojson', data: FC })
    if (!this.props.map.getLayer(layerId)) {
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
    this.props.map.setFilter(layerId, ['==', '-', ''])
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  aoi: state.aoi,
  mapState: state.map,
})

const ConnectedAOI = connect(mapStateToProps)(AOI)

export default ConnectedAOI

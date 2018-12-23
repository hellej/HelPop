import React from 'react'
import { connect } from 'react-redux'

class CensusPoints extends React.Component {

  componentDidUpdate = async (prevProps) => {

    const layerId = 'censusPoints'
    const { censusPoints, popStats } = this.props.aoi
    const { basemap } = this.props.mapState

    if (!popStats && this.props.map.getLayer(layerId) !== undefined) {
      this.props.map.removeLayer(layerId)
      return
    }

    this.addLayer(this.props.map, layerId, censusPoints)

    if (prevProps.mapState.basemap !== basemap) {
      this.props.map.on('style.load', () => {
        this.addLayer(this.props.map, layerId, censusPoints)
      })
    }
  }

  addLayer = async (map, layerId, data) => {
    if (!map.getSource(layerId)) map.addSource(layerId, { type: 'geojson', data })
    if (!map.getLayer(layerId)) {
      map.addLayer({
        id: layerId,
        source: layerId,
        type: 'circle',
        paint: {
          'circle-radius': 2,
          'circle-color': 'red'
        }
      })
    }
    map.getSource(layerId).setData(data);
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  mapState: state.map,
  aoi: state.aoi,
})

const ConnectedCensusPoints = connect(mapStateToProps, null)(CensusPoints)

export default ConnectedCensusPoints

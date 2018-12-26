import React from 'react'
import { connect } from 'react-redux'
import asMapLayer from './asMapLayer'

class AOI extends React.Component {

  componentDidMount = () => {
    this.props.addOrUpdateLayer()
  }

  componentDidUpdate = (prevProps) => {
    const { layerId, listHoveredId, FC } = this.props.aoi

    if (JSON.stringify(FC) !== JSON.stringify(prevProps.aoi.FC)) {
      this.props.addOrUpdateLayer()
    }

    if (prevProps.aoi.listHoveredId !== listHoveredId) {
      this.props.map.setFilter(layerId, ['match', ['get', 'name'], listHoveredId, true, false])
    } else { this.props.map.setFilter(layerId, ['==', '-', '']) }
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  layerId: state.aoi.layerId,
  data: state.aoi.FC,
  visible: true,
  paintType: 'line',
  paint: {
    'line-width': 8,
    'line-color': '#99f9ff',
    'line-opacity': 0.8,
  },
  basemap: state.map.basemap,
  aoi: state.aoi,
})

const ConnectedAOI = connect(mapStateToProps)(asMapLayer(AOI))

export default ConnectedAOI

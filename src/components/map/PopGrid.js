import React from 'react'
import { connect } from 'react-redux'
import asMapLayer from './asMapLayer'

class PopGrid extends React.Component {

  componentDidUpdate = (prevProps) => {
    if (JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)) {
      this.props.addOrUpdateLayer()
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  layerId: 'popGrid',
  data: state.aoi.popGrid,
  visible: state.aoi.popStats,
  paintType: 'fill',
  paint: {
    'fill-color': 'red',
    'fill-opacity': 0.2
  },
  mapState: state.map,
})

const ConnectedPopGrid = connect(mapStateToProps, null)(asMapLayer(PopGrid))

export default ConnectedPopGrid

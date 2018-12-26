import React from 'react'
import { connect } from 'react-redux'
import asMapLayer from './asMapLayer'

class CensusPoints extends React.Component {

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
  layerId: 'censusPoints',
  data: state.aoi.censusPoints,
  visible: state.aoi.popStats,
  paintType: 'circle',
  paint: {
    'circle-radius': 2,
    'circle-color': 'red'
  },
  mapState: state.map,
})

const ConnectedCensusPoints = connect(mapStateToProps, null)(asMapLayer(CensusPoints))

export default ConnectedCensusPoints

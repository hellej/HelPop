import React from 'react'
import { connect } from 'react-redux'
import asMapLayer from './asMapLayer'

class PopPoints extends React.Component {

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
  layerId: 'popPoints',
  data: state.aoi.popPoints,
  visible: state.aoi.popStats,
  paintType: 'circle',
  paint: {
    'circle-radius': 2,
    'circle-color': 'red'
  },
  mapState: state.map,
})

const ConnectedPopPoints = connect(mapStateToProps, null)(asMapLayer(PopPoints))

export default ConnectedPopPoints

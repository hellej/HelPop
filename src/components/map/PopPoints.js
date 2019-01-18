import React from 'react'
import { connect } from 'react-redux'
import asMapLayer from './asMapLayer'

class PopPoints extends React.Component {

  componentDidUpdate = (prevProps) => {
    if (JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)) {
      this.props.addOrUpdateLayer()
    }
    // re-add layer when basemap is changed
    if (prevProps.basemap !== this.props.basemap) {
      this.props.map.once('style.load', () => this.props.addOrUpdateLayer())
      return
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
    'circle-color': 'black'
  },
  basemap: state.map.basemap,
})

const ConnectedPopPoints = connect(mapStateToProps, null)(asMapLayer(PopPoints))

export default ConnectedPopPoints

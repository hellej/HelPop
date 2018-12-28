import React from 'react'
import { connect } from 'react-redux'
import asMapLayer from './asMapLayer'
import { setMouseOnFeature } from '../../reducers/mapReducer'

class PopGrid extends React.Component {

  componentDidUpdate = (prevProps) => {
    if (JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)) {
      this.props.addOrUpdateLayer()
    }
    if (this.props.visible && !prevProps.visible) {
      this.props.map.on('mousemove', this.setMouseOnFeature)
    }
    if (!this.props.visible && prevProps.visible) {
      this.props.map.off('mousemove', this.setMouseOnFeature)
    }
  }

  setMouseOnFeature = (e) => {
    const feature = this.props.getMouseOnFeature(e)
    this.props.setMouseOnFeature(feature)
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

const ConnectedPopGrid = connect(mapStateToProps, { setMouseOnFeature })(asMapLayer(PopGrid))

export default ConnectedPopGrid

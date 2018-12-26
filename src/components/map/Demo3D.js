import React from 'react'
import { connect } from 'react-redux'
import censusFC from './../../data/vaesto-250m-2017.json'
import { initialize3Ddemo } from '../../reducers/demo3dReducer'
import { setMouseOnFeature } from '../../reducers/mapReducer'
import asMapLayer from './asMapLayer'

class Demo3D extends React.Component {

  componentDidMount() {
    this.props.initialize3Ddemo()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.visible && !prevProps.visible) {
      this.props.map.on('mousemove', this.setMouseOnFeature)
    }
    if (!this.props.visible && prevProps.visible) {
      this.props.map.off('mousemove', this.setMouseOnFeature)
    }
  }

  setMouseOnFeature = (e) => {
    const features = this.props.map.queryRenderedFeatures(e.point, { layers: [this.props.layerId] })
    this.props.setMouseOnFeature(features[0])
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  layerId: state.demo3d.layerId,
  data: censusFC,
  visible: state.demo3d.visible,
  paintType: 'fill-extrusion',
  paint: state.demo3d.mbPaintStyle,
  basemap: state.map.basemap,
})

const mapDispatchToProps = {
  initialize3Ddemo,
  setMouseOnFeature,
}

const ConnectedDemo3D = connect(mapStateToProps, mapDispatchToProps)(asMapLayer(Demo3D))

export default ConnectedDemo3D

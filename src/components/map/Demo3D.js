import React from 'react'
import { connect } from 'react-redux'
import censusFC from './../../data/vaesto-250m-2017.json'
import { initialize3Ddemo } from '../../reducers/demo3dReducer'
import { setMouseOnFeature, remove2Dand3Dpops } from '../../reducers/mapReducer'
import asMapLayer from './asMapLayer'

class Demo3D extends React.Component {

  componentDidMount = async () => {
    this.props.initialize3Ddemo()
    if (this.props.visible) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      this.props.map.on('mousemove', this.setMouseOnFeature)
      this.props.addOrUpdateLayer()
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.visible && !prevProps.visible) {
      this.props.map.on('mousemove', this.setMouseOnFeature)
    }
    if (!this.props.visible && prevProps.visible) {
      this.props.map.off('mousemove', this.setMouseOnFeature)
    }
    // remove layer when basemap is changed
    if (prevProps.basemap !== this.props.basemap) {
      this.props.map.off('mousemove', this.setMouseOnFeature)
      if (this.props.map.getLayer(this.props.layerId) !== undefined) {
        this.props.map.removeLayer(this.props.layerId)
        this.props.remove2Dand3Dpops()
      }
      return
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
  remove2Dand3Dpops,
}

const ConnectedDemo3D = connect(mapStateToProps, mapDispatchToProps)(asMapLayer(Demo3D))

export default ConnectedDemo3D

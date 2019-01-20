import React from 'react'

const asMapLayer = WrappedComponent => {

  return class extends React.Component {

    componentDidUpdate = (prevProps) => {
      const { map, layerId, visible } = this.props

      if (!visible && map.getLayer(layerId) !== undefined) {
        map.removeLayer(layerId)
        return
      } else if (!visible) { return }

      if (!prevProps.visible && visible) {
        this.addOrUpdateLayer()
      }
    }

    addOrUpdateLayer = () => {
      const { map, layerId, data, paintType, paint } = this.props

      if (!map.getSource(layerId)) {
        map.addSource(layerId, { type: 'geojson', data })
      }
      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          source: layerId,
          type: paintType,
          paint
        })
      }
      map.getSource(layerId).setData(data)
    }

    getMouseOnFeature = (e) => {
      const features = this.props.map.queryRenderedFeatures(e.point, { layers: [this.props.layerId] })
      return features[0]
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          addOrUpdateLayer={this.addOrUpdateLayer}
          getMouseOnFeature={this.getMouseOnFeature}
        ></WrappedComponent>
      )
    }
  }
}

export default asMapLayer

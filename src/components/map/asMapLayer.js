import React from 'react'

const asMapLayer = WrappedComponent => {

  return class extends React.Component {

    componentDidUpdate = (prevProps) => {
      const { map, layerId, visible, basemap } = this.props

      if (!visible && map.getLayer(layerId) !== undefined) {
        map.removeLayer(layerId)
        return
      } else if (!visible) { return }

      if (prevProps.basemap !== basemap) {
        this.props.map.on('style.load', () => this.addOrUpdateLayer())
        return
      }
      this.addOrUpdateLayer()
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

    render() {
      return <WrappedComponent {...this.props} addOrUpdateLayer={this.addOrUpdateLayer} />
    }
  }
}

export default asMapLayer

import React from 'react'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

class Draw extends React.Component {

  draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    }
  })

  componentDidMount() {
    const { map } = this.props
    map.on('load', () => {
      map.addControl(this.draw, 'top-left')
    })
  }

  render() {
    return null
  }
}

export default Draw

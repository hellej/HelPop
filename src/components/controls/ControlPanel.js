import React from 'react'
import { connect } from 'react-redux'

import { BASEMAPS } from '../../constants'
import { aoiType, drawType, mapType } from '../types'
import { startDrawing, deleteAllDrawsAOIs, deleteSelectedDrawNode } from '../../reducers/drawReducer'
import { calculatePopulationStats, downloadAOIasGeoJson } from '../../reducers/aoiReducer'
import { setBasemap } from '../../reducers/mapReducer'
import { toggle2Ddemo } from '../../reducers/demo2dReducer'
import GeoJsonUploader from './GeoJsonUploader'
import { Button } from './Button'

class ControlPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      basemapsVisible: false
    }
  }

  toggleBasemapSelector = () => {
    this.setState({ basemapsVisible: !this.state.basemapsVisible })
  }

  render() {
    const { draw, aoi, map, demo2d } = this.props
    const { startDrawing, deleteAllDrawsAOIs, deleteSelectedDrawNode,
      calculatePopulationStats, downloadAOIasGeoJson, setBasemap, toggle2Ddemo } = this.props

    return (
      <div>
        {draw.initialized &&
          <div>
            <Button visible={true} onClick={startDrawing}> Draw AOI</Button>
            <Button visible={aoi.FC.features.length !== 0 && !aoi.popStats}
              onClick={() => calculatePopulationStats(aoi.FC)}> Calculate Population</Button>
            <GeoJsonUploader />
            <Button visible={aoi.FC.features.length !== 0} onClick={() => downloadAOIasGeoJson(aoi.FC)}>Download AOI</Button>
            <Button visible={aoi.FC.features.length !== 0} onClick={deleteAllDrawsAOIs}> Remove all</Button>
            <Button visible={draw.drawMode === 'direct_select'} onClick={deleteSelectedDrawNode}> Delete node</Button>

            <Button visible={true} color='#b7fff6' onClick={toggle2Ddemo}>{demo2d.visible ? 'Hide 2D demo' : 'Show 2D demo'}</Button>
            <Button visible={true} color='#b7fff6' onClick={this.toggleBasemapSelector}>
              {this.state.basemapsVisible ? 'Hide Basemaps' : 'Change Basemap'} </Button>
            {this.state.basemapsVisible && Object.keys(BASEMAPS).map(basemap =>
              <Button sub visible={map.basemap !== basemap} key={basemap} onClick={() => setBasemap(basemap)}>{basemap}</Button>)}
          </div>
        }
      </div>
    )
  }
}

ControlPanel.propTypes = {
  aoi: aoiType.isRequired,
  draw: drawType.isRequired,
  map: mapType.isRequired,
}

const mapStateToProps = (state) => ({
  draw: state.draw,
  aoi: state.aoi,
  map: state.map,
  demo2d: state.demo2d,
})

const mapDispatchToProps = {
  startDrawing,
  deleteAllDrawsAOIs,
  deleteSelectedDrawNode,
  calculatePopulationStats,
  downloadAOIasGeoJson,
  setBasemap,
  toggle2Ddemo,
}

const ConnectedControlPanel = connect(mapStateToProps, mapDispatchToProps)(ControlPanel)

export default ConnectedControlPanel

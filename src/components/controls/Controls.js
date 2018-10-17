import React from 'react'
import { connect } from 'react-redux'

import { BASEMAPS } from '../../constants'
import { aoiType, drawType, mapType } from '../types'
import { startDrawing, deleteAllDrawsAOIs, deleteSelectedDrawNode } from '../../reducers/drawReducer'
import { calculatePopulationStats, downloadAOIasGeoJson } from '../../reducers/aoiReducer'
import { setBasemap } from '../../reducers/mapReducer'
import GeoJsonUploader from './GeoJsonUploader'
import { Button } from './Button'

class Controls extends React.Component {
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
    const { draw, aoi, map } = this.props
    const { startDrawing, deleteAllDrawsAOIs, deleteSelectedDrawNode,
      calculatePopulationStats, downloadAOIasGeoJson, setBasemap } = this.props

    return (
      <div>
        {draw.initialized &&
          <div>
            <Button visible={aoi.aoiFeature === null} onClick={startDrawing}> Draw AOI</Button>
            <Button visible={aoi.aoiFeature !== null && !aoi.popStats}
              onClick={() => calculatePopulationStats(aoi.aoiFeature)}> Calculate Population</Button>
            <GeoJsonUploader />
            <Button visible={aoi.aoiFeature !== null} onClick={() => downloadAOIasGeoJson(aoi)}>Download AOI</Button>
            <Button visible={aoi.aoiFeature !== null} onClick={deleteAllDrawsAOIs}> Remove AOI</Button>
            <Button visible={draw.drawMode === 'direct_select'} onClick={deleteSelectedDrawNode}> Delete node</Button>

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

Controls.propTypes = {
  aoi: aoiType.isRequired,
  draw: drawType.isRequired,
  map: mapType.isRequired,
}

const mapStateToProps = (state) => ({
  draw: state.draw,
  aoi: state.aoi,
  map: state.map,
})

const mapDispatchToProps = {
  startDrawing,
  deleteAllDrawsAOIs,
  deleteSelectedDrawNode,
  calculatePopulationStats,
  downloadAOIasGeoJson,
  setBasemap,
}

const ConnectedControls = connect(mapStateToProps, mapDispatchToProps)(Controls)

export default ConnectedControls
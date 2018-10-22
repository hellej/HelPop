import React from 'react'
import { connect } from 'react-redux'

import { BASEMAPS } from '../../constants'
import { aoiType, drawType, mapType } from '../types'
import { startDrawing, deleteAllDrawsAOIs, deleteSelectedDrawing } from '../../reducers/drawReducer'
import { calculatePopulationStats, downloadAOIasGeoJson } from '../../reducers/aoiReducer'
import { setBasemap } from '../../reducers/mapReducer'
import { toggle2Ddemo } from '../../reducers/demo2dReducer'
import GeoJsonUploader from './GeoJsonUploader'
import { Button } from './Button'
import styled from 'styled-components'

const ButtonGroup = styled.div`
  margin: 0 0 22px 0;
`

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
    const { startDrawing, deleteAllDrawsAOIs, deleteSelectedDrawing,
      calculatePopulationStats, downloadAOIasGeoJson, setBasemap, toggle2Ddemo } = this.props

    return (
      <div>
        {draw.initialized &&
          <div>
            <ButtonGroup>
              <Button visible={aoi.FC.features.length !== 0 && !aoi.popStats}
                onClick={() => calculatePopulationStats(aoi.FC)}> Calculate Population</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button visible={true} onClick={startDrawing}> Draw AOI</Button>
              <GeoJsonUploader />
              <Button visible={aoi.FC.features.length !== 0} onClick={() => downloadAOIasGeoJson(aoi.FC)}>Download AOI</Button>
              <Button visible={aoi.FC.features.length !== 0} onClick={deleteSelectedDrawing}>
                {draw.drawMode === 'direct_select' ? 'Remove node' : 'Remove AOI'}</Button>
              <Button visible={aoi.FC.features.length !== 0} onClick={deleteAllDrawsAOIs}> Remove all</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button visible={true} color='#b7fff6' onClick={toggle2Ddemo}>{demo2d.visible ? 'Hide 2D demo' : 'Show 2D demo'}</Button>
              <Button visible={true} color='#b7fff6' onClick={this.toggleBasemapSelector}>
                {this.state.basemapsVisible ? 'Hide Basemaps' : 'Change Basemap'} </Button>
              {this.state.basemapsVisible && Object.keys(BASEMAPS).map(basemap =>
                <Button sub visible={map.basemap !== basemap} key={basemap} onClick={() => setBasemap(basemap)}>{basemap}</Button>)}
            </ButtonGroup>
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
  deleteSelectedDrawing,
  calculatePopulationStats,
  downloadAOIasGeoJson,
  setBasemap,
  toggle2Ddemo,
}

const ConnectedControlPanel = connect(mapStateToProps, mapDispatchToProps)(ControlPanel)

export default ConnectedControlPanel

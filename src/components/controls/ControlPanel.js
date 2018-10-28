import React from 'react'
import { connect } from 'react-redux'

import { BASEMAPS } from '../../constants'
import { aoiType, drawType, mapType } from '../types'
import { startDrawing, deleteAllDrawsAOIs, deleteSelectedDrawing, createAddCircle } from '../../reducers/drawReducer'
import { downloadAOIasGeoJson } from '../../reducers/aoiReducer'
import { setBasemap } from '../../reducers/mapReducer'
import { toggle2Ddemo } from '../../reducers/demo2dReducer'
import { toggle3Ddemo } from '../../reducers/demo3dReducer'
import { toggleBaseMapOptions } from '../../reducers/menuReducer'
import GeoJsonUploader from './GeoJsonUploader'
import { Button } from './Button'
import styled from 'styled-components'

const ButtonGroup = styled.div`
  margin: 0 0 22px 0;
`
const Colored = styled.span`
  color: ${props => props.color ? props.color : 'white'}; 
`

class ControlPanel extends React.Component {

  render() {
    const { menu, draw, aoi, map, demo2d, demo3d } = this.props
    const { startDrawing, deleteAllDrawsAOIs, deleteSelectedDrawing, createAddCircle,
      downloadAOIasGeoJson, setBasemap, toggle2Ddemo, toggle3Ddemo, toggleBaseMapOptions } = this.props

    return (
      <div>
        {draw.initialized &&
            <ButtonGroup>
              <Button onClick={startDrawing}> Draw Area</Button>
              <Button onClick={() => createAddCircle(map.center)}> Add Circle</Button>
              <GeoJsonUploader />
              <Button visible={aoi.FC.features.length !== 0} onClick={() => downloadAOIasGeoJson(aoi.FC)}>Download Areas</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button visible={aoi.FC.features.length !== 0} onClick={deleteSelectedDrawing}>
                {draw.drawMode === 'direct_select' ? 'Remove Node' : 'Remove Selected'}</Button>
              <Button visible={aoi.FC.features.length !== 0} onClick={deleteAllDrawsAOIs}> Remove All</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button onClick={() => toggle2Ddemo(demo2d.visible)}>2D Demo: {demo2d.visible
                ? <Colored color={'#88ff88'}>ON</Colored>
                : <Colored color={'#ffb0b0'}>OFF</Colored>} </Button>
              <Button onClick={() => toggle3Ddemo(demo3d.visible)}>3D Demo: {demo3d.visible
                ? <Colored color={'#88ff88'}>ON</Colored>
                : <Colored color={'#ffb0b0'}>OFF</Colored>} </Button>
              <Button onClick={toggleBaseMapOptions}> Basemap: <Colored color={'#88ff88'}>{map.basemap}</Colored></Button>
              {menu.basemapOptions && Object.keys(BASEMAPS).map(basemap =>
                <Button sub visible={map.basemap !== basemap} key={basemap} onClick={() => setBasemap(basemap)}>{basemap}</Button>)}
            </ButtonGroup>
          </ControlPanelDiv>
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
  menu: state.menu,
  draw: state.draw,
  aoi: state.aoi,
  map: state.map,
  demo2d: state.demo2d,
  demo3d: state.demo3d,
})

const mapDispatchToProps = {
  startDrawing,
  deleteAllDrawsAOIs,
  deleteSelectedDrawing,
  createAddCircle,
  downloadAOIasGeoJson,
  setBasemap,
  toggle2Ddemo,
  toggle3Ddemo,
  toggleBaseMapOptions,
}

const ConnectedControlPanel = connect(mapStateToProps, mapDispatchToProps)(ControlPanel)

export default ConnectedControlPanel

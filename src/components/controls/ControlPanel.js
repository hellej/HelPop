import React from 'react'
import { connect } from 'react-redux'

import { BASEMAPS } from '../../constants'
import { aoiType, drawType, mapType } from '../types'
import { startDrawing, deleteAllDrawsAOIs, deleteSelectedDrawing, createAddCircle } from '../../reducers/drawReducer'
import { downloadAOIasGeoJson } from '../../reducers/aoiReducer'
import { setBasemap } from '../../reducers/mapReducer'
import { toggle2Ddemo } from '../../reducers/demo2dReducer'
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
    const { startDrawing, deleteAllDrawsAOIs, deleteSelectedDrawing, createAddCircle,
      downloadAOIasGeoJson, setBasemap, toggle2Ddemo } = this.props

    return (
      <div>
        {draw.initialized &&
          <div>
            <ButtonGroup>
              <Button visible={true} onClick={startDrawing}> Draw Area</Button>
              <Button visible={true} onClick={() => createAddCircle(map.center)}> Add Circle</Button>
              <GeoJsonUploader />
              <Button visible={aoi.FC.features.length !== 0} onClick={() => downloadAOIasGeoJson(aoi.FC)}>Download Areas</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button visible={aoi.FC.features.length !== 0} onClick={deleteSelectedDrawing}>
                {draw.drawMode === 'direct_select' ? 'Remove Node' : 'Remove Selected'}</Button>
              <Button visible={aoi.FC.features.length !== 0} onClick={deleteAllDrawsAOIs}> Remove All</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button visible={true} onClick={toggle2Ddemo}>2D Demo: {demo2d.visible
                ? <Colored color={'#88ff88'}>ON</Colored>
                : <Colored color={'#ffb0b0'}>OFF</Colored>} </Button>
              <Button visible={true} onClick={this.toggleBasemapSelector}> Basemap: <Colored color={'#88ff88'}>{map.basemap}</Colored></Button>
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
  createAddCircle,
  downloadAOIasGeoJson,
  setBasemap,
  toggle2Ddemo,
}

const ConnectedControlPanel = connect(mapStateToProps, mapDispatchToProps)(ControlPanel)

export default ConnectedControlPanel

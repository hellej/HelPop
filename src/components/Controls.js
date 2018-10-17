import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'

import { BASEMAPS } from './../constants'
import { aoiType, drawType, mapType } from './types'
import { startDrawing, deleteAllDrawsAOIs, deleteSelectedDrawNode } from './../reducers/drawReducer'
import { calculatePopulationStats, downloadAOIasGeoJson } from './../reducers/aoiReducer'
import { setBasemap } from './../reducers/mapReducer'
import GeoJsonUploader from './GeoJsonUploader'

const Button = styled.div`
  display: ${props => props.visible ? '' : 'none'};
  color: ${props => props.color ? props.color : 'white'}; 
  cursor: pointer;
  padding: 7px 13px 7px 13px;
  background-color: rgba(0, 0, 0, 0.9);
  margin: 7px 10px;
  border-radius: 30px;
  font-weight: 300;
  font-size: 16px;
  width: max-content;
  max-width: 90%;
  overflow: auto;
  height: min-content;
  pointer-events: auto;
  &:hover {
    margin-left: 13px;
  }
  ${props => props.sub && css`
    margin-left: 20px;
    &:hover { 
      margin-left: 23px;
    }
  `}
`

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

            <Button visible={true} color='#ffea98' onClick={this.toggleBasemapSelector}>
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

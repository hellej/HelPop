import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { aoiType, drawType } from './types'
import { startDrawing, deleteAllDrawsAOIs, deleteSelectedDrawNode } from './../reducers/drawReducer'
import { calculatePopulationStats, downloadAOIasGeoJson } from './../reducers/aoiReducer'
import GeoJsonUploader from './GeoJsonUploader'

const Button = styled.div`
  display: ${props => props.visible ? '' : 'none'};
  cursor: pointer;
  color: white;
  padding: 7px 13px 7px 13px;
  background-color: rgba(0, 0, 0, 0.9);
  margin: 7px 10px;
  border-radius: 30px;
  font-weight: 300;
  font-size: 17px;
  width: max-content;
  max-width: 90%;
  overflow: auto;
  height: min-content;
  pointer-events: auto;
  &:hover {
    margin-left: 13px;
  }
`

class Controls extends React.Component {
  render() {
    const { draw, aoi } = this.props
    const { startDrawing, deleteAllDrawsAOIs, deleteSelectedDrawNode,
      calculatePopulationStats, downloadAOIasGeoJson } = this.props
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
          </div>
        }
      </div>
    )
  }
}

Controls.propTypes = {
  aoi: aoiType.isRequired,
  draw: drawType.isRequired,
}

const mapStateToProps = (state) => ({
  draw: state.draw,
  aoi: state.aoi
})

const mapDispatchToProps = {
  startDrawing,
  deleteAllDrawsAOIs,
  deleteSelectedDrawNode,
  calculatePopulationStats,
  downloadAOIasGeoJson,
}

const ConnectedControls = connect(mapStateToProps, mapDispatchToProps)(Controls)

export default ConnectedControls

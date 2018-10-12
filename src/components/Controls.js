import React from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'

import { startDrawing, deleteAllDrawsAOIs, deleteSelectedDrawNode } from './../reducers/drawReducer'
import { calculatePopulationStats } from './../reducers/aoiReducer'

const hoverMargin = keyframes`
  from {
    margin-left: 10px;
  }
  to {
    margin-left: 13px;
  }
`
const Button = styled.div`
  cursor: pointer;
  display: ${props => props.disabled ? 'none' : ''};
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
    //margin-left: 13px;
    animation: ${hoverMargin} 0.15s both;
  }
`

const Controls = (props) => {
  return (
    <div>
      {props.draw.initialized &&
        <div>
          <Button disabled={props.aoi.aoiFeature !== null} onClick={(e) => props.startDrawing('draw_polygon')}> Draw AOI</Button>
          <Button disabled={props.aoi.aoiFeature === null} onClick={(e) => props.deleteAllDrawsAOIs()}> Remove AOI</Button>
          <Button disabled={props.draw.drawMode !== 'direct_select'} onClick={(e) => props.deleteSelectedDrawNode()}> Delete node</Button>
          <Button disabled={props.aoi.aoiFeature === null} onClick={(e) => props.calculatePopulationStats(props.aoi.aoiFeature)}> Calculate Population</Button>
        </div>
      }
    </div>
  )
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
}

const ConnectedControls = connect(mapStateToProps, mapDispatchToProps)(Controls)

export default ConnectedControls

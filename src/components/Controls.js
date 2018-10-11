import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { startDrawing, deleteAllAOIs } from './../reducers/AOIreducer'

export const Button = styled.div`
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
    margin-left: 13px;
  }
`

const Controls = (props) => {
  return (
    <div>
      {props.AOI.initialized &&
        <div>
          <Button disabled={props.AOI.AOIfeature !== null} onClick={(e) => props.startDrawing('draw_polygon')}> Draw AOI</Button>
          <Button disabled={props.AOI.AOIfeature === null} onClick={(e) => props.deleteAllAOIs()}> Remove AOI</Button>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  AOI: state.AOI
})

const mapDispatchToProps = {
  startDrawing,
  deleteAllAOIs,
}

const ConnectedControls = connect(mapStateToProps, mapDispatchToProps)(Controls)

export default ConnectedControls

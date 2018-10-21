import React from 'react'
import Map from './components/map/Map'
import Draw from './components/map/Draw'
import styled from 'styled-components'
import AOIinfo from './components/AOIinfo'
import Legend from './components/Legend'
import Notification from './components/Notification'
import ControlPanel from './components/controls/ControlPanel'
import Demo2D from './components/map/Demo2D'

export const StyledMenuContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 5px;
  right: 5px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  letter-spacing: 0.6px;
  pointer-events: none;
`

class App extends React.Component {
  render() {
    return (
      <div>
        <Map>
          <Draw />
          <Demo2D />
        </Map>
        <StyledMenuContainer>
          <AOIinfo />
          <ControlPanel />
          <Legend />
        </StyledMenuContainer>
        <Notification />
      </div>
    )
  }
}

export default App

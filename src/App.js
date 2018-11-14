import React from 'react'
import styled from 'styled-components'
import Draw from './components/map/Draw'
import Map from './components/map/Map'
import MapDimLayer from './components/MapDimLayer'
import Guide from './components/Guide'
import AOIinfo from './components/AOIinfo'
import Legend from './components/Legend'
import HoveredInfo from './components/HoveredInfo'
import Notification from './components/Notification'
import ControlPanel from './components/controls/ControlPanel'
import Demo2D from './components/map/Demo2D'
import Demo3D from './components/map/Demo3D'
import MapControl from './components/map/MapControl'
import AOI from './components/map/AOI'
import { GlobalStyle } from './index'

export const StyledMenuContainer = styled.div`
  position: absolute;
  top: 10px;
  left: -5px;
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
          <Demo3D />
          <AOI />
          <MapControl />
          <MapDimLayer />
        </Map>
        <StyledMenuContainer>
          <AOIinfo />
          <ControlPanel />
        </StyledMenuContainer>
        <Legend />
        <HoveredInfo />
        <Guide />
        <Notification />
        <GlobalStyle />
      </div>
    )
  }
}

export default App

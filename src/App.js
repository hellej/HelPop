import React from 'react'
import styled from 'styled-components'
import Draw from './components/map/Draw'
import Map from './components/map/Map'
import MapDimLayer from './components/MapDimLayer'
import Guide from './components/guide/Guide'
import ToggleGuideButton from './components/guide/ToggleGuideButton'
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
import PopPoints from './components/map/PopPoints'
import PopGrid from './components/map/PopGrid'

const AbsoluteContainer = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  letter-spacing: 0.6px;
  pointer-events: none;
  top: 10px;
`
export const TopLeftPanel = styled(AbsoluteContainer)`
  left: 5px;
  right: 5px;
`
export const TopRightPanel = styled(AbsoluteContainer)`
  right: 5px;
  z-index: 2;
  align-items: flex-end;
`

class App extends React.Component {
  render() {
    return (
      <div>
        <TopLeftPanel>
          <AOIinfo />
          <ControlPanel />
        </TopLeftPanel>
        <TopRightPanel>
          <Legend />
          <ToggleGuideButton />
        </TopRightPanel>
        <Map>
          <Draw />
          <Demo2D />
          <Demo3D />
          <AOI />
          <PopPoints />
          <PopGrid />
          <MapControl />
          <MapDimLayer />
        </Map>
        <HoveredInfo />
        <Guide />
        <Notification />
        <GlobalStyle />
      </div>
    )
  }
}

export default App

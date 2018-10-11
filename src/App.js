import React from 'react'
import Map from './components/map/Map'
import Draw from './components/map/Draw'
import styled from 'styled-components'
import AOIinfo from './components/AOIinfo'
import Tooltip from './components/Tooltip'
import Controls from './components/Controls'

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
        </Map>
        <StyledMenuContainer>
          <AOIinfo />
          <Controls />
        </StyledMenuContainer>
        <Tooltip />
      </div>
    )
  }
}

export default App

import React from 'react'
import Map from './components/map/Map'
import Draw from './components/map/Draw'
import styled from 'styled-components'
import AOIinfo from './components/AOIinfo'

export const StyledMenuContainer = styled.div`
  position: absolute;
  top: 88px;
  left: 5px;
  right: 5px;
  z-index: 2;
  display: flex;
  flex-direction: row;
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
        </StyledMenuContainer>
      </div>
    )
  }
}

export default App

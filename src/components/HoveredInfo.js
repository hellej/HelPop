import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

export const HoveredInfoContainer = styled.div`
  position: absolute;
  bottom: 25px;
  right: 50px;
  left: 50px;
  z-index: 2;
  display: flex;
  justify-content: center;
  letter-spacing: 0.6px;
  pointer-events: none;
`
const BlackInfoBox = styled.div`
  padding: 5px 14px;
  background-color: rgba(0, 0, 0, 0.75);
  margin: 5px 0px 5px 5px;
  border-radius: 7px;
  font-weight: 300;
  color: white;
  font-size: 15px;
  overflow: auto;
  height: min-content;
  pointer-events: auto;
  line-height: 1.7;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12), 0 6px 20px 0 rgba(0,0,0,0.06);
`
const StyledNumber = styled.span`
  color: #adffb5;
  font-weight: 350;
`

class HoveredInfo extends React.Component {

  render() {
    const { mouseOnFeature } = this.props.mapState
    if (!mouseOnFeature) return null

    return (
      <HoveredInfoContainer>
        <BlackInfoBox>
          Population: <StyledNumber>{mouseOnFeature.properties.ASUKKAITA}</StyledNumber><br></br>
          m2 / person: <StyledNumber>{mouseOnFeature.properties.ASVALJYYS}</StyledNumber>
        </BlackInfoBox>
      </HoveredInfoContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  mapState: state.map,
})

const ConnectedHoveredInfo = connect(mapStateToProps, null)(HoveredInfo)
export default ConnectedHoveredInfo

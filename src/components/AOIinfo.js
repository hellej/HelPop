import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as utils from '../utils'
import { aoiType } from './types'

const StyledAOIinfoDiv = styled.div`
  max-width: 95%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  letter-spacing: 0.6px;
`
const InfoBlock = styled.div`
  display: ${props => props.hidden ? 'none' : ''};
  padding: 7px 13px 7px 13px;
  background-color: rgba(0, 0, 0, 0.9);
  margin: 5px 10px;
  border-radius: 10px;
  font-weight: 300;
  color: white;
  font-size: 15px;
  width: max-content;
  max-width: 90%;  
  overflow: auto;
  height: min-content;
  pointer-events: auto;
  line-height: 1.7;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12), 0 6px 20px 0 rgba(0,0,0,0.06);
`
const InfoValue = styled.span`
  color: #88ff88;
`

class AOIinfo extends React.Component {
  render() {
    if (this.props.aoi.FC.features.length === 0) { return null }
    const { area, totalPopulation, populationDensity, populationUrbanDensity } = this.props.aoi.FC.features[0].properties
    return (
      <StyledAOIinfoDiv>
        <InfoBlock>
          Area: <InfoValue>{utils.numberToStringWithSpaces(area)} </InfoValue> m2 <br />
          {this.props.aoi.popStats &&
            <div>
              Population: <InfoValue>{utils.numberToStringWithSpaces(totalPopulation)}</InfoValue> <br />
              Density: <InfoValue>{utils.numberToStringWithSpaces(populationDensity)}</InfoValue> /km2 <br />
              Urban Density: <InfoValue>{utils.numberToStringWithSpaces(populationUrbanDensity)}</InfoValue> /km2
              </div>}
        </InfoBlock>
      </StyledAOIinfoDiv>
    )
  }
}

AOIinfo.propTypes = {
  aoi: aoiType.isRequired,
}

const mapStateToProps = (state) => ({
  aoi: state.aoi
})

const ConnectedAOIinfo = connect(mapStateToProps, null)(AOIinfo)
export default ConnectedAOIinfo

import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as utils from './../utils'

export const StyledAOIinfoDiv = styled.div`
  max-width: 95%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  letter-spacing: 0.6px;
`

export const InfoBlock = styled.div`
  display: ${props => props.hidden ? 'none' : ''};
  padding: 7px 13px 7px 13px;
  background-color: rgba(0, 0, 0, 0.9);
  margin: 5px 10px;
  border-radius: 30px;
  font-weight: 300;
  color: white;
  font-size: 17px;
  width: max-content;
  max-width: 90%;  
  overflow: auto;
  height: min-content;
  pointer-events: auto;
`

class AOIinfo extends React.Component {
  render() {
    const { area } = this.props.AOI
    return (
      <StyledAOIinfoDiv>
        {area &&
          <InfoBlock>
            Area: {utils.numberToStringWithSpaces(area)} m2
        </InfoBlock>}
      </StyledAOIinfoDiv>
    )
  }
}

const mapStateToProps = (state) => ({
  AOI: state.AOI
})

const ConnectedAOIinfo = connect(mapStateToProps, null)(AOIinfo)
export default ConnectedAOIinfo

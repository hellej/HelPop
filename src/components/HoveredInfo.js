import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { demo2dType } from './types'

export const HoveredInfoContainer = styled.div`
  position: absolute;
  bottom: 10px;
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

const White = styled.span`
  color: white;
`

class HoveredInfo extends React.Component {

  render() {
    const { mouseOnFeature, visible } = this.props.demo2d
    if (!visible || !mouseOnFeature) return null

    return (
      <HoveredInfoContainer>
        <BlackInfoBox>
          <div>
            Population: <White>{mouseOnFeature.properties.ASUKKAITA}</White>
          </div>
          <div>
            m2 / person: <White>{mouseOnFeature.properties.ASVALJYYS}</White>
          </div>
        </BlackInfoBox>
      </HoveredInfoContainer>
    )
  }
}

HoveredInfo.propTypes = {
  demo2d: demo2dType.isRequired,
}

const mapStateToProps = (state) => ({
  demo2d: state.demo2d,
})

const ConnectedHoveredInfo = connect(mapStateToProps, null)(HoveredInfo)
export default ConnectedHoveredInfo

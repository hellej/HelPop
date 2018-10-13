import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { tooltipType } from './types'

const StyledTooltipContainer = styled.div`
  position: fixed; 
  z-index: 4;
  right: 10px;
  bottom: 45px;
  left: 10px; 
  margin: auto;
`
const StyledTooltipDiv = styled.div`
  margin: auto;
  border-radius: 5px;
  width: -webkit-fill-available;
  background: rgba(0,0,0,0.84);
  display: inline-block;
  line-height: 1.5;
  color: white;
  font-size: 16px;
  font-weight: 350;
  letter-spacing: 1.5px;
  padding: 18px 23px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  ${props => props.look === 2 && css`
    background: rgba(35,0,0,0.84);
  `}
`

const Tooltip = (props) => {
  if (props.tooltip.text === null) return null

  return (
    <StyledTooltipContainer>
      <StyledTooltipDiv look={props.tooltip.look}>
        {props.tooltip.text}
      </StyledTooltipDiv>
    </StyledTooltipContainer>
  )
}

Tooltip.propTypes = {
  tooltip: tooltipType.isRequired,
}

const mapStateToProps = (state) => ({
  tooltip: state.tooltip
})

const ConnectedTooltip = connect(mapStateToProps, null)(Tooltip)

export default ConnectedTooltip

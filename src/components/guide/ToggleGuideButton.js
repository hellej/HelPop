import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button } from '../controls/Button'
import { toggleGuide } from './../../reducers/menuReducer'

const StyledToggleGuideButton = styled(Button)`
  padding: 4px 9px;
  font-weight: 600;
  border: 1px solid black;
  background-color: ${props => props.guide ? 'white' : 'black'}; 
  color: ${props => props.guide ? 'black' : 'white'}; 
  margin-right: 0px;
  &:before {
    content: 'i';
  }
  &:hover {
    margin-right: 2px
  }
  @media (max-width: 500px) {
    padding: 4px 9px;
  }
`

export const ToggleGuideButton = (props) => {
  return (
    <StyledToggleGuideButton onClick={props.toggleGuide} guide={props.menu.guide} />
  )
}

const mapStateToProps = (state) => ({
  menu: state.menu,
})

const ConnectedToggleGuideButton = connect(mapStateToProps, { toggleGuide })(ToggleGuideButton)
export default ConnectedToggleGuideButton

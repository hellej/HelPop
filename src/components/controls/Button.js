import styled, { css } from 'styled-components'
import { bool } from 'prop-types'

export const Button = styled.div.attrs({
  style: props => ({ display: props.visible ? '' : 'none' })
})`
  color: ${props => props.color ? props.color : 'white'}; 
  cursor: pointer;
  padding: 7px 13px;
  background-color: rgba(0, 0, 0, 0.9);
  margin: 5px 10px;
  border-radius: 30px;
  font-weight: 300;
  font-size: 16px;
  width: max-content;
  max-width: 90%;
  overflow: auto;
  height: min-content;
  pointer-events: auto;
  transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s; /* Safari */
  &:hover {
    margin-left: 13px;
  }
  @media (max-width: 410px) {
    font-size: 14px;
    padding: 6px 11px;
  }
${props => props.sub && css`
  margin-left: 20px;
  &:hover { 
    margin-left: 23px;
  }
`}
${props => props.small && css`
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  border: 1px solid white;
  font-size: 13px;
  border-radius: 6px;
  padding: 1px 8px;
  margin-top: 8px;
  margin-bottom: 4px;
  margin-left: auto;
  margin-right: auto;
  &:hover { 
    margin-top: 8px;
    margin-bottom: 4px;
    margin-left: auto;
    margin-right: auto;    
    border-color: #ffb7b7;
  }
  @media (max-width: 410px) {
    font-size: 13px;
    padding: 1px 8px;
  }
`}
`

Button.propTypes = {
  visible: bool
}

Button.defaultProps = {
  visible: true
}
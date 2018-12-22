import styled, { css } from 'styled-components'
import { bool } from 'prop-types'

export const Button = styled.div.attrs(props => ({
    style: ({ display: props.visible ? '' : 'none' })
    })
  )`
  color: ${props => props.color ? props.color : 'white'}; 
  cursor: pointer;
  padding: 6px 11px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.9);
  margin: 5px 0px;
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
    margin-left: 2px;
  }
  @media (max-width: 500px) {
    font-size: 15px;
    padding: 6px 11px;
  }
${props => props.sub && css`
  padding: 5px 10px;
  margin-left: 10px;
  &:hover { 
    margin-left: 12px;
  }
`}
${props => props.green && css`
  margin: 5px 10px;
  background-color: #1cbf1c;
  color: white;
  font-weight: 500;
  //box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12), 0 6px 20px 0 rgba(0,0,0,0.06);
  &:hover { 
    margin: 5px 10px;
    background-color: #00ab00;
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
  @media (max-width: 500px) {
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

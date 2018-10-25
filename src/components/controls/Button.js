import styled, { css } from 'styled-components'

export const Button = styled.div`
  display: ${props => props.visible ? props.visible ? '' : 'none' : ''};
  color: ${props => props.color ? props.color : 'white'}; 
  cursor: pointer;
  padding: 7px 13px 7px 13px;
  background-color: rgba(0, 0, 0, 0.9);
  margin: 7px 10px;
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
`}
`
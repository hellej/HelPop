import styled, { css } from 'styled-components'

export const Button = styled.div`
display: ${props => props.visible ? '' : 'none'};
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
&:hover {
  margin-left: 13px;
}
${props => props.sub && css`
  margin-left: 20px;
  &:hover { 
    margin-left: 23px;
  }
`}
`
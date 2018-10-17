import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { notificationType } from './types'

const StyledNotificationContainer = styled.div`
  position: fixed; 
  z-index: 4;
  right: 10px;
  bottom: 45px;
  left: 10px; 
  margin: auto;
`
const StyledNotificationDiv = styled.div`
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
  ${props => props.look === 3 && css`
    background: rgba(0,35,0,0.84);
  `}
`

const Notification = (props) => {
  if (props.notification.text === null) return null

  return (
    <StyledNotificationContainer>
      <StyledNotificationDiv look={props.notification.look}>
        {props.notification.text}
      </StyledNotificationDiv>
    </StyledNotificationContainer>
  )
}

Notification.propTypes = {
  notification: notificationType.isRequired,
}

const mapStateToProps = (state) => ({
  notification: state.notification
})

const ConnectedNotification = connect(mapStateToProps, null)(Notification)

export default ConnectedNotification

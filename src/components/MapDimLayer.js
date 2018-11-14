import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const DimDiv = styled.div`
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  opacity ${props => props.visible ? 1 : 0};
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  margin: 0px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
  transition: visibility 0.7s linear, opacity 0.7s linear;
  -webkit-transition-duration: 0.2s; /* Safari */
  background: rgba(0,0,0,0.3);
  //pointer-events: none;
`

const MapDimLayer = (props) => {

  return (
    <DimDiv visible={props.menu.guide} />
  )
}

const mapStateToProps = (state) => ({ menu: state.menu })

const ConnectedMapDimLayer = connect(mapStateToProps, null)(MapDimLayer)

export default ConnectedMapDimLayer

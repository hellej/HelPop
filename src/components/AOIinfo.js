import React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import * as utils from '../utils'
import { aoiType } from './types'
import { Button } from './controls/Button'
import { hidePopulationStats } from './../reducers/aoiReducer'
import { zoomToFeature } from './../reducers/mapReducer'

const InfoBlock = styled.div`
  padding: 7px 7px 7px 13px;
  background-color: rgba(0, 0, 0, 0.9);
  margin: 5px 10px 15px 10px;
  border-radius: 10px;
  font-weight: 300;
  color: white;
  font-size: 15px;
  width: max-content;
  max-width: 90%;  
  pointer-events: auto;
  line-height: 1.7;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12), 0 6px 20px 0 rgba(0,0,0,0.06);
`
const TD = styled.td`
  padding: 0 18px 0 0;
  color: ${props => props.mapHovered ? '#70f7ff' : 'white'}; 
  // font-weight: ${props => props.mapHovered ? '350' : '300'}; 
  transition-duration: 0.15s;
  -webkit-transition-duration: 0.15s; /* Safari */
  ${props => props.aoiName && css`
    &:hover { 
      color: #70f7ff; 
      cursor: pointer;
  }
`}
`
const TDvalue = styled(TD)`
  color: #88ff88;
`

const AOIareasTable = ({ features, mapHoveredId, zoomToFeature }) => {
  return (
    <table>
      <tbody>
        <tr>
          <TD>Name:</TD>
          {features.map(feature => (
            <TD aoiName
              key={feature.id}
              mapHovered={feature.id === mapHoveredId}
              onClick={() => zoomToFeature(feature)}>
              {feature.properties.name}
            </TD>))}
        </tr>
        <tr>
          <TD>Area (km2):</TD>
          {features.map(feature => (
            <TDvalue key={feature.id}>{Math.round(feature.properties.area * 100) / 100}</TDvalue>))}
        </tr>
      </tbody>
    </table>
  )
}

const AOIpopulationTable = ({ features, hidePopulationStats, mapHoveredId, zoomToFeature }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <TD>Name:</TD>
            {features.map(feature => (
              <TD aoiName
                key={feature.id}
                mapHovered={feature.id === mapHoveredId}
                onClick={() => zoomToFeature(feature)}>
                {feature.properties.name}
              </TD>))}
          </tr>
          <tr>
            <TD>Area (km2):</TD>
            {features.map(feature => (
              <TDvalue key={feature.id}>{Math.round(feature.properties.area * 100) / 100}</TDvalue>))}
          </tr>
          <tr>
            <TD>Population:</TD>
            {features.map(feature => (
              <TDvalue key={feature.id}>{utils.numberToStringWithSpaces(feature.properties.totalPopulation)}</TDvalue>))}
          </tr>
          <tr>
            <TD>Density (/km2):</TD>
            {features.map(feature => (
              <TDvalue key={feature.id}>{utils.numberToStringWithSpaces(feature.properties.populationDensity)}</TDvalue>))}
          </tr>
          <tr>
            <TD>Urban Density (/km2):</TD>
            {features.map(feature => (
              <TDvalue key={feature.id}>{utils.numberToStringWithSpaces(feature.properties.populationUrbanDensity)}</TDvalue>))}
          </tr>
        </tbody>
      </table>
      <Button small onClick={hidePopulationStats}>Close</Button>
    </div>
  )
}

const AOIinfo = ({ aoi, hidePopulationStats, zoomToFeature }) => {
  if (aoi.FC.features && aoi.FC.features.length === 0) return null
  return (
    <InfoBlock>
      {aoi.popStats
        ? <AOIpopulationTable
          features={aoi.FC.features}
          mapHoveredId={aoi.mapHoveredId}
          hidePopulationStats={hidePopulationStats}
          zoomToFeature={zoomToFeature}>
        </AOIpopulationTable>
        : <AOIareasTable
          features={aoi.FC.features}
          mapHoveredId={aoi.mapHoveredId}
          zoomToFeature={zoomToFeature}>
        </AOIareasTable>}
    </InfoBlock>
  )
}

AOIinfo.propTypes = {
  aoi: aoiType.isRequired,
}

const mapStateToProps = (state) => ({
  aoi: state.aoi
})

const mapDispatchToProps = {
  hidePopulationStats,
  zoomToFeature,
}

const ConnectedAOIinfo = connect(mapStateToProps, mapDispatchToProps)(AOIinfo)
export default ConnectedAOIinfo

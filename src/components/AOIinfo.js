import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as utils from '../utils'
import { aoiType } from './types'
import { Button } from './controls/Button'
import { hidePopulationStats } from './../reducers/aoiReducer'

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
`
const TDvalue = styled(TD)`
  color: #88ff88;
`

const AOIareasTable = ({ features, mapHoveredId }) => {
  return (
    <table>
      <tbody>
        <tr>
          <TD>Name:</TD>
          {features.map(feature => (<TD key={feature.id} mapHovered={feature.id === mapHoveredId}>{feature.properties.name}</TD>))}
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

const AOIpopulationTable = ({ features, hidePopulationStats, mapHoveredId }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <TD>Name:</TD>
            {features.map(feature => (<TD key={feature.id} mapHovered={feature.id === mapHoveredId}>{feature.properties.name}</TD>))}
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

const AOIinfo = ({ aoi, hidePopulationStats }) => {
  if (aoi.FC.features && aoi.FC.features.length === 0) return null
  return (
    <InfoBlock>
      {aoi.popStats
        ? <AOIpopulationTable
          features={aoi.FC.features}
          mapHoveredId={aoi.mapHoveredId}
          hidePopulationStats={hidePopulationStats}>
        </AOIpopulationTable>
        : <AOIareasTable
          features={aoi.FC.features}
          mapHoveredId={aoi.mapHoveredId}>
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

const ConnectedAOIinfo = connect(mapStateToProps, { hidePopulationStats })(AOIinfo)
export default ConnectedAOIinfo

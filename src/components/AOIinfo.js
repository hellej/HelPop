import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as utils from '../utils'
import { aoiType } from './types'

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
`
const TDvalue = styled(TD)`
  color: #88ff88;
`

const AOIareasTable = ({ features }) => {
  return (
    <table>
      <tbody>
        <tr>
          <TD>Name:</TD>
          {features.map(feature => (<TD key={feature.id}>{feature.properties.name}</TD>))}
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

const AOIpopulationTable = ({ features }) => {
  return (
    <table>
      <tbody>
        <tr>
          <TD>Name:</TD>
          {features.map(feature => (<TD key={feature.id}>{feature.properties.name}</TD>))}
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
  )
}

const AOIinfo = ({ aoi }) => {
  if (aoi.FC.features && aoi.FC.features.length === 0) return null
  return (
    <InfoBlock>
      {aoi.popStats
        ? <AOIpopulationTable features={aoi.FC.features} />
        : <AOIareasTable features={aoi.FC.features} />}
    </InfoBlock>
  )
}

AOIinfo.propTypes = {
  aoi: aoiType.isRequired,
}

const mapStateToProps = (state) => ({
  aoi: state.aoi
})

const ConnectedAOIinfo = connect(mapStateToProps, null)(AOIinfo)
export default ConnectedAOIinfo

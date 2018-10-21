import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as utils from '../utils'
import { aoiType } from './types'

const StyledAOIinfoDiv = styled.div`
  max-width: 95%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  letter-spacing: 0.6px;
`
const InfoBlock = styled.div`
  padding: 7px 7px 7px 13px;
  background-color: rgba(0, 0, 0, 0.9);
  margin: 5px 10px;
  border-radius: 10px;
  font-weight: 300;
  color: white;
  font-size: 15px;
  width: max-content;
  max-width: 90%;  
  overflow: auto;
  height: min-content;
  pointer-events: auto;
  line-height: 1.7;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12), 0 6px 20px 0 rgba(0,0,0,0.06);
`
const Table = styled.table`
  padding-right: -10px;
`
const TD = styled.td`
  padding: 0 13px 0 0;
`
const TDvalue = styled(TD)`
  color: #88ff88;
`

const AOIareasTable = ({ features }) => {
  return (
    <tbody>
      <tr>
        <TD>Name:</TD>
        {features.map(feature => (<TD key={feature.id}>{feature.properties.name}</TD>))}
      </tr>
      <tr>
        <TD>Area (m2):</TD>
        {features.map(feature => (
          <TDvalue key={feature.id}>{utils.numberToStringWithSpaces(feature.properties.area)}</TDvalue>))}
      </tr>
    </tbody>
  )
}

const AOIpopulationTable = ({ features }) => {
  return (
    <tbody>
      <tr>
        <TD>Name:</TD>
        {features.map(feature => (<TD key={feature.id}>{feature.properties.name}</TD>))}
      </tr>
      <tr>
        <TD>Area (m2):</TD>
        {features.map(feature => (
          <TDvalue key={feature.id}>{utils.numberToStringWithSpaces(feature.properties.area)}</TDvalue>))}
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
  )
}

const AOIinfo = ({ aoi }) => {
  return (
    <StyledAOIinfoDiv>
      {aoi.FC.features.length !== 0 &&
        <InfoBlock>
          <Table>
            {aoi.popStats
              ? <AOIpopulationTable features={aoi.FC.features} />
              : <AOIareasTable features={aoi.FC.features} />}
          </Table>
        </InfoBlock>}
    </StyledAOIinfoDiv>
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

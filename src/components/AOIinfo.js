import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as utils from '../utils'
import { aoiType } from './types'
import { Button } from './controls/Button'
import { hidePopulationStats, setListHoveredAOI, unsetListHoveredAOI, calculatePopulationStats } from './../reducers/aoiReducer'
import { zoomToFeature } from './../reducers/mapReducer'

const InfoBlock = styled.div`
  padding: 10px 7px 7px 13px;
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
const Table = styled.table`
  border-spacing: 2px;
`
const TD = styled.td`
  padding: 0 5px;
`
const TDvalue = styled(TD)`
  text-align: center;
  color: #88ff88;
  `
const TDfirst = styled(TD)`
  padding: 2px 5px;
`
const AOIname = styled.span.attrs({
  style: props => ({
    borderColor: props.mapHovered ? '#70f7ff' : ''
  })
})`
  text-align: center;
  font-weight: 350;
  border-radius: 30px
  border: 1px solid white;
  padding: 3px 11px;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s; /* Safari */
  &:hover { 
    border-color: #70f7ff; 
    cursor: pointer;
  }
`

const AreaRow = ({ label, propName, features }) => {
  return (
    <tr>
      <TD>{label}</TD>
      {features.map(feature => (
        <TDvalue key={feature.id}>{Math.round(feature.properties[propName] * 100) / 100}</TDvalue>))}
    </tr>
  )
}

const PopulationRow = ({ visible, label, propName, features }) => {
  if (!visible) return null
  return (
    <tr>
      <TD>{label}</TD>
      {features.map(feature => (
        <TDvalue key={feature.id}>{utils.numberToStringWithSpaces(feature.properties[propName])}</TDvalue>))}
    </tr>
  )
}

const AOIpopulationTable = (props) => {
  const { FC, popStats, hidePopulationStats, mapHoveredId,
    zoomToFeature, setListHoveredAOI, unsetListHoveredAOI, calculatePopulationStats } = props
  return (
    <div>
      <Table>
        <tbody>
          <tr>
            <TDfirst>Name:</TDfirst>
            {FC.features.map(feature => (
              <TD key={feature.id} padding={'2px 0px'}>
                <AOIname
                  mapHovered={feature.id === mapHoveredId}
                  onClick={() => zoomToFeature(feature)}
                  onMouseEnter={() => setListHoveredAOI(feature.properties.name)}
                  onMouseLeave={unsetListHoveredAOI}>
                  {feature.properties.name}
                </AOIname>
              </TD>))}
          </tr>
          <AreaRow label={'Area (km2):'} propName={'area'} features={FC.features} />
          <PopulationRow visible={popStats} label={'Population:'} propName={'totalPopulation'} features={FC.features} />
          <PopulationRow visible={popStats} label={'Density (/km2):'} propName={'populationDensity'} features={FC.features} />
          <PopulationRow visible={popStats} label={'Urban Density (/km2):'} propName={'populationUrbanDensity'} features={FC.features} />
        </tbody>
      </Table>
      <Button visible={popStats} small onClick={hidePopulationStats}>Close</Button>
      <Button visible={!popStats} small onClick={() => calculatePopulationStats(FC)}> Show Population</Button>
    </div>
  )
}

const AOIinfo = (props) => {
  const { aoi, hidePopulationStats, zoomToFeature, setListHoveredAOI, unsetListHoveredAOI, calculatePopulationStats } = props
  if (aoi.FC.features && aoi.FC.features.length === 0) return null
  return (
    <InfoBlock>
      <AOIpopulationTable
        FC={aoi.FC}
        mapHoveredId={aoi.mapHoveredId}
        setListHoveredAOI={setListHoveredAOI}
        unsetListHoveredAOI={unsetListHoveredAOI}
        zoomToFeature={zoomToFeature}
        popStats={aoi.popStats}
        calculatePopulationStats={calculatePopulationStats}
        hidePopulationStats={hidePopulationStats}>
      </AOIpopulationTable>
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
  setListHoveredAOI,
  unsetListHoveredAOI,
  calculatePopulationStats,
}

const ConnectedAOIinfo = connect(mapStateToProps, mapDispatchToProps)(AOIinfo)
export default ConnectedAOIinfo

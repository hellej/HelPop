import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { utils } from '../utils/index'
import { aoiType } from './types'
import { Button } from './controls/Button'
import { getUpdateDrawAreas } from './../reducers/drawReducer'
import { hidePopulationStats, setListHoveredAOI, unsetListHoveredAOI, calculatePopulationStats, unsetMapHoveredAOI } from './../reducers/aoiReducer'
import { zoomToFeature } from './../reducers/mapReducer'

const InfoBlock = styled.div`
  max-width: ${props => props.legendVisible ? 'calc(100% - 170px)' : '89%'};
  padding: 10px 7px 7px 13px;
  background-color: rgba(0, 0, 0, 0.9);
  margin: 5px 5px 5px 0px;
  border-radius: 8px;
  font-weight: 300;
  color: white;
  font-size: 14px;
  width: max-content;
  pointer-events: auto;
  line-height: 1.7;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12), 0 6px 20px 0 rgba(0,0,0,0.06);
  @media (max-width: 500px) {
    font-size: 13px;
  }
`
const TableDiv = styled.div`
  overflow-x: auto;
`
const Table = styled.table`
  border-spacing: 2px;
`
const TD = styled.td`
  font-weight: 400;
  white-space: nowrap;
  padding: 0 5px;
`
const Unit = styled.span`
  font-size: 12px;
`
const TDvalue = styled(TD)`
  text-align: center;
  color: #88ff88;
`
const TDfirst = styled(TD)`
  padding: 3px 5px;
`
const AOIname = styled.span.attrs(props => ({
  style: ({ borderColor: props.mapHovered ? '#70f7ff' : '' })
})
)`
  white-space: nowrap;
  text-align: center;
  font-weight: 350;
  border-radius: 30px
  border: 1px solid white;
  padding: 3px 11px;
  transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s; /* Safari */
  &:hover { 
    border-color: #70f7ff; 
    cursor: pointer;
  }
`
const ButtonDiv = styled.div`
  display: flex;
  margin: auto;
  max-width: 85%;
`

const StatRow = ({ visible, label, unit, propName, features }) => {
  if (!visible) return null
  return (
    <tr>
      <TD>{label} <Unit>{unit}</Unit></TD>
      {features.map(feature => (
        <TDvalue key={feature.id}>{utils.numberToStringWithSpaces(feature.properties[propName])}</TDvalue>))}
    </tr>
  )
}

const AOIpopulationTable = (props) => {
  const { FC, popStats, mapHoveredId, zoomToFeature, setListHoveredAOI, unsetListHoveredAOI } = props
  return (
    <TableDiv>
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
          <StatRow visible={true} label={'Area'} unit={'(km2):'} propName={'area'} features={FC.features} />
          <StatRow visible={popStats} label={'Population:'} propName={'totalPopulation'} features={FC.features} />
          <StatRow visible={popStats} label={'Pop. Density'} unit={'/ total area km2:'} propName={'populationDensity'} features={FC.features} />
          <StatRow visible={popStats} label={'Pop. Density'} unit={'/ inhabited squares km2:'} propName={'populationUrbanDensity'} features={FC.features} />
          <StatRow visible={popStats} label={'Living Space'} unit={'m2/pers.:'} propName={'meanM2Person'} features={FC.features} />
        </tbody>
      </Table>
    </TableDiv>
  )
}

const AOIinfo = (props) => {
  const { aoi, menu, hidePopulationStats, zoomToFeature, setListHoveredAOI,
    unsetListHoveredAOI, calculatePopulationStats, getUpdateDrawAreas, unsetMapHoveredAOI } = props
  if (aoi.FC.features && aoi.FC.features.length === 0) return null
  return (
    <InfoBlock
      legendVisible={menu.legend}
      onMouseEnter={unsetMapHoveredAOI}>
      <AOIpopulationTable
        FC={aoi.FC}
        mapHoveredId={aoi.mapHoveredId}
        setListHoveredAOI={setListHoveredAOI}
        unsetListHoveredAOI={unsetListHoveredAOI}
        zoomToFeature={zoomToFeature}
        popStats={aoi.popStats}
        calculatePopulationStats={calculatePopulationStats}
        hidePopulationStats={hidePopulationStats}
        getUpdateDrawAreas={getUpdateDrawAreas}>
      </AOIpopulationTable>
      <ButtonDiv>
        <Button visible={aoi.popStats} small onClick={hidePopulationStats}>Hide Stats</Button>
        <Button visible={aoi.popStats} small onClick={getUpdateDrawAreas}>Update Stats</Button>
        <Button visible={!aoi.popStats} small onClick={() => calculatePopulationStats(aoi.FC)}> Show Population</Button>
      </ButtonDiv>
    </InfoBlock>
  )
}

AOIinfo.propTypes = {
  aoi: aoiType.isRequired,
}

const mapStateToProps = (state) => ({
  aoi: state.aoi,
  menu: state.menu,
})

const mapDispatchToProps = {
  hidePopulationStats,
  zoomToFeature,
  setListHoveredAOI,
  unsetListHoveredAOI,
  calculatePopulationStats,
  getUpdateDrawAreas,
  unsetMapHoveredAOI,
}

const ConnectedAOIinfo = connect(mapStateToProps, mapDispatchToProps)(AOIinfo)
export default ConnectedAOIinfo

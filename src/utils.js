import area from '@turf/area'
import bbox from '@turf/bbox'
import buffer from '@turf/buffer'
import pointsWithinPolygon from '@turf/points-within-polygon'
import * as censusFC from './data/vaesto-250m-2017-centr.json'
import { featureCollection } from '@turf/helpers'

export const m2tokm2 = 0.000001
export const cellArea = 250 * 250

export const asFeatureCollection = (feature) => {
  return featureCollection(feature)
}

export const getBuffer = (geojsonFeature, dist) => {
  return buffer(geojsonFeature, dist, { units: 'meters' })
}

export const getArea = (geojsonFeature) => {
  const m2 = area(geojsonFeature)
  return Math.round(m2)
}

export const getBbox = (geojsonFeature) => {
  return bbox(getBuffer(geojsonFeature, 1000))
}

export const getCensusPoints = (aoiFeature) => {
  return pointsWithinPolygon(censusFC, aoiFeature).features
}

export const calculateTotalPopulation = (censusFeatures) => {
  const totalPopulation = Object.values(censusFeatures).map(f => f.properties.ASUKKAITA)
    .reduce((acc, value) => acc + value)
  return totalPopulation
}

export const calculatePopulationStats = (aoiFeature) => {
  const censusFeatures = getCensusPoints(aoiFeature)
  if (censusFeatures.length === 0) { return { totalPopulation: 0, populationDensity: 0, populationUrbanDensity: 0 } }

  const totalPopulation = calculateTotalPopulation(censusFeatures)
  const populationDensity = Math.round(totalPopulation / (getArea(aoiFeature) * m2tokm2))
  const populationUrbanDensity = Math.round(totalPopulation / (cellArea * censusFeatures.length * m2tokm2))
  return { totalPopulation, populationDensity, populationUrbanDensity }
}

export const numberToStringWithSpaces = (value) => {
  const numberString = value.toString()
  let formattedString = ''
  let ind = 1

  for (let i = numberString.length - 1; i >= 0; i -= 1) {
    formattedString = numberString[i] + (formattedString)
    if (ind % 3 === 0 && ind !== numberString.length) {
      formattedString = ' ' + formattedString
    }
    ind += 1
  }
  return formattedString
}

export const validateAOIFeature = (feature) => {
  console.log('uploading: ', feature)
  if (!feature.type || feature.type.localeCompare('feature') !== 1) return 'Uploaded feature is not a geojson feature'
  if (!feature.geometry) return 'Geometry is missing in the uploaded feature'
  if (!feature.geometry.coordinates || feature.geometry.coordinates[0].length < 3) return 'Geometry is missing in the uploaded feature'
  if (feature.geometry.type.localeCompare('polygon') === 0 &&
    feature.geometry.type.localeCompare('multipolygon') === 0) { return 'Wrong geometry type in the uploaded file' }
  return null
}

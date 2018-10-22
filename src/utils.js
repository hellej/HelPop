import area from '@turf/area'
import bbox from '@turf/bbox'
import buffer from '@turf/buffer'
import circle from '@turf/circle'
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
  const m2 = Math.round(area(geojsonFeature))
  return m2tokm2 * m2
}

export const getBbox = (geojsonFeature) => {
  return bbox(geojsonFeature)
}

export const getCircle = (center, radius) => {
  const options = { steps: 64, units: 'meters' }
  return circle(center, radius, options)
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
  const populationDensity = Math.round(totalPopulation / (getArea(aoiFeature)))
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

export const addAreaAndNameToFC = (FC) => {
  return {
    ...FC,
    features: FC.features.map((feature, index) => ({
      ...feature,
      properties: {
        ...feature.properties,
        area: getArea(feature),
        name: feature.properties.name ? feature.properties.name : `Area ${index + 1}`
      }
    }))
  }
}

export const validateAOIFeature = (FC) => {
  let error
  FC.features.forEach(feature => {
    if (!feature.type || feature.type !== 'Feature') { error = 'Uploaded feature is not a geojson feature' }
    if (!feature.geometry) { error = 'Geometry is missing in the uploaded feature' }
    if (!feature.geometry.coordinates || feature.geometry.coordinates[0].length < 3) { error = 'Geometry is missing in the uploaded feature' }
    if (feature.geometry.type !== 'Polygon' &&
      feature.geometry.type !== 'MultiPolygon') { error = 'Wrong geometry type in the uploaded file' }
  })
  return error
}

export const mbPaintStyle = (colorsValues) => {
  const colorSteps = (colorsValues) => {
    let mbColors = []
    colorsValues.forEach(item => {
      mbColors.push(item.color)
      if (item.value) { mbColors.push(item.value) }
    })
    return mbColors
  }
  return {
    'fill-color': [
      'step',
      ['get', 'ASUKKAITA'],
      ...colorSteps(colorsValues)
    ],
    'fill-opacity': 0.8
  }
}

export const legendClasses = (colorSteps) => {
  const range = (array, index) => {
    if (index === 0) { return `0-${array[0].value - 1}` }
    if (index < array.length - 1) { return `${array[index - 1].value}-${array[index].value - 1}` }
    else return `${array[index - 1].value}-`
  }
  return colorSteps.map((colorStep, index) => ({
    color: colorStep.color,
    range: range(colorSteps, index)
  }))
}

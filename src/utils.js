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

export const calculatePopulationSums = (censusFeatures) => {
  const totalPopulation = Object.values(censusFeatures).map(f => f.properties)
    .reduce((acc, value) => {
      acc.population += value.ASUKKAITA
      acc.m2person += value.ASVALJYYS
      return acc
    }, { population: 0, m2person: 0 })
  return totalPopulation
}

export const calculatePopulationStats = (aoiFeature) => {
  const censusFeatures = getCensusPoints(aoiFeature)
  if (censusFeatures.length === 0) {
    return { totalPopulation: 0, meanM2Person: 0, populationDensity: 0, populationUrbanDensity: 0 }
  }
  const populationSums = calculatePopulationSums(censusFeatures)
  const totalPopulation = populationSums.population
  const populationDensity = Math.round(totalPopulation / (getArea(aoiFeature)))
  const populationUrbanDensity = Math.round(totalPopulation / (cellArea * censusFeatures.length * m2tokm2))
  const meanM2Person = Math.round(((populationSums.m2person / censusFeatures.length) * 1000)) / 1000
  return { totalPopulation, populationDensity, populationUrbanDensity, meanM2Person }
}

export const isInteger = (n) => Number.isInteger(n)

export const isFloat = (n) => Number(n) === n && n % 1 !== 0

export const validateAreaName = (name) => { if (name === null || name === '') return 'Name is required for new areas' }

export const validateCircleRadius = (n) => {
  const int = parseInt(n, 10)
  const float = parseFloat(n)
  if (n && n.indexOf(',') !== -1) return 'Use point as decimal separator'
  if (!Number.isInteger(int) && !isFloat(float)) return 'Radius should be numeric (& in meters)'
  if (int < 10 || float < 10) return 'Use bigger radius'
  if (int > 30000 || float > 30000) return 'Use smaller radius'
}

export const numberToStringWithSpaces = (value) => {
  if (isFloat(value)) return Math.round(value * 100) / 100
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

export const mbPaintStyle = (colorsValues, colorProp) => {
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
      ['get', colorProp],
      ...colorSteps(colorsValues)
    ],
    'fill-opacity': 0.8
  }
}

export const mb3DPaintStyle = (colorsValues, colorProp, heightProp) => {
  const colorSteps = (colorsValues) => {
    let mbColors = []
    colorsValues.forEach(item => {
      mbColors.push(item.color)
      if (item.value) { mbColors.push(item.value) }
    })
    return mbColors
  }
  return {
    'fill-extrusion-color': [
      'step',
      ['get', colorProp],
      ...colorSteps(colorsValues)
    ],
    'fill-extrusion-height': ['get', heightProp],
    'fill-extrusion-opacity': 0.7
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

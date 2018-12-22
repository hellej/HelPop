import censusFC from './../data/vaesto-250m-2017-centr.json'
import { turf } from './index'

export const calculatePopulationSums = (censusFeatures) => {
  const totalPopulation = Object.values(censusFeatures)
    .map(f => f.properties)
    .reduce((acc, value) => {
      acc.population += value.ASUKKAITA
      acc.m2person += value.ASVALJYYS
      return acc
    }, { population: 0, m2person: 0 })
  return totalPopulation
}

export const calculatePopulationStats = (aoiFeature) => {
  const censusFeatures = turf.featuresWithinPolygon(censusFC, aoiFeature)
  if (censusFeatures.length === 0) {
    return { totalPopulation: 0, meanM2Person: 0, populationDensity: 0, populationUrbanDensity: 0 }
  }
  const populationSums = calculatePopulationSums(censusFeatures)
  const totalPopulation = populationSums.population
  const populationDensity = Math.round(totalPopulation / (turf.getArea(aoiFeature)))
  const populationUrbanDensity = Math.round(totalPopulation / (turf.cellArea * censusFeatures.length * turf.m2tokm2))
  const meanM2Person = Math.round(((populationSums.m2person / censusFeatures.length) * 1000)) / 1000
  return { totalPopulation, populationDensity, populationUrbanDensity, meanM2Person }
}

export const addAreaAndNameToFC = (FC) => {
  return {
    ...FC,
    features: FC.features.map((feature, index) => ({
      ...feature,
      properties: {
        ...feature.properties,
        area: turf.getArea(feature),
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

import area from '@turf/area'
import pointsWithinPolygon from '@turf/points-within-polygon'
import * as censusFC from './data/vaesto-250m-2017-centr.json'

export const getArea = (geojsonFeature) => {
  const m2 = area(geojsonFeature)
  return Math.round(m2)
}

export const getCencusPoints = (aoiFeature) => {
  return pointsWithinPolygon(censusFC, aoiFeature)
}

export const calculateTotalPopulation = (censusFeatures) => {
  const totalPopulation = Object.values(censusFeatures)
    .map(f => f.properties.ASUKKAITA)
    .reduce((acc, value) => {
      return acc + value
    })
  return totalPopulation
}

export const calculatePopulationStats = (aoiFeature) => {
  const area = 250 * 250
  const censusFeatures = getCencusPoints(aoiFeature).features
  if (censusFeatures.length === 0) {
    return { totalPopulation: 0, populationDensity: 0 }
  }
  const totalPopulation = calculateTotalPopulation(censusFeatures)
  const populationDensity = Math.round(totalPopulation / (area * censusFeatures.length * 0.000001))
  return { totalPopulation, populationDensity }
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

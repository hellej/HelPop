import { shape, number, string, bool, object, array, arrayOf } from 'prop-types'

const featureGeometryType = shape({
  coordinates: arrayOf(array).isRequired,
  type: string.isRequired,
})

const featurePropertiesType = shape({
  name: string.isRequired,
  area: number.isRequired,
  totalPopulation: number,
  populationDensity: number,
  populationUrbanDensity: number,
})

const featureType = shape({
  id: string.isRequired,
  type: string.isRequired,
  properties: featurePropertiesType.isRequired,
  geometry: featureGeometryType.isRequired,
})

const featureCollectionType = shape({
  type: string.isRequired,
  features: arrayOf(featureType).isRequired
})

export const aoiType = shape({
  FC: featureCollectionType.isRequired,
  popStats: bool.isRequired,
})

export const drawType = shape({
  drawMode: string,
  initialized: bool.isRequired,
})

export const notificationType = shape({
  text: string,
  style: number,
})

export const mapType = shape({
  basemap: string.isRequired,
  initialized: bool.isRequired,
})

export const demo2dType = shape({
  visible: bool.isRequired,
  layerId: string.isRequired,
  colorSteps: array.isRequired,
  legendClasses: array.isRequired,
  mbPaintStyle: object,
})

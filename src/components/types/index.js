import { shape, number, string, bool, object, array, arrayOf } from 'prop-types'

const featurePropertiesType = shape({
  area: number.isRequired,
  name: string.isRequired,
})

const featureType = shape({
  type: string.isRequired,
  id: string.isRequired,
  geometry: object.isRequired,
  properties: featurePropertiesType.isRequired,
})

export const aoiType = shape({
  FC: shape({
    type: string.isRequired,
    features: arrayOf(featureType).isRequired
  }),
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
  initialized: bool.isRequired,
  basemap: string.isRequired,
})

export const demo2dType = shape({
  visible: bool.isRequired,
  layerId: string.isRequired,
  colorSteps: array.isRequired,
  legendClasses: array.isRequired,
  mbPaintStyle: object,
})

import { shape, number, string, bool, object, array } from 'prop-types'

export const aoiType = shape({
  area: number,
  popStats: bool.isRequired,
  pop: number,
  popDens: number,
  popUrbanDens: number,
  aoiFeature: shape({
    id: string.isRequired,
    type: string.isRequired,
    properties: object.isRequired,
    geometry: object.isRequired,
  })
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

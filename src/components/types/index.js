import { shape, number, string, bool, object } from 'prop-types'

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

export const tooltipType = shape({
  text: string,
  style: number,
})

export const mapType = shape({
  initialized: bool.isRequired,
  basemap: string.isRequired,
})

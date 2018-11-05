import area from '@turf/area'
import bbox from '@turf/bbox'
import buffer from '@turf/buffer'
import circle from '@turf/circle'
import pointsWithinPolygon from '@turf/points-within-polygon'
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

export const featuresWithinPolygon = (FC, polygon) => {
  return pointsWithinPolygon(FC, polygon).features
}

import area from '@turf/area'

export const getArea = (geojsonFeature) => {
  const m2 = area(geojsonFeature)
  return Math.round(m2)
}

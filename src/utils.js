import area from '@turf/area'

export const getArea = (geojsonFeature) => {
  const m2 = area(geojsonFeature)
  return Math.round(m2)
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

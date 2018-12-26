// LEGEND CLASSES CREATION

export const getEqualColorSteps = (colors, min, max) => {
  const range = max - min
  const rawClass = range / 6
  let cleanClass
  if (rawClass > 80 && rawClass < 600) {
    cleanClass = Math.round(rawClass / 100) * 100
  }
  return colors.reduce((acc, value, ind) => {
    const step = (ind + 1) * cleanClass
    acc.push({ color: value, step })
    return acc
  }, [])
}

export const getCustomColorSteps = (colors, steps) => {
  return colors.reduce((acc, value, ind) => {
    const step = steps[ind]
    acc.push({ color: value, step })
    return acc
  }, [])
}

const mbColorSteps = (colorSteps) => {
  return colorSteps.reduce((acc, value, ind) => {
    const last = colorSteps.length === ind + 1
    acc.push(value.color)
    if (!last) acc.push(value.step)
    return acc
  }, [])
}

export const mbPaintStyle = (colorSteps, colorProp) => {
  return {
    'fill-color': [
      'step', ['get', colorProp],
      ...mbColorSteps(colorSteps)],
    'fill-opacity': 0.76
  }
}

export const mb3DPaintStyle = (colorSteps, colorProp, heightProp) => {
  return {
    'fill-extrusion-color': [
      'step', ['get', colorProp],
      ...mbColorSteps(colorSteps)],
    'fill-extrusion-height': ['get', heightProp],
    'fill-extrusion-opacity': 0.7
  }
}

export const legendClasses = (colorSteps, min, max) => {
  const range = (array, index) => {
    const first = index === 0
    const last = index === array.length - 1
    if (first) { return `${min}-${array[0].step - 1}` }
    if (last) return `${array[index - 1].step}-${max}`
    return `${array[index - 1].step}-${array[index].step - 1}`
  }
  return colorSteps.map((colorStep, index) => ({
    color: colorStep.color,
    range: range(colorSteps, index)
  }))
}

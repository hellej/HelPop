const initialMenuState = {
  legend: false,
  basemapOptions: false,
  guide: false,
}

const menuReducer = (store = initialMenuState, action) => {

  switch (action.type) {

    case 'TOGGLE_2D_DEMO': return { ...store, legend: action.visible ? false : true }

    case 'TOGGLE_3D_DEMO': return { ...store, legend: action.visible ? false : true }

    case 'REMOVE_2D_3D_POPS': return { ...store, legend: false }

    case 'TOGGLE_BASEMAP_OPTIONS': return { ...store, basemapOptions: !store.basemapOptions }

    case 'TOGGLE_GUIDE': return { ...store, guide: !store.guide }

    case 'SET_BASEMAP': return { ...store, basemapOptions: false }

    default:
      return store
  }
}

export const toggleBaseMapOptions = () => {
  return { type: 'TOGGLE_BASEMAP_OPTIONS' }
}

export const toggleGuide = () => {
  return { type: 'TOGGLE_GUIDE' }
}

export default menuReducer

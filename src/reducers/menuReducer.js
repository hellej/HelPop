const initialMenuState = {
  legend: false,
  basemapOptions: false,
}

const menuReducer = (store = initialMenuState, action) => {

  switch (action.type) {

    case 'TOGGLE_2D_DEMO': return { ...store, legend: action.visible ? false : true }

    case 'TOGGLE_3D_DEMO': return { ...store, legend: action.visible ? false : true }

    case 'TOGGLE_BASEMAP_OPTIONS': return { ...store, basemapOptions: !store.basemapOptions }

    case 'SET_BASEMAP': return { ...store, basemapOptions: false }

    default:
      return store
  }
}

export const toggleBaseMapOptions = () => {
  return { type: 'TOGGLE_BASEMAP_OPTIONS' }
}

export default menuReducer

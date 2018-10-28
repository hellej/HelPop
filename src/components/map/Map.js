import React from 'react'
import MapboxGL from 'mapbox-gl/dist/mapbox-gl.js'
import { connect } from 'react-redux'
import { initializeMap, updateCamera } from './../../reducers/mapReducer'

MapboxGL.accessToken = process.env.REACT_APP_MB_ACCESS || 'Mapbox token is needed in order to use the map'

class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      loaded: false,
      flying: false,
      initialCenter: { lng: 24.935486, lat: 60.215779 }
    }
  }

  map = null

  componentDidMount() {

    this.setupMapWindow()

    this.map = new MapboxGL.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: this.state.initialCenter,
      zoom: 10,
      boxZoom: false,
      scrollZoom: false,
      trackResize: true
    })

    this.map.on('style.load', () => {
      console.log('map style loaded')
    })

    this.map.on('render', () => {
      if (!this.state.isReady) this.setState({ isReady: true })
    })

    this.map.on('load', () => {
      console.log('map loaded')
      this.map.fire('flystart')
      this.map.flyTo({ center: this.state.initialCenter, speed: 0.1, curve: 1, zoom: 10.15, maxDuration: 1500 })
      this.setState({ loaded: true, isReady: true })
      this.map.addControl(new MapboxGL.NavigationControl(), 'bottom-right')
      this.props.initializeMap(this.map)
    })

    this.map.on('moveend', () => {
      if (this.state.flying) this.map.fire('flyend')
      this.props.updateCamera(this.map.getCenter(), this.map.getZoom())
    })

    this.map.on('flystart', () => {
      this.map.scrollZoom.disable()
      this.setState({ flying: true })
    })

    this.map.on('flyend', () => {
      this.map.scrollZoom.enable()
      this.setState({ flying: false })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.map) return

    if (!prevState.isReady && this.state.isReady) {
      console.log('map ready')
    }
  }

  setupMapWindow = () => {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    window.addEventListener('orientationchange', this.updateWindowDimensions)
    this.mapContainer.addEventListener('touchmove', (e) => { e.preventDefault() }, { passive: false })
  }

  updateWindowDimensions = () => {
    if (!this.map) return
    this.forceUpdate()
    setTimeout(() => { this.resizeMap() }, 300)
    // const vh = Math.min(window.screen.availHeight, window.innerHeight, document.documentElement.clientHeight) * 0.01
    // document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  resizeMap = () => {
    if (!this.map) return
    this.map.resize()
  }

  componentWillUnmount() {
    setTimeout(() => this.map.remove(), 300)
    window.removeEventListener('resize', this.updateWindowDimensions)
    window.removeEventListener('orientationchange', this.updateWindowDimensions)
  }

  render() {
    const mapstyle = {
      position: 'relative',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      margin: 0,
      width: '100%',
      height: window.innerHeight,
      overflow: 'hidden',
      touchAction: 'none'
    }

    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { map: this.map }))

    return (
      <div style={mapstyle} ref={el => { this.mapContainer = el }}>
        {this.state.isReady && this.map !== null && children}
      </div>
    )
  }
}

const mapDispatchToProps = {
  initializeMap,
  updateCamera,
}

const ConnectedMap = connect(null, mapDispatchToProps)(Map)
export default ConnectedMap

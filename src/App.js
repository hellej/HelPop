import React from 'react'
import Map from './components/map/Map'
import Draw from './components/map/Draw'

class App extends React.Component {
  render() {
    return (
      <div>
        <Map>
          <Draw/>
        </Map>
      </div>
    )
  }
}

export default App

# HelPop
An interactive web map application for analyzing and exploring population patterns within user-drawn areas of interest (AOIs). Currently implemented features include drawing (+ uploading & downloading) AOIs, visualizing population as 2D & 3D grids and calculating population statistics (sum, density, living space (m2/person)) for AOIs. [Live demo](https://hel-pop.firebaseapp.com/)

## Built With
* React, Redux & Thunk
* Mapbox GL JS & Turf.js

## Installation
```
$ git clone git@github.com:hellej/HelPop.git
$ cd HelPop
$ npm install
$ npm start
```
Update your Mapbox access token to `src/components/map/Map.js`<br>
Open browser to http://localhost:3000/

Running the integration tests: `npm run cypress:open`

## Interactive web mapping with Mapbox GL & React
This project serves as a proof of concept of an interactive web mapping solution utilizing Mapbox GL and React. React framework (/library) facilitates building single page web applications (SPAs) with highly organized codebase. Hence, building an interactive web map application as React SPA enables structuring map components (e.g. layers, data, styles, map zoom, map tilt) in more modularized manner. Moreover, using redux store in an application such as this further clarifies the division between styles, data and logic of the mapping features. 

**Mapping features of the application apply the following concepts:**
* Map layers (components) are children of the map component in the App.js
* Map component passes the Mapbox map object as props to all of its children (map layers)
* General functionality (e.g. adding layer to the map) is passed to all map layer components with higher order component (HOC) asMapLayer.js 
* Style, legend data, layer id and visibility of the map layers are managed in reducer, whereas static GeoJSON data is imported directly to the map component (Demo2D & Demo3D) 
  * Or: Style is created inside the map layer component and GeoJSON data is provided from the related reducer (AOI.js)

## SRC
``` 
  ├── components
  │   ├── controls   
  │   │    ├── Button.js                   # Importable button as a styled component
  │   │    ├── ControlPanel.js             # All buttons of the UI as panel
  │   │    └── GeoJsonUploader.js          # Button (style & logic) for uploading GeoJSON files to UI
  │   ├── guide 
  │   │    ├── Guide.js                    # Independent "Welcome to app" -modal, includes styles and content
  │   │    └── ToglleGuideButton.js        # Button for toggling guide visibility
  │   ├── map                              # Map layers as React components
  │   │    ├── AOI.js                      # Highlights list hovered AOI on the map
  │   │    ├── asMapLayer.js               # Higher order component (HOC) for providing general methods (e.g. add layer to map) to all map layers
  │   │    ├── Demo2D.js                   # 2D choropleth map of population
  │   │    ├── Demo3D.js                   # 3D choropleth map of population
  │   │    ├── Draw.js                     # Initialization of draw, listens to draw events and dispatches related actions
  │   │    ├── Map.js                      # Initialization of MapboxGL map, "parent" of the map layers
  │   │    ├── MapControl.js               # Adjusting map (e.g. tilt & zoom) based on state in mapReducer (redux store)
  │   │    ├── PopGrid.js                  # If population stats are shown, this shows the selected population grid cells
  │   │    └── PopPoints.js                # If population stats are shown, this shows the related population grid center points
  │   ├── types
  │   │    └── index.js                    # Definitions for prop-types
  │   ├── AOIInfo.js                       # AOI info = table of population stats
  │   ├── HoveredInfo.js                   # Shows the population count of the mouse hovered population feature (grid cell)
  │   ├── Legend.js                        # Colors and class ranges (population) for both 2D or 3D demo
  │   ├── MapDimLayer.js                   # Dims map when necessary (e.g. if guide is shown)
  │   └── Notification.js                  # Shows notifications at the bottom of the UI
  ├── data 
  │   ├── data-sources.txt                 # Sources of the data
  │   ├── vaesto-250m-2017-centr.json      # Center points of HSY population grid (2017)
  │   └── vaesto-250m-2017.json            # HSY population grid (2017)
  ├── reducers                             # State of the app is managed with these reducers
  │   ├── aoiReducer.js                    # AOI feature, population stats of it and map/list hovered AOI info if any
  │   ├── demo2dReducer.js                 # Settings and state of the map layer (the data is imported in the map component for performance)
  │   ├── demo3dReducers.js                # Settings and state of the map layer (the data is imported in the map component for performance)
  │   ├── drawReducer.js                   # State of the draw object and draw event handling (e.g. creating or updating drawn areas)
  │   ├── mapReducer.js                    # State of the map (zoom, center, map hovered feature etc.)
  │   ├── menuReducer.js                   # State of the menu: whether legend, guide and basemap options are shown
  │   └── notificationReducer.js           # Actions (and state) for showing notifications
  ├── utils                        
  │   ├── index.js                         # Provides all utilities from one place
  │   ├── mapbox.js                        # Functions to support handling of Mapbox layers & styles
  │   ├── turf.js                          # Geospatial analysis (e.g. buffer & points in polygon)
  │   └── utils.js                         # General utilities (e.g. calculation of population stats)
  │── App.js                               # All components of the app
  │── AppRouteListener.js                  # Start 3D visualization if page is loaded at path /3Dpop
  │── constants.js                         # URLs to Mapbox map styles
  │── history.js                           # Create history object for React Router
  │── index.js                             # Renders app to root-div
  └── store.js                             # Reducers combined to a redux store
```

## License
[MIT](LICENSE)
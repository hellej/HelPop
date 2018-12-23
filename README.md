# HelPop
An interactive web map application for analysing and exploring population patterns within user-drawn areas of interest (AOIs). Currently implemented features include drawing (+ uploading & downloading) AOIs, visualizing population as 2D & 3D grids and calculating population statistics (sum, density, living space (m2/person)) for AOIs. [Live demo](https://hel-pop.firebaseapp.com/)

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

## License
[MIT](LICENSE)
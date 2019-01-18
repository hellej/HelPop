describe('App menu', () => {

  it('contains controls (buttons)', () => {
    cy.visit('/')
    cy.contains('Draw Area')
    cy.contains('Add Circle')
    cy.contains('Upload Areas')
    cy.contains('2D Population')
    cy.contains('3D Population')
    cy.contains('Basemap: Streets')
  })
})

describe('Layer switches', () => {

  it('can toggle basemap options', () => {
    cy.contains('Basemap').click()
    cy.contains('Light').click()
    cy.contains('Basemap: Light')
    cy.wait(200)
    cy.contains('Basemap').click()
    cy.contains('Dark').click()
    cy.contains('Basemap: Dark')
    cy.wait(200)
    cy.contains('Basemap').click()
    cy.contains('Streets').click()
    cy.contains('Basemap: Streets')
    cy.wait(500)
  })

  it('can toggle 2D Demo', () => {
    cy.contains('2D Population').click()
    cy.contains('1900-2362')
    cy.wait(1000)
    cy.contains('2D Population: ON')
    cy.contains('2D Population').click()
    cy.contains('2D Population: OFF')
    cy.wait(200)
  })

  it.skip('shows hovered feature info', () => {
    // cy.contains('2D Population: OFF').click()
    // cy.wait(1000)
    // cy.get('.mapboxgl-canvas')
    //   .wait(2000)
    //   .trigger('mousemove', { which: 1, pageX: 335, pageY: 560 })
    //   .trigger('mouseup', { pageX: 235, pageY: 460 })
    //   .trigger('mouseenter', 445, 470)
    //   .trigger('mouseover', 445, 470)
    //   .wait(300)
    // cy.contains('Population: 500')
    // cy.wait(200)
    // cy.contains('2D Population: ON').click()
  })

  it('can toggle 3D Demo', () => {
    cy.contains('3D Population').click()
    cy.contains('1900-2362')
    cy.wait(1000)
    cy.contains('3D Population: ON')
    cy.contains('3D Population').click()
    cy.contains('3D Population: OFF')
    cy.wait(200)
  })
})

describe('Drawing areas', () => {

  it('shows notification on draw start', () => {
    cy.contains('Draw Area').click()
    cy.contains('Finish drawing')
  })

  it('can draw an area', () => {
    cy.get('.mapboxgl-canvas')
      .wait(600)
      .trigger('mousedown', 265, 360)
      .wait(400)
      .trigger('mouseup', 265, 360)
      .trigger('mousedown', 265, 460)
      .wait(400)
      .trigger('mouseup', 265, 460)
      .trigger('mousedown', 435, 460)
      .wait(400)
      .trigger('mouseup', 435, 460)
      .trigger('mousedown', 435, 360)
      .wait(400)
      .trigger('mouseup', 435, 360)
      .trigger('mousedown', 265, 360)
      .wait(400)
      .trigger('mouseup', 265, 360)
  })

  it('shows area (m2) after finishing drawing', () => {
    cy.contains('Area')
  })

  it('shows remove buttons after drawing', () => {
    cy.contains('Remove Selected')
    cy.contains('Remove All')
  })
})

describe('Area Stats', () => {

  it('calculates the area of the area right', () => {
    cy.contains('19.93')
  })

  it('shows calculate population stats button', () => {
    cy.contains('Show Population')
  })

  it('shows population stats', () => {
    cy.contains('Show Population').click()
    cy.contains('Population')
    cy.contains('Density')
    cy.contains('Pop. Density')
    cy.contains('Average Living Space')
  })

  it('calculates population stats right', () => {
    cy.contains('60 486')
    cy.contains('3 035')
    cy.contains('6 011')
    cy.contains('41.46')
  })

  it('can hide population stats', () => {
    cy.contains('Hide Stats').click()
  })
})

describe('Area management', () => {

  it('shows remove node option on node selected', () => {
    cy.get('.mapboxgl-canvas')
      .wait(300)
      .trigger('mousedown', 265, 360)
      .wait(300)
      .trigger('mouseup', 265, 360)
      .wait(300)
      .trigger('mousedown', 265, 360)
      .wait(300)
      .trigger('mouseup', 265, 360)
    cy.contains('Remove Node')
  })

  it('can remove polygon by removing all nodes', () => {
    cy.contains('Remove Node').click()
    cy.get('.mapboxgl-canvas')
      .wait(400)
      .trigger('mousedown', 265, 460)
      .wait(400)
      .trigger('mouseup', 265, 460)
    cy.contains('Remove Node').click()

    cy.contains('Draw Area')
    cy.contains('Upload Areas')
  })

  it('can remove areas with "Remove All" button', () => {
    drawArea()
    cy.wait(400)
    cy.contains('Remove All').click()
    cy.contains('Draw Area')
    cy.contains('Upload Area')
  })
})

const drawArea = () => {
  cy.contains('Draw Area').click()
  cy.get('.mapboxgl-canvas')
    .wait(600)
    .trigger('mousedown', 265, 360)
    .wait(400)
    .trigger('mouseup', 265, 360)
    .trigger('mousedown', 265, 460)
    .wait(400)
    .trigger('mouseup', 265, 460)
    .trigger('mousedown', 435, 460)
    .wait(400)
    .trigger('mouseup', 435, 460)
    .trigger('mousedown', 435, 360)
    .wait(400)
    .trigger('mouseup', 435, 360)
    .trigger('mousedown', 265, 360)
    .wait(400)
    .trigger('mouseup', 265, 360)
}
describe('App menu', () => {

  it('contains controls (buttons)', () => {
    cy.visit('/')
    cy.contains('Draw Area')
    cy.contains('Upload Area')
  })

  it('can toggle basemap options', () => {
    cy.contains('Basemap').click()
    cy.contains('Light').click()
    cy.wait(500)
    cy.contains('Streets').click()
    cy.contains('Basemap').click()
    cy.wait(500)
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
    cy.contains('Urban Density')
  })

  it('calculates population stats right', () => {
    cy.contains('60 486')
    cy.contains('3 035')
    cy.contains('6 011')
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

  it('can remove areas with "Remove Areas" button', () => {
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
describe('App menu', () => {

  it('contains AOI buttons', () => {
    cy.visit('/')
    cy.contains('Draw AOI')
    cy.contains('Upload AOI')
  })

  it('can toggle basemap options', () => {
    cy.contains('Change Basemap').click()
    cy.contains('Light').click()
    cy.wait(500)
    cy.contains('Streets').click()
    cy.contains('Hide Basemaps').click()
    cy.wait(500)
  })
})

describe('Drawing AOI', () => {

  it('shows notification on draw start', () => {
    cy.contains('Draw AOI').click()
    cy.contains('Finish drawing')
  })

  it('can draw AOI polygon', () => {
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

  it('shows notification on draw finish', () => {
    cy.contains('AOI created')
  })

  it('shows area (m2) after finishing drawing', () => {
    cy.contains('Area')
  })
})

describe('AOI Stats', () => {

  it('calculates the area of the AOI right', () => {
    cy.contains('19 929 000')
  })

  it('shows calculate population stats button', () => {
    cy.contains('Calculate Population')
  })

  it('shows population stats', () => {
    cy.contains('Calculate Population').click()
    cy.contains('Population')
    cy.contains('Density')
    cy.contains('Urban Density')
  })

  it('calculates population stats right', () => {
    cy.contains('Population: 60 486')
    cy.contains('Density: 3 035 /km2')
    cy.contains('Urban Density: 6 011 /km2')
  })
})

describe('AOI management', () => {

  it('shows delete node option on node selected', () => {
    cy.get('.mapboxgl-canvas')
      .wait(400)
      .trigger('mousedown', 265, 360)
      .wait(400)
      .trigger('mouseup', 265, 360)
    cy.contains('Delete node')
  })

  it('can delete polygon by deleting all nodes', () => {
    cy.contains('Delete node').click()
    cy.get('.mapboxgl-canvas')
      .wait(400)
      .trigger('mousedown', 265, 460)
      .wait(400)
      .trigger('mouseup', 265, 460)
    cy.contains('Delete node').click()

    cy.contains('Draw AOI')
    cy.contains('Upload AOI')
  })

  it('can remove AOI with "Remove AOI" button', () => {
    drawAOI()
    cy.wait(400)
    cy.contains('Remove AOI').click()
    cy.contains('Draw AOI')
    cy.contains('Upload AOI')
  })
})

const drawAOI = () => {
  cy.contains('Draw AOI').click()
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
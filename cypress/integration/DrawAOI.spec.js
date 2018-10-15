describe('App loads', () => {

  it('Draw controls are visible', () => {
    cy.visit('/')
    cy.contains('Draw AOI')
    cy.contains('Upload AOI')
  })

})

describe('User can start drawing', () => {

  it('Notification is shown on draw start', () => {
    cy.contains('Draw AOI').click()
    cy.contains('Finish drawing')
  })

})
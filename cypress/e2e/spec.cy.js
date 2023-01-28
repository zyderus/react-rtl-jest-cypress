describe('Show Ninja', () => {
  it('display ninja', () => {
    cy.visit('http://localhost:3000/')
    cy.get('button').contains('Click me').click()
    cy.get('[data-test-id="ninja"]').should('contain', 'Ninja')
  })
})

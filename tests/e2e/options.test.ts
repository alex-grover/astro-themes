describe('<Themes /> options', () => {
  it("allows setting default theme if browser doesn't specify preference", () => {
    cy.visit('/options', {
      onBeforeLoad: (window) => {
        cy.stub(window, 'matchMedia').returns({
          matches: false,
          addEventListener: () => {},
        })
      },
    })

    cy.root()
      .should('have.attr', 'data-theme', 'dark')
      .and('have.css', 'color-scheme', 'dark')
  })
})

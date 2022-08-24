describe('<Themes />', () => {
  it('sets attribute and style on the html element', () => {
    cy.visit('/')

    cy.get('[data-test-id="button-dark"]').click()
    cy.root()
      .should('have.attr', 'data-theme', 'dark')
      .and('have.css', 'color-scheme', 'dark')

    cy.get('[data-test-id="button-light"]').click()
    cy.root()
      .should('have.attr', 'data-theme', 'light')
      .and('have.css', 'color-scheme', 'light')
  })

  it('respects browser preferences', () => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        const stub = cy.stub(win, 'matchMedia')

        stub.withArgs('(prefers-color-scheme: dark)').returns({
          matches: true,
        })

        stub.withArgs('(prefers-color-scheme: light)').returns({
          matches: false,
        })
      },
    })

    cy.root()
      .should('have.attr', 'data-theme', 'dark')
      .and('have.css', 'color-scheme', 'dark')
  })

  it('persists on refresh', () => {
    cy.visit('/')

    cy.get('[data-test-id="button-dark"]').click()
    cy.root()
      .should('have.attr', 'data-theme', 'dark')
      .and('have.css', 'color-scheme', 'dark')

    cy.reload()
    cy.root()
      .should('have.attr', 'data-theme', 'dark')
      .and('have.css', 'color-scheme', 'dark')
  })

  it('responds to changes from localStorage', () => {
    cy.visit('/')

    cy.root()
      .should('have.attr', 'data-theme', 'light')
      .and('have.css', 'color-scheme', 'light')

    cy.setLocalStorage('theme', 'dark')
    cy.root()
      .should('have.attr', 'data-theme', 'dark')
      .and('have.css', 'color-scheme', 'dark')
  })

  it('allows users to get theme', () => {
    cy.visit('/')

    cy.get('[data-test-id="button-dark"]').click()
    cy.window().then((window) => {
      expect(window.getTheme()).to.deep.equal({
        setting: 'dark',
        theme: 'dark',
      })
    })
  })
})

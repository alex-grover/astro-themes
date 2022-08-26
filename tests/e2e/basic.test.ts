describe('<Themes />', () => {
  // color scheme emulation doesn't reset automatically between tests
  afterEach(() => {
    cy.setPreferredColorScheme('light')
  })

  it('sets attribute and style on the html element', () => {
    cy.visit('/')

    cy.document()
      .then((document) => {
        document.dispatchEvent(new CustomEvent('set-theme', { detail: 'dark' }))
      })
      .then(() => {
        cy.root()
          .should('have.attr', 'data-theme', 'dark')
          .and('have.css', 'color-scheme', 'dark')

        return cy.document()
      })
      .then((document) => {
        document.dispatchEvent(
          new CustomEvent('set-theme', { detail: 'light' })
        )
      })
      .then(() => {
        cy.root()
          .should('have.attr', 'data-theme', 'light')
          .and('have.css', 'color-scheme', 'light')
      })
  })

  it('allows users to get theme', () => {
    cy.visit('/')

    cy.root().should('have.attr', 'data-theme', 'light')

    cy.document()
      .then((document) => {
        document.dispatchEvent(new CustomEvent('set-theme', { detail: 'dark' }))
      })
      .then(() => {
        cy.root().should('have.attr', 'data-theme', 'dark')
      })
  })

  it('persists on refresh', () => {
    cy.visit('/')
    cy.document()
      .then((document) => {
        document.dispatchEvent(new CustomEvent('set-theme', { detail: 'dark' }))
      })
      .then(() => {
        cy.root()
          .should('have.attr', 'data-theme', 'dark')
          .and('have.css', 'color-scheme', 'dark')

        cy.reload()

        cy.root()
          .should('have.attr', 'data-theme', 'dark')
          .and('have.css', 'color-scheme', 'dark')
      })
  })

  it('respects browser preferences', () => {
    cy.setPreferredColorScheme('dark')

    cy.visit('/')

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

  it('responds to changes in browser preference', () => {
    cy.setPreferredColorScheme('dark')
    cy.visit('/')
    cy.root()
      .should('have.attr', 'data-theme', 'dark')
      .and('have.css', 'color-scheme', 'dark')

    cy.setPreferredColorScheme('light')

    cy.root()
      .should('have.attr', 'data-theme', 'light')
      .and('have.css', 'color-scheme', 'light')
  })
})

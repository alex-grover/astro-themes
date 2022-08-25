describe('<Themes />', () => {
  // color scheme emulation doesn't reset automatically between tests
  afterEach(() => {
    cy.setPreferredColorScheme('light')
  })

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

  it('allows users to get theme', () => {
    cy.visit('/')

    cy.get('[data-test-id="button-dark"]').click()

    cy.window().then((window) => {
      expect(window.theme.get()).to.deep.equal({
        setting: 'dark',
        theme: 'dark',
      })
    })
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

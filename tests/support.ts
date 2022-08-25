import 'cypress-localstorage-commands'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to set preferred color scheme
       * @example cy.setPreferredColorScheme('dark')
       */
      setPreferredColorScheme(
        value: 'light' | 'dark' | null
      ): Chainable<Element>
    }
  }
}

Cypress.Commands.add('setPreferredColorScheme', (value) => {
  cy.wrap(
    Cypress.automation('remote:debugger:protocol', {
      command: 'Emulation.setEmulatedMedia',
      params: {
        media: 'page',
        features: [
          {
            name: 'prefers-color-scheme',
            value,
          },
        ],
      },
    })
  )
})

// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Custom command to highlight and click with animation
Cypress.Commands.add(
  "clickWithHighlight",
  { prevSubject: "element" },
  (subject, options = {}) => {
    cy.wrap(subject).then(($el) => {
      // Add highlight animation
      $el.css({
        outline: "3px solid #FFD700",
        "outline-offset": "2px",
        "background-color": "#FFF9C4",
        transition: "all 0.3s ease",
      });

      cy.wait(300);

      // Remove highlight
      $el.css({
        outline: "none",
        "background-color": "",
        transition: "all 0.2s ease",
      });

      cy.wait(200);
    });

    return cy.wrap(subject).click(options);
  }
);

// Declare custom command type
declare global {
  namespace Cypress {
    interface Chainable {
      clickWithHighlight(
        options?: Partial<Cypress.ClickOptions>
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export const connect = () => {
  cy.get('[data-cy="connect-btn"]').last().click({ multiple: true });
  cy.get('[data-testid="rk-wallet-option-io.metamask"]').click();
  cy.acceptMetamaskAccess();
  cy.get('[data-cy="wallet-button"]').should('have.text', '0xa42f...6487');
  cy.get('[data-cy="connect-btn"]').should('not.exist');
};

export const disconnect = () => {
  cy.get('[data-cy="wallet-button"]').click();
  cy.get('[data-testid="rk-disconnect-button"').click();
  cy.get('[data-cy="connect-btn"]').should('exist');
  cy.get('[data-cy="wallet-button"]').should('not.exist');
};

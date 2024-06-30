import { ssv } from '../selectors';
import { connect, disconnect } from '../utils';

describe('connect wallet spec', () => {
  before(() => {
    cy.visit('/');
  });
  it('connect', () => {
    connect();
  });
  it('disconnect', () => {
    disconnect();
  });
  it('should connect wallet with success', () => {
    connect();
    cy.get('[data-cy="wallet-button"]').should('have.text', '0xa42f...6487');
  });

  it('should change operator status', () => {
    cy.contains('Validator Clusters').click();
    cy.contains('Operators').click();
    cy.contains('Operator 473').click();
    cy.get(ssv.operatorSettingsBtn).click();
    cy.get('[data-cy="operator-permission-settings-option"]').click();
    cy.contains('Operator Status').click();
    cy.get('[data-cy="operator-status-switch-btn"]').click();

    let statusText = '';
    cy.get('[data-cy="operator-status-badge"]')
      .invoke('text')
      .then((text) => {
        statusText = text;
      });

    cy.confirmMetamaskTransactionAndWaitForMining().then(() => {
      cy.get('[data-cy="transaction-pending-modal"]').should('be.visible');
      cy.get('[data-cy="transaction-pending-modal"]', { timeout: 80000 }).should('not.exist');
      cy.get('[data-cy="operator-status-badge"]')
        .invoke('text')
        .then((newStatus) => {
          expect(newStatus).to.not.equal(statusText);
        });
    });
  });
});

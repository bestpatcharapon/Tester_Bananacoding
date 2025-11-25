/// <reference types="cypress" />

describe('Login Test', () => {
  // Visit the website before each test
  beforeEach(() => cy.visit('https://new-bananatesting.onbananacoding.com/'))

  it('TC_002: Success Login', () => {
    cy.get('[formcontrolname="email"]').should('be.visible').type('patcharapon@bananacoding.com')
    cy.get('[formcontrolname="password"]').should('be.visible').type('Oioip0123.')
    cy.contains('button', 'Sign in').click()
    cy.url().should('include', 'dashboard')
  })

  it('TC_003: Check Button 365', () => {
    cy.contains('Sign in with office 365').should('be.visible')
  })

  it('TC_004: Invalid Email', () => {
    cy.get('[formcontrolname="email"]').type('wrong@test.com')
    cy.get('[formcontrolname="password"]').type('AnyPass')
    cy.contains('button', 'Sign in').click()
    cy.contains('Incorrect email or password').should('be.visible')
  })

  it('TC_005: Invalid Password', () => {
    cy.get('[formcontrolname="email"]').type('patcharapon@bananacoding.com')
    cy.get('[formcontrolname="password"]').type('WrongPass')
    cy.contains('button', 'Sign in').click()
    cy.contains('Email or password is invalid').should('be.visible')
  })

  it('TC_006: Empty Fields', () => {
    cy.contains('button', 'Sign in').click()
    cy.contains('Email is required').should('be.visible')
    cy.contains('Password is required').should('be.visible')
  })

})
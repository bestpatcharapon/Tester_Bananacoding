/// <reference types="cypress" />

describe("Login Test", () => {
  beforeEach(() => {
    cy.visit("https://new-bananatesting.onbananacoding.com/");
    cy.wait(500);
  });

  it("TC_002: Success Login", () => {
    cy.get('[formcontrolname="email"]').type("patcharapon@bananacoding.com");
    cy.wait(300);
    cy.get('[formcontrolname="password"]').type("Oioip0123.");
    cy.wait(300);
    cy.contains("button", "Sign in").click();
    cy.wait(1000);
  });

  it("TC_003: Check Button 365", () => {
    cy.wait(500);
    cy.contains("Sign in with office 365").should("be.visible");
  });

  it("TC_004: Invalid Email", () => {
    cy.get('[formcontrolname="email"]').type("wrong@test.com");
    cy.wait(300);
    cy.get('[formcontrolname="password"]').type("AnyPass");
    cy.wait(300);
    cy.contains("button", "Sign in").click();
    cy.wait(500);
    cy.contains("Incorrect email or password").should("be.visible");
  });

  it("TC_005: Invalid Password", () => {
    cy.get('[formcontrolname="email"]').type("patcharapon@bananacoding.com");
    cy.wait(300);
    cy.get('[formcontrolname="password"]').type("WrongPass");
    cy.wait(300);
    cy.contains("button", "Sign in").click();
    cy.wait(500);
    cy.contains("Email or password is invalid").should("be.visible");
  });

  it("TC_006: Empty Fields", () => {
    cy.contains("button", "Sign in").click();
    cy.wait(500);
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });
});

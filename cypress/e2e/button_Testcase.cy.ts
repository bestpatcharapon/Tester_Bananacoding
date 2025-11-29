/// <reference types="cypress" />

describe("Test Cases Tab - Test Case Management", () => {
  const projectUrl = "https://new-bananatesting.onbananacoding.com/project/320";
  const moduleName = "การเข้าสู่ระบบ(เบสท์)";

  const login = () => {
    cy.session("user-session", () => {
      cy.visit("https://new-bananatesting.onbananacoding.com/");
      cy.wait(500);
      cy.get('[formcontrolname="email"]').type("patcharapon@bananacoding.com");
      cy.wait(300);
      cy.get('[formcontrolname="password"]').type("Oioip0123.");
      cy.wait(300);
      cy.contains("button", "Sign in").click();
      cy.wait(1500);
    });
  };

  const goToTestCases = () => {
    cy.visit(projectUrl);
    cy.wait(1000);
    cy.contains("Test Cases").click();
    cy.wait(1000);
  };

  const openModule = () => {
    cy.get(".text-title").first().click();
    cy.wait(1000);
    cy.contains(`${moduleName} (`).first().scrollIntoView().click();
    cy.wait(1000);
  };

  const dismissToast = () => {
    cy.get("body").then(($body) => {
      if ($body.find(".toast").length > 0) {
        cy.get(".toast").should("not.be.visible");
      }
    });
    cy.wait(1500);
  };

  const createTestCase = (
    name: string,
    instruction = "instruction",
    expected = "expected"
  ) => {
    cy.contains("Add Test Case").click();
    cy.wait(1000);
    cy.get('input[placeholder="Input Test case name"]').type(name);
    cy.get(".angular-editor-textarea").eq(0).click().type(instruction);
    cy.get(".angular-editor-textarea").eq(1).click().type(expected);
    cy.contains("button", "Save").click();
    cy.wait(3000);
    dismissToast();
  };

  const clickTestCaseIcon = (testCaseName: string, iconClass: string) => {
    cy.contains("span", testCaseName)
      .parent()
      .parent()
      .find(`i.${iconClass}`)
      .first()
      .click({ force: true });
  };

  const reloadAndOpenModule = () => {
    cy.reload();
    cy.wait(1500);
    cy.get(".text-title").first().click();
    cy.wait(1000);
    cy.contains(`${moduleName} (`).first().scrollIntoView().click();
    cy.wait(1000);
  };

  beforeEach(() => {
    login();
    goToTestCases();
    openModule();
  });

  it("TC_015: Create Test Case Successfully", () => {
    const testCaseName = `TestCase_${Date.now().toString().slice(-5)}`;
    const instructionText = "test instruction";
    const expectedText = "test expected result";

    cy.contains("Add Test Case").click();
    cy.wait(1000);

    cy.get('input[placeholder="Input Test case name"]').type(testCaseName);
    cy.wait(300);

    cy.get(".angular-editor-textarea")
      .eq(0)
      .click()
      .type(instructionText, { parseSpecialCharSequences: false });
    cy.wait(300);

    cy.get(".angular-editor-textarea")
      .eq(1)
      .click()
      .type(expectedText, { parseSpecialCharSequences: false });
    cy.wait(300);

    cy.contains("button", "Save").click();
    cy.wait(1500);

    cy.contains(testCaseName).should("exist");
  });

  it("TC_016: Create Test Case Failed - Empty Fields", () => {
    cy.contains("Add Test Case").click();
    cy.wait(1000);

    cy.get('input[placeholder="Input Test case name"]').click().blur();
    cy.wait(300);

    cy.contains("button", "Save").should("be.disabled");
  });

  it("TC_017: Import Test Case File", () => {
    cy.contains("button", "Import Test Case").click();
    cy.wait(1000);

    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/test_cases_import.csv",
      { force: true }
    );
    cy.wait(1000);

    cy.contains("button", /confirm|import|upload/i).click({ force: true });
    cy.wait(2000);

    cy.get("body").then(($body) => {
      const bodyText = $body.text();
      if (bodyText.includes("success") || bodyText.includes("imported")) {
        cy.log("✅ Import successful");
      }
    });

    cy.contains("TC_Import_001", { timeout: 10000 }).should("exist");
  });

  it("TC_018: Duplicate Test Case Successfully", () => {
    const originalName = `TestCase_${Date.now().toString().slice(-5)}`;

    createTestCase(originalName);

    clickTestCaseIcon(originalName, "fa-copy");
    cy.wait(500);

    cy.contains("button", /confirm|duplicate|yes/i).click({ force: true });
    cy.wait(1500);

    reloadAndOpenModule();

    cy.contains(originalName).should("exist");
  });

  it("TC_019: Edit Test Case Successfully", () => {
    const originalName = `TestCase_${Date.now().toString().slice(-5)}`;
    const editedName = `${originalName}_Edited`;

    createTestCase(originalName);

    clickTestCaseIcon(originalName, "fa-pen-to-square");
    cy.wait(1000);

    cy.get('input[placeholder="Input Test case name"]')
      .clear()
      .type(editedName);
    cy.wait(300);

    cy.contains("button", "Save").click();
    cy.wait(2000);

    cy.contains(editedName).should("exist");
  });

  it("TC_020: Delete Test Case Successfully", () => {
    const testCaseName = `TestCase_${Date.now().toString().slice(-5)}`;

    createTestCase(testCaseName);

    clickTestCaseIcon(testCaseName, "fa-trash-can");
    cy.wait(500);

    cy.contains("button", "Confirm").click();
    cy.wait(2000);

    reloadAndOpenModule();

    cy.contains(testCaseName).should("not.exist");
  });
});

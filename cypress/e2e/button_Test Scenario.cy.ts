/// <reference types="cypress" />

describe("Test Cases Tab - Scenario Management", () => {
  const projectUrl = "https://new-bananatesting.onbananacoding.com/project/320";
  const baseModuleName = "การเข้าสู่ระบบ(เบสท์)";

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

  const openScenarioModalForModule = () => {
    cy.contains(".accordion-item", baseModuleName)
      .scrollIntoView()
      .should("be.visible")
      .within(() => {
        cy.get(".fa-square-plus, .fa-plus, [class*='plus']")
          .first()
          .click({ force: true });
      });

    cy.wait(500);
    cy.get(".modal").should("be.visible");
  };

  const fillScenarioName = (name: string) => {
    cy.get(
      'input[formcontrolname="scenarioName"], input[formcontrolname="name"]'
    )
      .first()
      .clear()
      .type(name);
    cy.wait(300);
  };

  const saveScenario = () => {
    cy.get("button")
      .contains(/save|add|create|update/i)
      .click({ force: true });
    cy.wait(1500);
  };

  const getScenarioItem = (name: string) =>
    cy.contains("li.list-group-item", name).should("exist");

  beforeEach(() => {
    login();
    goToTestCases();
  });

  it("TC_011: Create Test Scenario Successfully", () => {
    const scenarioName = `Scenario_${Date.now().toString().slice(-5)}`;

    cy.intercept("POST", "**/test_scenario").as("createScenario");

    openScenarioModalForModule();
    fillScenarioName(scenarioName);
    saveScenario();

    cy.wait("@createScenario").its("response.statusCode").should("eq", 200);

    getScenarioItem(scenarioName);
  });

  it("TC_012: Create Test Scenario Failed - Empty Name", () => {
    cy.intercept("POST", "**/test_scenario").as("createScenario");

    openScenarioModalForModule();

    cy.get(
      'input[formcontrolname="scenarioName"], input[formcontrolname="name"]'
    )
      .first()
      .focus()
      .blur();
    cy.wait(300);

    saveScenario();

    cy.wait("@createScenario").its("response.statusCode").should("be.oneOf", [
      400,
      404,
    ]);
  });

  it("TC_013: Edit Test Scenario Successfully", () => {
    const scenarioName = `Scenario_${Date.now().toString().slice(-5)}`;
    const editedName = `${scenarioName}_Edited`;

    cy.intercept("POST", "**/test_scenario").as("createScenario");
    cy.intercept("PATCH", "**/test_scenario/*").as("updateScenario");

    openScenarioModalForModule();
    fillScenarioName(scenarioName);
    saveScenario();

    cy.wait("@createScenario").its("response.statusCode").should("eq", 200);

    getScenarioItem(scenarioName).within(() => {
      cy.get(".fa-ellipsis-vertical").first().click({ force: true });
    });

    cy.wait(500);
    cy.get(".dropdown-menu.show .dropdown-item")
      .contains(/edit/i)
      .click({ force: true });

    cy.wait(500);
    cy.get(".modal").should("be.visible");
    fillScenarioName(editedName);
    saveScenario();

    cy.wait("@updateScenario").its("response.statusCode").should("eq", 200);

    getScenarioItem(editedName);

    cy.get("li.list-group-item").each(($li) => {
      const text = $li.text().trim();
      expect(text).not.to.eq(scenarioName);
    });
  });

  it("TC_014: Delete Test Scenario Successfully", () => {
    const scenarioName = `ScenarioDel_${Date.now().toString().slice(-5)}`;

    cy.intercept("POST", "**/test_scenario").as("createScenario");
    cy.intercept("DELETE", "**/test_scenario/*").as("deleteScenario");

    openScenarioModalForModule();
    fillScenarioName(scenarioName);
    saveScenario();

    cy.wait("@createScenario").its("response.statusCode").should("eq", 200);

    getScenarioItem(scenarioName).within(() => {
      cy.get(".fa-ellipsis-vertical").first().click({ force: true });
    });

    cy.wait(500);
    cy.get(".dropdown-menu.show .dropdown-item")
      .contains(/delete/i)
      .click({ force: true });

    cy.wait(500);
    cy.get("ngb-modal-window")
      .should("be.visible")
      .within(() => {
        cy.contains("button", /confirm|delete|yes|ตกลง/i).click({
          force: true,
        });
      });

    cy.wait("@deleteScenario").its("response.statusCode").should("eq", 200);

    cy.contains("li.list-group-item", scenarioName, { timeout: 8000 }).should(
      "not.exist"
    );
  });
});
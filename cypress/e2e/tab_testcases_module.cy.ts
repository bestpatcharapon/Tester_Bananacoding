describe("Test Cases Tab - Module Management", () => {
  let moduleName: string;
  const projectUrl = "https://new-bananatesting.onbananacoding.com/project/320";

  const login = () => {
    cy.session("user-session", () => {
      cy.visit("https://new-bananatesting.onbananacoding.com/");
      cy.wait(1000);
      cy.get('[formcontrolname="email"]').type("patcharapon@bananacoding.com");
      cy.get('[formcontrolname="password"]').type("Oioip0123.");
      cy.get("button").contains("Sign in").click();
      cy.wait(3000);
    });
  };

  const createModule = (name: string) => {
    cy.contains("Test Modules").should("be.visible");
    cy.get(".fa-square-plus, .fa-plus, [class*='plus']").first().click({ force: true });
    cy.get('input[formcontrolname="moduleName"]').type(name);
    cy.get("button").contains("Save").click();
    cy.wait(2000);
  };

  beforeEach(() => {
    moduleName = `TestModule${Date.now().toString().slice(-5)}`;
    login();
    cy.visit(projectUrl);
    cy.contains("Test Cases").click();
    cy.wait(2000);
  });

  it("TC_007: Create Module Successfully", () => {
    createModule(moduleName);
    cy.contains(".accordion-item", moduleName)
      .scrollIntoView()
      .should("be.visible");
  });

  it("TC_008: Create Module Failed - Empty Name", () => {
    cy.contains("Test Modules");
    cy.get(".fa-square-plus, .fa-plus, [class*='plus']").first().click({ force: true });
    cy.get('input[formcontrolname="moduleName"]').click().blur();
    cy.get('input[formcontrolname="moduleName"]').should("have.class", "ng-invalid");
    cy.get("button").contains("Save").click();
    cy.get(".toast-error", { timeout: 5000 }).should("be.visible");
  });

  it("TC_009: Edit Module Successfully", () => {
    const uniqueName = `TestMod_${Date.now().toString().slice(-5)}`;
    createModule(uniqueName);

    cy.contains(".accordion-item", uniqueName)
      .scrollIntoView()
      .within(() => cy.get(".fa-ellipsis-vertical").click({ force: true }));

    cy.get(".dropdown-menu.show .dropdown-item").contains("Edit").click({ force: true });
    cy.get(".modal").should("be.visible");

    const editedName = `${uniqueName}_Edited`;

    cy.get('input[formcontrolname="moduleName"]').clear().type(editedName);
    cy.get("button").contains(/save|update|confirm/i).click({ force: true });

    cy.contains(".accordion-item", editedName)
      .scrollIntoView()
      .should("be.visible");
  });

  it("TC_010: Delete Module Successfully", () => {
    const uniqueName = `DelTest_${Date.now().toString().slice(-5)}`;
    createModule(uniqueName);

    cy.contains(".accordion-item", uniqueName)
      .scrollIntoView()
      .within(() => cy.get(".fa-ellipsis-vertical").click({ force: true }));

    cy.get(".dropdown-menu.show .dropdown-item").contains("Delete").click({ force: true });

    cy.get("ngb-modal-window")
      .should("be.visible")
      .within(() => cy.contains("button", /confirm/i).click({ force: true }));

    cy.contains(".accordion-item", uniqueName, { timeout: 10000 }).should("not.exist");
  });
});

/// <reference types="cypress" />

/* describe("todo app", () => {
  it("should exist", () => {
    // cy.visit('http://localhost:57237');
    // cy.visit('http://localhost:58532');
    cy.visit('');
  });
}); */

describe("todo-app", () => {
  beforeEach(() => {
    // cy.visit("/");
    cy.visit("http://localhost:3000");
  });

  it("Create a new todo task", () => {
    const newTodo = "A new Task lies ahead...";

    cy.get("[data-cy=todo-list]").children().should("have.length", 0);
    cy.get("[data-cy=new-todo-text]").type(`${newTodo}`);
    cy.get("[data-cy=add-todo]").click();
    cy.get("[data-cy=todo-list]")
      .children()
      .should("have.length", 1)
      .should("have.text", `${newTodo}`);
  });

  it("Use filter radio buttons", () => {
    cy.get("[data-cy=todo-list] li").should("have.length", 0);
    // Create new todo tasks
    cy.get("[data-cy=new-todo-text]").type("Learn HTML");
    cy.get("[data-cy=add-todo]").click();
    cy.get("[data-cy=new-todo-text]").type("Learn CSS");
    cy.get("[data-cy=add-todo]").click();
    cy.get("[data-cy=new-todo-text]").type("Learn JS");
    cy.get("[data-cy=add-todo]").click();
    cy.get("[data-cy=todo-list").children().should("have.length", 3);

    cy.contains("Learn HTML").find("input[type=checkbox]").check();

    cy.contains("Learn JS").find("input[type=checkbox]").check();

    cy.get("#filter-done").click();
    cy.get("[data-cy=todo-list] li.done")
      .should("have.length", 2)
      .first()
      .should("have.text", "Learn HTML");

    cy.get("#filter-open").click();
    cy.contains("Learn CSS").should("be.visible");
    cy.get("[data-cy=todo-list] li.done").should("be.hidden");

    cy.get("#filter-all").click();
    cy.get("[data-cy=todo-list] li").should("be.visible");
  });

  it("Delete checked todo task", () => {
    const newTodo = "A new Task lies ahead...";

    cy.get("[data-cy=todo-list]").children().should("have.length", 0);
    cy.get("[data-cy=new-todo-text]").type(`${newTodo}`);
    cy.get("[data-cy=add-todo]").click();
    cy.get("[data-cy=todo-list]")
      .children()
      .should("have.length", 1)
      .should("have.text", `${newTodo}`);
    cy.get("#delete-todos").click();

    cy.get("[data-cy=todo-list]").children().should("have.length", 1);

    cy.contains(newTodo)
      .should("be.visible")
      .find("input[type=checkbox]")
      .check()
      .should("be.checked")
      .should("be.visible");

    cy.get("#delete-todos").click();
    cy.get("[data-cy=todo-list]").children().should("have.length", 0);
  });

  it("Check if todo Duplicates are possible", () => {
    const duplicateText = "Learn Cypress";
    cy.get("[data-cy=new-todo-text]").type(duplicateText);
    cy.get("[data-cy=add-todo]").click();
    cy.get("[data-cy=new-todo-text]").type(duplicateText);
    cy.get("[data-cy=add-todo]").click();
    cy.get("[data-cy=todo-list").should("have.length", 1);
    cy.get("[data-cy=new-todo-text]").should("have.value", duplicateText);
  });
});

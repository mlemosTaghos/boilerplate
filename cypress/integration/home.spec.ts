const getTaskTitleInput = () => cy.get('[data-testid="task-title-input"]');
const getAddTaskButton = () => cy.get('[data-testid="add-task-button"]');
const getTitleMsgError = () => cy.get('[data-testid="title-msg-error"]');
const getModalActionTask = () => cy.get('[data-testid="modal-msg-action-task"]');
const getButtonCheckedTask = () => cy.get('[data-testid="button-checked-task"]');
const getTextTitleTask = () => cy.get('[data-testid="text-title-task"]');
const getButtonRemoveTask = () => cy.get('[data-testid="button-remove-task"]');

it('should appear title error message when title input is empty', () => {
    cy.visit('/');
    getTaskTitleInput().click();
    getAddTaskButton().click();
    getTitleMsgError().should('be.visible');
})

it('Should throw an error when the input is less than five characters', () => {
    cy.visit('/');
    getTaskTitleInput().type('1234');
    getAddTaskButton().click();
    getTitleMsgError().should('be.visible');
})

it('Should generate an error when the input has more than ten characters', () => {
    cy.visit('/');
    getTaskTitleInput().type('12345678901234567890123231231');
    getAddTaskButton().click();
    getTitleMsgError().should('be.visible');
})

it('Should check if the task has added', () => {
    cy.visit('/');
    getTaskTitleInput().type('Segunda');
    getAddTaskButton().click();
    getModalActionTask().should('be.visible');
})

it('Should cross off task when completed', () => {
    cy.visit('/');
    getButtonCheckedTask().click();
    getTextTitleTask().should('have.css', 'text-decoration-line', 'line-through');
})

it('Should check if the task has been removed', () => {
    cy.visit('/');
    getButtonRemoveTask().click();
    getModalActionTask().should('be.visible');
})


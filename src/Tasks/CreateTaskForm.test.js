import React from "react";
import { shallow } from "enzyme";
import CreateTaskForm from "./CreateTaskForm";
import { expect } from "chai";
import "../setupTests";

describe("CreateTaskForm", () => {
  let createTaskForm;
  const onCreate = jest.fn();
  const projects = [];
  const projectColors = Object.create(null);

  beforeAll(() => {
    createTaskForm = shallow(
      <CreateTaskForm
        onCreate={onCreate}
        projects={projects}
        projectColors={projectColors}
      />
    );
  });

  it("doesn't allow to submit when taskName or projectName is empty", () => {
    expect(createTaskForm.find('input[type="submit"]').prop("disabled")).to.be
      .true;

    createTaskForm
      .find("#task-name")
      .simulate("change", { target: { value: "New Task" } });
    createTaskForm.update();

    expect(createTaskForm.find('input[type="submit"]').prop("disabled")).to.be
      .true;
  });

  it("allows form submit when both taskName and projectName are set", () => {
    // Taskname was set in the previous test
    createTaskForm
      .find("#new-project-name")
      .simulate("change", { target: { value: "New Project" } });
    createTaskForm.update();

    expect(createTaskForm.find('input[type="submit"]').prop("disabled")).to.be
      .false;
  });

  it("only prompts to create a new project when there's no project selected", () => {
    projects.push("Existing project");

    createTaskForm = shallow(
      <CreateTaskForm
        onCreate={onCreate}
        projects={projects}
        projectColors={projectColors}
      />
    );

    expect(
      createTaskForm.find('option[value="Existing project"]')
    ).to.have.lengthOf(1);
    expect(createTaskForm.find("select").prop("value")).to.be.equal(
      "Existing project"
    );
    expect(createTaskForm.find("#new-project-name")).to.have.lengthOf(0);
  });

  it("allows form submit when taskName is defined and there's a project selected", () => {
    // We already asserted there's a project selected.
    createTaskForm
      .find("#task-name")
      .simulate("change", { target: { value: "New Task" } });
    createTaskForm.update();
    expect(createTaskForm.find('input[type="submit"]').prop("disabled")).to.be
      .false;
  });

  it("makes a successfull request, which then calls onCreate, on submit", async () => {
    // Note: we're assuming the request will succeed in less than 300 ms,
    // which is true if we use the mockAdapter.
    createTaskForm
      .find("form")
      .simulate("submit", { preventDefault: jest.fn() });

    await new Promise(succ => setTimeout(succ, 300));

    expect(onCreate.mock.calls).to.have.lengthOf(1);
  });
});

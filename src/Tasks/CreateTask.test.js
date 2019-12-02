import React from "react";
import { shallow } from "enzyme";
import CreateTask from "./CreateTask";
import CreateTaskForm from "./CreateTaskForm";
import { expect } from "chai";
import "../setupTests";

describe("CreateTask", () => {
  let createTask;

  beforeAll(() => {
    createTask = shallow(
      <CreateTask projects={[]} projectColors={{}} updateTasks={jest.fn()} />
    );
  });

  it("shows a new task button", () => {
    expect(createTask.find("button.new-task")).to.have.lengthOf(1);
  });

  it("shows a create task form on click", () => {
    createTask.find("button.new-task").simulate("click");
    createTask.update();
    expect(createTask.find(CreateTaskForm)).to.have.lengthOf(1);
  });

  it("shows a cancel button", () => {
    expect(createTask.find("button.cancel")).to.have.lengthOf(1);
  });
  it("cancels creation of new task", () => {
    createTask.find("button.cancel").simulate("click");
    createTask.update();
    expect(createTask.find("button.new-task")).to.have.lengthOf(1);
    expect(createTask.find(CreateTaskForm)).to.have.lengthOf(0);
  });
});

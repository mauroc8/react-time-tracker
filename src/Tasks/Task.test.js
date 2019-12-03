import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import "../setupTests";
import Task from "./Task";
import ShowTask from "./ShowTask";
import EditTask from "./EditTask";

describe("Task", () => {
  let taskWrapper;
  let task = {
    name: "Task Name",
    project: "Task Project",
    color: "#ff0000",
    last_modified: Date.now(),
    seconds: 120
  };
  let updateTasks = jest.fn();

  beforeAll(() => {
    taskWrapper = mount(<Task task={task} updateTasks={updateTasks} />);
  });

  it("should show the task", () => {
    taskWrapper.update();
    expect(taskWrapper.find(ShowTask)).to.have.lengthOf(1);
  });

  it("should toggle from ShowTask to EditTask", () => {
    expect(taskWrapper.find("button.edit")).to.have.lengthOf(1);
    taskWrapper.find("button.edit").simulate("click");
    taskWrapper.update();
    expect(taskWrapper.find(EditTask)).to.have.lengthOf(1);

    expect(taskWrapper.find("button.cancel")).to.have.lengthOf(1);
    taskWrapper.find("button.cancel").simulate("click");
    taskWrapper.update();
    expect(taskWrapper.find(ShowTask)).to.have.lengthOf(1);
  });
});

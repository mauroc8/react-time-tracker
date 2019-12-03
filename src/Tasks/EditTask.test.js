import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import "../setupTests";
import EditTask from "./EditTask";
import axios from "axios";
import API_URL from "../API_URL";

describe("Edit Task", () => {
  let editTaskWrapper;
  let task = {
    name: "Task Name",
    project: "Task Project",
    color: "#ff0000",
    seconds: Math.floor(Math.random() * 24 * 60 * 60),
    timestamp: Date.now()
  };
  let cancelEdition = jest.fn();
  let updateTasks = jest.fn();

  let taskNameInput;
  let taskHoursInput;
  let taskMinutesInput;

  beforeAll(async () => {
    await axios.post(`${API_URL}/tasks/`, task);

    editTaskWrapper = mount(
      <EditTask
        task={task}
        cancelEdition={cancelEdition}
        updateTasks={updateTasks}
      />
    );

    taskNameInput = editTaskWrapper.find('input[type="text"]');
    taskHoursInput = editTaskWrapper.find('input[type="number"]').at(0);
    taskMinutesInput = editTaskWrapper.find('input[type="number"]').at(1);
  });

  it("shows the task as default values", () => {
    expect(taskNameInput.prop("value")).to.be.equal(task.name);
    expect(taskHoursInput.prop("value")).to.be.equal(
      Math.floor(task.seconds / 60 / 60)
    );
    expect(taskMinutesInput.prop("value")).to.be.equal(
      Math.floor(task.seconds / 60) % 60
    );
  });

  it("disables confirm button if task name is empty", () => {
    taskNameInput.simulate("change", { target: { value: "" } });
    editTaskWrapper.update();
    expect(
      editTaskWrapper
        .find("button.confirm")
        .at(0)
        .prop("disabled")
    ).to.be.true;
    taskNameInput.simulate("change", { target: { value: task.name } });
    editTaskWrapper.update();
    expect(
      editTaskWrapper
        .find("button.confirm")
        .at(0)
        .prop("disabled")
    ).to.be.false;
  });

  let newHour;
  let newMinutes;

  it("calls cancelEdition and updateTasks on confirm", async () => {
    newHour = Math.floor(Math.random() * 24);
    newMinutes = Math.floor(Math.random() * 60);

    taskNameInput.simulate("change", { target: { value: "New Task Name" } });
    taskHoursInput.simulate("change", { target: { value: newHour } });
    taskMinutesInput.simulate("change", { target: { value: newMinutes } });

    editTaskWrapper.update();

    editTaskWrapper
      .find("button.confirm")
      .at(0)
      .simulate("click");

    await new Promise(succ => setTimeout(succ, 300));

    expect(cancelEdition.mock.calls).to.have.lengthOf(1);
    expect(updateTasks.mock.calls).to.have.lengthOf(1);
  });

  it("changed task values", async () => {
    const response = await axios.get(`${API_URL}/tasks/`);
    const tasks = response.data;
    const editedTask = tasks.find(
      otherTask =>
        otherTask.name === "New Task Name" && otherTask.project === task.project
    );

    expect(editedTask).to.exist;
    expect(editedTask.seconds).to.be.equal(newHour * 60 * 60 + newMinutes * 60);
  });
});

describe("Delete task", () => {
  let editTaskWrapper;
  let lastModified = Date.now();
  let task = {
    name: "Task Name",
    project: "Task Project",
    color: "#ff0000",
    seconds: Math.floor(Math.random() * 24 * 60 * 60),
    timestamp: lastModified
  };
  let cancelEdition = jest.fn();
  let updateTasks = jest.fn();
  let deleteButton;

  beforeAll(async () => {
    await axios.post(`${API_URL}/tasks/`, task);

    editTaskWrapper = mount(
      <EditTask
        task={task}
        cancelEdition={cancelEdition}
        updateTasks={updateTasks}
      />
    );

    deleteButton = editTaskWrapper.find("button.delete");
  });

  it("requests confirmation on delete", async () => {
    deleteButton.simulate("click");
    editTaskWrapper.update();

    await new Promise(succ => setTimeout(succ, 300));

    expect(updateTasks.mock.calls).to.have.lengthOf(0);
    expect(cancelEdition.mock.calls).to.have.lengthOf(0);
  });

  it("deletes task after a second click", async () => {
    deleteButton.simulate("click");
    editTaskWrapper.update();

    await new Promise(succ => setTimeout(succ, 300));

    expect(updateTasks.mock.calls).to.have.lengthOf(1);
    expect(cancelEdition.mock.calls).to.have.lengthOf(1);

    const response = await axios.get(`${API_URL}/tasks/`);
    const tasks = response.data;

    expect(
      tasks.find(
        otherTask =>
          otherTask.name === task.name && otherTask.project === task.project
      )
    ).to.be.undefined;
  });
});

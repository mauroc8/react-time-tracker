import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAPI = "https://mock.adapter.com";
const mockAdapter = new MockAdapter(axios, { delayResponse: 180 });

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const isTaskEqualTo = taskA => taskB =>
  taskA.name === taskB.name && taskA.project === taskB.project;

let tasks = getTasks();

mockAdapter.onGet(`${mockAPI}/tasks/`).reply(config => {
  return [200, tasks.slice()];
});

mockAdapter.onPost(`${mockAPI}/tasks/`).reply(config => {
  const newTask = JSON.parse(config.data);

  if (tasks.some(isTaskEqualTo(newTask))) {
    return [403, {}];
  }

  tasks.push(newTask);
  saveTasks(tasks);
  return [200, {}];
});

mockAdapter.onPatch(`${mockAPI}/tasks/`).reply(config => {
  const { old_task, new_task } = JSON.parse(config.data);

  const task = tasks.find(isTaskEqualTo(old_task));

  if (task === undefined) {
    return [403, {}];
  }

  Object.assign(task, new_task);
  saveTasks(tasks);
});

mockAdapter.onDelete(`${mockAPI}/tasks/`).reply(config => {
  const task = JSON.parse(config.data);

  if (!tasks.some(isTaskEqualTo(task))) {
    return [403, {}];
  }

  tasks = tasks.filter(otherTask => !isTaskEqualTo(task)(otherTask));
  saveTasks(tasks);
});

export { mockAPI };

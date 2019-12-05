import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { isTaskEqualTo } from "./hooks";

const mockAPI = "https://mock.adapter.com";
const mockAdapter = new MockAdapter(axios, { delayResponse: 180 });

function getTasks() {
  if (localStorage.getItem("tasks")) {
    return JSON.parse(localStorage.getItem("tasks"));
  } else {
    // Try to recover data from cookies
    return getTasksFromCookies() || [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  setTasksInCookies(tasks);
}

function getTasksFromCookies() {
  const cookie = document.cookie;
  const match = cookie.match(/tasks=([^;]+)/);
  const json = match && unescape(match[1]);
  return json && JSON.parse(json);
}

function setTasksInCookies(tasks) {
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 6);
  document.cookie = `tasks=${escape(
    JSON.stringify(tasks)
  )};expires=${expirationDate.toGMTString()}`;
}

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

  if (
    !isTaskEqualTo(old_task)(new_task) &&
    tasks.some(isTaskEqualTo(new_task))
  ) {
    // Trying to change task name, but it already exists a task with the new name.
    return [405, {}];
  }

  if (task === undefined) {
    return [403, {}];
  }

  Object.assign(task, new_task);
  saveTasks(tasks);
  return [200, {}];
});

mockAdapter.onPost(`${mockAPI}/delete-task/`).reply(config => {
  const task = JSON.parse(config.data);

  if (!tasks.some(isTaskEqualTo(task))) {
    return [403, {}];
  }

  tasks = tasks.filter(otherTask => !isTaskEqualTo(task)(otherTask));
  saveTasks(tasks);
  return [200, {}];
});

mockAdapter.onPost(`${mockAPI}/import-tasks/`).reply(config => {
  const newTasks = JSON.parse(config.data);

  tasks = tasks
    .filter(task => !newTasks.some(isTaskEqualTo(task)))
    .concat(newTasks);

  saveTasks(tasks);
  return [200, {}];
});

export { mockAPI };

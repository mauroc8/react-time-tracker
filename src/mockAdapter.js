import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAPI = "https://api.time-tracker.net";

const mockAdapter = new MockAdapter(axios, { delayResponse: 180 });

// Get projects

const mockedProjects = localStorage.getItem("mockedProjects")
  ? JSON.parse(localStorage.getItem("mockedProjects"))
  : [];

function saveMockedProjects() {
  localStorage.setItem("mockedProjects", JSON.stringify(mockedProjects));
}

mockAdapter
  .onGet(`${mockAPI}/projects/`)
  .reply(config => [200, mockedProjects]);

// Create project

mockAdapter.onPost(`${mockAPI}/projects/`).reply(config => {
  const data = JSON.parse(config.data);
  const name = data.name;

  if (mockedProjects.some(project => project.name === name)) {
    return [403, { message: `The project ${name} already exists` }];
  }

  mockedProjects.push(data);
  saveMockedProjects();

  return [200, {}];
});

// Get project

const mockedTasks = localStorage.getItem("mockedTasks")
  ? JSON.parse(localStorage.getItem("mockedTasks"))
  : [];

function saveMockedTasks() {
  localStorage.setItem("mockedTasks", JSON.stringify(mockedTasks));
}

// https://stackoverflow.com/a/9310752
function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

const projectRegExp = new RegExp(
  escapeRegExp(mockAPI) + "\\/project\\/[\\w-]+\\/$"
);

mockAdapter.onGet(projectRegExp).reply(config => {
  const name = config.url.match(/\/([\w-]+)\/$/)[1];

  const project = mockedProjects.find(project => project.name === name);
  const tasks = mockedTasks.filter(task => task.project === name);

  if (!project) {
    return [403, { message: `The project ${name} doesn't exist` }];
  }

  return [200, { ...project, tasks }];
});

mockAdapter.onPost(projectRegExp).reply(config => {
  const projectName = config.url.match(/\/([\w-]+)\/$/)[1];
  const data = JSON.parse(config.data);

  if (
    mockedTasks.find(
      task => task.project === projectName && task.name === data.name
    )
  ) {
    return [
      403,
      { message: `The task ${data.name} already exists in this project` }
    ];
  }

  mockedTasks.push({
    project: projectName,
    ...data
  });
  saveMockedTasks();

  return [200, {}];
});

export { mockAPI, mockAdapter };

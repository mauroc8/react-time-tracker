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

export { mockAPI, mockAdapter };

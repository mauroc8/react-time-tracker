import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAPI = "https://api.time-tracker.net";

const mockAdapter = new MockAdapter(axios, { delayResponse: 180 });
const mockedData = {};

// Get projects

mockedData.projects = [{ name: "Kastark" }, { name: "Time-tracker" }];

mockAdapter
  .onGet(`${mockAPI}/projects/`)
  .reply(config => [200, mockedData.projects]);

export { mockAPI, mockAdapter, mockedData };

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAPI = "https://api.time-tracker.net";
const usesRealAPI = Boolean(process.env.REACT_APP_API);
const API = usesRealAPI
  ? process.env.REACT_APP_API.replace(/\/^/, "")
  : mockAPI;

const mockAdapter = new MockAdapter(axios, { delayResponse: 100 });

console.log(process.env);

export { usesRealAPI, mockAPI, mockAdapter };
export default API;

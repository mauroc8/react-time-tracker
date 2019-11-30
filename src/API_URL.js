import { mockAPI } from "./mockAdapter";

const usesRealAPI = Boolean(process.env.REACT_APP_API);
const API_URL = usesRealAPI
  ? process.env.REACT_APP_API.replace(/\/^/, "")
  : mockAPI;

// If there's no real API, all requests will be sent to the mockAPI url.
// Then the mockAdapter will take care of them.

export default API_URL;

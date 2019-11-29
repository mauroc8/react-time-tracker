import { mockAPI } from "./mockAdapter";

const usesRealAPI = Boolean(process.env.REACT_APP_API);
const API = usesRealAPI
  ? process.env.REACT_APP_API.replace(/\/^/, "")
  : mockAPI;

const errorHandler = actionName => error => {
  console.log(`Error trying to ${actionName}.`, error);
};

export { errorHandler, usesRealAPI };
export default API;

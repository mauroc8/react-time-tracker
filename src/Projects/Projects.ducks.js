import axios from "axios";
import API, { errorHandler } from "../API";

const initialState = {
  current: null,
  all: null
};

const UPDATE_PROJECTS = "UPDATE_PROJECTS";
const SELECT_PROJECT = "SELECT_PROJECT";

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PROJECTS:
      return {
        ...state,
        all: payload
      };
    case SELECT_PROJECT:
      return {
        ...state,
        current: payload.name
      };
    default:
      return state;
  }
};

const updateProjects = payload => dispatch => {
  axios
    .get(`${API}/projects/`)
    .then(resp => {
      dispatch({
        type: UPDATE_PROJECTS,
        payload: resp.data
      });
    })
    .catch(errorHandler("update project list"));
};

const selectProject = payload => ({
  type: SELECT_PROJECT,
  payload
});

export default reducer;
export { updateProjects, selectProject };

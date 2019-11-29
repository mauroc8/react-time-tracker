import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import projectsReducer from "./Projects/Projects.ducks.js";
import tasksReducer from "./Tasks/Tasks.ducks.js";

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

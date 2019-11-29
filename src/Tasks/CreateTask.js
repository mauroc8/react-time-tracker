import React, { useState } from "react";
import { formatProjectName } from "../Projects/CreateProject";
import { useWillUnmount } from "../hooks";
import axios from "axios";
import API, { errorHandler } from "../API";
import { Redirect } from "react-router-dom";

const formatTaskName = formatProjectName;

// Transitions
const NONE = 0;
const LOADING = 1;
const REDIRECTING = 2;

function CreateTask(params) {
  const projectName = params.match.params.name;
  const [taskName, setTaskName] = useState("");
  const [transition, setTransition] = useState(NONE);
  const willUnmount = useWillUnmount();

  function createTask(event) {
    event.preventDefault();
    setTransition(LOADING);

    axios
      .post(`${API}/project/${projectName}/`, { name: taskName, timeSpent: 0 })
      .then(resp => {
        if (!willUnmount) {
          setTransition(REDIRECTING);
        }
      })
      .catch(err => {
        errorHandler("create task")(err);
        if (!willUnmount) {
          setTransition(NONE);
        }
      });
  }

  if (transition === REDIRECTING) {
    return <Redirect to={`/project/${projectName}/`} />;
  }

  return (
    <form onSubmit={createTask}>
      <h1>
        Create task in <span className="blue">{projectName}</span>
      </h1>
      <div>
        <label htmlFor="task-name">Task name</label>
      </div>
      <div>
        <input
          type="text"
          id="task-name"
          value={taskName}
          onChange={evt => setTaskName(formatTaskName(evt.target.value))}
        />
      </div>
      <div>
        <input
          type="submit"
          value={transition === LOADING ? "..." : "Create"}
          disabled={!taskName || transition === LOADING}
        />
      </div>
    </form>
  );
}

export default CreateTask;

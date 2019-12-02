import React, { useState } from "react";
import axios from "axios";
import API_URL from "../API_URL";

const _fromEvent = setter => evt => setter(evt.target.value);

function CreateTaskForm({ projects, projectColors, onCreate }) {
  const [taskName, setTaskName] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState(
    projects[0] || ""
  );
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectColor, setNewProjectColor] = useState("#22ff33");

  const taskColor = selectedProjectName
    ? projectColors[selectedProjectName]
    : newProjectColor;

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(`${API_URL}/tasks/`, {
        name: taskName,
        project: selectedProjectName || newProjectName,
        color: taskColor,
        seconds: 0,
        last_modified: Date.now()
      })
      .then(onCreate)
      .catch(err => {
        // TO DO: handle this error
        console.error(err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <b style={{ color: taskColor }}>Create task</b>
      <br />
      <label htmlFor="task-name">Task name</label>
      <br />
      <input
        type="text"
        id="task-name"
        value={taskName}
        onChange={_fromEvent(setTaskName)}
      />
      <br />
      <label htmlFor="project-name">Task project</label>
      <br />
      <select
        id="project-name"
        value={selectedProjectName}
        onChange={_fromEvent(setSelectedProjectName)}
      >
        <option value="">New Project</option>
        <optgroup label="My Projects">
          {projects.length ? (
            projects.map(project => (
              <option key={project} value={project}>
                {project}
              </option>
            ))
          ) : (
            <option value="" disabled={true}>
              You have no projects
            </option>
          )}
        </optgroup>
      </select>
      <br />
      {selectedProjectName === "" ? (
        <>
          <label htmlFor="new-project-name">New project name</label>
          <br />
          <input
            type="text"
            id="new-project-name"
            value={newProjectName}
            onChange={_fromEvent(setNewProjectName)}
          />
          <input
            type="color"
            id="new-project-color"
            value={newProjectColor}
            onChange={_fromEvent(setNewProjectColor)}
          />
        </>
      ) : (
        ""
      )}
      <br />
      <input
        type="submit"
        value="Create task"
        disabled={!taskName || !(selectedProjectName || newProjectName)}
      />
    </form>
  );
}

export default CreateTaskForm;

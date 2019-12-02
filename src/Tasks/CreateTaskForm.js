import React, { useState } from "react";
import axios from "axios";
import API_URL from "../API_URL";

const _fromEvent = setter => evt => setter(evt.target.value);

function CreateTaskForm({ projects, projectColors, onCreate, onCancel }) {
  const [taskName, setTaskName] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState(
    projects[0] || ""
  );
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectColor, setNewProjectColor] = useState("#5577ff");

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
    <form
      className="task"
      onSubmit={handleSubmit}
      style={{ "--task-color": taskColor }}
    >
      <div className="task-head">
        <h3>New task</h3>
        <input
          type="text"
          id="task-name"
          placeholder="Task Name"
          value={taskName}
          onChange={_fromEvent(setTaskName)}
        />
      </div>
      <div className="task-body">
        <h3>
          <label htmlFor="project-name">Project</label>
        </h3>
        <select
          id="project-name"
          value={selectedProjectName}
          onChange={_fromEvent(setSelectedProjectName)}
        >
          <option value="" style={{ "--task-color": newProjectColor }}>
            New Project
          </option>
          <optgroup label="My Projects">
            {projects.length ? (
              projects.map(project => (
                <option
                  key={project}
                  value={project}
                  style={{ "--task-color": projectColors[project] }}
                >
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
            <input
              type="text"
              id="new-project-name"
              placeholder="Project name"
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
      </div>
      <div className="task-foot">
        <input
          type="submit"
          value="Create task"
          disabled={!taskName || !(selectedProjectName || newProjectName)}
        />
        <button className="cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CreateTaskForm;

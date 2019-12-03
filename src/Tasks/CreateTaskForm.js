import React, { useState } from "react";
import axios from "axios";
import API_URL from "../API_URL";
import TaskTimer from "./TaskTimer";

const _fromEvent = setter => evt => setter(evt.target.value);

const newProjectColors = [
  "#6d7502",
  "#1fad13",
  "#c60d8f",
  "#5577ff",
  "#ff3344"
];

function CreateTaskForm({ projects, projectColors, onCreate, onCancel }) {
  const [taskName, setTaskName] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState(
    projects[0] || ""
  );
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectColor, setNewProjectColor] = useState(
    newProjectColors[Math.floor(Math.random() * newProjectColors.length)]
  );

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

  const createButton = children => (
    <button disabled={!taskName || !(selectedProjectName || newProjectName)}>
      {children}
    </button>
  );

  return (
    <form
      className="task"
      onSubmit={handleSubmit}
      style={{ "--task-color": taskColor }}
    >
      <div className="task-head">
        <TaskTimer seconds={0}>
          {createButton(
            <img
              src="/baseline_add_white_24dp.png"
              alt="Create task"
              title="Create task"
            />
          )}
        </TaskTimer>
      </div>
      <div className="task-body">
        <h3>
          <input
            type="text"
            id="task-name"
            placeholder="Task name"
            value={taskName}
            onChange={_fromEvent(setTaskName)}
          />
        </h3>
        {projects.length ? (
          <>
            <select
              id="project-name"
              value={selectedProjectName}
              onChange={_fromEvent(setSelectedProjectName)}
            >
              {projects.map(project => (
                <option
                  key={project}
                  value={project}
                  style={{ "--task-color": projectColors[project] }}
                >
                  {project}
                </option>
              ))}
              <option
                value=""
                style={{
                  "--task-color": newProjectColor,
                  "font-style": "italic"
                }}
              >
                New project
              </option>
            </select>
            <br />
          </>
        ) : (
          ""
        )}
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
        {createButton("Create task")}
        <br />
        <button className="cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CreateTaskForm;

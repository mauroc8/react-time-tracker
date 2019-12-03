import React, { useState } from "react";
import axios from "axios";
import API_URL from "../API_URL";
import { useWillUnmount } from "../hooks";
import TaskTimer from "./TaskTimer";

const _fromEvent = setter => evt => setter(evt.target.value);

function EditTask({ task, cancelEdition, updateTasks }) {
  const [taskName, setTaskName] = useState(task.name);
  const [minutes, setMinutes] = useState(Math.floor(task.seconds / 60) % 60);
  const [hours, setHours] = useState(Math.floor(task.seconds / 60 / 60));
  const willUnmount = useWillUnmount();
  const [hasClickedDelete, setHasClickedDelete] = useState(false);

  function editTask() {
    axios
      .patch(`${API_URL}/tasks/`, {
        old_task: { name: task.name, project: task.project },
        new_task: {
          ...task,
          name: taskName,
          seconds: hours * 60 * 60 + minutes * 60,
          last_modified: Date.now()
        }
      })
      .then(resp => {
        if (!willUnmount) {
          cancelEdition();
        }
        updateTasks();
      })
      .catch(err => {
        console.error(err);
      });
  }

  function deleteTask() {
    axios
      .post(`${API_URL}/delete-task/`, {
        name: task.name,
        project: task.project
      })
      .then(resp => {
        if (!willUnmount) {
          cancelEdition();
        }
        updateTasks(tasks =>
          tasks.filter(
            otherTask =>
              task.name !== otherTask.name || task.project !== otherTask.project
          )
        );
      })
      .catch(err => {
        console.error(err);
      });
  }

  const confirmButton = children => (
    <button className="confirm" onClick={editTask} disabled={!taskName}>
      {children}
    </button>
  );

  return (
    <div className="task" style={{ "--task-color": task.color }}>
      <div className="task-head">
        <TaskTimer seconds={task.seconds}>
          {confirmButton(
            <img
              src="/baseline_edit_white_24dp.png"
              alt="Edit task"
              title="Edit task"
            />
          )}
        </TaskTimer>
      </div>
      <div className="task-body">
        <h3>
          <input
            type="text"
            placeholder="Task name"
            value={taskName}
            onChange={_fromEvent(setTaskName)}
          />
        </h3>
        <input
          type="number"
          min={0}
          value={hours}
          onChange={_fromEvent(setHours)}
        />
        :
        <input
          type="number"
          min={0}
          max={60}
          value={minutes}
          onChange={_fromEvent(setMinutes)}
        />
      </div>
      <div className="task-foot">
        {confirmButton("Edit task")}
        <br />
        <button className="cancel" onClick={cancelEdition}>
          Cancel
        </button>
        <button
          className="delete"
          onClick={() => {
            if (hasClickedDelete) deleteTask();
            else setHasClickedDelete(true);
          }}
        >
          {!hasClickedDelete ? "Delete" : "Delete?"}
        </button>
      </div>
    </div>
  );
}

export default EditTask;

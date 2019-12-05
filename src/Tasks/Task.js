import React, { useState, useEffect } from "react";
import ShowTask from "./ShowTask";
import EditTask from "./EditTask";

function Task({ task, updateTasks, selectProject, tasks }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(
    !Boolean(localStorage.getItem("hasShownATask"))
  );

  useEffect(() => {
    if (!isFirstTime) {
      localStorage.setItem("hasShownATask", "1");
    }
  }, [isFirstTime]);

  const tasksLength = tasks ? tasks.length : null;

  useEffect(() => {
    if (tasksLength !== null && tasksLength > 1) {
      setIsFirstTime(false);
    }
  }, [tasksLength]);

  if (isEditing) {
    return (
      <EditTask
        task={task}
        cancelEdition={() => setIsEditing(false)}
        updateTasks={updateTasks}
      />
    );
  }

  return (
    <>
      {isFirstTime ? (
        <div
          className="first-time-notice"
          style={{ "--task-color": task.color }}
        >
          Now you can hit play to begin tracking the time you spend on{" "}
          <b>{task.name}</b>.
        </div>
      ) : (
        ""
      )}
      <ShowTask
        task={task}
        editTask={() => {
          setIsFirstTime(false);
          setIsEditing(true);
        }}
        onPlayStart={() => {
          setIsFirstTime(false);
        }}
        updateTasks={updateTasks}
        selectProject={selectProject}
        tasks={tasks}
      />
    </>
  );
}

export default Task;

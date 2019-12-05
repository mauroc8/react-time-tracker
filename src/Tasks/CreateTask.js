import React, { useState, useEffect } from "react";
import CreateTaskForm from "./CreateTaskForm";

export default function CreateTask({ projects, projectColors, updateTasks }) {
  const [isFirstTime, setIsFirstTime] = useState(
    !Boolean(localStorage.getItem("hasCreatedATask"))
  );
  const [isCreatingTask, setIsCreatingTask] = useState(isFirstTime);

  useEffect(() => {
    if (isFirstTime === false) {
      localStorage.setItem("hasCreatedATask", "1");
    }
  }, [isFirstTime]);

  const projectsLength = projects ? projects.length : null;

  useEffect(() => {
    if (projectsLength === 0) {
      setIsCreatingTask(true);
    } else if (projectsLength !== null && projectsLength > 0) {
      setIsFirstTime(false);
    }
  }, [projectsLength]);

  if (isCreatingTask && projects) {
    return (
      <CreateTaskForm
        projects={projects}
        projectColors={projectColors}
        onCreate={() => {
          setIsFirstTime(false);
          setIsCreatingTask(false);
          updateTasks();
        }}
        onCancel={() => setIsCreatingTask(false)}
        isFirstTime={isFirstTime}
      />
    );
  }

  return (
    <button
      className="task task-head new-task"
      onClick={() => setIsCreatingTask(true)}
    >
      New task
    </button>
  );
}

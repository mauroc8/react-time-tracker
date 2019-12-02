import React, { useState } from "react";
import CreateTaskForm from "./CreateTaskForm";

export default function CreateTask({ projects, projectColors, updateTasks }) {
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  if (isCreatingTask) {
    return (
      <>
        <CreateTaskForm
          projects={projects}
          projectColors={projectColors}
          onCreate={() => {
            setIsCreatingTask(false);
            updateTasks();
          }}
        />
        <button className="cancel" onClick={() => setIsCreatingTask(false)}>
          Cancel
        </button>
      </>
    );
  }

  return (
    <button className="new-task" onClick={() => setIsCreatingTask(true)}>
      New Task
    </button>
  );
}

import React, { useState } from "react";
import CreateTaskForm from "./CreateTaskForm";

export default function CreateTask({ projects, projectColors, updateTasks }) {
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  if (isCreatingTask) {
    return (
      <CreateTaskForm
        projects={projects}
        projectColors={projectColors}
        onCreate={() => {
          setIsCreatingTask(false);
          updateTasks();
        }}
        onCancel={() => setIsCreatingTask(false)}
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

import React, { useState } from "react";
import ShowTask from "./ShowTask";
import EditTask from "./EditTask";

function Task({ task, updateTasks }) {
  const [isEditing, setIsEditing] = useState(false);

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
    <ShowTask
      task={task}
      editTask={() => setIsEditing(true)}
      updateTasks={updateTasks}
    />
  );
}

export default Task;

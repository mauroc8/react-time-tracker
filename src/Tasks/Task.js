import React, { useState } from "react";
import ShowTask from "./ShowTask";

function Task({ task, updateTasks }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <div>Edit Task</div>;
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

import React, { useState } from "react";
import Task from "./Tasks/Task";
import CreateTask from "./Tasks/CreateTask";
import { useTasks } from "./hooks";

function App() {
  const [selectedProject, selectProject] = useState(null);
  let tasks = useTasks();

  function makeTaskComponent(task) {
    return (
      <li key={`${task.project}/${task.name}`}>
        <Task {...task} selectProject={selectProject} />
      </li>
    );
  }

  if (tasks === null) {
    return <div>Loading...</div>;
  }

  tasks = tasks.sort(
    (taskA, taskB) => taskA.last_modified - taskB.last_modified
  );

  if (selectedProject !== null) {
    tasks = tasks.filter(task => task.project === selectedProject);
  }

  return (
    <ul>
      {tasks.map(makeTaskComponent)}
      <li key="create-task">
        <CreateTask />
      </li>
    </ul>
  );
}

export default App;

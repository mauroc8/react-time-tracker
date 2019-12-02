import React, { useState } from "react";
import Task from "./Tasks/Task";
import CreateTask from "./Tasks/CreateTask";
import { useTasks, getProjectsFromTasks } from "./hooks";

function App() {
  const [selectedProject, selectProject] = useState(null);
  const [tasks, updateTasks] = useTasks(selectedProject);
  const [projects, projectColors] = getProjectsFromTasks(tasks);

  if (tasks === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-flex">
      {tasks.map(task => (
        <Task
          {...task}
          key={`${task.project}/${task.name}`}
          selectProject={selectProject}
        />
      ))}
      <CreateTask
        projects={projects}
        projectColors={projectColors}
        updateTasks={updateTasks}
      />
    </div>
  );
}

export default App;

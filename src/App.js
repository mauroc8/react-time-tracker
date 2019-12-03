import React, { useState } from "react";
import Task from "./Tasks/Task";
import CreateTask from "./Tasks/CreateTask";
import { useTasks, getProjectsFromTasks } from "./hooks";

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, updateTasks] = useTasks(selectedProject);
  const [projects, projectColors] = getProjectsFromTasks(tasks);

  if (tasks === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-container">
      <CreateTask
        projects={projects}
        projectColors={projectColors}
        updateTasks={updateTasks}
      />
      {tasks.map(task => (
        <Task
          key={`${task.project}/${task.name}`}
          task={task}
          selectProject={setSelectedProject}
          updateTasks={updateTasks}
        />
      ))}
    </div>
  );
}

export default App;

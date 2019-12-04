import React, { useState } from "react";
import Task from "./Tasks/Task";
import CreateTask from "./Tasks/CreateTask";
import { useTasks, getProjectsFromTasks } from "./hooks";
import SearchBar from "./SearchBar";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, updateTasks] = useTasks(searchQuery);
  const [projects, projectColors] = getProjectsFromTasks(tasks);

  if (tasks === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-container">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CreateTask
        projects={projects}
        projectColors={projectColors}
        updateTasks={updateTasks}
      />
      {tasks.map(task => (
        <Task
          key={`${task.project}/${task.name}`}
          task={task}
          selectProject={setSearchQuery}
          updateTasks={updateTasks}
          tasks={tasks}
        />
      ))}
    </div>
  );
}

export default App;

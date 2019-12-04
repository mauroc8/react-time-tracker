import React, { useState } from "react";
import Task from "./Tasks/Task";
import CreateTask from "./Tasks/CreateTask";
import { useTasks, getProjectsFromTasks } from "./hooks";
import SearchBar from "./SearchBar";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, updateTasks, errorDiv] = useTasks(searchQuery);
  const [projects, projectColors] = getProjectsFromTasks(tasks);

  return (
    <div className="task-container">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CreateTask
        projects={projects}
        projectColors={projectColors}
        updateTasks={updateTasks}
      />
      {errorDiv}
      {tasks !== null
        ? tasks.map(task => (
            <Task
              key={`${task.project}/${task.name}`}
              task={task}
              selectProject={setSearchQuery}
              updateTasks={updateTasks}
              tasks={tasks}
            />
          ))
        : ""}
      <div style={{ clear: "both" }}></div>
      <div className="footer task">
        Mauro Cano Brusa (c) 2019
        <br />
        This app uses localStorage: all the data is saved in your computer.
        Don't use it to store sensitive information.{" "}
        <a href="https://github.com/mauroc8/react-time-tracker">View source</a>.
      </div>
    </div>
  );
}

export default App;

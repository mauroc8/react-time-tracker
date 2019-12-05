import React, { useState } from "react";
import Task from "./Tasks/Task";
import CreateTask from "./Tasks/CreateTask";
import { useTasks, getProjectsFromTasks, useErrorMessage } from "./hooks";
import SearchBar from "./App/SearchBar";
import LocalStorageNotice from "./App/LocalStorageNotice";
import ButtonBar from "./App/ButtonBar";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [errorDiv, setErrorMessage] = useErrorMessage();
  const [tasks, updateTasks] = useTasks(searchQuery, setErrorMessage);
  const [projects, projectColors] = getProjectsFromTasks(tasks);

  return (
    <div className="task-container">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ButtonBar
        tasks={tasks}
        updateTasks={updateTasks}
        setErrorMessage={setErrorMessage}
      />
      <CreateTask
        projects={projects}
        projectColors={projectColors}
        updateTasks={updateTasks}
      />
      <div style={{ clear: "both" }}></div>
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
        <LocalStorageNotice />
        <br />
        Mauro Cano Brusa (c) 2019.{" "}
        <a href="https://github.com/mauroc8/react-time-tracker">View source</a>.
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import Task from "./Tasks/Task";
import CreateTask from "./Tasks/CreateTask";
import { useTasks, getProjectsFromTasks, isTaskEqualTo } from "./hooks";
import SearchBar from "./SearchBar";
import axios from "axios";
import API_URL from "./API_URL";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, updateTasks] = useTasks(searchQuery);
  const [projects, projectColors] = getProjectsFromTasks(tasks);

  if (tasks === null) {
    return <div>Loading...</div>;
  }

  function reorderTasks(first, second) {
    const firstIndex = tasks.findIndex(isTaskEqualTo(first));
    const secondIndex = tasks.findIndex(isTaskEqualTo(second));

    if (firstIndex === -1 || secondIndex === -1) return;

    let otherTimestamp;

    if (firstIndex < secondIndex) {
      otherTimestamp =
        secondIndex >= tasks.length - 1
          ? second.timestamp - 9000
          : tasks[secondIndex + 1].timestamp;
    } else {
      otherTimestamp =
        secondIndex > 0 ? tasks[secondIndex - 1].timestamp : Date.now();
    }

    const timestamp = Math.floor((second.timestamp + otherTimestamp) / 2);
    const firstTask = tasks.find(isTaskEqualTo(first));

    axios
      .patch(`${API_URL}/tasks/`, {
        old_task: first,
        new_task: { ...firstTask, timestamp }
      })
      .then(resp => {
        updateTasks();
      })
      .catch(err => {
        console.log(err);
      });
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
          reorderTasks={reorderTasks}
        />
      ))}
    </div>
  );
}

export default App;

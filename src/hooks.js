import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "./API_URL";

export function useWillUnmount() {
  const [willUnmount, setWillUnmount] = useState(false);

  useEffect(() => {
    return () => setWillUnmount(true);
  }, []);

  return willUnmount;
}

export function useTasks(filterByProject) {
  const willUnmount = useWillUnmount();
  let [tasks, setTasks] = useState(null);
  const [updateCounter, setUpdateCounter] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_URL}/tasks/`)
      .then(resp => {
        if (!willUnmount) {
          setTasks(resp.data);
        }
      })
      .catch(err => {
        if (!willUnmount) {
          // TO DO: handle errors.
          console.log(err);
        }
      });
  }, [willUnmount, updateCounter]);

  if (tasks !== null) {
    tasks = tasks.sort(
      (taskA, taskB) => taskB.last_modified - taskA.last_modified
    );

    if (typeof filterByProject === "string") {
      tasks = tasks.filter(task => task.project === filterByProject);
    }
  }

  const updateTasks = () => setUpdateCounter(updateCounter + 1);

  return [tasks, updateTasks];
}

export function getProjectsFromTasks(tasks) {
  if (tasks === null) {
    return [];
  }

  const projectColors = Object.create(null);

  const projects = tasks.reduce((projects, task) => {
    if (projects.includes(task.project)) {
      return projects;
    }
    projectColors[task.project] = task.color;

    return [...projects, task.project];
  }, []);

  return [projects, projectColors];
}

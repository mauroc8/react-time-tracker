import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "./API_URL";

export const isTaskEqualTo = task => otherTask =>
  task.name === otherTask.name && task.project === otherTask.project;

export function formatTaskName(name) {
  // The slash is needed to separate task name from project.
  return name.replace(/\//g, "-");
}

export function useWillUnmount() {
  const [willUnmount, setWillUnmount] = useState(false);

  useEffect(() => {
    return () => setWillUnmount(true);
  }, []);

  return willUnmount;
}

export function useTasks(searchQuery) {
  const willUnmount = useWillUnmount();
  let [tasks, setTasks] = useState(null);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [errorDiv, setErrorMessage] = useErrorMessage();

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
          if (err.response) {
            setErrorMessage("The server responded with an error.");
          } else {
            setErrorMessage(
              "Error connecting with the server. Please reload the tab."
            );
            console.error(err);
          }
        }
      });
  }, [willUnmount, updateCounter, setErrorMessage]);

  if (tasks !== null) {
    tasks = tasks.sort((taskA, taskB) => taskB.timestamp - taskA.timestamp);

    if (searchQuery.length) {
      const searchWords = searchQuery
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ")
        .split(" ");

      if (searchWords.length) {
        tasks = tasks.filter(task =>
          searchWords.every(
            word =>
              task.name.toLowerCase().includes(word) ||
              task.project.toLowerCase().includes(word)
          )
        );
      }
    }
  }

  const updateTasks = updaterFunction => {
    if (updaterFunction) {
      // Manually update, to give immediate feedback
      setTasks(updaterFunction(tasks));
      // (But fetch anyway to validate the API did the right thing.)
    }
    setUpdateCounter(updateCounter + 1);
  };

  return [tasks, updateTasks, errorDiv];
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

export function useErrorMessage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  const errorDiv = (
    <div className={`error-message ${isHidden ? `hidden` : ``}`}>
      {errorMessage}
    </div>
  );

  useEffect(() => {
    if (errorMessage) {
      setIsHidden(false);

      let timeout = setTimeout(() => {
        setIsHidden(true);
        setErrorMessage("");
        timeout = null;
      }, 3200);
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
      };
    }
  }, [errorMessage]);

  return [errorDiv, setErrorMessage];
}

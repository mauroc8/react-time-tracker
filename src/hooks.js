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

export function useTasks() {
  const willUnmount = useWillUnmount();
  const [tasks, setTasks] = useState(null);

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
  }, [willUnmount]);

  return tasks;
}

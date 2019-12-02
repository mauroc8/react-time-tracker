import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../API_URL";

const zeroPad = number => {
  return String(100 + (number % 100)).substr(1);
};

function ShowTask({ task, editTask, updateTasks }) {
  const [seconds, setSeconds] = useState(task.seconds);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);

  // Clock tick
  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setSeconds(Math.floor(task.seconds + Date.now() / 1000 - startTime));
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isTimerRunning, task.seconds, startTime, updateTasks]);

  // Stop timer and save result
  useEffect(() => {
    if (!isTimerRunning && seconds !== task.seconds) {
      axios
        .patch(`${API_URL}/tasks/`, {
          old_task: { name: task.name, project: task.project },
          new_task: { ...task, seconds, last_modified: Date.now() }
        })
        .then(resp => {
          updateTasks();
        })
        .catch(err => {
          // TO DO: handle this error
          console.error(err);
        });
    }
  }, [isTimerRunning, seconds, task, updateTasks]);

  return (
    <div
      className="task"
      style={{
        "--task-color": task.color
      }}
    >
      {!isTimerRunning ? (
        <div
          className="task-head"
          onClick={() => {
            setStartTime(Date.now() / 1000);
            setIsTimerRunning(true);
          }}
        >
          <h3>Start</h3>
          <div>
            {zeroPad(hours)}:{zeroPad(minutes)}
          </div>
        </div>
      ) : (
        <div
          className="task-head"
          onClick={() => {
            setIsTimerRunning(false);
          }}
        >
          <h3>
            {zeroPad(hours)}:{zeroPad(minutes)}
          </h3>
          <div>Stop</div>
        </div>
      )}
      <div
        className="task-timer"
        style={{ width: Math.floor(((seconds % 60) / 60) * 100) + "%" }}
      ></div>
      <div className="task-body">
        <h3>{task.name}</h3>
        <div>{task.project}</div>
      </div>
      <div className="task-foot">
        <button onClick={editTask}>Edit</button>
      </div>
    </div>
  );
}

export default ShowTask;

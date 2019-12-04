import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../API_URL";
import TaskTimer from "./TaskTimer";

const zeroPad = number => {
  return String(100 + (number % 100)).substr(1);
};

function ShowTask({ task, editTask, updateTasks, selectProject }) {
  const [seconds, setSeconds] = useState(task.seconds);
  const minutes = Math.floor(seconds / 60) % 60;
  const hours = Math.floor(seconds / 60 / 60);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);

  // Clock tick
  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setSeconds(Math.floor(task.seconds + Date.now() / 1000 - startTime));
      }, 300);

      return () => clearInterval(interval);
    } else {
      setSeconds(task.seconds);
    }
  }, [isTimerRunning, task.seconds, startTime, updateTasks]);

  // Stop timer and save result
  function stopTimer() {
    const new_task = { ...task, seconds };

    axios
      .patch(`${API_URL}/tasks/`, {
        old_task: { name: task.name, project: task.project },
        new_task
      })
      .then(resp => {
        updateTasks(tasks =>
          tasks.map(someTask => {
            if (
              someTask.name === task.name &&
              someTask.project === task.project
            ) {
              return new_task;
            }
            return someTask;
          })
        );
        setIsTimerRunning(false);
      })
      .catch(err => {
        // TO DO: handle this error
        console.error(err);
      });
  }

  return (
    <div
      className="task"
      style={{
        "--task-color": task.color
      }}
    >
      <div className="task-head">
        <TaskTimer seconds={seconds} isTimerRunning={isTimerRunning}>
          {!isTimerRunning ? (
            <button
              className="start"
              onClick={() => {
                setStartTime(Date.now() / 1000);
                setIsTimerRunning(true);
              }}
            >
              <img
                src="/baseline_play_arrow_white_24dp.png"
                alt="Start timer"
                title="Start timer"
              />
            </button>
          ) : (
            <button
              className="stop"
              onClick={() => {
                stopTimer();
              }}
            >
              <img
                src="/baseline_pause_white_24dp.png"
                alt="Stop timer"
                title="Stop timer"
              />
            </button>
          )}
        </TaskTimer>
      </div>
      <div className="task-body">
        <div className="float-left">
          <h3>{task.name}</h3>
          {zeroPad(hours)}:{zeroPad(minutes)}
          {" - "}
          <span
            className="clickable"
            onClick={() => selectProject(task.project)}
          >
            {task.project}
          </span>
        </div>
        <div className="task-foot">
          <button
            className="edit"
            onClick={() => {
              if (isTimerRunning) {
                stopTimer();
              }
              editTask();
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowTask;

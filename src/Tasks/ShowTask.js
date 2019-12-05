import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import API_URL from "../API_URL";
import TaskTimer from "./TaskTimer";
import { isTaskEqualTo, useErrorMessage, useWillUnmount } from "../hooks";

const zeroPad = number => {
  return String(100 + (number % 100)).substr(1);
};

function ShowTask({
  task,
  editTask,
  updateTasks,
  selectProject,
  tasks,
  onPlayStart
}) {
  const [seconds, setSeconds] = useState(task.seconds);
  const minutes = Math.floor(seconds / 60) % 60;
  const hours = Math.floor(seconds / 60 / 60);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [secondsBeforeStart, setSecondsBeforeStart] = useState(task.seconds);

  const [errorDiv, setErrorMessage] = useErrorMessage();
  const willUnmount = useWillUnmount();

  // Clock tick
  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setSeconds(
          Math.floor(secondsBeforeStart + Date.now() / 1000 - startTime)
        );
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setSeconds(secondsBeforeStart);
    }
  }, [isTimerRunning, secondsBeforeStart, startTime]);

  useEffect(() => {
    if (isTimerRunning) {
      setStartTime(Date.now() / 1000);
    }
  }, [isTimerRunning]);

  useEffect(() => {
    if (!isTimerRunning) {
      setSecondsBeforeStart(task.seconds);
    }
  }, [isTimerRunning, task.seconds]);

  const saveTask = useCallback(
    callback => {
      axios
        .patch(`${API_URL}/tasks/`, {
          old_task: { name: task.name, project: task.project },
          new_task: { ...task, seconds }
        })
        .then(resp => {
          if (callback) {
            callback();
          }
        })
        .catch(err => {
          if (err.response && err.response.status === 405) {
            setErrorMessage(
              "Somehow, we tried to change this task name to an invalid one."
            );
          } else if (err.response && err.response.status === 403) {
            setErrorMessage(
              "Invalid request: this task doesn't exist anymore."
            );
          } else {
            setErrorMessage("Error connecting with the server.");
            console.error(err);
          }
        });
    },
    [task, seconds, setErrorMessage]
  );

  // Stop timer and save result
  function stopTimer() {
    saveTask(() => {
      updateTasks(tasks =>
        tasks.map(someTask => {
          if (
            someTask.name === task.name &&
            someTask.project === task.project
          ) {
            return { ...task, seconds };
          }
          return someTask;
        })
      );
      if (!willUnmount) {
        setIsTimerRunning(false);
      }
    });
  }

  // Save task every minute
  useEffect(() => {
    if (isTimerRunning && seconds !== task.seconds && seconds % 60 === 0) {
      saveTask();
    }
  }, [isTimerRunning, saveTask, seconds, task.seconds]);

  function reorderTasks(other) {
    const otherIndex = tasks.findIndex(isTaskEqualTo(other));
    const taskIndex = tasks.findIndex(isTaskEqualTo(task));

    if (otherIndex === -1 || taskIndex === -1) return;

    let otherTimestamp;

    if (otherIndex < taskIndex) {
      otherTimestamp =
        taskIndex >= tasks.length - 1
          ? task.timestamp - 9000
          : tasks[taskIndex + 1].timestamp;
    } else {
      otherTimestamp =
        taskIndex > 0 ? tasks[taskIndex - 1].timestamp : Date.now();
    }

    const timestamp = Math.floor((task.timestamp + otherTimestamp) / 2);
    const otherTask = tasks.find(isTaskEqualTo(other));

    axios
      .patch(`${API_URL}/tasks/`, {
        old_task: other,
        new_task: { ...otherTask, timestamp }
      })
      .then(resp => {
        updateTasks();
      })
      .catch(err => {
        if (err.response && err.response.status === 405) {
          setErrorMessage(
            "Somehow, we tried to change this task name to an invalid one."
          );
        } else if (err.response && err.response.status === 403) {
          setErrorMessage("Invalid request: This task doesn't exist anymore.");
        } else {
          setErrorMessage("Error connecting with the server.");
          console.error(err);
        }
      });
  }

  // Ask confirmation when user closes tab
  useEffect(() => {
    if (isTimerRunning) {
      window.onbeforeunload = evt => {
        return "There's a task running. You'll loose the timer progress.";
      };

      return () => (window.onbeforeunload = undefined);
    }
  }, [isTimerRunning]);

  return (
    <div
      draggable
      onDragStart={evt => {
        evt.dataTransfer.setData("text/plain", `${task.name}/${task.project}`);
      }}
      onDragOver={evt => evt.preventDefault()}
      onDrop={evt => {
        evt.preventDefault();
        const [name, project] = evt.dataTransfer.getData("text").split("/");
        reorderTasks({ name, project }, task);
      }}
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
                setIsTimerRunning(true);
                onPlayStart();
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/baseline_play_arrow_white_24dp.png`}
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
                src={`${process.env.PUBLIC_URL}/baseline_pause_white_24dp.png`}
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
          {errorDiv}
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

import React, { useEffect, useCallback, useReducer } from "react";
import axios from "axios";
import API_URL from "../API_URL";
import TaskTimer from "./TaskTimer";
import { isTaskEqualTo, useErrorMessage, useWillUnmount } from "../hooks";

const zeroPad = number => {
  return String(100 + (number % 100)).substr(1);
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        isRunning: true,
        millisecondsOnStart: state.milliseconds,
        timestampOnStart: Date.now(),
        millisecondsUntillNextMinute:
          60 * 1000 - (state.milliseconds % (60 * 1000))
      };
    case "STOP":
      return {
        ...state,
        isRunning: false
      };
    case "TICK":
      const milliseconds =
        state.millisecondsOnStart + Date.now() - state.timestampOnStart;
      return {
        ...state,
        milliseconds,
        millisecondsUntillNextMinute: 60 * 1000 - (milliseconds % (60 * 1000))
      };
    case "UPDATE":
      return {
        ...state,
        milliseconds: action.seconds * 1000
      };
    default:
      return state;
  }
};

function ShowTask({
  task,
  editTask,
  updateTasks,
  selectProject,
  tasks,
  onPlayStart
}) {
  const [timer, dispatch] = useReducer(timerReducer, {
    isRunning: false,
    milliseconds: task.seconds * 1000,
    millisecondsOnStart: null,
    timestampOnStart: null,
    millisecondsUntillNextMinute: null
  });

  const minutes = Math.floor(timer.milliseconds / 60 / 1000) % 60;
  const hours = Math.floor(timer.milliseconds / 60 / 1000 / 60);

  const [errorDiv, setErrorMessage] = useErrorMessage();
  const willUnmount = useWillUnmount();

  useEffect(() => {
    const seconds = Math.floor(timer.milliseconds / 1000);

    if (!timer.isRunning && task.seconds !== seconds) {
      dispatch({ type: "UPDATE", seconds: task.seconds });
    }
  }, [timer.isRunning, task.seconds, timer.milliseconds]);

  const saveTask = useCallback(
    callback => {
      const milliseconds =
        timer.millisecondsOnStart + Date.now() - timer.timestampOnStart;
      const seconds = Math.floor(milliseconds / 1000);

      axios
        .patch(`${API_URL}/tasks/`, {
          old_task: { name: task.name, project: task.project },
          new_task: { ...task, seconds }
        })
        .then(resp => {
          if (callback) {
            callback(seconds);
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
    [task, timer.millisecondsOnStart, timer.timestampOnStart, setErrorMessage]
  );

  useEffect(() => {
    if (timer.isRunning) {
      const timeout = setTimeout(
        () => dispatch({ type: "TICK" }),
        timer.millisecondsUntillNextMinute
      );
      return () => clearTimeout(timeout);
    }
  }, [timer.isRunning, timer.millisecondsUntillNextMinute]);

  function startTimer() {
    dispatch({ type: "START" });
    onPlayStart();
  }

  // Stop timer and save result
  function stopTimer(callback) {
    saveTask(seconds => {
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
        dispatch({ type: "STOP" });
        if (callback) {
          callback();
        }
      }
    });
  }

  // Save task every minute
  useEffect(() => {
    const seconds = Math.floor(timer.milliseconds / 1000);

    if (timer.isRunning && seconds !== task.seconds && seconds % 60 === 0) {
      saveTask();
    }
  }, [timer.isRunning, saveTask, timer.milliseconds, task.seconds]);

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
    if (timer.isRunning) {
      window.onbeforeunload = evt => {
        return "There's a task running. You'll loose the timer progress.";
      };

      return () => (window.onbeforeunload = undefined);
    }
  }, [timer.isRunning]);

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
        if (name && project) {
          reorderTasks({ name, project }, task);
        }
      }}
      className="task"
      style={{
        "--task-color": task.color
      }}
    >
      <div className="task-head">
        <TaskTimer
          key={minutes}
          startingSeconds={Math.floor(timer.milliseconds / 1000)}
          isTimerRunning={timer.isRunning}
        >
          {!timer.isRunning ? (
            <button className="start" onClick={startTimer}>
              <img
                src={`${process.env.PUBLIC_URL}/baseline_play_arrow_white_24dp.png`}
                alt="Start timer"
                title="Start timer"
              />
            </button>
          ) : (
            <button className="stop" onClick={() => stopTimer()}>
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
              if (timer.isRunning) {
                stopTimer(editTask);
              } else {
                editTask();
              }
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

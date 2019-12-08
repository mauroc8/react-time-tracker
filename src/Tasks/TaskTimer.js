import React, { useRef, useEffect } from "react";

function initCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const width = (canvas.width = rect.width);
  const height = (canvas.height = rect.height);

  const cx = canvas.getContext("2d");
  cx.fillStyle = "white";

  return [cx, width, height];
}

function drawTime(cx, width, height, percent) {
  const startAngle = -Math.PI / 2;
  const endAngle = Math.PI * 2 * percent + startAngle;
  const center = [width / 2, height / 2];

  cx.globalAlpha = 0.4;
  cx.clearRect(0, 0, width, height);
  cx.beginPath();
  cx.moveTo(...center);
  cx.arc(...center, width / 2, startAngle, endAngle);
  cx.fill();

  cx.globalAlpha = 1;
  cx.globalCompositeOperation = "destination-out";
  cx.beginPath();
  cx.moveTo(...center);
  cx.arc(...center, width / 2 - 4, 0, Math.PI * 2);
  cx.fill();
  cx.globalCompositeOperation = "source-over";
}

function startTimer(canvas, startingSeconds) {
  let timerIsRunning = true;

  const [cx, width, height] = initCanvas(canvas);

  requestAnimationFrame(frame);

  let lastTime = performance.now();
  let minutePercent = (startingSeconds % 60) / 60;

  function frame(time) {
    if (timerIsRunning) {
      requestAnimationFrame(frame);
    }

    const dt = (time - lastTime) / 1000;
    lastTime = time;

    minutePercent += dt / 60;

    drawTime(cx, width, height, minutePercent);
  }

  return function stopTimer() {
    timerIsRunning = false;
  };
}

function drawTimer(canvas, seconds) {
  const [cx, width, height] = initCanvas(canvas);
  const percent = (seconds % 60) / 60;

  drawTime(cx, width, height, percent);
}

function TaskTimer({ startingSeconds, isTimerRunning = false, children }) {
  const canvasRef = useRef(null);

  // Draw
  useEffect(() => {
    if (canvasRef.current && process.env.JEST_WORKER_ID === undefined) {
      if (isTimerRunning) {
        return startTimer(canvasRef.current, startingSeconds);
      } else {
        drawTimer(canvasRef.current, startingSeconds);
      }
    }
  }, [isTimerRunning, startingSeconds]);

  return (
    <div className="task-timer-container">
      <canvas ref={canvasRef} className="task-timer"></canvas>
      {children}
    </div>
  );
}

export default TaskTimer;

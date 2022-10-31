import { useEffect, useRef, useState } from "react";

// Styles
import "./Timer.style.css";

let interval;
export const TimerComponent = () => {
  // Create a reference for html element to update it with minutes and seconds left
  const timerRef = useRef(null);

  // Create a state for tracking minutes and seconds
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // Function receives  time and updates UI with minutes and seconds left
  function pomodoroBreak(time) {
    clearInterval(interval);

    // Convert received time, so I can determine the remaining time in minutes and seconds
    time = time * 60;

    // Update UI with received time
    setMinutes(Math.floor(time / 60));
    setSeconds(time % 60);

    // Create an interval function to calculate the remaining minutes and seconds
    interval = setInterval(function () {
      if (time <= 0) return;
      time--;
      setMinutes(Math.floor(time / 60));
      setSeconds(time % 60);
    }, 1000);
  }

  // Create useEffect function to update UI code while time is decreased
  useEffect(() => {
    const updateUi = () => {
      if (String(minutes).length === 1) {
        setMinutes(`0${minutes}`);
      }

      if (String(seconds).length === 1) {
        setSeconds(`0${seconds}`);
      }
      timerRef.current.innerHTML = minutes + ":" + seconds;
      document.title = minutes + ":" + seconds
    };

    updateUi();
  }, [minutes, seconds]);

  return (
    <main className="d-flex align-items-center justify-content-center vh-90">
      <div className="container text-center">
        <h5>Start Session</h5>
        <p>
          <span className="firstSpan">
            How do I use a Pomodoro timer?
            <span className="secondSpan">
              Set the Pomodoro timer and focus on a task. When the time is up,
              take a break then repeat!
            </span>
          </span>
        </p>

        <div className="row">
          <div className="col-4"></div>
          <div className="col-2" onClick={() => pomodoroBreak(25)} id="pomo">
            Pomodoro
          </div>
          <div className="col-2" onClick={() => pomodoroBreak(5)} id="break">
            Break
          </div>
          <div className="col-4"></div>

          <div className="container text-center">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-4 timer" ref={timerRef}>
                00:00
              </div>
              <div className="col-4"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

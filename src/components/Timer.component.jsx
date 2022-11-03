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

  // State for tracking pause status
  const [paused, setPaused] = useState(false);

  // Function receives  time and updates UI with minutes and seconds left
  function pomodoroBreak(time) {
    clearInterval(interval);

    // Convert received time, so I can determine the remaining time in minutes and seconds
    time = time * 60;

    // Update UI with received time
    if(parseInt(minutes) !== Math.floor(time / 60))
      setMinutes(Math.floor(time / 60));
    setSeconds(time % 60);

    // Create an interval function to calculate the remaining minutes and seconds
    interval = setInterval(function () {
      if (time <= 0) return;
      time--;
      setMinutes(Math.floor(time / 60));
      setSeconds(time % 60);
    }, 1000);
    
    setPaused(false);
  }

  function handlePause(){

    // Resuming time if paused
    if(paused)
      pomodoroBreak(parseInt(minutes)  + (parseInt(seconds) / 60));
    else
      clearInterval(interval);

    setPaused(!paused);
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

    // UI should be updated only if the timer is not paused
    if(!paused)
      updateUi()
  }, [minutes, seconds, paused]);

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

        <div className="row justify-content-center">
          <div className="col-2" onClick={() => pomodoroBreak(25)} id="pomo" data-testid="pomo">
            Pomodoro
          </div>
          <div className="col-2" onClick={() => pomodoroBreak(5)} id="break">
            Break
          </div>
          

          <div className="container text-center">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-4 timer" ref={timerRef} data-testid="timer">
                00:00
              </div>
              <div className="col-5"></div>
              <div className={`col-2 ${paused ? "paused" : "resumed"}`} onClick={() => handlePause()} id="pause">
            {paused ? "Resume" : "Pause"}
          </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

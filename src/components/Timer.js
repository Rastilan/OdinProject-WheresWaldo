// Timer.js

import React, { useState, useEffect, useRef, forwardRef } from "react";

export const Timer = forwardRef((props, ref) => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);


  function handleStartTimer() {
    setStartTime(Date.now());
    setIsTimerRunning(true);
  }

  useEffect(() => {
    let intervalId;

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTimeInSeconds(elapsedSeconds);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning, startTime, props]);

  // Expose the ref to the parent component
  useEffect(() => {
    if (ref) {
      ref.current = {
        getTime: () => elapsedTimeInSeconds
      };
    }
  }, [elapsedTimeInSeconds, ref]);

  return (
    <>
      {isTimerRunning ? (
        <div>Timer: {elapsedTimeInSeconds.toFixed(0)}</div>
      ) : (
        <div className="start-overlay">
          <div>Find the characters!</div>
          <div>
            <div>
              Moon <img src={props.moonIMG} alt="moon" />
            </div>
            <div>
              Majora <img src={props.majoraIMG} alt="majora" />
            </div>
            <div>
              Mipha <img src={props.miphaIMG} alt="mipha" />
            </div>
          </div>
          <button id="start-button" onClick={handleStartTimer}>
            start
          </button>
        </div>
      )}
    </>
  );
});
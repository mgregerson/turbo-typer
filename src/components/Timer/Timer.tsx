import React, { useState, useEffect } from "react";

interface TimerProps {
  minutes: string;
  handleTimerExpired: () => void;
}

function Timer({ minutes, handleTimerExpired }: TimerProps) {
  const [remainingTime, setRemainingTime] = useState(parseInt(minutes) * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(interval);
        handleTimerExpired(); // Notify the parent when the timer expires
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  const minutesDisplay = Math.floor(remainingTime / 60);
  const secondsDisplay = remainingTime % 60;

  return (
    <div>
      {minutesDisplay.toString().padStart(2, "0")}:
      {secondsDisplay.toString().padStart(2, "0")}
    </div>
  );
}

export default Timer;

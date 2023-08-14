import React, { useState, useEffect } from "react";

interface TimerProps {
  minutes: string;
}

function Timer({ minutes }: TimerProps) {
  const [remainingTime, setRemainingTime] = useState(parseInt(minutes) * 60); // Convert minutes to seconds

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(interval); // Stop the timer when it reaches 0
      }
    }, 1000); // Update every 1 second

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
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

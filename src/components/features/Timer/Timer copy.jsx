import { useState, useEffect, useRef } from "react";
import styles from "./Timer.module.scss";

function timeFormat(total) {
  const minutes = Math.floor(total / 60);
  const formattedSeconds = total % 60;

  return ` ${String(minutes).padStart(2, "0")} : ${String(formattedSeconds).padStart(2, "0")}`;
}

const Timer = () => {
  const [seconds, setSeconds] = useState(3);
  const [starMin, setStarMin] = useState(0);
  const [starSec, setStarSec] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      const secs = parseInt(starSec) || 0;
      const min = parseInt(starMin) || 0;
      const total = min * 60 + secs;
      if (total > 0) {
        setSeconds(total);
        setIsRunning(true);
      }
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev < 1) {
            setIsRunning(false);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return (
    <div className={styles.wrapper}>
      <div>
        <label>Min:</label>
        <input
          type="number"
          min="0"
          value={starMin}
          onChange={(e) => setStarMin(e.target.value)}
        />
        <label>Sec:</label>
        <input
          type="number"
          min="0"
          value={starSec}
          onChange={(e) => setStarSec(e.target.value)}
        />
      </div>
      <h1>
        Timer : {timeFormat(seconds)} / running: {isRunning ? "true" : "false"}
      </h1>
      <button onClick={handleStartStop}>Start/Stop</button>
    </div>
  );
};

export default Timer;

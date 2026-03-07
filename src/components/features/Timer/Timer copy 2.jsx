import { useState, useEffect, useRef } from "react";
import styles from "./Timer.module.scss";

function formatTimeValue(value) {
  const formatedMinues = Math.floor(value / 60);
  const formatedSeconds = value % 60;
  return `${String(formatedMinues).padStart(2, "0")}:${String(formatedSeconds).padStart(2, "0")}`;
}

const Timer = () => {
  const [totalsecs, setTotalsecs] = useState(0);
  const [startMinutes, setStartMinutes] = useState(0);
  const [startSecs, setStartSecs] = useState(0);
  const [isActive, setIsAtcive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (isActive) {
      timer.current = setInterval(() => {
        setTotalsecs((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            setIsAtcive(false);
            setIsComplete(true);
            return prev;
          }
        });
      }, 1000);
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [isActive]);

  function startHandler() {
    if (!isActive) {
      const newStartMinutes = parseInt(startMinutes) * 60;
      const newsStartSeconds = parseInt(startSecs);

      setIsComplete(false);
      setTotalsecs((prev) => prev + newsStartSeconds + newStartMinutes);
      setIsAtcive((prev) => {
        if (!prev) {
          setStartSecs(0);
          setStartMinutes(0);
        }
        return !prev;
      });
    }
  }

  return (
    <div className={styles.wrapper}>
      <div>{isComplete ? "complete" : ""}</div>
      <div>
        <label>Minutes: </label>
        <input
          max="60"
          min="0"
          value={startMinutes}
          type="number"
          onChange={(e) => {
            setStartMinutes(e.target.value);
          }}
        />
        <label>Seconds: </label>
        <input
          value={startSecs}
          // step="10"
          max="60"
          min="0"
          onChange={(e) => setStartSecs(e.target.value)}
          type="number"
        />
      </div>
      <div>
        Time: {formatTimeValue(totalsecs)} /active:{" "}
        {isActive ? "true" : "false"}
      </div>
      <div>
        <button onClick={startHandler}>{isActive ? "stop" : "start"}</button>
        <button disabled={isActive} onClick={() => setTotalsecs(0)}>
          reset
        </button>
      </div>
    </div>
  );
};

export default Timer;

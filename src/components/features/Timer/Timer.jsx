import { useEffect, useState, useRef } from "react";
import styles from "./Timer.module.scss";
import useTimer from "../../../hooks/useTimer";

function formateTime(value) {
  const formMin = Math.floor(value / 60);
  const formSecs = value % 60;

  return `${String(formMin).padStart(2, "0")}:${String(formSecs).padStart(2, "0")}`;
}

const Timer = () => {
  const {
    totalSecs,
    isActive,
    initialMins,
    setInitialMins,
    initialSecs,
    setInitialSecs,
    handleStart,
  } = useTimer();

  return (
    <div className={styles.wrapper}>
      <div>Timer: {formateTime(totalSecs)}</div>
      <div>isActive: {isActive ? "true" : "false"}</div>
      <div>
        <label>Mins:</label>
        <input
          value={initialMins}
          onChange={(e) => setInitialMins(e.target.value)}
          type="number"
        />
        <label>Secs:</label>
        <input
          value={initialSecs}
          onChange={(e) => setInitialSecs(e.target.value)}
          type="number"
          max={60}
          step={2}
        />
      </div>
      <button onClick={handleStart}> {isActive ? "Stop" : "Start"}</button>
    </div>
  );
};

export default Timer;

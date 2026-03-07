import { useEffect, useState, useRef } from "react";

const useTimer = () => {
  const [totalSecs, setTotalSecs] = useState(0);
  const [initialMins, setInitialMins] = useState(0);
  const [initialSecs, setInitialSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (isActive) {
      timer.current = setInterval(() => {
        setTotalSecs((prev) => {
          if (prev <= 0) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [isActive]);

  function handleStart() {
    if (!isActive) {
      const addMin = parseInt(initialMins) * 60;
      const addSecs = parseInt(initialSecs);
      const totalSecsUpdated = addMin + addSecs;
      setTotalSecs(totalSecsUpdated);
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  return {
    totalSecs,
    isActive,
    initialMins,
    setInitialMins,
    initialSecs,
    setInitialSecs,
    handleStart,
  };
};
export default useTimer;

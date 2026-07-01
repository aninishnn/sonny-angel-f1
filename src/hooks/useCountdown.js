import { useState, useEffect, useRef, useCallback } from 'react';

export function useCountdown(totalSeconds, { autoStart = true, onComplete } = {}) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setSecondsLeft(totalSeconds);
    completedRef.current = false;
  }, [totalSeconds]);

  useEffect(() => {
    if (!isRunning) return undefined;

    if (secondsLeft <= 0) {
      if (!completedRef.current) {
        completedRef.current = true;
        setIsRunning(false);
        onCompleteRef.current?.();
      }
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning, secondsLeft]);

  const pause = useCallback(() => setIsRunning(false), []);
  const resume = useCallback(() => setIsRunning(true), []);
  const reset = useCallback((next = totalSeconds) => {
    completedRef.current = false;
    setSecondsLeft(next);
  }, [totalSeconds]);

  const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const label = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return { secondsLeft, progress, label, isRunning, pause, resume, reset };
}

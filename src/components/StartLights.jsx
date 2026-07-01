import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './StartLights.module.scss';

export default function StartLights({ run, onLightsOut, label }) {
  const [litCount, setLitCount] = useState(0);
  const [isOut, setIsOut] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];

    if (!run) {
      setLitCount(0);
      setIsOut(false);
      return undefined;
    }

    setIsOut(false);
    for (let i = 1; i <= 5; i += 1) {
      timers.current.push(setTimeout(() => setLitCount(i), i * 450));
    }
    timers.current.push(
      setTimeout(() => {
        setIsOut(true);
        setLitCount(0);
        onLightsOut?.();
      }, 5 * 450 + 700)
    );

    return () => timers.current.forEach(clearTimeout);
  }, [run, onLightsOut]);

  return (
    <div className={styles.gantry} role="status" aria-live="polite">
      <div className={styles.row}>
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.span
            key={i}
            className={styles.light}
            animate={{
              backgroundColor: i <= litCount && !isOut ? 'var(--accent)' : 'var(--locked-fill)',
              boxShadow: i <= litCount && !isOut ? '0 0 18px var(--accent)' : 'none',
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
      {label && <p className={styles.caption}>{label}</p>}
    </div>
  );
}

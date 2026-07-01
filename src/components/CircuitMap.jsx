import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './CircuitMap.module.scss';


const TRACK_PATH =
  'M 60 140 C 30 110 35 60 75 45 C 95 38 110 55 100 75 C 92 90 70 88 65 70 L 95 35 C 130 10 190 15 215 45 C 235 68 225 95 195 100 L 160 105 C 175 120 210 115 225 95';

export default function CircuitMap({ progress = 0 }) {
  const pct = Math.min(Math.max(progress, 0), 1) * 100;
  const pathRef = useRef(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setLength(pathRef.current.getTotalLength());
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <svg viewBox="0 0 260 160" className={styles.svg} aria-hidden="true">
        <path d={TRACK_PATH} className={styles.trackBase} />
        <path
          ref={pathRef}
          d={TRACK_PATH}
          className={styles.trackProgress}
          style={{
            strokeDasharray: length || 1000,
            strokeDashoffset: length ? length - (length * pct) / 100 : 1000,
          }}
        />
        <motion.circle
          r="4.5"
          className={styles.marker}
          animate={{ offsetDistance: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ offsetPath: `path("${TRACK_PATH}")` }}
        />
      </svg>
    </div>
  );
}

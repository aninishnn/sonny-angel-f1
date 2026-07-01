import { motion } from 'framer-motion';
import styles from './ProgressBar.module.scss';

export default function ProgressBar({ progress, label }) {
  const pct = Math.round(Math.min(Math.max(progress, 0), 1) * 100);

  return (
    <div className={styles.wrapper}>
      {label && (
        <div className={styles.labelRow}>
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className={styles.track} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <motion.div
          className={styles.fill}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.div
          className={styles.marker}
          animate={{ left: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          aria-hidden="true"
        >
          🏎️
        </motion.div>
        <span className={styles.flag} aria-hidden="true">
          🏁
        </span>
      </div>
    </div>
  );
}

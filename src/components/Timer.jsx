import { motion } from 'framer-motion';
import styles from './Timer.module.scss';

export default function Timer({ label, secondsLeft, caption }) {
  const isCritical = secondsLeft <= 10 && secondsLeft > 0;

  return (
    <div className={styles.wrapper}>
      {caption && <span className={styles.caption}>{caption}</span>}
      <motion.span
        className={`${styles.clock} ${isCritical ? styles.critical : ''}`}
        animate={isCritical ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={isCritical ? { duration: 0.8, repeat: Infinity } : { duration: 0.2 }}
      >
        {label}
      </motion.span>
    </div>
  );
}

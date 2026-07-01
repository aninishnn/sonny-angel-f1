import { motion } from 'framer-motion';
import styles from './DurationSelector.module.scss';

const PRESETS = [1, 5, 10, 25];

export default function DurationSelector({ minutes, onChange, unitLabel = 'min' }) {
  return (
    <div className={styles.wrapper} role="radiogroup" aria-label="Race length in minutes">
      {PRESETS.map((preset) => {
        const isSelected = preset === minutes;
        return (
          <motion.button
            key={preset}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={`${styles.chip} ${isSelected ? styles.selected : ''}`}
            onClick={() => onChange(preset)}
            whileTap={{ scale: 0.94 }}
          >
            {preset}
            <span className={styles.unit}>{unitLabel}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

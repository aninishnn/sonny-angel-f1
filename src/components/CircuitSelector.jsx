import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import styles from './CircuitSelector.module.scss';

function TrackGlyph() {
  return (
    <svg viewBox="0 0 64 32" className={styles.glyph} aria-hidden="true">
      <path
        d="M4 24c4-10 10-18 20-18s10 12 18 12 8-10 18-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CircuitSelector({ circuits, selectedId, onSelect }) {
  return (
    <div className={styles.list} role="listbox" aria-label="Circuits">
      {circuits.map((circuit) => {
        const isSelected = circuit.id === selectedId;
        return (
          <motion.button
            key={circuit.id}
            type="button"
            role="option"
            aria-selected={isSelected}
            className={`${styles.chip} ${isSelected ? styles.selected : ''}`}
            onClick={() => onSelect(circuit)}
            whileTap={{ scale: 0.97 }}
          >
            <TrackGlyph />
            <span className={styles.text}>
              <span className={styles.name}>{circuit.name}</span>
              <span className={styles.meta}>
                <FaMapMarkerAlt aria-hidden="true" />
                {circuit.locality}, {circuit.country}
              </span>
            </span>
            {isSelected && <FaCheckCircle className={styles.check} aria-hidden="true" />}
          </motion.button>
        );
      })}
    </div>
  );
}

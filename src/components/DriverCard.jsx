import { motion } from 'framer-motion';
import { FaFlag, FaCheckCircle } from 'react-icons/fa';
import FigureIcon from './FigureIcon';
import { getTeamByKey } from '../services/teamsData';
import styles from './DriverCard.module.scss';

export default function DriverCard({ driver, isSelected, onSelect }) {
  const team = driver.teamKey ? getTeamByKey(driver.teamKey) : null;

  return (
    <motion.button
      type="button"
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      style={{ '--team-color': driver.color }}
      onClick={() => onSelect(driver)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      aria-pressed={isSelected}
    >
      <span className={styles.stripe} aria-hidden="true" />
      <div className={styles.avatar}>
        <FigureIcon
          imageUrl={team?.imageUrl}
          primary={driver.color}
          secondary={team?.secondary || '#14171c'}
          size={48}
          alt={driver.name}
        />
      </div>
      <div className={styles.body}>
        <span className={styles.code}>{driver.code}</span>
        <span className={styles.name}>{driver.name}</span>
        <span className={styles.team}>{driver.team}</span>
        <span className={styles.nationality}>
          <FaFlag aria-hidden="true" />
          {driver.nationality}
        </span>
      </div>
      {isSelected && (
        <motion.span
          className={styles.checkBadge}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          aria-hidden="true"
        >
          <FaCheckCircle />
        </motion.span>
      )}
    </motion.button>
  );
}

import { motion } from 'framer-motion';
import { FaLock } from 'react-icons/fa';
import FigureIcon from './FigureIcon';
import styles from './GarageCard.module.scss';

export default function GarageCard({ figure, name, isUnlocked, rarityLabel, pullInfo, labels }) {
  return (
    <motion.div
      className={`${styles.card} ${isUnlocked ? styles.unlocked : styles.locked} ${styles[figure.rarity]}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.banner}>
        <span className={styles.code}>{isUnlocked ? figure.code : '???'}</span>
      </div>
      <div className={styles.artWrap}>
        {isUnlocked ? (
          <FigureIcon
            imageUrl={figure.imageUrl}
            primary={figure.primary}
            secondary={figure.secondary}
            size={64}
            alt={name}
          />
        ) : (
          <FaLock aria-hidden="true" className={styles.lockIcon} />
        )}
      </div>
      <span className={styles.name}>{isUnlocked ? name : '???'}</span>

      <div className={styles.footer}>
        <div>
          <span className={styles.footerLabel}>{labels.count}</span>
          <strong className={styles.footerValue}>{pullInfo ? `×${pullInfo.count}` : '—'}</strong>
        </div>
        <div>
          <span className={styles.footerLabel}>{labels.circuit}</span>
          <strong className={styles.footerValue}>
            {isUnlocked ? pullInfo?.circuitName || '—' : <span className={styles.lockedTag}>{labels.locked}</span>}
          </strong>
        </div>
        <div>
          <span className={styles.footerLabel}>{labels.date}</span>
          <strong className={styles.footerValue}>{pullInfo ? pullInfo.date : labels.awaiting}</strong>
        </div>
      </div>
    </motion.div>
  );
}

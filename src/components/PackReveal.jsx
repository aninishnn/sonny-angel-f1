import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FigureIcon from './FigureIcon';
import styles from './PackReveal.module.scss';

export default function PackReveal({ figure, figureName, rarityLabel, t, wasDuplicate, onConfirm }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className={styles.stage}>
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="pack"
            type="button"
            className={styles.pack}
            onClick={() => setOpened(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.3 }}
          >
            <span className={styles.packStripe} aria-hidden="true" />
            <span className={styles.packTitle}>{t('modal.packTitle')}</span>
            <span className={styles.packEdition}>{t('modal.packEdition')}</span>
            <span className={styles.tapHint}>{t('modal.tapToOpen')}</span>
          </motion.button>
        ) : (
          <motion.div
            key="reveal"
            className={styles.reveal}
            initial={{ opacity: 0, scale: 0.85, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          >
            <span className={styles.glow} style={{ '--glow-color': figure.primary }} aria-hidden="true" />
            <h2 className={styles.unlockTitle}>{t('modal.unlockedTitle')}</h2>
            <FigureIcon
              imageUrl={figure.imageUrl}
              primary={figure.primary}
              secondary={figure.secondary}
              size={120}
              className={styles.figureArt}
              alt={figureName}
            />
            <p className={styles.unlockName}>{figureName}</p>
            <span className={`${styles.rarityBadge} ${styles[figure.rarity]}`}>{rarityLabel}</span>
            {wasDuplicate && <p className={styles.duplicateNote}>{t('modal.duplicate')}</p>}
            <button type="button" className={styles.confirmButton} onClick={onConfirm}>
              {t('modal.addToCollection')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

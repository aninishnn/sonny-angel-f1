import { motion } from 'framer-motion';
import { FaTrashAlt } from 'react-icons/fa';
import GarageCard from '../components/GarageCard';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/LanguageContext';
import { figures, figuresByRarity, RARITY_ORDER } from '../services/figuresData';
import { getCircuitById } from '../services/circuitsData';
import styles from './Collection.module.scss';

export default function Collection() {
  const { t, lang } = useLanguage();
  const [collection, , removeCollection] = useLocalStorage('sa-f1-collection', []);
  const [pullLog, , removePullLog] = useLocalStorage('sa-f1-pull-log', []);

  const securedCount = collection.length;
  const total = figures.length;
  const duplicates = Math.max(pullLog.length - securedCount, 0);
  const circuitsRaced = new Set(pullLog.map((p) => p.circuitId).filter(Boolean)).size;

  const latestPullFor = (figureId) => {
    const entries = pullLog.filter((p) => p.figureId === figureId);
    if (!entries.length) return null;
    const latest = entries[entries.length - 1];
    const circuit = getCircuitById(latest.circuitId);
    const date = new Date(latest.date);
    return {
      count: entries.length,
      circuitName: circuit?.name?.split(' ').slice(-1)[0] || circuit?.locality || '—',
      date: Number.isNaN(date.getTime())
        ? '—'
        : date.toLocaleDateString(lang === 'ka' ? 'ka-GE' : 'en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }),
    };
  };

  // კოლექციის სრულიად გასასუფთავებელი ღილაკი
  const handleReset = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t('collection.resetConfirm'))) {
      removeCollection();
      removePullLog();
    }
  };

  return (
    <div className={`page ${styles.collection}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('collection.title')}</h1>
        <span className={styles.counter}>{t('collection.secured', { count: securedCount, total })}</span>
      </div>

      <div className={styles.progressDots} aria-hidden="true">
        {figures.map((figure) => (
          <span key={figure.id} className={`${styles.dot} ${collection.includes(figure.id) ? styles.dotFilled : ''}`} />
        ))}
      </div>

      <div className={styles.metaStats}>
        <span>
          {t('collection.totalPulls')}: <strong>{pullLog.length}</strong>
        </span>
        <span>
          {t('collection.duplicates')}: <strong>{duplicates}</strong>
        </span>
        <span>
          {t('collection.circuitsRaced')}: <strong>{circuitsRaced}</strong>
        </span>
      </div>

      {securedCount === 0 && <p className={styles.empty}>{t('collection.empty')}</p>}

      {RARITY_ORDER.map((rarity) => {
        const tierFigures = figuresByRarity(rarity);
        const ownedInTier = tierFigures.filter((f) => collection.includes(f.id)).length;

        return (
          <section key={rarity} className={styles.tierSection}>
            <div className={styles.tierHeader}>
              <h2 className={`${styles.tierTitle} ${styles[rarity]}`}>
                {t(`collection.rarity.${rarity}`)} ({t('collection.collected', { owned: ownedInTier, total: tierFigures.length })})
              </h2>
            </div>
            <motion.div className={styles.grid} initial="hidden" animate="visible">
              {tierFigures.map((figure) => {
                const isUnlocked = collection.includes(figure.id);
                const pullInfo = isUnlocked ? latestPullFor(figure.id) : null;
                return (
                  <GarageCard
                    key={figure.id}
                    figure={figure}
                    name={lang === 'ka' ? figure.nameKa : figure.nameEn}
                    isUnlocked={isUnlocked}
                    rarityLabel={t(`collection.rarity.${figure.rarity}`)}
                    pullInfo={pullInfo}
                    labels={{
                      count: t('collection.count'),
                      circuit: t('collection.circuit'),
                      date: t('collection.date'),
                      locked: t('collection.locked'),
                      awaiting: t('collection.awaiting'),
                    }}
                  />
                );
              })}
            </motion.div>
          </section>
        );
      })}

      {securedCount > 0 && (
        <button type="button" className={styles.resetButton} onClick={handleReset}>
          <FaTrashAlt aria-hidden="true" />
          {t('collection.reset')}
        </button>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FigureIcon from '../components/FigureIcon';
import { useLanguage } from '../context/LanguageContext';
import { fetchDrivers } from '../services/f1Api';
import { getTeamByKey } from '../services/teamsData';
import styles from './Standings.module.scss';

export default function Standings() {
  const { t } = useLanguage();
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchDrivers().then((list) => {
      if (mounted) {
        setDrivers([...list].sort((a, b) => (a.position || 99) - (b.position || 99)));
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={`page ${styles.standings}`}>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className={styles.title}>{t('standings.title')}</h1>
        <p className={styles.subtitle}>{t('standings.subtitle')}</p>
      </motion.div>

      {loading ? (
        <p className={styles.loading}>{t('common.loading')}</p>
      ) : (
        <div className={styles.tableWrap}>
          <div className={styles.headerRow}>
            <span className={styles.colPos}>{t('standings.pos')}</span>
            <span className={styles.colDriver}>{t('standings.driver')}</span>
            <span className={styles.colTeam}>{t('standings.team')}</span>
            <span className={styles.colNum}>{t('standings.points')}</span>
            <span className={styles.colNum}>{t('standings.wins')}</span>
          </div>

          {drivers.map((driver, index) => {
            const team = driver.teamKey ? getTeamByKey(driver.teamKey) : null;
            return (
              <motion.div
                key={driver.id}
                className={styles.row}
                style={{ '--team-color': driver.color }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
              >
                <span className={styles.colPos}>{driver.position ? `P${driver.position}` : '—'}</span>
                <span className={`${styles.colDriver} ${styles.driverCell}`}>
                  <span className={styles.avatar}>
                    <FigureIcon
                      imageUrl={team?.imageUrl}
                      primary={driver.color}
                      secondary={team?.secondary || '#14171c'}
                      size={36}
                      alt={driver.name}
                    />
                  </span>
                  <span>
                    <strong>{driver.name}</strong>
                    <span className={styles.code}>{driver.code}</span>
                  </span>
                </span>
                <span className={styles.colTeam}>{driver.team}</span>
                <span className={`${styles.colNum} ${styles.points}`}>{driver.points}</span>
                <span className={styles.colNum}>{driver.wins}</span>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

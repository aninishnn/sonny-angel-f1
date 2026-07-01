import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DriverCard from '../components/DriverCard';
import CircuitSelector from '../components/CircuitSelector';
import DurationSelector from '../components/DurationSelector';
import { useLanguage } from '../context/LanguageContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { fetchDrivers } from '../services/f1Api';
import { circuits } from '../services/circuitsData';
import styles from './Home.module.scss';

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);
  const [loadingDrivers, setLoadingDrivers] = useState(true);

  const [selection, setSelection] = useLocalStorage('sa-f1-selection', { driverId: null, circuitId: null });
  const [raceMinutes, setRaceMinutes] = useLocalStorage('sa-f1-race-minutes', 25);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchDrivers().then((list) => {
      if (mounted) {
        setDrivers(list);
        setLoadingDrivers(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // ლოკალსთორიჯიდან ვკითხულობთ წინა არჩევანს, თუ არსებობს
  const selectedDriver = drivers.find((d) => d.id === selection.driverId) || null;
  const selectedCircuit = circuits.find((c) => c.id === selection.circuitId) || null;

  const handleSelectDriver = useCallback(
    (driver) => {
      setShowError(false);
      setSelection((prev) => ({ ...prev, driverId: driver.id }));
    },
    [setSelection]
  );

  const handleSelectCircuit = useCallback(
    (circuit) => {
      setShowError(false);
      setSelection((prev) => ({ ...prev, circuitId: circuit.id }));
    },
    [setSelection]
  );

  const handleStartClick = () => {
    if (!selectedDriver || !selectedCircuit) {
      setShowError(true);
      return;
    }
    navigate('/game', {
      state: {
        driver: selectedDriver,
        circuit: selectedCircuit,
        raceMinutes,
      },
    });
  };

  return (
    <div className={`page ${styles.home}`}>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className={styles.title}>{t('home.title')}</h1>
        <p className={styles.subtitle}>{t('home.subtitle')}</p>
      </motion.div>

      <div className={styles.columns}>
        <section aria-labelledby="driver-heading">
          <h2 id="driver-heading" className={styles.sectionTitle}>
            {t('home.chooseDriver')}
          </h2>
          {loadingDrivers ? (
            <p className={styles.loading}>{t('home.loadingDrivers')}</p>
          ) : (
            <div className={styles.driverGrid}>
              {drivers.map((driver) => (
                <DriverCard
                  key={driver.id}
                  driver={driver}
                  isSelected={driver.id === selection.driverId}
                  onSelect={handleSelectDriver}
                />
              ))}
            </div>
          )}
        </section>

        <section aria-labelledby="circuit-heading">
          <h2 id="circuit-heading" className={styles.sectionTitle}>
            {t('home.chooseCircuit')}
          </h2>
          <CircuitSelector circuits={circuits} selectedId={selection.circuitId} onSelect={handleSelectCircuit} />
        </section>
      </div>

      <div className={styles.startZone}>
        <div className={styles.durationBlock}>
          <span className={styles.durationLabel}>{t('home.raceLength')}</span>
          <DurationSelector minutes={raceMinutes} onChange={setRaceMinutes} unitLabel={t('home.minutesUnit')} />
        </div>

        {showError && <p className={styles.error}>{t('home.missingSelection')}</p>}

        <motion.button
          type="button"
          className={styles.startButton}
          onClick={handleStartClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {t('home.start')}
        </motion.button>
      </div>
    </div>
  );
}

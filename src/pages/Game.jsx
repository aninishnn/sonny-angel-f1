import { useEffect, useMemo, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Timer from '../components/Timer';
import CircuitMap from '../components/CircuitMap';
import Modal from '../components/Modal';
import PackReveal from '../components/PackReveal';
import StartLights from '../components/StartLights';
import { useCountdown } from '../hooks/useCountdown';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLanguage } from '../context/LanguageContext';
import { pickRandomFigure } from '../services/figuresData';
import { fetchWeatherForCircuit } from '../services/weatherApi';
import styles from './Game.module.scss';

const DEFAULT_RACE_MINUTES = 25;

export default function Game() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const [collection, setCollection] = useLocalStorage('sa-f1-collection', []);
  const [pullLog, setPullLog] = useLocalStorage('sa-f1-pull-log', []);
  const [unlockedFigure, setUnlockedFigure] = useState(null);
  const [wasDuplicate, setWasDuplicate] = useState(false);
  const [weather, setWeather] = useState(null);
  const [raceStarted, setRaceStarted] = useState(false);

  useEffect(() => {
    if (!state?.driver || !state?.circuit) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  useEffect(() => {
    if (!state?.circuit) return;
    let mounted = true;
    fetchWeatherForCircuit(state.circuit).then((w) => {
      if (mounted) setWeather(w);
    });
    return () => {
      mounted = false;
    };
  }, [state?.circuit]);

  const totalSeconds = (state?.raceMinutes || DEFAULT_RACE_MINUTES) * 60;

  // რბოლა რომ მორჩება (ტაიმერი ნულზე ჩამოვა), ვიძახებთ ამას და ვაგდებთ შემთხვევით ფიგურას
  const handleComplete = useCallback(() => {
    const figure = pickRandomFigure();
    setWasDuplicate(collection.includes(figure.id));
    setCollection((prev) => (prev.includes(figure.id) ? prev : [...prev, figure.id]));
    setPullLog((prev) => [
      ...prev,
      { figureId: figure.id, circuitId: state?.circuit?.id, date: new Date().toISOString() },
    ]);
    setUnlockedFigure(figure);
  }, [collection, setCollection, setPullLog, state?.circuit?.id]);

  const { secondsLeft, progress, label, isRunning, pause, resume } = useCountdown(totalSeconds, {
    autoStart: false,
    onComplete: handleComplete,
  });

  const handleLightsOut = useCallback(() => {
    setRaceStarted(true);
    resume();
  }, [resume]);

  const driverColor = state?.driver?.color || 'var(--accent)';

  const figureName = useMemo(() => {
    if (!unlockedFigure) return '';
    return lang === 'ka' ? unlockedFigure.nameKa : unlockedFigure.nameEn;
  }, [unlockedFigure, lang]);

  if (!state?.driver || !state?.circuit) return null;

  const { driver, circuit } = state;
  const fact = circuit.fact ? circuit.fact[lang] || circuit.fact.en : null;

  return (
    <div className={`page ${styles.game}`}>
      <AnimatePresence>
        {!raceStarted && (
          <motion.div
            className={styles.startOverlay}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className={styles.overlayMeta}>
              {driver.name} · {circuit.name}
            </p>
            <StartLights run={!raceStarted} onLightsOut={handleLightsOut} label={t('game.onTrack')} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={styles.headerBar}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: raceStarted ? 1 : 0, y: raceStarted ? 0 : -8 }}
        transition={{ duration: 0.35, delay: raceStarted ? 0.1 : 0 }}
      >
        <h1 className={styles.raceTitle}>{circuit.name}</h1>
        <p className={styles.raceSubtitle}>{circuit.locality}</p>
      </motion.div>

      <div className={styles.dashboard}>
        <div className={styles.column}>
          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>{t('game.circuitMap')}</h2>
            <CircuitMap progress={progress} />
            <div className={styles.statRow}>
              <div>
                <span className={styles.statLabel}>{t('game.laps')}</span>
                <strong className={styles.statValue}>{circuit.laps ?? '—'}</strong>
              </div>
              <div>
                <span className={styles.statLabel}>{t('game.length')}</span>
                <strong className={styles.statValue}>{circuit.lengthKm ? `${circuit.lengthKm} KM` : '—'}</strong>
              </div>
            </div>
          </section>

          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>{t('game.weather')}</h2>
            {weather ? (
              <div className={styles.weatherRow}>
                <span className={styles.weatherIcon} aria-hidden="true">
                  {weather.icon}
                </span>
                <div>
                  <strong className={styles.weatherTemp}>{weather.temperature}°C</strong>
                  <span className={styles.weatherDesc}>{weather.description[lang] || weather.description.en}</span>
                </div>
                {weather.isLive && <span className={styles.liveTag}>{t('game.liveBadge')}</span>}
              </div>
            ) : (
              <p className={styles.loadingText}>{t('common.loading')}</p>
            )}
          </section>
        </div>

        <motion.div
          className={styles.centerPanel}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: raceStarted ? 1 : 0, scale: raceStarted ? 1 : 0.97 }}
          transition={{ duration: 0.4, delay: raceStarted ? 0.15 : 0 }}
        >
          <Timer label={label} secondsLeft={secondsLeft} caption={t('game.remaining')} />
          <div className={styles.finishLabel}>
            {Math.round(progress * 100)}% {t('game.finish')}
          </div>
          <div className={styles.controls}>
            {secondsLeft > 0 && (
              <button type="button" className={styles.primaryControl} onClick={isRunning ? pause : resume}>
                {isRunning ? t('game.pause') : t('game.resume')}
              </button>
            )}
            <button type="button" className={styles.secondaryControl} onClick={() => navigate('/')}>
              {t('game.quit')}
            </button>
          </div>
        </motion.div>

        <div className={styles.column}>
          <section className={styles.panel} style={{ '--team-color': driverColor }}>
            <h2 className={styles.panelTitle}>{t('game.driverProfile')}</h2>
            <div className={styles.driverHeader}>
              <span className={styles.driverStripe} aria-hidden="true" />
              <div>
                <strong className={styles.driverName}>{driver.name}</strong>
                <span className={styles.driverTeam}>{driver.team}</span>
              </div>
            </div>
            <dl className={styles.driverStats}>
              <div>
                <dt>{t('game.seasonPoints')}</dt>
                <dd>{driver.points ?? '—'}</dd>
              </div>
              <div>
                <dt>{t('game.wins')}</dt>
                <dd>{driver.wins ?? '—'}</dd>
              </div>
              <div>
                <dt>{t('game.champPosition')}</dt>
                <dd>{driver.position ? `P${driver.position}` : '—'}</dd>
              </div>
            </dl>
          </section>

          {fact && (
            <section className={styles.panel}>
              <h2 className={styles.panelTitle}>{t('game.circuitFact')}</h2>
              <p className={styles.factText}>{fact}</p>
            </section>
          )}

          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>{t('game.broadcastStatus')}</h2>
            <span className={styles.liveStatus}>
              <span className={styles.liveDot} aria-hidden="true" />
              {t('game.liveTelemetry')}
            </span>
          </section>
        </div>
      </div>

      <Modal isOpen={Boolean(unlockedFigure)} onClose={() => navigate('/collection')} labelledBy="unlock-title">
        {unlockedFigure && (
          <PackReveal
            figure={unlockedFigure}
            figureName={figureName}
            rarityLabel={t(`collection.rarity.${unlockedFigure.rarity}`)}
            t={t}
            wasDuplicate={wasDuplicate}
            onConfirm={() => navigate('/collection')}
          />
        )}
      </Modal>
    </div>
  );
}

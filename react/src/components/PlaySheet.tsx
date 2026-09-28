import { useNavigate } from 'react-router-dom';
import styles from './PlaySheet.module.css';
import { useApp } from '../state/AppContext';
import { usePlaySheet } from '../state/PlaySheetContext';
import { ROUTES } from '../routes';
import { DUELO_ROUNDS, SOLO_ROUNDS } from '../config';

export function PlaySheet() {
  const { dispatch } = useApp();
  const { hide } = usePlaySheet();
  const navigate = useNavigate();

  const startSolo = () => {
    dispatch({ type: 'START_SOLO' });
    hide();
    navigate(ROUTES.roleta);
  };

  const goDuelo = () => {
    dispatch({ type: 'START_DUELO_LOBBY' });
    hide();
    navigate(ROUTES.lobby);
  };

  return (
    <>
      <button className={styles.backdrop} onClick={hide} aria-label="Fechar" />
      <div className={styles.sheet}>
        <div className={styles.handle} />
        <h2 className={styles.title}>Como você quer jogar?</h2>
        <p className={styles.sub}>A roleta sorteia a matéria a cada rodada.</p>

        <button className={`${styles.option} ${styles.solo}`} onClick={startSolo}>
          <div className={`${styles.icon} ${styles.iconLight}`}>1</div>
          <div className={styles.textCol}>
            <div className={styles.titleLight}>Jogar sozinho</div>
            <div className={styles.metaLight}>{SOLO_ROUNDS} rodadas · roleta a cada pergunta</div>
          </div>
          <div className={`${styles.go} ${styles.goLight}`}>▶</div>
        </button>

        <button className={`${styles.option} ${styles.duelo}`} onClick={goDuelo}>
          <div className={`${styles.icon} ${styles.iconNavy}`}>VS</div>
          <div className={styles.textCol}>
            <div className={styles.titleDark}>Duelo 1x1</div>
            <div className={styles.metaDark}>{DUELO_ROUNDS} rodadas · 1 pergunta por rodada</div>
          </div>
          <div className={`${styles.go} ${styles.goDark}`}>▶</div>
        </button>

        <button className={styles.cancel} onClick={hide}>
          Agora não
        </button>
      </div>
    </>
  );
}

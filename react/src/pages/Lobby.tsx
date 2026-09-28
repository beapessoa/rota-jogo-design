import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Lobby.module.css';
import common from '../components/common.module.css';
import { useApp } from '../state/AppContext';
import { ROUTES } from '../routes';
import { avatarSrc, OPPONENT_AVATAR, OPPONENT_NAME } from '../utils';

export function Lobby() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { session, profile } = state;

  useEffect(() => {
    if (session.paired) return;
    const t = setTimeout(() => dispatch({ type: 'SET_PAIRED' }), 1700);
    return () => clearTimeout(t);
  }, [session.paired, dispatch]);

  const goHome = () => navigate(ROUTES.home);

  const startDuelo = () => {
    dispatch({ type: 'START_DUELO_ROUND' });
    navigate(ROUTES.roleta);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.exit} onClick={goHome}>
          voltar
        </button>
      </div>
      <div className={styles.centerWrap}>
        <div className={styles.bigCard}>
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>
              Duelo
              <br />
              <strong>1 x 1.</strong>
            </h1>
            <div className={styles.sub}>
              {session.paired ? 'Oponente encontrado. Boa sorte.' : 'Procurando um oponente…'}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.duelRow}>
            <div className={styles.sideL}>
              <div className={styles.avatar} style={{ backgroundImage: `url("${avatarSrc(profile)}")` }} />
              <div className={styles.name}>{profile.name || 'Você'}</div>
            </div>
            <div className={styles.vs}>VS</div>
            <div className={styles.sideR}>
              <div className={styles.avatar} style={{ backgroundImage: `url("${OPPONENT_AVATAR}")` }} />
              <div className={styles.name}>{OPPONENT_NAME}</div>
            </div>
          </div>
          {session.paired && (
            <>
              <div className={styles.divider} />
              <button className={`${common.btn} ${common.btnOrange}`} onClick={startDuelo}>
                Começar duelo
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

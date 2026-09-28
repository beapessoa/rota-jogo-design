import { useNavigate } from 'react-router-dom';
import styles from './Resultado.module.css';
import common from '../components/common.module.css';
import { useApp } from '../state/AppContext';
import { ROUTES } from '../routes';
import { DUELO_ROUNDS } from '../config';
import { avatarSrc, OPPONENT_AVATAR, OPPONENT_NAME } from '../utils';

export function Resultado() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { session, profile } = state;
  const duelo = session.mode === 'duelo';

  const ratio = duelo
    ? session.meScore + session.oppScore
      ? session.meScore / Math.max(1, session.meScore + session.oppScore)
      : 0
    : session.lastTotal
      ? session.lastScore / session.lastTotal
      : 0;
  const won = duelo ? session.meScore > session.oppScore : ratio >= 0.5;

  const resultHeadA = duelo ? (won ? 'Duelo vencido.' : 'Duelo perdido.') : won ? 'Magia feita.' : 'Quase lá.';
  const resultHeadB = duelo ? (won ? 'Magia superior.' : 'Revanche?') : won ? 'Rota concluída.' : 'Vamos de novo.';

  const resultRows = duelo
    ? [
        { label: 'Rodadas', value: String(DUELO_ROUNDS) },
        { label: 'XP ganho', value: '+' + session.lastXpGained },
        { label: 'Dias de prática', value: String(profile.streak) },
      ]
    : [
        { label: 'XP ganho', value: '+' + session.lastXpGained },
        { label: 'Nível', value: String(profile.level) },
        { label: 'Dias de prática', value: String(profile.streak) },
      ];

  const goHome = () => {
    dispatch({ type: 'ABORT_SESSION' });
    navigate(ROUTES.home);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.sky}>
        <div className={styles.wizard} style={{ backgroundImage: `url("/images/${won ? 'wizard-celebrate' : 'wizard-angry'}.png")` }} />
      </div>
      <div className={styles.body}>
        {duelo && (
          <div className={common.cardFlat}>
            <div className={styles.duelRow}>
              <div className={styles.duelSide}>
                <div className={styles.avatar} style={{ backgroundImage: `url("${avatarSrc(profile)}")` }} />
                <div className={styles.name}>{profile.name || 'Você'}</div>
                <div className={styles.scoreMe}>{session.meScore}</div>
              </div>
              <div className={styles.vs}>VS</div>
              <div className={styles.duelSide}>
                <div className={styles.avatar} style={{ backgroundImage: `url("${OPPONENT_AVATAR}")` }} />
                <div className={styles.name}>{OPPONENT_NAME}</div>
                <div className={styles.scoreOpp}>{session.oppScore}</div>
              </div>
            </div>
            <div className={styles.verdict}>
              {session.meScore === session.oppScore
                ? 'Empate. Ninguém leva a coroa.'
                : won
                  ? 'Você venceu o duelo.'
                  : 'Seu oponente levou essa.'}
            </div>
          </div>
        )}

        <div className={common.cardFlat}>
          <h1 className={styles.headline}>
            {resultHeadA} <span>{resultHeadB}</span>
          </h1>
          {!duelo && (
            <div className={styles.scoreBig}>
              {session.lastScore}/{session.lastTotal}
            </div>
          )}
          {resultRows.map((r) => (
            <div key={r.label} className={styles.row}>
              <div className={styles.rowLabel}>{r.label}</div>
              <div className={styles.rowValue}>{r.value}</div>
            </div>
          ))}
        </div>

        <div className={styles.btnStack}>
          <button className={`${common.btn} ${common.btnNavy}`} onClick={goHome}>
            Jogar de novo
          </button>
          <button className={`${common.btn} ${common.btnGhost}`} onClick={goHome}>
            Voltar para o início
          </button>
        </div>
      </div>
    </div>
  );
}

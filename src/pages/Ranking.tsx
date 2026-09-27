import { useNavigate } from 'react-router-dom';
import styles from './Ranking.module.css';
import common from '../components/common.module.css';
import { rankingBase } from '../data/ranking';
import { ROUTES } from '../routes';

const MEDAL_COLORS: Record<number, string> = { 1: '#F2B825', 2: '#B9C0CE', 3: '#D2661A' };
const MEDAL_TINT: Record<number, string> = { 1: 'rgba(242,184,37,0.14)', 2: 'rgba(185,192,206,0.18)', 3: 'rgba(210,102,26,0.12)' };

const RANKING_LIST = [
  ...rankingBase.map((r, i) => ({ ...r, rank: i + 1, isYou: false })),
  { name: 'Você', xp: 788, rank: 12, isYou: true },
];

export function Ranking() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.header}>
        <button className={styles.brandRow} onClick={() => navigate(ROUTES.home)}>
          <img src="/images/logo.png" alt="Rota do Enem" width={26} height={26} style={{ borderRadius: 8, display: 'block' }} />
          <div className={styles.wordmark}>Rota do Enem</div>
        </button>
        <h1 className={styles.title}>Ranking da semana.</h1>
        <div className={styles.subPill}>Você está em 12º de 12 · faltam 24 XP para subir</div>
      </div>
      <div className={styles.body}>
        <div className={`${common.cardFlat} ${common.rankingCard}`}>
          {RANKING_LIST.map((r) => (
            <div
              key={r.name}
              className={`${styles.row} ${r.isYou ? styles.rowYou : r.rank <= 3 ? styles.rowMedal : ''}`}
              style={!r.isYou && r.rank <= 3 ? { background: MEDAL_TINT[r.rank] } : undefined}
            >
              <div
                className={`${styles.rank} ${r.isYou ? styles.rankYou : MEDAL_COLORS[r.rank] ? styles.rankMedal : ''}`}
                style={!r.isYou && MEDAL_COLORS[r.rank] ? { background: MEDAL_COLORS[r.rank] } : undefined}
              >
                {r.rank}
              </div>
              <div className={`${styles.name} ${r.isYou ? styles.nameYou : ''}`}>{r.name}</div>
              <div className={`${styles.xp} ${r.isYou ? styles.xpYou : ''}`}>{r.xp} XP</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

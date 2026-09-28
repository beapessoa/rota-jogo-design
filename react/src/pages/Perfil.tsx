import { useNavigate } from 'react-router-dom';
import styles from './Perfil.module.css';
import common from '../components/common.module.css';
import { useApp } from '../state/AppContext';
import { ROUTES } from '../routes';
import { avatarSrc } from '../utils';

export function Perfil() {
  const { state } = useApp();
  const navigate = useNavigate();
  const { profile } = state;
  const accuracy = profile.totalAnswered > 0 ? Math.round((profile.totalCorrect / profile.totalAnswered) * 100) : 0;

  const stats = [
    { label: 'XP total', value: String(profile.xp) },
    { label: 'Nível', value: String(profile.level) },
    { label: 'Dias de prática', value: String(profile.streak) },
    { label: 'Acerto', value: accuracy + '%' },
  ];

  const info = [
    { label: 'Nome', value: profile.name || 'Marina Silva' },
    { label: 'E-mail', value: profile.email || 'marina.silva@email.com' },
    { label: 'Número', value: profile.phone },
    { label: 'Data de nascimento', value: profile.birthdate },
  ];

  return (
    <>
      <div className={styles.header}>
        <button className={styles.brandRow} onClick={() => navigate(ROUTES.home)}>
          <img src="/images/logo.png" alt="Rota do Enem" width={26} height={26} style={{ borderRadius: 8, display: 'block' }} />
          <div className={styles.wordmark}>Rota do Enem</div>
        </button>
        <div className={styles.headRow}>
          <div>
            <h1 className={styles.title}>{profile.name || 'Marina Silva'}</h1>
            <div className={styles.subPill}>Nível {profile.level} · Medicina 2027</div>
          </div>
          <div className={styles.avatarBig} style={{ backgroundImage: `url("${avatarSrc(profile)}")` }} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={common.cardFlat}>
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`${styles.statCell} ${i % 2 === 1 ? styles.statCellRight : ''} ${i >= 2 ? styles.statCellBottom : ''}`}
              >
                <div className={styles.statLabel}>{s.label}</div>
                <div className={styles.statValue}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={common.cardFlat}>
          <div className={common.kicker}>Informações</div>
          {info.map((row) => (
            <div key={row.label} className={common.listRow}>
              <div className={styles.infoLabel}>{row.label}</div>
              <div className={styles.infoValue}>{row.value}</div>
            </div>
          ))}
        </div>

        <div className={common.btnStack}>
          <button className={`${common.btn} ${common.btnGhost}`} onClick={() => navigate(ROUTES.config)}>
            Ajustes
          </button>
        </div>
      </div>
    </>
  );
}

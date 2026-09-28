import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { useApp } from '../state/AppContext';
import { usePlaySheet } from '../state/PlaySheetContext';
import { ROUTES } from '../routes';
import { avatarSrc } from '../utils';

export function Home() {
  const { state } = useApp();
  const { show } = usePlaySheet();
  const navigate = useNavigate();
  const { profile } = state;
  const inStreak = profile.streak > 0;

  const goPerfil = () => navigate(ROUTES.perfil);
  const goRanking = () => navigate(ROUTES.ranking);

  return (
    <div className={styles.page}>
      <div
        className={styles.skyStage}
        style={{
          background:
            'linear-gradient(rgba(30,20,15,0.62), rgba(30,20,15,0) 55%), url("/images/bg-home.jpeg") center 70% / cover no-repeat',
        }}
      >
        <div className={styles.skyHeader}>
          <button className={styles.xpPill} onClick={goPerfil}>
            <div className={styles.xpPillDot} />
            <div className={styles.xpPillValue}>{profile.xp} XP</div>
          </button>
          <button className={styles.avatarChip} onClick={goPerfil}>
            <div className={styles.avatarFill} style={{ backgroundImage: `url("${avatarSrc(profile)}")` }} />
          </button>
        </div>

        <div className={styles.skyTextBlock}>
          <div className={styles.skyHeadline}>
            {inStreak ? 'Ora, ora…' : 'O mago sumiu,'}
            <br />
            <span className={styles.headlineStrong}>
              {inStreak ? 'temos um mestre surgindo.' : 'mas o ENEM não.'}
            </span>
          </div>
        </div>

        <div className={styles.wizardStage}>
          <div
            className={styles.wizard}
            style={{ backgroundImage: `url("/images/${inStreak ? 'wizard-happy' : 'wizard-angry'}.png")` }}
          />
        </div>

        <div className={styles.playWrap}>
          <button className={styles.playBtn} onClick={show}>
            Jogar
          </button>
        </div>
      </div>

      <div className={styles.creamBar}>
        <div className={styles.creamStats}>
          <button className={styles.creamTile} onClick={goPerfil}>
            <div
              className={styles.creamIcon}
              style={{ backgroundImage: 'url("/images/icon-book.png")', backgroundSize: '60px auto', backgroundPosition: 'center 52%' }}
            />
            <div className={styles.creamTileValue}>{profile.streak}</div>
            <div className={styles.creamTileLabel}>dias de prática</div>
          </button>
          <button className={styles.creamTile} onClick={goPerfil}>
            <div
              className={styles.creamIcon}
              style={{ backgroundImage: 'url("/images/star-blue.png")', backgroundSize: '52px auto', backgroundPosition: 'center 57%' }}
            />
            <div className={styles.creamTileValue}>{profile.xp}</div>
            <div className={styles.creamTileLabel}>XP</div>
          </button>
          <button className={styles.creamTile} onClick={goRanking}>
            <div
              className={styles.creamIcon}
              style={{ backgroundImage: 'url("/images/icon-hat.png")', backgroundSize: '60px auto', backgroundPosition: 'center 48%' }}
            />
            <div className={styles.creamTileValue}>12º</div>
            <div className={styles.creamTileLabel}>no ranking</div>
          </button>
        </div>
      </div>
    </div>
  );
}

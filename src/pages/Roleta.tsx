import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Roleta.module.css';
import { useApp } from '../state/AppContext';
import { ROUTES } from '../routes';
import { subjects } from '../data/subjects';
import { questionBank } from '../data/questions';
import { DUELO_ROUNDS, SOLO_ROUNDS } from '../config';
import { avatarSrc, OPPONENT_AVATAR, OPPONENT_NAME } from '../utils';

const WHEEL_SIZE = 344;
const WHEEL_BORDER = 10;
const INNER_R = (WHEEL_SIZE - WHEEL_BORDER * 2) / 2;
const SLICE = 360 / subjects.length;
const GAP = 1.2;

const CONIC_STOPS = subjects
  .map(
    (sb, i) =>
      `#FFFFFF ${i * SLICE}deg ${i * SLICE + GAP}deg, ${sb.color} ${i * SLICE + GAP}deg ${(i + 1) * SLICE - GAP}deg, #FFFFFF ${(i + 1) * SLICE - GAP}deg ${(i + 1) * SLICE}deg`,
  )
  .join(', ');

function pickRandomQuestion(subjectName: string) {
  const pool = (questionBank[subjectName] || []).slice().sort(() => Math.random() - 0.5);
  return pool[0];
}

export function Roleta() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { session, profile } = state;
  const duelo = session.mode === 'duelo';
  const totalRounds = duelo ? DUELO_ROUNDS : SOLO_ROUNDS;
  const spinTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!session.spinning) return;
    spinTimer.current = setTimeout(() => dispatch({ type: 'SPIN_DONE' }), 3100);
    return () => clearTimeout(spinTimer.current);
  }, [session.spinning, dispatch]);

  const abort = () => {
    dispatch({ type: 'ABORT_SESSION' });
    navigate(ROUTES.home);
  };

  const spin = () => {
    if (session.spinning || session.revealed) return;
    const n = subjects.length;
    const pick = Math.floor(Math.random() * n);
    const target = 360 * 4 - (pick * SLICE + SLICE / 2);
    const base = Math.floor(session.wheelAngle / 360) * 360;
    dispatch({ type: 'SPIN', subjectIndex: pick, wheelAngle: base + target });
  };

  const beginRound = () => {
    const subjectName = subjects[session.subjectIndex].name;
    const question = pickRandomQuestion(subjectName);
    dispatch({ type: 'BEGIN_ROUND', question });
    navigate(ROUTES.quiz);
  };

  const sub = subjects[session.subjectIndex];
  const showReveal = session.revealed && !session.spinning;

  return (
    <>
    <div
      className={styles.sky}
      style={{ backgroundImage: `url("/images/${duelo ? 'bg-duel.jpeg' : 'bg-sky.png'}")` }}
    >
      <div className={styles.headerExit}>
        <button className={styles.exit} onClick={abort}>
          sair
        </button>
      </div>

      {duelo && (
        <div className={styles.scoreBarWrap}>
          <div className={styles.scoreBar}>
            <div className={styles.scoreSide}>
              <div className={styles.scoreAvatar} style={{ backgroundImage: `url("${avatarSrc(profile)}")` }} />
              <div className={styles.scoreName}>{profile.name || 'Você'}</div>
            </div>
            <div className={styles.scoreMid}>
              <div className={styles.scoreNumMe}>{session.meScore}</div>
              <div className={styles.scoreVs}>vs</div>
              <div className={styles.scoreNumOpp}>{session.oppScore}</div>
            </div>
            <div className={styles.scoreSide}>
              <div className={styles.scoreAvatar} style={{ backgroundImage: `url("${OPPONENT_AVATAR}")` }} />
              <div className={styles.scoreName}>{OPPONENT_NAME}</div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.titleBlock}>
        <div className={styles.kicker}>
          Rodada {session.round} de {totalRounds}
        </div>
      </div>

      <div className={styles.wheelZone}>
        <div className={styles.wheelArea}>
          <div className={styles.wheelStaticShadow} />
          <div
            className={styles.wheel}
            style={{ background: `conic-gradient(${CONIC_STOPS})`, transform: `rotate(${session.wheelAngle}deg)` }}
          >
            {subjects.map((sb, i) => {
              const angleDeg = i * SLICE + SLICE / 2;
              const a = (angleDeg * Math.PI) / 180;
              const d = INNER_R * 0.6;
              const left = INNER_R + d * Math.sin(a) - 31;
              const top = INNER_R - d * Math.cos(a) - 31;
              return (
                <div key={sb.name} className={styles.wheelIcon} style={{ left, top, transform: `rotate(${angleDeg}deg)` }}>
                  <div className={styles.wheelIconImg} style={{ backgroundImage: `url("${sb.icon}")` }} />
                </div>
              );
            })}
          </div>
          <div className={styles.wheelShine} />
          <div className={styles.hubTip} />
          <button className={styles.hub} onClick={spin}>
            {session.spinning ? '…' : 'GIRAR'}
          </button>
        </div>
      </div>

      <div className={styles.cream}>
        <div className={styles.roundDots}>
          {Array.from({ length: totalRounds }).map((_, i) => (
            <div
              key={i}
              className={styles.dot}
              style={{
                width: i === session.round - 1 ? 26 : 10,
                background: i < session.round - 1 ? 'var(--orange-soft)' : i === session.round - 1 ? 'var(--navy-soft)' : '#E8D7BF',
              }}
            />
          ))}
        </div>
        <div className={styles.legend}>
          {subjects.map((sb) => (
            <div key={sb.name} className={styles.chip} style={{ opacity: session.spinning ? 0.6 : 1 }}>
              <div className={styles.chipDot} style={{ background: sb.color, boxShadow: `inset 0 -2px 0 ${sb.deep}` }} />
              <div>{sb.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

      {showReveal && (
        <div className={styles.reveal} style={{ background: sub.color }}>
          <div className={styles.revealTextWrap}>
            <h1 className={styles.revealTitle}>{sub.name}</h1>
          </div>
          <div className={styles.revealDisc}>
            <div className={styles.revealIcon} style={{ backgroundImage: `url("${sub.icon}")` }} />
          </div>
          <div className={styles.revealFoot}>
            <div className={styles.revealMeta}>
              Rodada {session.round} de {totalRounds} · 1 pergunta de {sub.name}
            </div>
            <button className={styles.revealCta} style={{ color: sub.deep }} onClick={beginRound}>
              Responder
            </button>
          </div>
        </div>
      )}
    </>
  );
}

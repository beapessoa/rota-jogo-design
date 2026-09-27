import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Quiz.module.css';
import { useApp } from '../state/AppContext';
import { ROUTES } from '../routes';
import { subjects } from '../data/subjects';
import { DUELO_ROUNDS, SOLO_ROUNDS } from '../config';
import { formatTime } from '../utils';

const MARKS = ['A', 'B', 'C', 'D'];

const BURST_STARS = [
  { tx: 58, ty: 0, size: 18, delay: 0 },
  { tx: 21, ty: 36, size: 11, delay: 0.04 },
  { tx: -29, ty: 50, size: 18, delay: 0.08 },
  { tx: -42, ty: 0, size: 11, delay: 0.12 },
  { tx: -29, ty: -50, size: 18, delay: 0.16 },
  { tx: 21, ty: -36, size: 11, delay: 0.2 },
];

export function Quiz() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { session } = state;
  const duelo = session.mode === 'duelo';
  const totalRounds = duelo ? DUELO_ROUNDS : SOLO_ROUNDS;
  const sub = subjects[session.subjectIndex];
  const q = session.currentQuestion;

  const timeLeftRef = useRef(session.timeLeft);
  useEffect(() => {
    timeLeftRef.current = session.timeLeft;
  }, [session.timeLeft]);

  useEffect(() => {
    if (!session.currentQuestion) navigate(ROUTES.roleta, { replace: true });
  }, []);

  const handleSelect = (idx: number) => {
    if (session.selected !== null || !session.currentQuestion) return;
    const oppRight = duelo ? Math.random() < 0.6 : false;
    dispatch({ type: 'SELECT_ANSWER', idx, oppHit: duelo ? oppRight : null });
  };

  useEffect(() => {
    if (session.selected !== null) return;
    const interval = setInterval(() => {
      if (timeLeftRef.current <= 1) {
        handleSelect(-1);
      } else {
        dispatch({ type: 'TICK' });
      }
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.selected]);

  useEffect(() => {
    if (session.selected === null || !q) return;
    const delay = duelo ? 2400 : 2200;
    const meRight = session.selected === q.correct;
    const oppRight = session.oppHit === true;
    const last = session.round >= totalRounds;
    const t = setTimeout(() => {
      dispatch({ type: 'FINISH_ROUND', meRight, oppRight });
      navigate(last ? ROUTES.resultado : ROUTES.roleta);
    }, delay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.selected]);

  if (!q) return null;

  const cur = session.round - 1;

  return (
    <div className={styles.body}>
      <div className={styles.topRow}>
        <div className={styles.subjectChip} style={{ background: sub.color }}>
          {sub.name}
        </div>
        <div className={styles.timerPill}>{formatTime(session.timeLeft)}</div>
      </div>

      <div className={styles.segRow}>
        {Array.from({ length: totalRounds }).map((_, i) => (
          <div
            key={i}
            className={styles.seg}
            style={{ background: i <= cur ? 'var(--navy)' : 'var(--orange)', opacity: i === cur ? 0.55 : 1 }}
          />
        ))}
      </div>

      <div className={styles.card}>
        <div className={styles.wizardWrap}>
          <div
            className={styles.wizard}
            style={{
              backgroundImage: `url("/images/${
                session.selected === null ? 'wizard-happy' : session.selected === q.correct ? 'wizard-celebrate' : 'wizard-surprised'
              }.png")`,
            }}
          />
        </div>
        <div className={styles.kicker}>
          Rodada {session.round} de {totalRounds}
        </div>
        <h1 className={styles.question}>{q.text}</h1>
      </div>

      {q.options.map((label, idx) => {
        const isAnswered = session.selected !== null;
        const isCorrectOpt = idx === q.correct;
        const isPickedWrong = isAnswered && idx === session.selected && idx !== q.correct;
        const isFaded = isAnswered && !isCorrectOpt && idx !== session.selected;

        const optionClass = [
          styles.option,
          !isAnswered && styles.selectable,
          isAnswered && styles.notSelected,
          isAnswered && isCorrectOpt && styles.optionCorrect,
          isPickedWrong && styles.optionWrong,
          isFaded && styles.optionFaded,
        ]
          .filter(Boolean)
          .join(' ');

        const markClass = [styles.mark, isAnswered && isCorrectOpt && styles.markCorrect, isPickedWrong && styles.markWhite]
          .filter(Boolean)
          .join(' ');

        const labelClass = [styles.label, isAnswered && isCorrectOpt && styles.labelCorrect, isPickedWrong && styles.labelWrong]
          .filter(Boolean)
          .join(' ');

        return (
          <button key={idx} className={optionClass} onClick={() => handleSelect(idx)} disabled={isAnswered}>
            <div className={markClass}>{MARKS[idx]}</div>
            <div className={labelClass}>{label}</div>
            {isAnswered &&
              isCorrectOpt &&
              BURST_STARS.map((b, i) => (
                <div
                  key={i}
                  className={styles.star}
                  style={
                    {
                      width: b.size,
                      height: b.size,
                      backgroundImage: 'url("/images/star-blue.png")',
                      animationDelay: `${b.delay}s`,
                      '--tx': `${b.tx}px`,
                      '--ty': `${b.ty}px`,
                    } as CSSProperties
                  }
                />
              ))}
          </button>
        );
      })}

      {duelo && session.oppHit !== null && (
        <div className={styles.oppFeedback} style={{ color: session.oppHit ? 'var(--orange)' : 'var(--muted)' }}>
          {session.oppHit ? 'emanuelly.c acertou esta rodada.' : 'emanuelly.c errou esta rodada.'}
        </div>
      )}
    </div>
  );
}

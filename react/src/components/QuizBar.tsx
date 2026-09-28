import { useNavigate } from 'react-router-dom';
import styles from './QuizBar.module.css';
import { useApp } from '../state/AppContext';
import { ROUTES } from '../routes';
import { DUELO_ROUNDS, SOLO_ROUNDS } from '../config';

export function QuizBar() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const total = state.session.mode === 'duelo' ? DUELO_ROUNDS : SOLO_ROUNDS;

  const abort = () => {
    dispatch({ type: 'ABORT_SESSION' });
    navigate(ROUTES.home);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.bar}>
        <button className={styles.exit} onClick={abort}>
          Sair
        </button>
        <div className={styles.count}>
          {state.session.round} / {total}
        </div>
      </div>
    </div>
  );
}

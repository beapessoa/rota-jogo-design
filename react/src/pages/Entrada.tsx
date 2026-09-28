import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Entrada.module.css';
import common from '../components/common.module.css';
import { useApp } from '../state/AppContext';
import { ROUTES } from '../routes';

export function Entrada() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const isSignup = authMode === 'signup';

  const submit = () => {
    dispatch({ type: 'LOGIN', name: state.profile.name, email: state.profile.email });
    navigate(ROUTES.home);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.wizard} />
      <div className={styles.logoRow}>
        <img src="/images/logo.png" alt="Rota do Enem" width={30} height={30} style={{ borderRadius: 9, display: 'block' }} />
        <div className={styles.wordmark}>Rota do Enem</div>
      </div>
      <div className={styles.centerWrap}>
        <div className={styles.card}>
          <div className={styles.tabRow}>
            <button
              className={`${styles.tab} ${!isSignup ? styles.active : ''}`}
              onClick={() => setAuthMode('login')}
            >
              Entrar
            </button>
            <button
              className={`${styles.tab} ${isSignup ? styles.active : ''}`}
              onClick={() => setAuthMode('signup')}
            >
              Criar conta
            </button>
          </div>

          {isSignup && (
            <div className={common.field}>
              <div className={common.inputLabel}>Nome</div>
              <input
                className={common.inputField}
                placeholder="Seu nome"
                value={state.profile.name}
                onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })}
              />
            </div>
          )}

          <div className={common.field}>
            <div className={common.inputLabel}>E-mail</div>
            <input
              className={common.inputField}
              placeholder="seu@email.com"
              value={state.profile.email}
              onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'email', value: e.target.value })}
            />
          </div>

          <button className={`${common.btn} ${common.btnOrange}`} onClick={submit}>
            {isSignup ? 'Criar conta' : 'Entrar'}
          </button>

          <div className={styles.footNote}>
            {isSignup ? 'Já tem conta?' : 'Não tem conta?'}{' '}
            <span className={styles.linkOrange} onClick={() => setAuthMode(isSignup ? 'login' : 'signup')}>
              {isSignup ? 'Entrar' : 'Criar uma'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

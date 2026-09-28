import { useLocation, useNavigate } from 'react-router-dom';
import styles from './TabBar.module.css';
import { ROUTES } from '../routes';

export function TabBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isPerfil = pathname === ROUTES.perfil || pathname === ROUTES.config;

  return (
    <div className={styles.wrap}>
      <div className={styles.bar}>
        <button
          className={`${styles.item} ${pathname === ROUTES.home ? styles.active : ''}`}
          onClick={() => navigate(ROUTES.home)}
        >
          início
        </button>
        <div className={styles.divider} />
        <button
          className={`${styles.item} ${pathname === ROUTES.ranking ? styles.active : ''}`}
          onClick={() => navigate(ROUTES.ranking)}
        >
          ranking
        </button>
        <div className={styles.divider} />
        <button className={`${styles.item} ${isPerfil ? styles.active : ''}`} onClick={() => navigate(ROUTES.perfil)}>
          perfil
        </button>
      </div>
    </div>
  );
}

import { Outlet, useLocation } from 'react-router-dom';
import styles from './AppFrame.module.css';
import { TabBar } from './TabBar';
import { QuizBar } from './QuizBar';
import { PlaySheet } from './PlaySheet';
import { usePlaySheet } from '../state/PlaySheetContext';
import { ROUTES } from '../routes';

const TAB_BAR_ROUTES: string[] = [ROUTES.home, ROUTES.ranking, ROUTES.perfil, ROUTES.config, ROUTES.resultado];

function frameBackground(pathname: string): string {
  if (pathname === ROUTES.home || pathname === ROUTES.roleta || pathname === ROUTES.quiz) {
    return '#FBF3E6';
  }
  if ([ROUTES.ranking, ROUTES.perfil, ROUTES.config, ROUTES.resultado].includes(pathname as any)) {
    return '#FAF3E9';
  }
  if (pathname === ROUTES.lobby) {
    return 'url("/images/bg-duel.jpeg") center 80% / cover no-repeat';
  }
  return '#FBF3E6';
}

export function AppFrame() {
  const location = useLocation();
  const { open } = usePlaySheet();

  return (
    <div className={styles.shell}>
      <div className={styles.frame} style={{ background: frameBackground(location.pathname) }}>
        <div className={styles.scrollArea}>
          <Outlet />
        </div>
        {TAB_BAR_ROUTES.includes(location.pathname) && <TabBar />}
        {location.pathname === ROUTES.quiz && <QuizBar />}
        {open && <PlaySheet />}
      </div>
    </div>
  );
}

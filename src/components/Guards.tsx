import { Navigate, Outlet } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { ROUTES } from '../routes';

export function RequireAuth() {
  const { state } = useApp();
  if (!state.profile.loggedIn) return <Navigate to={ROUTES.entrada} replace />;
  return <Outlet />;
}

export function RequireGuest() {
  const { state } = useApp();
  if (state.profile.loggedIn) return <Navigate to={ROUTES.home} replace />;
  return <Outlet />;
}

export function RequireSession() {
  const { state } = useApp();
  if (!state.session.active) return <Navigate to={ROUTES.home} replace />;
  return <Outlet />;
}

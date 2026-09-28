import { Navigate, Route, Routes } from 'react-router-dom';
import { AppFrame } from './components/AppFrame';
import { RequireAuth, RequireGuest, RequireSession } from './components/Guards';
import { Entrada } from './pages/Entrada';
import { Home } from './pages/Home';
import { Lobby } from './pages/Lobby';
import { Roleta } from './pages/Roleta';
import { Quiz } from './pages/Quiz';
import { Resultado } from './pages/Resultado';
import { Ranking } from './pages/Ranking';
import { Perfil } from './pages/Perfil';
import { Config } from './pages/Config';

export default function App() {
  return (
    <Routes>
      <Route element={<AppFrame />}>
        <Route element={<RequireGuest />}>
          <Route path="/entrada" element={<Entrada />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/config" element={<Config />} />

          <Route element={<RequireSession />}>
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/roleta" element={<Roleta />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/resultado" element={<Resultado />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/entrada" replace />} />
        <Route path="*" element={<Navigate to="/entrada" replace />} />
      </Route>
    </Routes>
  );
}

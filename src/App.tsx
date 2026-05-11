import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import StyleSquads from './pages/StyleSquads';
import InvestmentClubs from './pages/InvestmentClubs';
import Profile from './pages/Profile';

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const onboarded = localStorage.getItem('splugery-onboarded') === 'true';
  if (!onboarded) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route
            path="/home"
            element={
              <RequireOnboarding>
                <Home />
              </RequireOnboarding>
            }
          />
          <Route
            path="/marketplace"
            element={
              <RequireOnboarding>
                <Marketplace />
              </RequireOnboarding>
            }
          />
          <Route
            path="/squads"
            element={
              <RequireOnboarding>
                <StyleSquads />
              </RequireOnboarding>
            }
          />
          <Route
            path="/invest"
            element={
              <RequireOnboarding>
                <InvestmentClubs />
              </RequireOnboarding>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireOnboarding>
                <Profile />
              </RequireOnboarding>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

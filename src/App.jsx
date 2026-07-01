import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import Standings from './pages/Standings';
import Collection from './pages/Collection';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/game';

  return (
    <div className="layout">
      {showNavbar && <Navbar />}

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <span>Made by <strong>Ani Nishn</strong></span>
          <span className="dot">•</span>
          <span>Sonny Angel F1 Series</span>
        </div>
      </footer>
    </div>
  );
}
export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

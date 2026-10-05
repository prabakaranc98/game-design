import { useEffect, useState } from 'react';
import LearnApp from './learn/LearnApp.jsx';
import PlayApp from './play/PlayApp.jsx';
import BoardsApp from './BoardsApp.jsx';

// #/learn/… teaching slides and study guide (default) · #/play/… session game · #/01/… AI × Games board
const route = () => {
  const h = window.location.hash;
  if (h.startsWith('#/play')) return 'play';
  if (/^#\/\d{2}/.test(h)) return 'boards';
  return 'learn';
};

export default function App() {
  const [view, setView] = useState(route);
  useEffect(() => {
    const onHash = () => setView(route());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  if (view === 'play') return <PlayApp />;
  if (view === 'boards') return <BoardsApp />;
  return <LearnApp />;
}

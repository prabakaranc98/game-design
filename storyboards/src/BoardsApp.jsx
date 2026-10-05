import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { BOARDS, DEFAULT_BOARD } from './boards/index.js';
import { Notes, Panel, pad } from './components/Frame.jsx';

const THEME_KEY = 'storyboard-theme';

const findBoard = (id) => BOARDS.find((b) => b.id === id) ?? BOARDS.find((b) => b.id === DEFAULT_BOARD);

// URLs look like #/02/3: board 02, frame 3.
const parseHash = () => {
  const m = window.location.hash.match(/^#\/?(\d{2})(?:\/(\d+))?$/);
  const board = findBoard(m ? m[1] : DEFAULT_BOARD);
  const n = m && m[2] ? parseInt(m[2], 10) : 1;
  return { boardId: board.id, index: Math.max(0, Math.min(board.frames.length - 1, n - 1)) };
};

const storedTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
};

const cut = {
  enter: (dir) => ({ opacity: 0, x: dir * 48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir * -48 }),
};

const KEY = [
  ['red', 'AI'],
  ['design', 'Design'],
  ['dev', 'Development'],
  ['eng', 'Engineering'],
  ['blue', 'Camera & guides'],
];

export default function BoardsApp() {
  const [pos, setPos] = useState(parseHash);
  const [dir, setDir] = useState(1);
  const [theme, setTheme] = useState(storedTheme);
  const [systemDark, setSystemDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [role, setRole] = useState('opponent');

  const board = findBoard(pos.boardId);
  const total = board.frames.length;
  const index = Math.min(pos.index, total - 1);
  const frame = board.frames[index];
  const resolved = theme ?? (systemDark ? 'dark' : 'light');

  const go = useCallback(
    (target) => {
      const n = Math.max(0, Math.min(total - 1, target));
      if (n === index) return;
      setDir(n > index ? 1 : -1);
      setPos((p) => ({ ...p, index: n }));
    },
    [index, total],
  );

  const openBoard = (id) => {
    if (id === board.id) return;
    setDir(id > board.id ? 1 : -1);
    setPos({ boardId: id, index: 0 });
  };

  const toggleTheme = useCallback(() => {
    setTheme(resolved === 'dark' ? 'light' : 'dark');
  }, [resolved]);

  useEffect(() => {
    window.history.replaceState(null, '', `#/${board.id}/${index + 1}`);
    document.title = `${board.title} · Storyboard`;
  }, [board, index]);

  useEffect(() => {
    const onHash = () => setPos(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => setSystemDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme) root.dataset.theme = theme;
    else delete root.dataset.theme;
    try {
      if (theme) localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage can be unavailable; the theme still applies for this visit */
    }
  }, [theme]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && tag !== 'BUTTON' && tag !== 'A' && tag !== 'SUMMARY')) {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === 'Home') {
        go(0);
      } else if (e.key === 'End') {
        go(total - 1);
      } else if (/^[1-9]$/.test(e.key) && Number(e.key) <= total) {
        go(Number(e.key) - 1);
      } else if (e.key === 't' || e.key === 'T') {
        toggleTheme();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, total, go, toggleTheme]);

  const accent = board.titleAccent && board.title.startsWith(board.titleAccent) ? board.titleAccent : null;

  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <header className="sheet-head">
          <div className="brand">
            <div className="boards" role="group" aria-label="Boards">
              <a className="board-tab" href="#/play/0">
                ▶ Session game
              </a>
              {BOARDS.map((b) => (
                <button key={b.id} type="button" className="board-tab" aria-pressed={b.id === board.id} onClick={() => openBoard(b.id)}>
                  <span className="board-tab-n">{b.id}</span>
                  {b.short}
                </button>
              ))}
            </div>
            <h1>
              {accent ? (
                <>
                  <span className="h1-ai">{accent}</span>
                  {board.title.slice(accent.length)}
                </>
              ) : (
                board.title
              )}
            </h1>
            <p className="subtitle">{board.subtitle}</p>
          </div>

          <dl className="fields">
            {board.fields.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
            <div>
              <dt>Pencil key</dt>
              <dd className="pencil-key">
                {KEY.map(([token, name]) => (
                  <span key={token} style={{ '--swatch': `var(--${token})` }}>
                    <i aria-hidden="true" />
                    {name}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="head-controls">
            <span className="counter" aria-live="polite">
              FR {pad(index + 1)} <span>/ {pad(total)}</span>
            </span>
            <button type="button" className="btn" onClick={toggleTheme}>
              {resolved === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </header>

        <main className="stage">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.article
              key={`${board.id}-${frame.id}`}
              className="frame"
              custom={dir}
              variants={cut}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 0.7, 0.2, 1] }}
            >
              <Panel board={board} frame={frame} index={index} theme={resolved} role={role} setRole={setRole} />
              <Notes board={board} frame={frame} role={role} setRole={setRole} />
            </motion.article>
          </AnimatePresence>
        </main>

        <nav className="filmstrip" aria-label="Frames">
          <button type="button" className="step" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous frame">
            ←
          </button>
          <ol className="strip" style={{ '--n': total }}>
            {board.frames.map((f, i) => (
              <li key={f.id}>
                <button
                  type="button"
                  className={i === index ? 'cell is-current' : 'cell'}
                  aria-current={i === index ? 'step' : undefined}
                  onClick={() => go(i)}
                >
                  <span className="cell-n">
                    {pad(i + 1)}
                    {f.time && <span className="cell-time">{f.time}</span>}
                  </span>
                  <span className="cell-t">{f.short}</span>
                </button>
              </li>
            ))}
          </ol>
          <button type="button" className="step" onClick={() => go(index + 1)} disabled={index === total - 1} aria-label="Next frame">
            →
          </button>
          <span className="hint">← → to move · 1–{total} to jump · T for theme</span>
        </nav>
      </div>
    </MotionConfig>
  );
}

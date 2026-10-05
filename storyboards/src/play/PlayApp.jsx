import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import P5Canvas from '../components/P5Canvas.jsx';
import Sheet, { SHEET_STORE } from '../components/Sheet.jsx';
import { useTheme } from '../useTheme.js';
import { CREDITS, ITEMS, LEVELS, QUEST } from './levels.js';
import { PLAYTHROUGH } from './playthrough.js';
import { EMPTY_SHEET, PACMAN, buildPrompt } from '../boards/sheet.js';
import hud, { HUD_VIEW } from '../sketches/play/hud.js';
import title from '../sketches/play/title.js';
import camera, { CAMERA_THINGS } from '../sketches/play/camera.js';
import match, { ANSWERS } from '../sketches/play/match.js';
import sort from '../sketches/play/sort.js';
import moment, { MOMENT_STEPS } from '../sketches/play/moment.js';
import boss from '../sketches/play/boss.js';
import save from '../sketches/play/save.js';

const STAGE = { W: 1000, H: 520 };
const BOSS_VIEW = { W: 1000, H: 360 };
const SAVE_VIEW = { W: 1000, H: 240 };
const BOSS_HP = 6;
const SESSION_SECONDS = 20 * 60;
const NUMBERED = LEVELS.filter((l) => l.n).length;
const JUDGEMENTS = [
  ['caught', 'Caught it'],
  ['missed', 'Missed it'],
  ['invented', 'Made it up'],
];

const levelFromHash = () => {
  const m = window.location.hash.match(/^#\/play\/(\d+)$/);
  const n = m ? parseInt(m[1], 10) : 0;
  return Math.max(0, Math.min(LEVELS.length - 1, n));
};

const freshProgress = () => ({
  camera: { found: [] },
  match: { selected: null, matched: {}, wrong: null },
  sort: { index: 0, placed: [], shakeAt: 0, dropAt: 0, dropBin: null },
  moment: { step: 0, at: [] },
  boss: { hp: BOSS_HP, tally: { caught: 0, missed: 0, invented: 0 }, hitAt: 0 },
});

const isCleared = (level, pr) => {
  switch (level.kind) {
    case 'camera':
      return pr.camera.found.length >= CAMERA_THINGS;
    case 'match':
      return Object.keys(pr.match.matched).length >= Object.keys(ANSWERS).length;
    case 'sort':
      return pr.sort.index >= PLAYTHROUGH.sortCards.length;
    case 'moment':
      return pr.moment.step >= MOMENT_STEPS;
    case 'boss':
      return pr.boss.hp <= 0;
    default:
      return false;
  }
};

// The page the boss critiques: the student's own page if it has a game name, otherwise Pac-Man.
const critiquePage = () => {
  try {
    const raw = localStorage.getItem(SHEET_STORE);
    if (raw) {
      const sheet = { ...EMPTY_SHEET, ...JSON.parse(raw) };
      if (sheet.game.trim()) return { text: buildPrompt(sheet), from: sheet.game.trim() };
    }
  } catch {
    /* fall through to the example */
  }
  return { text: buildPrompt(PACMAN), from: 'Pac-Man' };
};

const cut = {
  enter: (dir) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir * -60 }),
};

function Clock({ startedAt }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const left = startedAt ? Math.max(0, SESSION_SECONDS - Math.floor((now - startedAt) / 1000)) : SESSION_SECONDS;
  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');
  return (
    <span className={left <= 120 ? 'hud-clock is-low' : 'hud-clock'} aria-label="Time left">
      {mm}:{ss}
    </span>
  );
}

function Canvas({ sketch, view = STAGE, state, theme, label }) {
  return (
    <div className="stage-canvas">
      <P5Canvas sketch={sketch} view={view} guides={false} background="paper" state={state} theme={theme} label={label} />
    </div>
  );
}

export default function PlayApp() {
  const { resolved, toggle } = useTheme();
  const [index, setIndex] = useState(levelFromHash);
  const [dir, setDir] = useState(1);
  const [items, setItems] = useState([]);
  const collectedAt = useRef({});
  const [startedAt, setStartedAt] = useState(null);
  const [progress, setProgress] = useState(freshProgress);
  const [showNotes, setShowNotes] = useState(false);
  const [copyNote, setCopyNote] = useState('');
  const [fallback, setFallback] = useState('');

  const level = LEVELS[index];
  const cleared = isCleared(level, progress);

  const collect = useCallback((key) => {
    if (!key) return;
    if (!collectedAt.current[key]) collectedAt.current[key] = performance.now();
    setItems((prev) => (prev.includes(key) ? prev : [...prev, key]));
  }, []);

  useEffect(() => {
    if (cleared) collect(level.item);
  }, [cleared, level, collect]);

  const go = useCallback(
    (target) => {
      const n = Math.max(0, Math.min(LEVELS.length - 1, target));
      if (n === index) return;
      if (n > index) {
        collect(LEVELS[index].item);
        if (!startedAt) setStartedAt(Date.now());
      }
      setDir(n > index ? 1 : -1);
      setIndex(n);
      setCopyNote('');
      setFallback('');
    },
    [index, startedAt, collect],
  );

  useEffect(() => {
    window.history.replaceState(null, '', `#/play/${index}`);
    document.title = 'Storyboarding Games';
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const k = e.key;
      const onControl = tag === 'BUTTON' || tag === 'A' || tag === 'SUMMARY';
      if (k === 'ArrowRight' || k === 'PageDown' || ((k === 'Enter' || k === ' ') && !onControl)) {
        e.preventDefault();
        go(index + 1);
      } else if (k === 'ArrowLeft' || k === 'PageUp') {
        e.preventDefault();
        go(index - 1);
      } else if (k === 'Home') {
        go(0);
      } else if (k === 'n' || k === 'N') {
        setShowNotes((v) => !v);
      } else if (k === 't' || k === 'T') {
        toggle();
      } else if (k === 'f' || k === 'F') {
        if (document.fullscreenElement) document.exitFullscreen?.();
        else document.documentElement.requestFullscreen?.().catch(() => {});
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go, toggle]);

  const patch = (key, fn) => setProgress((pr) => ({ ...pr, [key]: { ...pr[key], ...fn(pr[key]) } }));

  const handlers = {
    camera: {
      onFind: (thing) => patch('camera', (s) => (s.found.includes(thing) ? {} : { found: [...s.found, thing] })),
    },
    match: {
      onSelect: (g) => patch('match', (s) => (s.matched[g] ? {} : { selected: g })),
      onTry: (g, pic) =>
        patch('match', (s) =>
          ANSWERS[g] === pic && !Object.values(s.matched).includes(pic)
            ? { matched: { ...s.matched, [g]: pic }, selected: null }
            : { wrong: { key: pic, at: performance.now() } },
        ),
    },
    sort: {
      onDrop: (bin) =>
        patch('sort', (s) => {
          const card = PLAYTHROUGH.sortCards[s.index];
          if (!card) return {};
          return card.bin === bin
            ? { index: s.index + 1, placed: [...s.placed, card], dropAt: performance.now(), dropBin: bin }
            : { shakeAt: performance.now() };
        }),
    },
    moment: {
      onStep: () => patch('moment', (s) => (s.step >= MOMENT_STEPS ? {} : { step: s.step + 1, at: [...s.at, performance.now()] })),
    },
  };

  const judge = (kind) =>
    patch('boss', (s) => (s.hp <= 0 ? {} : { hp: s.hp - 1, tally: { ...s.tally, [kind]: s.tally[kind] + 1 }, hitAt: performance.now() }));

  const copyPrompt = async () => {
    const { text, from } = critiquePage();
    try {
      await navigator.clipboard.writeText(text);
      setFallback('');
      setCopyNote(`Copied the page for ${from}. Paste it into Claude.`);
    } catch {
      setFallback(text);
      setCopyNote('Copying was blocked. Select the prompt below.');
    }
  };

  const stage = () => {
    switch (level.kind) {
      case 'title':
        return <Canvas sketch={title} state={{ onStart: () => go(1) }} theme={resolved} label="Press start" />;
      case 'camera':
        return <Canvas sketch={camera} state={{ ...progress.camera, ...handlers.camera }} theme={resolved} label="A room seen from above" />;
      case 'match':
        return <Canvas sketch={match} state={{ ...progress.match, ...handlers.match }} theme={resolved} label="Match games to pictures" />;
      case 'sort':
        return <Canvas sketch={sort} state={{ ...progress.sort, ...handlers.sort }} theme={resolved} label="Sort cards into mechanics, dynamics and aesthetics" />;
      case 'moment':
        return <Canvas sketch={moment} state={{ ...progress.moment, ...handlers.moment }} theme={resolved} label="Three panels and a curve" />;
      case 'sheet':
        return (
          <div className="stage-sheet">
            <Sheet mode="edit" theme={resolved} compact />
          </div>
        );
      case 'boss':
        return (
          <div className="boss">
            <div className="boss-canvas">
              <Canvas sketch={boss} view={BOSS_VIEW} state={{ hp: progress.boss.hp, max: BOSS_HP, hitAt: progress.boss.hitAt }} theme={resolved} label="The red pencil" />
            </div>
            <div className="boss-controls">
              <div className="boss-row">
                <button type="button" className="p-btn p-btn--red" onClick={copyPrompt}>
                  Copy critique prompt
                </button>
                {copyNote && <span className="boss-note">{copyNote}</span>}
              </div>
              <div className="boss-row">
                {JUDGEMENTS.map(([key, label]) => (
                  <button key={key} type="button" className="p-btn" onClick={() => judge(key)} disabled={progress.boss.hp <= 0}>
                    {label}
                    <b>{progress.boss.tally[key]}</b>
                  </button>
                ))}
              </div>
              {fallback && <textarea id="boss-prompt" className="boss-fallback" aria-label="Critique prompt" readOnly value={fallback} onFocus={(e) => e.target.select()} />}
            </div>
          </div>
        );
      case 'save':
        return (
          <div className="save">
            <div className="save-canvas">
              <Canvas sketch={save} view={SAVE_VIEW} state={{ items }} theme={resolved} label={`${items.length} of ${ITEMS.length} items saved`} />
            </div>
            <p className="quest">{QUEST}</p>
            <ul className="credits" aria-label="Credits">
              {CREDITS.map((cr) => (
                <li key={cr.text}>
                  {cr.url ? (
                    <a href={cr.url} target="_blank" rel="noreferrer">
                      {cr.text}
                    </a>
                  ) : (
                    cr.text
                  )}
                </li>
              ))}
            </ul>
            <a className="further" href="#/01/1">
              Further reading: AI × Games board
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <svg className="defs" width="0" height="0" aria-hidden="true" focusable="false">
        <filter id="pencil">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="2.6" />
        </filter>
      </svg>

      <div className="play">
        <header className="hud">
          <span className="hud-level">
            {level.n && (
              <>
                LV {level.n}
                <span>/{NUMBERED}</span>
                {' · '}
              </>
            )}
            {level.hud}
          </span>
          <div className="hud-items">
            <P5Canvas
              sketch={hud}
              view={HUD_VIEW}
              guides={false}
              background="paper"
              state={{ items, collectedAt: collectedAt.current }}
              theme={resolved}
              label={`${items.length} of ${ITEMS.length} items`}
            />
          </div>
          <Clock startedAt={startedAt} />
        </header>

        <main className="screen">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.section
              key={level.id}
              className={`level level--${level.kind}`}
              custom={dir}
              variants={cut}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.22, 0.7, 0.2, 1] }}
            >
              <h1 className="level-title">{level.title}</h1>
              <p className={cleared && level.done ? 'level-line is-done' : 'level-line'}>{cleared && level.done ? level.done : level.line}</p>
              <div className="level-stage">{stage()}</div>
            </motion.section>
          </AnimatePresence>
        </main>

        <footer className="play-foot">
          <div className="foot-nav">
            <button type="button" className="p-btn p-btn--small" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous level">
              ←
            </button>
            <button type="button" className="p-btn p-btn--small" onClick={() => go(index + 1)} disabled={index === LEVELS.length - 1} aria-label="Next level">
              →
            </button>
          </div>
          <span className="foot-keys">Enter next · N notes · F full screen · T theme</span>
        </footer>

        {showNotes && (
          <aside className="speaker" aria-label="Speaker notes">
            <span className="speaker-label">Notes · N to hide</span>
            {level.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </aside>
        )}
      </div>
    </MotionConfig>
  );
}

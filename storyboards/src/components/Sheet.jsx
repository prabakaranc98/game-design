import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import P5Canvas from './P5Canvas.jsx';
import curve, { CURVE_VIEW } from '../sketches/curve.js';
import { EMPTY_SHEET, KINDS_OF_FUN, PACMAN, PLACEHOLDERS, buildPrompt } from '../boards/sheet.js';

export const SHEET_STORE = 'storyboard-sheet-v1';
const STORE = SHEET_STORE;

// A textarea that grows to fit its text, so nothing on the page is hidden.
function GrowText(props) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fit = () => {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement);
    return () => ro.disconnect();
  }, [props.value]);
  return <textarea ref={ref} rows={2} {...props} />;
}

const loadSheet = () => {
  try {
    const raw = localStorage.getItem(STORE);
    return raw ? { ...EMPTY_SHEET, ...JSON.parse(raw) } : EMPTY_SHEET;
  } catch {
    return EMPTY_SHEET;
  }
};

// The one-page game board. "example" shows Pac-Man read-only; "edit" is the student's own page,
// saved in this browser.
export default function Sheet({ mode, theme, compact = false }) {
  const example = mode === 'example';
  const [sheet, setSheet] = useState(() => (example ? PACMAN : loadSheet()));
  const [status, setStatus] = useState('');
  const [fallback, setFallback] = useState('');
  const [armClear, setArmClear] = useState(false);
  const id = (name) => `sheet-${mode}-${name}`;

  useEffect(() => {
    if (example) return;
    try {
      localStorage.setItem(STORE, JSON.stringify(sheet));
    } catch {
      /* storage unavailable: the page still works for this visit */
    }
  }, [sheet, example]);

  useEffect(() => {
    if (!armClear) return undefined;
    const timer = setTimeout(() => setArmClear(false), 3000);
    return () => clearTimeout(timer);
  }, [armClear]);

  const update = (patch) => setSheet((s) => ({ ...s, ...patch }));
  const toggleFeel = (key) =>
    setSheet((s) => ({ ...s, feel: s.feel.includes(key) ? s.feel.filter((k) => k !== key) : [...s.feel, key] }));
  const setPanel = (i, value) => setSheet((s) => ({ ...s, panels: s.panels.map((p, j) => (j === i ? value : p)) }));

  const curveState = {
    points: sheet.curve,
    readOnly: example,
    onChange: (i, v) => setSheet((s) => ({ ...s, curve: s.curve.map((p, j) => (j === i ? v : p)) })),
  };

  const copy = async () => {
    const text = buildPrompt(sheet);
    try {
      await navigator.clipboard.writeText(text);
      setFallback('');
      setStatus('Prompt copied. Paste it into Claude.');
    } catch {
      setFallback(text);
      setStatus('Copying was blocked. Select the prompt below and copy it.');
    }
  };

  const clear = () => {
    if (!armClear) {
      setArmClear(true);
      return;
    }
    setSheet(EMPTY_SHEET);
    setArmClear(false);
    setStatus('Page cleared.');
  };

  return (
    <div className={example ? 'sheet sheet--example' : 'sheet'}>
      <div className="sheet-top">
        <label className="sheet-field" htmlFor={id('game')}>
          <span className="label">Game</span>
          <input
            id={id('game')}
            type="text"
            value={sheet.game}
            readOnly={example}
            placeholder={PLACEHOLDERS.game}
            onChange={(e) => update({ game: e.target.value })}
          />
        </label>
        {example && <span className="sheet-stamp">Worked example</span>}
        <div className="sheet-actions">
          {!compact && (
            <button type="button" className="btn btn--red" onClick={copy}>
              Copy critique prompt
            </button>
          )}
          {!example && (
            <>
              <button type="button" className="btn" onClick={() => window.print()}>
                Print
              </button>
              <button type="button" className="btn" onClick={clear}>
                {armClear ? 'Click again to clear' : 'Clear'}
              </button>
            </>
          )}
        </div>
      </div>
      {status && (
        <p className="sheet-status" role="status">
          {status}
        </p>
      )}

      <div className="sheet-mda">
        <section className="box box--feel">
          <h4 className="box-title">
            <b>1 · Feel</b>
            <span>aesthetics</span>
          </h4>
          <div className="fun-grid" role="group" aria-label="Kinds of fun">
            {KINDS_OF_FUN.map((f) => (
              <button
                key={f.key}
                type="button"
                className="fun"
                title={f.gloss}
                aria-pressed={sheet.feel.includes(f.key)}
                disabled={example}
                onClick={() => toggleFeel(f.key)}
              >
                {f.name}
              </button>
            ))}
          </div>
        </section>
        <section className="box">
          <h4 className="box-title">
            <b>2 · Happens</b>
            <span>dynamics</span>
          </h4>
          <GrowText
            id={id('happens')}
            aria-label="What happens in play"
            value={sheet.happens}
            readOnly={example}
            placeholder={PLACEHOLDERS.happens}
            onChange={(e) => update({ happens: e.target.value })}
          />
        </section>
        <section className="box">
          <h4 className="box-title">
            <b>3 · Do</b>
            <span>mechanics</span>
          </h4>
          <GrowText
            id={id('does')}
            aria-label="Rules and verbs"
            value={sheet.does}
            readOnly={example}
            placeholder={PLACEHOLDERS.does}
            onChange={(e) => update({ does: e.target.value })}
          />
        </section>
      </div>

      <div className="sheet-panels">
        <h4 className="box-title">
          <b>4 · One moment</b>
          <span>three panels</span>
        </h4>
        <div className="panels-row">
          {sheet.panels.map((text, i) => (
            <label key={i} className="mini-panel" htmlFor={id(`panel-${i}`)}>
              <span className="mini-n">{i + 1}</span>
              <GrowText
                id={id(`panel-${i}`)}
                value={text}
                readOnly={example}
                placeholder={PLACEHOLDERS.panels[i]}
                onChange={(e) => setPanel(i, e.target.value)}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="sheet-curve">
        <h4 className="box-title">
          <b>5 · Curve</b>
          <span>intensity over a session{example ? '' : ' · drag the points'}</span>
        </h4>
        <div className="curve-host">
          <P5Canvas sketch={curve} view={CURVE_VIEW} guides={false} background="paper" state={curveState} theme={theme} label="Intensity over a session" />
        </div>
      </div>

      {fallback && (
        <textarea
          id={id('prompt')}
          className="prompt-fallback"
          aria-label="Critique prompt"
          readOnly
          value={fallback}
          onFocus={(e) => e.target.select()}
        />
      )}
    </div>
  );
}

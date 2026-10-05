import P5Canvas from './P5Canvas.jsx';
import MapGrid from './MapGrid.jsx';
import Sheet from './Sheet.jsx';
import { SKETCHES } from '../sketches/index.js';
import { MILESTONES, PILLARS, ROLES } from '../boards/aiAndGames.js';
import { PACMAN, buildPrompt } from '../boards/sheet.js';

export const pad = (n) => String(n).padStart(2, '0');

export function Panel({ board, frame, index, theme, role, setRole }) {
  const sketch = SKETCHES[frame.sketch];
  const state = frame.roles ? { selected: role, onSelect: setRole } : undefined;

  let body;
  if (frame.sheet) body = <Sheet mode={frame.sheet} theme={theme} />;
  else if (sketch) body = <P5Canvas sketch={sketch} state={state} theme={theme} label={frame.action} />;
  else body = <MapGrid />;

  return (
    <section className="panel" aria-label={`Frame ${index + 1}: ${frame.title}`}>
      <div className="slug">
        <span className="slug-fr">FR {pad(index + 1)}</span>
        <span className="slug-shot">{frame.shot}</span>
        {frame.time && <span className="slug-time">{frame.time}</span>}
        <span className="slug-board">Board {board.id}</span>
      </div>
      <div className={sketch && !frame.sheet ? 'viewport' : 'viewport viewport--html'}>{body}</div>
      <p className="action">
        <span className="action-label">Action</span>
        <span className="action-text">{frame.action}</span>
      </p>
    </section>
  );
}

export function Notes({ board, frame, role, setRole }) {
  const roleData = frame.roles ? ROLES.find((r) => r.key === role) ?? ROLES[0] : null;
  const refKeys = roleData ? roleData.refs : frame.refs ?? [];

  return (
    <aside className="notes" aria-label="Frame notes">
      <h2 className="notes-title">{frame.title}</h2>

      {frame.elements && (
        <dl className="elements">
          {frame.elements.map((e) => (
            <div key={e.term} className="element">
              <dt>
                {e.term}
                {e.tag && <span className="tag">{e.tag}</span>}
              </dt>
              <dd>{e.text}</dd>
            </div>
          ))}
        </dl>
      )}

      {frame.kinds && <Kinds items={frame.kinds} />}
      {frame.steps && <Steps label={frame.steps.label} items={frame.steps.items} />}
      {frame.pillars && <Pillars pillars={frame.pillars} />}
      {roleData && <Roles current={roleData} setRole={setRole} />}
      {frame.milestones && <Milestones />}
      {frame.upcoming && <List label={frame.upcomingLabel ?? 'Next'} items={frame.upcoming} />}

      {frame.note && (
        <p className="note">
          <span className="label">Note</span>
          {frame.note}
        </p>
      )}

      {frame.prompt && (
        <details className="prompt-details">
          <summary>The critique prompt, filled in for Pac-Man</summary>
          <pre className="prompt">{buildPrompt(PACMAN)}</pre>
        </details>
      )}

      {frame.question && (
        <div className="question">
          <span className="label">Open question</span>
          <p>{frame.question}</p>
        </div>
      )}

      {frame.collectQuestions && <AllQuestions board={board} />}
      {refKeys.length > 0 && <Refs refs={board.refs} keys={refKeys} />}
    </aside>
  );
}

function Kinds({ items }) {
  return (
    <div className="kinds">
      {items.map((k) => (
        <div key={k.name} className="kind">
          <h3 className="kind-name">
            {k.name}
            <span>{k.what}</span>
          </h3>
          <p className="kind-example">{k.example}</p>
          <p className="kind-best">
            <span className="kind-best-label">Best for</span> {k.bestFor}
          </p>
        </div>
      ))}
    </div>
  );
}

function Steps({ label, items }) {
  return (
    <div>
      <span className="label">{label}</span>
      <ol className="steps">
        {items.map((s, i) => (
          <li key={s.term}>
            <span className="step-n">{i + 1}</span>
            <span>
              <b>{s.term}</b> {s.text}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Pillars({ pillars }) {
  return (
    <div className="pillars">
      {Object.entries(pillars).map(([key, items]) => (
        <section key={key} className="pillar" style={{ '--pillar': `var(--${key})` }}>
          <h3>
            <span className="pillar-name">{PILLARS[key].name}</span>
            <span className="pillar-tag">{PILLARS[key].tagline}</span>
          </h3>
          <ul className="squares">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Roles({ current, setRole }) {
  return (
    <div className="roles">
      <div className="role-chips" aria-label="Roles AI can play during play">
        {ROLES.map((r, i) => (
          <button key={r.key} type="button" className="chip" aria-pressed={r.key === current.key} onClick={() => setRole(r.key)}>
            <span className="chip-n">{i + 1}</span>
            {r.name}
          </button>
        ))}
      </div>
      <div className="role-card" aria-live="polite">
        <h3>{current.name}</h3>
        <p className="role-does">{current.does}</p>
        <ul className="ticks">
          {current.examples.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <p className="note">
          <span className="label">Design note</span>
          {current.note}
        </p>
      </div>
    </div>
  );
}

function Milestones() {
  return (
    <ol className="milestones">
      {MILESTONES.map((m) => (
        <li key={m.year + m.game} className={`ms ms--${m.kind}`}>
          <span className="ms-year">{m.year}</span>
          <span className="ms-body">
            <span className="ms-game">{m.game}</span> {m.text}
          </span>
        </li>
      ))}
    </ol>
  );
}

function List({ label, items }) {
  return (
    <div>
      <span className="label">{label}</span>
      <ul className="squares" style={{ '--pillar': 'var(--design)' }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function AllQuestions({ board }) {
  return (
    <div className="question">
      <span className="label">Open questions from this board</span>
      <ol className="all-questions">
        {board.frames.map((f, i) =>
          f.question ? (
            <li key={f.id}>
              <span className="aq-fr">FR {pad(i + 1)}</span>
              <span>{f.question}</span>
            </li>
          ) : null,
        )}
      </ol>
    </div>
  );
}

function Refs({ refs, keys }) {
  return (
    <div className="refs">
      <span className="label">References</span>
      <ul>
        {keys.map((k) => {
          const r = refs[k];
          if (!r) return null;
          return (
            <li key={k}>
              {r.url ? (
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.text}
                </a>
              ) : (
                r.text
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import { useEffect, useState } from 'react';
import {
  AI_PIPELINE, ANGLES, BRANCH_PATTERNS, CHECKS, CONCEPTS, FILM_VS_GAME, FORMATS, GLOSSARY, HARD_PROBLEMS, JENKINS,
  MCCLOUD, MODULES, NORMS, OPEN_QUESTIONS, PHASES, PRODUCTION_PHASES, READING_PATH, READINGS, REFS, RISKS, ROLES,
  SPLIT, STACK, SUBTITLE, THREADS, TITLE, WHAM_NEEDS,
} from './content.js';
import { ACCELERATION, BOOKS, CASES, CONCEPT_EXTRAS, EXEMPLARS, EX_SECTION, EXERCISES, INDUSTRY, INQUIRY, MYTHS, STANDARDS } from './craft.js';
import { DIAGRAMS } from './diagrams.jsx';
import { CASE_PHOTOS, GALLERIES, IMAGES, SECTION_PHOTOS, STANDARD_PHOTOS } from './images.js';
import { BookCover, Photo } from './Deck.jsx';

const TOC = [
  ['start', 'How to use this guide'],
  ...MODULES.slice(0, 3).map((m) => [m.id, `${String(m.n).padStart(2, '0')} · ${m.title}`]),
  ['exemplars', 'Exemplars: what to steal'],
  ...MODULES.slice(3).map((m) => [m.id, `${String(m.n).padStart(2, '0')} · ${m.title}`]),
  ['standards', 'Craft standards'],
  ['synthesis', 'Synthesis'],
  ['glossary', 'Glossary'],
  ['readings', 'Reading path'],
  ['credits', 'Image credits'],
];

function Ref({ k }) {
  const r = REFS[k];
  if (!r) return null;
  return (
    <>
      {r.url ? (
        <a href={r.url} target="_blank" rel="noreferrer">{r.text}</a>
      ) : (
        r.text
      )}
      {r.course && <span className="g-tag">course</span>}
      {r.free && <span className="g-tag g-tag--free">free</span>}
    </>
  );
}

function Table({ head, rows, accent }) {
  return (
    <div className="g-table-wrap">
      <table className="g-table">
        <thead>
          <tr>{head.map((h, i) => <th key={h} className={i === accent ? 'is-accent' : undefined}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Concept({ c }) {
  return (
    <article className="g-concept" id={`c-${c.id}`}>
      <h4>{c.title}</h4>
      <p className="g-idea">{c.idea}</p>
      <dl>
        <dt>For boards</dt>
        <dd>{c.matters}</dd>
        <dt className="is-accent">Nuance</dt>
        <dd>{c.nuance}</dd>
        <dt>Example</dt>
        <dd>{c.example}</dd>
        {CONCEPT_EXTRAS[c.id] && (
          <>
            <dt>Common mistake</dt>
            <dd>{CONCEPT_EXTRAS[c.id].mistake}</dd>
            <dt className="is-accent">Ask yourself</dt>
            <dd className="g-ask">{CONCEPT_EXTRAS[c.id].ask}</dd>
          </>
        )}
      </dl>
      {c.refs.length > 0 && (
        <p className="g-sources">
          {c.refs.map((k, i) => (
            <span key={k}>
              {i > 0 && ' · '}
              {REFS[k]?.text}
            </span>
          ))}
        </p>
      )}
    </article>
  );
}

function Figure({ name }) {
  const D = DIAGRAMS[name];
  return D ? <div className="g-fig"><D step={99} /></div> : null;
}

function Cases({ module }) {
  const list = CASES.filter((c) => c.module === module);
  if (!list.length) return null;
  return (
    <section className="g-extra">
      <h3>Case studies</h3>
      {list.map((c) => (
        <article key={c.id} className="g-case" id={`case-${c.id}`}>
          <p className="g-case-meta">{[c.game, c.studio, c.year].filter(Boolean).join(' · ')}</p>
          <h4>{c.title}</h4>
          {c.figure && <Figure name={c.figure} />}
          {CASE_PHOTOS[c.id] && <Photo id={CASE_PHOTOS[c.id]} className="g-photo" />}
          <dl>
            <dt>What they did</dt><dd>{c.did}</dd>
            <dt>What it teaches</dt><dd>{c.teaches}</dd>
            <dt className="is-accent">Discuss</dt><dd className="g-ask">{c.discuss}</dd>
          </dl>
          <p className="g-sources">{c.refs.map((k) => REFS[k]?.text).filter(Boolean).join(' · ')}</p>
        </article>
      ))}
    </section>
  );
}

function Practice({ module }) {
  const ex = EXERCISES.filter((e) => e.module === module);
  const inq = INQUIRY[module];
  return (
    <>
      <section className="g-extra">
        <h3>Myth vs reality</h3>
        <Table head={['Myth', 'Reality']} rows={MYTHS[module]} />
      </section>
      {ex.length > 0 && (
        <section className="g-extra">
          <h3>Try this</h3>
          {ex.map((e) => (
            <article key={e.id} className="g-exercise">
              <h4>{e.title} <span className="g-tag">{e.time}</span></h4>
              <ol>{e.steps.map((st) => <li key={st}>{st}</li>)}</ol>
              <p className="g-note"><strong>Output:</strong> {e.output}</p>
            </article>
          ))}
        </section>
      )}
      {inq && (
        <section className="g-extra">
          <h3>Inquiry</h3>
          <p className="g-scenario">{inq.scenario}</p>
          <ol className="g-questions">{inq.questions.map((q) => <li key={q}>{q}</li>)}</ol>
        </section>
      )}
    </>
  );
}

function Galleries({ module }) {
  const list = Object.values(GALLERIES).filter((g) => g.module === module);
  if (!list.length) return null;
  return (
    <section className="g-extra">
      <h3>Look closer</h3>
      {list.map((g) => (
        <article key={g.title} className="g-gallery">
          <h4>{g.title}</h4>
          <div className="g-gallery-row">
            {g.items.map((id, i) => (
              <div key={id}>
                <Photo id={id} className="g-photo" />
                {g.answers && <p className="g-note"><strong>Board first:</strong> {g.answers[i]}</p>}
              </div>
            ))}
          </div>
          <p className="g-ask">{g.ask}</p>
        </article>
      ))}
    </section>
  );
}

function Exemplars() {
  return (
    <section className="g-module" id="exemplars">
      <p className="g-kicker">Exemplars</p>
      <h2>{EX_SECTION.title}</h2>
      <p className="g-lead">{EX_SECTION.question}</p>
      <p className="g-answer">{EX_SECTION.answer}</p>
      <p className="g-note">Figures show each game’s structure as a diagram; they are not screenshots.</p>
      {EXEMPLARS.map((e) => (
        <article key={e.id} className="g-case" id={`ex-${e.id}`}>
          <p className="g-case-meta">{e.category} · {e.studio} · {e.year}</p>
          <h4>{e.game}</h4>
          <Figure name={e.figure} />
          <dl>
            <dt>What they did</dt><dd>{e.did}</dd>
            <dt className="is-accent">Steal this</dt><dd className="g-ask">{e.steal}</dd>
            <dt>Mechanics</dt><dd>{e.mda[0]}</dd>
            <dt>Dynamics</dt><dd>{e.mda[1]}</dd>
            <dt>Aesthetics</dt><dd>{e.mda[2]}</dd>
          </dl>
          <p className="g-sources">{e.refs.map((k) => REFS[k]?.text).filter(Boolean).join(' · ')}</p>
        </article>
      ))}
    </section>
  );
}

const STANDARD_FIGS = { shotSizes: 'shotSizes', cameraMoves: 'cameraMoves', panel: 'panelAnatomy' };

function Standards() {
  return (
    <section className="g-module" id="standards">
      <p className="g-kicker">Reference</p>
      <h2>Craft standards</h2>
      <p className="g-lead">The working vocabulary of boards in film and games.</p>
      {Object.entries(STANDARDS).map(([key, st]) => (
        <section key={key} className="g-extra">
          <h3>{st.title}</h3>
          {STANDARD_FIGS[key] && <Figure name={STANDARD_FIGS[key]} />}
          {STANDARD_PHOTOS[key] && <Photo id={STANDARD_PHOTOS[key]} className="g-photo" />}
          <Table head={st.rows[0].length === 3 ? ['Term', 'Name', 'Meaning'] : ['Term', 'Meaning']} rows={st.rows} />
          {st.note && <p className="g-note">{st.note}</p>}
        </section>
      ))}
    </section>
  );
}

function Credits() {
  const list = Object.values(IMAGES);
  return (
    <section className="g-module" id="credits">
      <p className="g-kicker">Image credits</p>
      <h2>Photographs</h2>
      {list.length === 0 ? (
        <p className="g-note">No photographs yet.</p>
      ) : (
        <ul className="g-reads">
          {list.map((img) => (
            <li key={img.src}>
              <a href={img.page} target="_blank" rel="noreferrer">{img.caption}</a>
              <span className="g-gives">{img.author} · {img.license} · Wikimedia Commons</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Extras({ id }) {
  if (id === 'm2') {
    return (
      <section className="g-extra">
        <h3>Reference · McCloud’s six panel transitions</h3>
        <Table head={['Transition', 'What the reader fills in']} rows={MCCLOUD} />
      </section>
    );
  }
  if (id === 'm3') {
    return (
      <>
        <section className="g-extra">
          <h3>Reference · Film board vs game board</h3>
          <Table head={['Film storyboard', 'Game storyboard']} rows={FILM_VS_GAME} />
        </section>
        <section className="g-extra">
          <h3>Reference · Jenkins’ four kinds of spatial story</h3>
          <Table head={['Kind', 'What it is', 'Example']} rows={JENKINS.map((j) => [j.name, j.line, j.example])} />
        </section>
        <section className="g-extra">
          <h3>Reference · The storyboarding stack</h3>
          <Table head={['#', 'Layer', 'Unit', 'Methods', 'References']} rows={STACK.map((s) => [s.n, s.layer, s.unit, s.methods, s.refs])} />
        </section>
        <section className="g-extra">
          <h3>Reference · Branching patterns (Ashwell)</h3>
          <Table head={['Pattern', 'Shape']} rows={BRANCH_PATTERNS.map((b) => [b.name, b.line])} />
        </section>
        <section className="g-extra g-studio">
          <h3>In the studio · production phases</h3>
          <Table head={['Phase', 'Goal', 'Boards in use', 'Ends at']} rows={PRODUCTION_PHASES.map((p) => [p.phase, p.goal, p.boards, p.gate])} />
          <p className="g-note">Phase names and gates vary by studio. The order is common.</p>
          <h3>In the studio · who makes and reads the boards</h3>
          <Table head={['Role', 'Makes', 'Uses the boards to']} rows={ROLES.map((r) => [r.role, r.makes, r.uses])} />
          <h3>In the studio · communication formats</h3>
          <Table head={['Format', 'What it is']} rows={FORMATS.map((f) => [f.name, f.line])} />
          <h3>In the studio · working norms</h3>
          <Table head={['Norm', 'In practice']} rows={NORMS.map((n) => [n.name, n.line])} />
        </section>
      </>
    );
  }
  if (id === 'm4') {
    return (
      <>
        <section className="g-extra">
          <h3>Reference · One stack, many models</h3>
          <Table head={['Layer', 'Representation', 'Kind of model']} rows={STACK.map((s) => [s.layer, s.rep, s.ai])} />
        </section>
        <section className="g-extra">
          <h3>Reference · Where AI enters the pipeline</h3>
          <Table head={['Stage', 'Traditionally', 'AI’s role', 'The hard engineering problem']} rows={AI_PIPELINE.map((r) => [r.stage, r.traditional, r.ai, r.hard])} accent={3} />
        </section>
        <section className="g-extra">
          <h3>Reference · Four hard problems</h3>
          <Table head={['Problem', 'What it means']} rows={HARD_PROBLEMS.map((h) => [h.name, h.line])} />
          <h3>Reference · What creatives need (Muse study)</h3>
          <Table head={['Need', 'What it means']} rows={WHAM_NEEDS.map((w) => [w.name, w.line])} />
        </section>
        <section className="g-extra">
          <h3>Reference · Risks, by strength of evidence</h3>
          <Table head={['Risk', 'Claim', 'Evidence', 'Basis']} rows={RISKS.map((r) => [r.name, r.claim, r.evidence, r.basis])} />
        </section>
        <section className="g-extra">
          <h3>Reference · AI in studios today: what is claimed</h3>
          <Table head={['Company', 'Tool', 'Layer', 'What it speeds up', 'Evidence']} rows={INDUSTRY} accent={4} />
          <p className="g-note">Most numbers come from the companies themselves. Ask what was measured: speed, volume, play time or quality?</p>
          <h3>Reference · Four ways studios use AI to go faster</h3>
          <Table head={['Pattern', 'What it means', 'Examples']} rows={ACCELERATION.map((a) => [a.name, a.line, a.note])} />
        </section>
        <section className="g-extra">
          <h3>Reference · Mixed initiative</h3>
          <Table head={['AI proposes', 'The human decides']} rows={SPLIT.ai.map((a, i) => [a, SPLIT.human[i]])} />
        </section>
      </>
    );
  }
  return null;
}

function Module({ m, openSlides }) {
  const concepts = CONCEPTS.filter((c) => c.module === m.id);
  return (
    <section className="g-module" id={m.id}>
      <p className="g-kicker">Module {String(m.n).padStart(2, '0')}</p>
      <h2>{m.title}</h2>
      <p className="g-lead">{m.question}</p>
      <p className="g-answer">{m.answer}</p>
      {SECTION_PHOTOS[m.id] && <Photo id={SECTION_PHOTOS[m.id]} className="g-photo" />}

      <dl className="g-www">
        <dt>What</dt><dd>{m.what}</dd>
        <dt>Why</dt><dd>{m.why}</dd>
        <dt>How</dt><dd>{m.how}</dd>
      </dl>

      {PHASES.map((ph) => {
        const list = concepts.filter((c) => c.phase === ph);
        if (!list.length) return null;
        return (
          <section key={ph} className="g-phase">
            <h3 className="g-phase-h">{ph}</h3>
            {list.map((c) => <Concept key={c.id} c={c} />)}
          </section>
        );
      })}

      <Extras id={m.id} />
      <Cases module={m.id} />
      <Galleries module={m.id} />
      <Practice module={m.id} />

      <section className="g-extra">
        <h3>Check yourself</h3>
        <p className="g-note">Answer out loud first, then open.</p>
        {CHECKS[m.id].map((it) => (
          <details key={it.q} className="g-check">
            <summary>{it.q}</summary>
            <p>{it.a}</p>
          </details>
        ))}
      </section>

      <section className="g-extra">
        <h3>Readings</h3>
        <p className="g-sub">Core</p>
        <ul className="g-reads">
          {READINGS[m.id].core.map(([k, gives]) => (
            <li key={k}><Ref k={k} /><span className="g-gives">{gives}</span></li>
          ))}
        </ul>
        <p className="g-sub">Shelf · optional depth</p>
        <ul className="g-reads">
          {READINGS[m.id].shelf.map(([k, gives]) => (
            <li key={k}><Ref k={k} /><span className="g-gives">{gives}</span></li>
          ))}
        </ul>
      </section>

      <button type="button" className="g-link" onClick={() => openSlides(m.id)}>Open this module in the slides →</button>
    </section>
  );
}

export default function Guide({ section, openSlides, toggleTheme }) {
  const [active, setActive] = useState(section || 'start');

  useEffect(() => {
    if (section) document.getElementById(section)?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [section]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let current = TOC[0][0];
        for (const [id] of TOC) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 140) current = id;
        }
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', `#/learn/guide/${id}`);
  };

  return (
    <div className="guide">
      <aside className="g-toc" aria-label="Contents">
        <p className="g-toc-title">Study guide</p>
        <nav>
          {TOC.map(([id, label]) => (
            <button key={id} type="button" className={active === id ? 'is-on' : undefined} onClick={() => jump(id)}>{label}</button>
          ))}
        </nav>
        <div className="g-toc-actions">
          <button type="button" onClick={() => openSlides('intro')}>Open slides</button>
          <button type="button" onClick={toggleTheme}>Theme</button>
        </div>
      </aside>

      <main className="g-main">
        <header className="g-head" id="start">
          <p className="g-kicker">Study guide</p>
          <h1>{TITLE}</h1>
          <p className="g-lead">{SUBTITLE}</p>
          <ol className="g-howto">
            <li>The guide follows four questions: game design, storyboarding, storyboarding for games, and how AI helps. Each is answered as what, why and how.</li>
            <li>Every concept has the idea, why it matters for boards, the nuance people miss, an example and its source.</li>
            <li>End each module with the check questions before opening the answers. The slides cover the same material visually.</li>
          </ol>
          <h3>Two books for the habits behind good work</h3>
          <div className="g-books">
            {BOOKS.map((b) => (
              <article key={b.id} className="g-book">
                <BookCover book={b} />
                <div>
                  <h4>{b.title}</h4>
                  <p className="g-case-meta">{b.author} · {b.year}{b.course ? ' · course' : ''}</p>
                  <ol className="g-maxims">
                    {b.maxims.map((m) => (
                      <li key={m.text} className={m.use ? 'is-key' : undefined}>
                        {m.text}{m.note && <span className="g-maxim-note"> {m.note}</span>}
                        {m.use && <span className="g-maxim-use">{m.use}</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>
          <div className="g-map">
            {MODULES.map((m) => (
              <button key={m.id} type="button" className="g-map-card" onClick={() => jump(m.id)}>
                <span className="g-num">{String(m.n).padStart(2, '0')}</span>
                <strong>{m.title}</strong>
                <span>{m.question}</span>
                <em>{m.answer}</em>
              </button>
            ))}
          </div>
        </header>

        {MODULES.slice(0, 3).map((m) => <Module key={m.id} m={m} openSlides={openSlides} />)}
        <Exemplars />
        {MODULES.slice(3).map((m) => <Module key={m.id} m={m} openSlides={openSlides} />)}

        <Standards />

        <section className="g-module" id="synthesis">
          <p className="g-kicker">Synthesis</p>
          <h2>Pulling it together</h2>
          <h3>Two threads through all four modules</h3>
          {THREADS.map((t) => (
            <p key={t.name} className="g-thread"><strong>{t.name}.</strong> {t.steps.join(' → ')}</p>
          ))}
          <h3>Four angles for the talk</h3>
          <Table head={['Angle', 'What it covers', 'Note']} rows={ANGLES.map((a) => [`${a.key} · ${a.name}`, a.line, a.note])} />
          <h3>Questions to argue about</h3>
          <ol className="g-questions">
            {OPEN_QUESTIONS.map((q) => <li key={q}>{q}</li>)}
          </ol>
        </section>

        <section className="g-module" id="glossary">
          <p className="g-kicker">Glossary</p>
          <h2>Terms</h2>
          <dl className="g-glossary">
            {GLOSSARY.map(([term, def]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{def}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="g-module" id="readings">
          <p className="g-kicker">Reading path</p>
          <h2>If you read only nine things</h2>
          <ol className="g-reads g-reads--path">
            {READING_PATH.map((k) => <li key={k}><Ref k={k} /></li>)}
          </ol>
          <p className="g-note">Course marks readings already on the syllabus. Free marks readings available openly online.</p>
        </section>

        <Credits />
      </main>
    </div>
  );
}


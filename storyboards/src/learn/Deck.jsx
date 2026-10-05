import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MODULE_LABEL, MODULE_ORDER, SLIDES } from './slides.js';
import { CHECKS, CONCEPTS, MODULES, OPEN_QUESTIONS, READING_PATH, REFS, RISKS, SPLIT, STACK, SUBTITLE } from './content.js';
import { DIAGRAMS } from './diagrams.jsx';
import { BOOKS, CASES, CONCEPT_EXTRAS, EXEMPLARS, EX_SECTION, EXERCISES, INQUIRY, MYTHS, STANDARDS } from './craft.js';
import { CASE_PHOTOS, GALLERIES, IMAGES, SECTION_PHOTOS } from './images.js';

const W = 1280;
const H = 720;
const MOD = Object.fromEntries(MODULES.map((m) => [m.id, m]));
const NUM = { intro: '00', m1: '01', m2: '02', m3: '03', ex: 'EX', m4: '04', syn: '05' };
const concept = (id) => CONCEPTS.find((c) => c.id === id);

function Reveal({ show = true, className, children, delay = 0, as = 'div' }) {
  const M = motion[as];
  return (
    <M className={className} initial={false} aria-hidden={!show}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }} transition={{ duration: 0.3, delay: show ? delay : 0 }}>
      {children}
    </M>
  );
}

function Sources({ keys }) {
  if (!keys?.length) return null;
  return (
    <p className="s-sources">
      <span>Source</span>
      {keys.map((k) => REFS[k]?.text).filter(Boolean).join(' · ')}
    </p>
  );
}

export function Photo({ id, className }) {
  const img = IMAGES[id];
  if (!img) return null;
  return (
    <figure className={className ? `photo ${className}` : 'photo'}>
      <img src={img.src} alt={img.alt} loading="lazy" />
      <figcaption>
        <span>{img.caption}</span>
        <span className="photo-credit">{img.author} · {img.license} · Wikimedia Commons</span>
      </figcaption>
    </figure>
  );
}

function Diagram({ name, step }) {
  const D = DIAGRAMS[name];
  return D ? <D step={step} /> : null;
}

// ---------------------------------------------------------------- slide layouts
function TitleSlide() {
  return (
    <div className="s-title">
      <svg className="s-title-strip" viewBox="0 0 620 120" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={6 + i * 152} y={10} width={136} height={96} className={i === 2 ? 's-frame s-frame--accent' : 's-frame'} />
        ))}
      </svg>
      <h1>AI and Storyboarding<br />for Game Design</h1>
      <p className="s-title-sub">{SUBTITLE}</p>
      <p className="s-hint">→ to step through · O overview · G study guide · F full screen</p>
    </div>
  );
}

function RoadmapSlide({ step }) {
  return (
    <div className="s-body">
      <h2 className="s-h">Four questions, in order</h2>
      <ol className="s-roadmap">
        {MODULES.map((m, i) => (
          <Reveal as="li" key={m.id} show={step >= i}>
            <span className="s-num">{NUM[m.id]}</span>
            <span className="s-roadmap-title">{m.title}</span>
            <span className="s-roadmap-q">{m.question}</span>
            <span className="s-roadmap-phases">what · why · how</span>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

function StatementSlide({ slide, step }) {
  return (
    <div className="s-statement">
      <p className="s-kicker">{slide.title}</p>
      {slide.lines.map((line, i) => (
        <Reveal as="p" key={line} className={i === slide.lines.length - 1 ? 's-big s-big--accent' : 's-big'} show={step >= i}>
          {line}
        </Reveal>
      ))}
    </div>
  );
}

function SectionSlide({ slide, step }) {
  const m = MOD[slide.module] ?? EX_SECTION;
  return (
    <div className={SECTION_PHOTOS[m.id] ? 's-section has-photo' : 's-section'}>
      <div className="s-section-text">
        <span className="s-section-num">{NUM[m.id]}</span>
        <h2>{m.title}</h2>
        <p className="s-section-q">{m.question}</p>
        <Reveal as="p" className="s-section-a" show={step >= 1}>{m.answer}</Reveal>
      </div>
      {SECTION_PHOTOS[m.id] && <Photo id={SECTION_PHOTOS[m.id]} className="s-section-photo" />}
    </div>
  );
}

function ConceptSlide({ slide, step }) {
  const c = concept(slide.concept);
  const last = step >= slide.steps;
  return (
    <div className="s-concept">
      <div className="s-concept-text">
        <h2 className="s-h">{c.title}</h2>
        <p className="s-idea">{c.idea}</p>
        <p className="s-matters"><span className="s-label">For boards</span>{c.matters}</p>
        <Reveal className="s-more" show={last}>
          <p><span className="s-label s-label--accent">Nuance</span>{c.nuance}</p>
          <p><span className="s-label">Example</span>{c.example}</p>
        </Reveal>
        <Sources keys={c.refs} />
      </div>
      <div className="s-concept-fig">
        <Diagram name={slide.diagram} step={step} />
        <Reveal className="s-ask" show={last}>
          <span className="s-label s-label--accent">Ask the room</span>
          <p>{CONCEPT_EXTRAS[slide.concept]?.ask}</p>
        </Reveal>
      </div>
    </div>
  );
}

function DiagramSlide({ slide, step }) {
  return (
    <div className="s-body">
      <h2 className="s-h">{slide.title}</h2>
      <div className="s-fig">
        <Diagram name={slide.diagram} step={step} />
      </div>
      <div className="s-captions">
        {(slide.captions ?? []).map((cap) => (
          <Reveal as="p" key={cap.text} show={step >= cap.at}>{cap.text}</Reveal>
        ))}
      </div>
      <Sources keys={slide.refs} />
    </div>
  );
}

function TableSlide({ slide, step }) {
  const all = slide.reveal === 'all';
  const footerAt = all ? 1 : slide.rows.length;
  return (
    <div className="s-body">
      <h2 className="s-h">{slide.title}</h2>
      {slide.intro && <p className="s-intro">{slide.intro}</p>}
      <table className={`s-table s-table--${slide.columns.length}${slide.compact ? ' s-table--compact' : ''}`}>
        <thead>
          <tr>
            {slide.columns.map((c, i) => (
              <th key={c} className={i === slide.accentColumn ? 'is-accent' : undefined}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {slide.rows.map((row, r) => (
            <Reveal as="tr" key={row[0]} show={all || step >= r}>
              {row.map((cell, i) => (
                <td key={i} className={i === slide.accentColumn ? 'is-accent' : undefined}>{cell}</td>
              ))}
            </Reveal>
          ))}
        </tbody>
      </table>
      {slide.footer && <Reveal as="p" className="s-footer" show={step >= footerAt}>{slide.footer}</Reveal>}
      <Sources keys={slide.refs} />
    </div>
  );
}

function CardsSlide({ slide, step }) {
  const all = slide.reveal === 'all';
  const cols = slide.columns ?? Math.min(4, slide.cards.length);
  return (
    <div className="s-body">
      <h2 className="s-h">{slide.title}</h2>
      {slide.intro && <p className="s-intro">{slide.intro}</p>}
      <div className="s-cards" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {slide.cards.map((card, i) => (
          <Reveal key={card.name} className={card.accent ? 's-card is-accent' : 's-card'} show={all || step >= i}>
            <h3>{card.name}</h3>
            <p>{card.line}</p>
            {card.note && <p className="s-card-note">{card.note}</p>}
          </Reveal>
        ))}
      </div>
      {slide.footer && <Reveal as="p" className="s-footer" show={step >= (all ? 1 : slide.cards.length)}>{slide.footer}</Reveal>}
      <Sources keys={slide.refs} />
    </div>
  );
}

const STACK_GROUPS = [
  { name: 'Structure', layers: [1, 2, 3] },
  { name: 'Experience', layers: [4, 5, 6] },
  { name: 'Production', layers: [7, 8, 9] },
];

function StackSlide({ slide, step }) {
  const [sel, setSel] = useState(6);
  const layer = STACK.find((s) => s.n === sel);
  return (
    <div className="s-body">
      <h2 className="s-h">{slide.title}</h2>
      <div className="s-stack">
        <div className="s-stack-list">
          {STACK_GROUPS.map((g, gi) => (
            <Reveal key={g.name} className="s-stack-group" show={step >= gi}>
              <span className="s-label">{g.name}</span>
              {g.layers.map((n) => {
                const s = STACK.find((x) => x.n === n);
                return (
                  <button key={n} type="button" className={n === sel ? 's-stack-row is-on' : 's-stack-row'} onClick={() => setSel(n)} tabIndex={step >= gi ? 0 : -1}>
                    <span className="s-num">{String(n).padStart(2, '0')}</span>
                    <span className="s-stack-layer">{s.layer}</span>
                    <span className="s-stack-unit">{s.unit}</span>
                  </button>
                );
              })}
            </Reveal>
          ))}
        </div>
        <div className="s-stack-detail" aria-live="polite">
          <span className="s-num s-num--big">{String(layer.n).padStart(2, '0')}</span>
          <h3>{layer.layer}</h3>
          <dl>
            <dt>Unit</dt><dd>{layer.unit}</dd>
            <dt>Methods</dt><dd>{layer.methods}</dd>
            <dt>References</dt><dd>{layer.refs}</dd>
            <dt>Representation</dt><dd>{layer.rep}</dd>
          </dl>
          <p className="s-stack-hint">Select a layer.</p>
        </div>
      </div>
      <Sources keys={slide.refs} />
    </div>
  );
}

function CheckSlide({ slide, step }) {
  const items = CHECKS[slide.module];
  return (
    <div className="s-body">
      <h2 className="s-h">{slide.title}</h2>
      <ol className="s-check">
        {items.map((it, i) => (
          <li key={it.q}>
            <p className="s-check-q">{it.q}</p>
            <Reveal as="p" className="s-check-a" show={step > i}>{it.a}</Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

const EVIDENCE_CLASS = { Evidence: 'is-evidence', Hypothesis: 'is-hypothesis', 'Claim to test': 'is-claim' };

function RisksSlide({ slide, step }) {
  return (
    <div className="s-body">
      <h2 className="s-h">{slide.title}</h2>
      <div className="s-risks">
        <div className="s-risks-fig">
          <Diagram name="costFidelity" step={step} />
        </div>
        <div className="s-risks-list">
          {RISKS.map((r, i) => (
            <Reveal key={r.name} className="s-risk" show={step >= i}>
              <div className="s-risk-head">
                <h3>{r.name}</h3>
                <span className={`s-tag ${EVIDENCE_CLASS[r.evidence]}`}>{r.evidence}</span>
              </div>
              <p>{r.claim}</p>
              <p className="s-card-note">{r.basis}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <Sources keys={slide.refs} />
    </div>
  );
}

function SplitSlide({ slide, step }) {
  return (
    <div className="s-body">
      <h2 className="s-h">{slide.title}</h2>
      <div className="s-split">
        <div>
          <h3 className="is-accent">AI proposes</h3>
          <ul>{SPLIT.ai.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <Reveal show={step >= 1}>
          <h3>The human decides</h3>
          <ul>{SPLIT.human.map((x) => <li key={x}>{x}</li>)}</ul>
        </Reveal>
      </div>
      <Sources keys={slide.refs} />
    </div>
  );
}

function QuestionsSlide({ slide, step }) {
  return (
    <div className="s-body">
      <h2 className="s-h">{slide.title}</h2>
      <ol className="s-questions">
        {OPEN_QUESTIONS.map((q, i) => (
          <Reveal as="li" key={q} show={step >= i}>{q}</Reveal>
        ))}
      </ol>
    </div>
  );
}

function ReadingsSlide({ slide }) {
  return (
    <div className="s-body">
      <h2 className="s-h">{slide.title}</h2>
      <ol className="s-readings">
        {READING_PATH.map((k) => (
          <li key={k}>
            {REFS[k].text}
            {REFS[k].course && <span className="s-tag is-course">course</span>}
          </li>
        ))}
      </ol>
      <p className="s-intro">The full list, with optional readings, is in the study guide.</p>
    </div>
  );
}

function EndSlide({ slide }) {
  return (
    <div className="s-statement">
      <p className="s-kicker">Next</p>
      <p className="s-big">Distil the important ideas into an AI storyboarding demo.</p>
      <p className="s-intro">Start from Module 4: each hard problem and each risk is a candidate experiment.</p>
    </div>
  );
}

function CaseSlide({ slide, step }) {
  const c = CASES.find((k) => k.id === slide.case);
  const last = step >= slide.steps;
  const meta = [c.game, c.studio, c.year].filter(Boolean).join(' · ');
  const photo = CASE_PHOTOS[c.id];
  const discuss = (
    <Reveal className="s-discuss" show={last}>
      <span className="s-label s-label--accent">Discuss</span>
      <p>{c.discuss}</p>
    </Reveal>
  );
  if (c.figure) {
    return (
      <div className="s-body s-case s-case--wide">
        <p className="s-kicker">Case study · {meta}</p>
        <h2 className="s-h">{c.title}</h2>
        <div className="s-case-fig"><Diagram name={c.figure} step={step} /></div>
        <div className="s-case-cols">
          <div><span className="s-label">What they did</span><p>{c.did}</p></div>
          <div><span className="s-label">What it teaches</span><p>{c.teaches}</p></div>
          {discuss}
        </div>
        <Sources keys={c.refs} />
      </div>
    );
  }
  return (
    <div className={photo ? 's-body s-case has-photo' : 's-body s-case'}>
      <div className="s-case-text">
        <p className="s-kicker">Case study · {meta}</p>
        <h2 className="s-h">{c.title}</h2>
        <span className="s-label">What they did</span>
        <p className="s-case-did">{c.did}</p>
        <span className="s-label">What it teaches</span>
        <p className="s-case-teaches">{c.teaches}</p>
        {discuss}
      </div>
      {photo && <Photo id={photo} className="s-case-photo" />}
      <Sources keys={c.refs} />
    </div>
  );
}

function MythsSlide({ slide, step }) {
  return (
    <div className="s-body s-centered">
      <h2 className="s-h">Myth vs reality</h2>
      <div className="s-myths">
        {MYTHS[slide.module].map(([myth, reality], i) => (
          <div key={myth} className="s-myth">
            <div className="s-myth-m">
              <span className="s-label">Myth</span>
              <p>{myth}</p>
            </div>
            <Reveal className="s-myth-r" show={step > i}>
              <span className="s-label s-label--accent">Reality</span>
              <p>{reality}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
}

function StandardSlide({ slide, step }) {
  const list = slide.standards.map((k) => STANDARDS[k]);
  if (slide.figure) {
    const st = list[0];
    return (
      <div className="s-body">
        <p className="s-kicker">Standard</p>
        <h2 className="s-h">{st.title}</h2>
        <div className="s-fig s-fig--std"><Diagram name={slide.figure} step={99} /></div>
        {st.note && <p className="s-std-note">{st.note}</p>}
      </div>
    );
  }
  return (
    <div className="s-body">
      <p className="s-kicker">Standard</p>
      <div className={list.length > 1 ? 's-std s-std--pair' : 's-std'}>
        {list.map((st) => (
          <section key={st.title}>
            <h2 className="s-h s-h--sm">{st.title}</h2>
            <dl>
              {st.rows.map((row) => (
                <div key={row[0]}>
                  <dt>{row[0]}</dt>
                  <dd>{row.slice(1).join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}

function ExerciseSlide({ slide }) {
  const e = EXERCISES.find((k) => k.id === slide.exercise);
  return (
    <div className="s-body s-exercise">
      <p className="s-kicker">Try this · {e.time}</p>
      <h2 className="s-h">{e.title}</h2>
      <ol>
        {e.steps.map((st) => <li key={st}>{st}</li>)}
      </ol>
      <p className="s-exercise-out"><span className="s-label">Output</span>{e.output}</p>
    </div>
  );
}

function InquirySlide({ slide, step }) {
  const q = INQUIRY[slide.module];
  return (
    <div className="s-body s-inquiry">
      <p className="s-kicker">Inquiry</p>
      <p className="s-scenario">{q.scenario}</p>
      <ol>
        {q.questions.map((qq, i) => (
          <Reveal as="li" key={qq} show={step >= i}>
            <span className="s-num">Q{i + 1}</span>
            {qq}
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

function GallerySlide({ slide, step }) {
  const g = GALLERIES[slide.gallery];
  return (
    <div className="s-body s-gallery">
      <p className="s-kicker">Look closer</p>
      <h2 className="s-h">{g.title}</h2>
      <div className={`s-gallery-row s-gallery-row--${g.items.length}`}>
        {g.items.map((id, i) => (
          <div key={id} className="s-gallery-item">
            <Photo id={id} />
            {g.answers && (
              <Reveal className="s-gallery-answer" show={step >= 1} delay={i * 0.1}>
                <span className="s-label s-label--accent">Board first</span>
                <p>{g.answers[i]}</p>
              </Reveal>
            )}
          </div>
        ))}
      </div>
      <p className="s-gallery-ask"><span className="s-label s-label--accent">Ask the room</span>{g.ask}</p>
    </div>
  );
}

function ExemplarSlide({ slide, step }) {
  const e = EXEMPLARS.find((k) => k.id === slide.exemplar);
  const last = step >= slide.steps;
  return (
    <div className="s-concept s-exemplar">
      <div className="s-concept-text">
        <p className="s-kicker">{e.category}</p>
        <h2 className="s-h">{e.game}</h2>
        <p className="s-meta">{e.studio} · {e.year}</p>
        <span className="s-label">What they did</span>
        <p className="s-ex-did">{e.did}</p>
        <Reveal show={last}>
          <span className="s-label s-label--accent">Steal this</span>
          <p className="s-ex-steal">{e.steal}</p>
          <dl className="s-ex-mda">
            <dt>M</dt><dd>{e.mda[0]}</dd>
            <dt>D</dt><dd>{e.mda[1]}</dd>
            <dt>A</dt><dd>{e.mda[2]}</dd>
          </dl>
        </Reveal>
        <Sources keys={e.refs} />
      </div>
      <div className="s-concept-fig">
        <Diagram name={e.figure} step={99} />
      </div>
    </div>
  );
}

// The course's own photo of the book if it is in public/img/, otherwise a plate in the deck's style.
export function BookCover({ book }) {
  const [hasCover, setHasCover] = useState(true);
  return (
    <div className="book">
      {hasCover ? (
        <img className="book-img" src={book.cover} alt={`${book.title} by ${book.author}`} onError={() => setHasCover(false)} />
      ) : (
        <div className={`book-plate book-plate--${book.id}`} aria-label={`${book.title} by ${book.author}`}>
          <span className="book-plate-year">{book.year}</span>
          <span className="book-plate-title">{book.title}</span>
          <span className="book-plate-sub">{book.subtitle}</span>
          <span className="book-plate-author">{book.author}</span>
        </div>
      )}
    </div>
  );
}

// Every maxim first; on the next step the ones the course uses stay dark and say what they mean here.
function BooksSlide({ slide, step }) {
  const focus = step >= 1;
  return (
    <div className="s-body">
      <p className="s-kicker">Before we start</p>
      <h2 className="s-h">{slide.title}</h2>
      <div className="s-books">
        {BOOKS.map((b) => (
          <div key={b.id} className="s-book">
            <BookCover book={b} />
            <div className="s-book-text">
              <h3 className="s-book-title">{b.title}</h3>
              <p className="s-book-meta">
                {b.author} · {b.year} · {b.maxims.length} {b.id === 'steal' ? 'chapters' : 'maxims'}
                {b.course && <span className="s-tag is-course">course</span>}
              </p>
              <ol className={`s-maxims${focus ? ' is-focus' : ''}`}>
                {b.maxims.map((m, i) => (
                  <li key={m.text} className={m.use ? 'is-key' : undefined}>
                    <span className="s-maxim-n">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      {m.text}
                      {m.note && <span className="s-maxim-note"> {m.note}</span>}
                      {m.use && <span className="s-maxim-use" aria-hidden={!focus}><span>{m.use}</span></span>}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
      <Reveal as="p" className="s-books-foot" show={focus}>Both apply beyond games: to work, to teams and to life.</Reveal>
    </div>
  );
}

const LAYOUTS = {
  title: TitleSlide,
  roadmap: RoadmapSlide,
  statement: StatementSlide,
  section: SectionSlide,
  concept: ConceptSlide,
  diagram: DiagramSlide,
  table: TableSlide,
  cards: CardsSlide,
  stack: StackSlide,
  check: CheckSlide,
  risks: RisksSlide,
  split: SplitSlide,
  questions: QuestionsSlide,
  readings: ReadingsSlide,
  end: EndSlide,
  case: CaseSlide,
  myths: MythsSlide,
  standard: StandardSlide,
  exercise: ExerciseSlide,
  inquiry: InquirySlide,
  gallery: GallerySlide,
  exemplar: ExemplarSlide,
  books: BooksSlide,
};

// ---------------------------------------------------------------- chrome
const counts = MODULE_ORDER.map((m) => SLIDES.filter((s) => s.module === m).length);

function Progress({ index }) {
  let seen = 0;
  return (
    <div className="s-progress" aria-hidden="true">
      {MODULE_ORDER.map((m, i) => {
        const start = seen;
        seen += counts[i];
        const fill = Math.max(0, Math.min(1, (index + 1 - start) / counts[i]));
        return (
          <span key={m} className="s-progress-seg" style={{ flexGrow: counts[i] }}>
            <span style={{ width: `${fill * 100}%` }} />
          </span>
        );
      })}
    </div>
  );
}

function useScale(ref) {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setScale(Math.min(r.width / W, r.height / H));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return scale;
}

const moduleTag = (m) => (m === 'intro' ? 'Introduction' : m === 'syn' ? 'Synthesis' : m === 'ex' ? 'Exemplars · what to steal' : `Module ${NUM[m]} · ${MODULE_LABEL[m]}`);

function SlideTop({ slide, index }) {
  return (
    <header className="s-top">
      <span className="s-module">{moduleTag(slide.module)}</span>
      {slide.phase && <span className="s-phase">{slide.phase}</span>}
      <span className="s-top-right">
        {slide.fig && <span className="s-fig">{slide.fig}</span>}
        <span>{String(index + 1).padStart(2, '0')} / {SLIDES.length}</span>
      </span>
    </header>
  );
}

// One slide at its last step, unscaled, for the print view and the PDF.
export function PrintSlide({ index }) {
  const slide = SLIDES[index];
  const Layout = LAYOUTS[slide.type];
  return (
    <section className="slide slide--print" aria-label={`Slide ${index + 1}`}>
      <SlideTop slide={slide} index={index} />
      <div className="s-content">
        <Layout slide={slide} step={slide.steps ?? 0} />
      </div>
      <Progress index={index} />
    </section>
  );
}

export default function Deck({ index: startIndex, toggleTheme, openGuide }) {
  const [index, setIndex] = useState(startIndex);
  const [step, setStep] = useState(0);
  const [overview, setOverview] = useState(false);
  const [notes, setNotes] = useState(false);
  const [dir, setDir] = useState(1);
  const stageRef = useRef(null);
  const scale = useScale(stageRef);
  const slide = SLIDES[index];

  const goTo = useCallback((i, atStep = 0) => {
    const n = Math.max(0, Math.min(SLIDES.length - 1, i));
    setDir(n >= index ? 1 : -1);
    setIndex(n);
    setStep(atStep);
  }, [index]);

  const next = useCallback(() => {
    if (step < slide.steps) setStep(step + 1);
    else if (index < SLIDES.length - 1) goTo(index + 1, 0);
  }, [step, slide, index, goTo]);

  const prev = useCallback(() => {
    if (step > 0) setStep(step - 1);
    else if (index > 0) goTo(index - 1, SLIDES[index - 1].steps);
  }, [step, index, goTo]);

  useEffect(() => {
    window.history.replaceState(null, '', `#/learn/slides/${index + 1}`);
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const k = e.key;
      if (overview) {
        if (k === 'Escape' || k === 'o' || k === 'O') setOverview(false);
        return;
      }
      if (k === 'ArrowRight' || k === 'PageDown' || (k === ' ' && tag !== 'BUTTON')) {
        e.preventDefault();
        next();
      } else if (k === 'ArrowLeft' || k === 'PageUp') {
        e.preventDefault();
        prev();
      } else if (k === 'Home') goTo(0);
      else if (k === 'End') goTo(SLIDES.length - 1);
      else if (k === 'o' || k === 'O') setOverview(true);
      else if (k === 'n' || k === 'N') setNotes((v) => !v);
      else if (k === 'g' || k === 'G') openGuide(slide.module);
      else if (k === 't' || k === 'T') toggleTheme();
      else if (k === 'f' || k === 'F') {
        if (document.fullscreenElement) document.exitFullscreen?.();
        else document.documentElement.requestFullscreen?.().catch(() => {});
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, goTo, overview, openGuide, slide, toggleTheme]);

  const Layout = LAYOUTS[slide.type];

  return (
    <div className="deck">
      <div className="deck-stage" ref={stageRef}>
        <div className="slide" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
          <SlideTop slide={slide} index={index} />
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={slide.id}
              className="s-content"
              custom={dir}
              initial={{ opacity: 0, x: dir * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -24 }}
              transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <Layout slide={slide} step={step} />
            </motion.div>
          </AnimatePresence>
          {slide.steps > 0 && (
            <span className="s-steps" aria-hidden="true">
              {Array.from({ length: slide.steps + 1 }, (_, i) => (
                <i key={i} className={i <= step ? 'is-on' : undefined} />
              ))}
            </span>
          )}
          <Progress index={index} />
        </div>
      </div>

      <nav className="deck-bar" aria-label="Deck controls">
        <button type="button" onClick={prev} aria-label="Back">←</button>
        <button type="button" onClick={next} aria-label="Forward">→</button>
        <button type="button" onClick={() => setOverview(true)}>Overview <kbd>O</kbd></button>
        <button type="button" onClick={() => openGuide(slide.module)}>Study guide <kbd>G</kbd></button>
        <button type="button" onClick={() => setNotes((v) => !v)} aria-pressed={notes}>Notes <kbd>N</kbd></button>
        <button type="button" onClick={toggleTheme}>Theme <kbd>T</kbd></button>
      </nav>

      {notes && (
        <aside className="deck-notes" aria-label="Speaker notes">
          <span className="s-label">Speaker notes · N to hide</span>
          {slide.notes?.length ? slide.notes.map((n) => <p key={n}>{n}</p>) : <p>No notes for this slide.</p>}
        </aside>
      )}

      {overview && (
        <div className="overview" role="dialog" aria-label="All slides">
          <div className="overview-head">
            <h2>All slides</h2>
            <button type="button" onClick={() => setOverview(false)}>Close <kbd>Esc</kbd></button>
          </div>
          <div className="overview-grid">
            {MODULE_ORDER.map((m) => (
              <section key={m}>
                <h3><span className="s-num">{NUM[m]}</span> {MODULE_LABEL[m]}</h3>
                <ol>
                  {SLIDES.map((s, i) => (s.module === m ? (
                    <li key={s.id}>
                      <button type="button" className={i === index ? 'is-on' : undefined} onClick={() => { goTo(i); setOverview(false); }}>
                        <span className="s-num">{String(i + 1).padStart(2, '0')}</span>
                        {s.title ?? MOD[s.module]?.title ?? (s.module === 'ex' ? EX_SECTION.title : '')}
                      </button>
                    </li>
                  ) : null))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// The teaching deck. Each slide reveals in steps (→ advances a step, then the slide).
// Text comes from content.js and craft.js; this file only decides order, layout and pacing.
import {
  AI_PIPELINE, ANGLES, CONCEPTS, FILM_VS_GAME, FORMATS, HARD_PROBLEMS, JENKINS, MCCLOUD, MODULES, NORMS,
  PRODUCTION_PHASES, ROLES, STACK, TITLE, WHAM_NEEDS,
} from './content.js';
import { ACCELERATION, CASES, CONCEPT_EXTRAS, EXEMPLARS, EX_SECTION, EXERCISES, INDUSTRY, INQUIRY, MYTHS, STANDARDS } from './craft.js';
import { GALLERIES } from './images.js';

const C = (id) => CONCEPTS.find((c) => c.id === id);

// Shorthands for the craft slide types.
const kase = (id) => ({ id: `case-${id}`, module: CASES.find((c) => c.id === id).module, type: 'case', case: id });
const myths = (module) => ({ id: `myths-${module}`, module, type: 'myths' });
const tryThis = (id) => ({ id: `try-${id}`, module: EXERCISES.find((e) => e.id === id).module, type: 'exercise', exercise: id });
const inquiry = (module) => ({ id: `inquiry-${module}`, module, type: 'inquiry', steps: 2 });
const standard = (module, key, figure) => ({ id: `std-${key}`, module, phase: 'how', type: 'standard', standards: [key], figure });
const gallery = (id) => ({ id: `gallery-${id}`, module: GALLERIES[id].module, type: 'gallery', gallery: id, title: GALLERIES[id].title, steps: GALLERIES[id].answers ? 1 : 0 });
const exemplar = (id) => ({ id: `ex-${id}`, module: 'ex', type: 'exemplar', exemplar: id, steps: 1 });
const standards = (module, keys) => ({ id: `std-${keys.join('-')}`, module, phase: 'how', type: 'standard', standards: keys });

const RAW = [
  // Intro
  { id: 'title', module: 'intro', type: 'title', title: TITLE },
  { id: 'roadmap', module: 'intro', type: 'roadmap', title: 'Four questions, in order', steps: 4 },
  {
    id: 'thesis', module: 'intro', type: 'statement', title: 'The one idea',
    lines: ['In film, a storyboard shows what the camera sees.', 'In games, it shows what the player can do and feel.'], steps: 1,
  },
  {
    id: 'books', module: 'intro', type: 'books', title: 'Two books for the habits behind good work', steps: 1,
    notes: ['First step: read the lists. Ask the room: which of these do you already practise, and which do you avoid?', 'Second step: the four from each book this course leans on, and what each means for boards and playtests.', 'Both apply beyond games: in work, in teams and in life.'],
  },

  // Module 1 · Game design
  { id: 'm1', module: 'm1', type: 'section', steps: 1 },
  { id: 'experience', module: 'm1', type: 'concept', concept: 'experience', diagram: 'gameExperience', steps: 1 },
  { id: 'second-order', module: 'm1', type: 'concept', concept: 'second-order', diagram: 'secondOrder', steps: 1 },
  {
    id: 'mda', module: 'm1', phase: 'what', type: 'diagram', title: 'Mechanics, dynamics, aesthetics', diagram: 'mda', steps: 3,
    captions: [
      { at: 0, text: 'Designers set the mechanics. Play produces the dynamics. Players feel the aesthetics.' },
      { at: 3, text: '“Aesthetics” means feelings, not visual style. Pac-Man: ghost targeting rules → chases and near misses → tension.' },
    ],
    refs: ['mda'], notes: [`Ask the room: ${CONCEPT_EXTRAS.mda.ask}`, `Common mistake: ${CONCEPT_EXTRAS.mda.mistake}`],
  },
  kase('pacman'),
  gallery('pacman'),
  { id: 'fun', module: 'm1', type: 'concept', concept: 'fun', diagram: 'flowChannel', steps: 1 },
  kase('world11'),
  { id: 'iteration', module: 'm1', type: 'concept', concept: 'iteration', diagram: 'iterationLoop', steps: 1 },
  { id: 'lenses', module: 'm1', type: 'concept', concept: 'lenses', diagram: 'lens', steps: 1 },
  myths('m1'),
  tryThis('mda-teardown'),
  inquiry('m1'),
  { id: 'check-m1', module: 'm1', type: 'check', title: 'Check yourself', steps: 3 },

  // Module 2 · Storyboarding
  { id: 'm2', module: 'm2', type: 'section', steps: 1 },
  {
    id: 'pipeline', module: 'm2', phase: 'what', type: 'diagram', title: 'What a storyboard is', diagram: 'pipeline', steps: 1,
    captions: [
      { at: 0, text: C('storyboard').idea },
      { at: 1, text: 'Fidelity rises along the pipeline, and so does the cost of a change.' },
    ],
    refs: ['catmull'], notes: [`Ask the room: ${CONCEPT_EXTRAS.storyboard.ask}`],
  },
  gallery('production'),
  { id: 'fail-cheap', module: 'm2', type: 'concept', concept: 'fail-cheap', diagram: 'costOfChange', steps: 1 },
  kase('reels'),
  { id: 'align', module: 'm2', type: 'concept', concept: 'align', diagram: 'align', steps: 1 },
  {
    id: 'shots', module: 'm2', phase: 'how', type: 'diagram', title: 'Shot grammar', diagram: 'shotGrammar', steps: 2,
    captions: [
      { at: 0, text: 'Shot size, angle, movement and continuity decide what the viewer sees and understands.' },
      { at: 2, text: 'All of it assumes the director holds the camera.' },
    ],
    refs: ['katz'], notes: [`Ask the room: ${CONCEPT_EXTRAS.shots.ask}`],
  },
  standard('m2', 'shotSizes', 'shotSizes'),
  standard('m2', 'cameraMoves', 'cameraMoves'),
  standard('m2', 'continuity'),
  standard('m2', 'panel', 'panelAnatomy'),
  { id: 'contrast', module: 'm2', type: 'concept', concept: 'contrast', diagram: 'contrastAffinity', steps: 1 },
  {
    id: 'closure', module: 'm2', phase: 'how', type: 'table', title: 'Closure: six panel transitions',
    intro: 'Readers fill in what happens between panels, in the gutter.',
    columns: ['Transition', 'What the reader fills in'], rows: MCCLOUD,
    footer: 'In a game, the player fills the gutter with their own action.', refs: ['mccloud'],
    notes: [`Ask the room: ${CONCEPT_EXTRAS.closure.ask}`],
  },
  { id: 'fidelity', module: 'm2', type: 'concept', concept: 'fidelity', diagram: 'fidelity', steps: 1 },
  kase('odyssey'),
  myths('m2'),
  tryThis('six-thumbnails'),
  inquiry('m2'),
  { id: 'check-m2', module: 'm2', type: 'check', title: 'Check yourself', steps: 3 },

  // Module 3 · Storyboarding for game design
  { id: 'm3', module: 'm3', type: 'section', steps: 1 },
  {
    id: 'spec', module: 'm3', phase: 'what', type: 'diagram', title: 'A spec for an interaction', diagram: 'filmGame', steps: 1,
    captions: [{ at: 1, text: 'A film board shows what the camera sees. A game board shows what the player can do and feel.' }],
    notes: [`Ask the room: ${CONCEPT_EXTRAS.spec.ask}`],
  },
  {
    id: 'film-vs-game', module: 'm3', phase: 'what', type: 'table', title: 'Film board vs game board',
    columns: ['Film storyboard', 'Game storyboard'], rows: FILM_VS_GAME,
  },
  {
    id: 'architecture', module: 'm3', phase: 'why', type: 'cards', title: 'Narrative architecture',
    intro: 'Game stories are often told through space (Jenkins, 2004).',
    cards: JENKINS.map((j) => ({ name: j.name, line: j.line, note: j.example })),
    footer: 'So game boards need maps and paths, not only shots.', refs: ['jenkins'],
    notes: [`Ask the room: ${CONCEPT_EXTRAS.architecture.ask}`],
  },
  { id: 'stack', module: 'm3', phase: 'what', type: 'stack', title: 'The storyboarding stack', steps: 2, refs: ['rogers'], notes: [`Ask the room: ${CONCEPT_EXTRAS.stack.ask}`] },
  gallery('ryzom'),
  {
    id: 'units', module: 'm3', phase: 'what', type: 'diagram', title: 'Many units, many representations', diagram: 'unitsToReps', steps: 1,
    captions: [{ at: 1, text: 'Each representation needs a different kind of model. Hold that thought for Module 4.' }],
  },
  gallery('firstBoard'),
  {
    id: 'beat-chart', module: 'm3', phase: 'how', type: 'diagram', title: 'Beat charts and the interest curve', diagram: 'beatChart', steps: 2,
    captions: [
      { at: 0, text: 'The interest curve: a hook, rising peaks with rests, a climax, a resolution.' },
      { at: 2, text: 'A planned curve is a guess. Check it against playtests.' },
    ],
    refs: ['rogers', 'schell', 'biometric'], notes: [`Ask the room: ${CONCEPT_EXTRAS['beat-chart'].ask}`],
  },
  kase('director'),
  kase('journey'),
  {
    id: 'branching', module: 'm3', phase: 'how', type: 'diagram', title: 'Branching patterns', diagram: 'branching', steps: 1,
    captions: [
      { at: 0, text: 'Every branch multiplies content and state. Standard patterns keep that under control.' },
      { at: 1, text: 'Beyond branching: storylets unlock small scenes by state (qualities), instead of following a fixed tree.' },
    ],
    refs: ['ashwell', 'shortBeyond'], notes: [`Ask the room: ${CONCEPT_EXTRAS.branching.ask}`],
  },
  {
    id: 'four-step', module: 'm3', phase: 'how', type: 'diagram', title: 'Four-step levels', diagram: 'fourStep', steps: 3,
    captions: [{ at: 3, text: 'Hayashida’s structure for Super Mario 3D Land, after kishōtenketsu. A level board is a lesson plan.' }],
    refs: ['hayashida'], notes: [`Ask the room: ${CONCEPT_EXTRAS['four-step'].ask}`],
  },
  kase('graphpaper'),
  {
    id: 'three-cs', module: 'm3', phase: 'how', type: 'diagram', title: 'Annotate the 3Cs', diagram: 'threeCs', steps: 2,
    captions: [{ at: 2, text: 'Without the 3Cs, a gameplay panel is just a cutscene still.' }],
    notes: [`Ask the room: ${CONCEPT_EXTRAS['three-cs'].ask}`],
  },
  standards('m3', ['gameplayPanel', 'beatChart']),
  {
    id: 'other-boards', module: 'm3', phase: 'how', type: 'diagram', title: 'Rooms and screens are boards too', diagram: 'otherBoards', steps: 1,
    captions: [{ at: 1, text: '“Where?” needs a map. “What next?” needs a flow.' }],
    refs: ['totten', 'hodent'],
  },
  {
    id: 'phases', module: 'm3', phase: 'how', type: 'table', title: 'In the studio: where each board lives',
    columns: ['Phase', 'Goal', 'Boards in use', 'Ends at'], rows: PRODUCTION_PHASES.map((p) => [p.phase, p.goal, p.boards, p.gate]),
    footer: 'Phase names and gates vary by studio. The order is common.', refs: ['chandler', 'lemarchand'],
    notes: [`Ask the room: ${CONCEPT_EXTRAS.studio.ask}`],
  },
  {
    id: 'roles', module: 'm3', phase: 'how', type: 'table', title: 'Who makes the boards, and who reads them', reveal: 'all',
    columns: ['Role', 'Makes', 'Uses the boards to'], rows: ROLES.map((r) => [r.role, r.makes, r.uses]), refs: ['chandler'],
  },
  {
    id: 'formats', module: 'm3', phase: 'how', type: 'cards', title: 'How studios communicate design', reveal: 'all', columns: 4,
    cards: FORMATS.map((f) => ({ name: f.name, line: f.line })), footer: 'Short and visual beats long and complete.', refs: ['rogers', 'librande'],
  },
  {
    id: 'norms', module: 'm3', phase: 'how', type: 'cards', title: 'Working norms', reveal: 'all', columns: 3,
    cards: NORMS.map((n) => ({ name: n.name, line: n.line })), refs: ['catmull', 'fullerton'],
  },
  standards('m3', ['playtest', 'critique']),
  myths('m3'),
  tryThis('board-11'),
  tryThis('two-shapes'),
  inquiry('m3'),
  { id: 'check-m3', module: 'm3', type: 'check', title: 'Check yourself', steps: 4 },

  // Exemplars · what to steal
  { id: 'ex', module: 'ex', type: 'section', steps: 1 },
  ...EXEMPLARS.map((e) => exemplar(e.id)),
  {
    id: 'ex-summary', module: 'ex', type: 'table', title: 'What to steal', reveal: 'all', compact: true,
    columns: ['Game', 'Structure', 'Steal this'], rows: EXEMPLARS.map((e) => [e.game, e.category, e.steal.split('. ')[0] + '.']),
    footer: 'Steal the structure, not the surface.',
  },

  // Module 4 · How AI helps
  { id: 'm4', module: 'm4', type: 'section', steps: 1 },
  {
    id: 'models', module: 'm4', phase: 'what', type: 'table', title: 'One stack, many models', reveal: 'all',
    columns: ['Layer', 'Unit', 'Representation', 'Kind of model'],
    rows: STACK.map((s) => [s.layer, s.unit, s.rep, s.ai]),
    footer: 'The hard part is keeping all of these consistent with each other.', refs: ['gallotta'],
    notes: [`Ask the room: ${CONCEPT_EXTRAS.models.ask}`],
  },
  {
    id: 'pipeline-ai', module: 'm4', phase: 'what', type: 'table', title: 'Where AI enters the pipeline',
    columns: ['Stage', 'Traditionally', 'AI’s role', 'The hard engineering problem'],
    rows: AI_PIPELINE.map((r) => [r.stage, r.traditional, r.ai, r.hard]), accentColumn: 3,
  },
  {
    id: 'hard-problems', module: 'm4', phase: 'how', type: 'cards', title: 'Four hard problems',
    cards: HARD_PROBLEMS.map((h) => ({ name: h.name, line: h.line })),
    refs: ['storyDiffusion', 'controlnet', 'riedlBulitko', 'wham'],
    notes: [`Ask the room: ${CONCEPT_EXTRAS.consistency.ask}`, `Ask the room: ${CONCEPT_EXTRAS.control.ask}`],
  },
  {
    id: 'needs', module: 'm4', phase: 'how', type: 'cards', title: 'What creatives need',
    intro: 'From interviews with game creatives behind Microsoft’s Muse (Kanervisto et al., 2025).',
    cards: WHAM_NEEDS.map((w) => ({ name: w.name, line: w.line })),
    footer: 'Use these as evaluation criteria for any AI storyboard tool.', refs: ['wham'],
    notes: [`Ask the room: ${CONCEPT_EXTRAS.evaluation.ask}`],
  },
  {
    id: 'collapse', module: 'm4', phase: 'why', type: 'diagram', title: 'When the board becomes playable', diagram: 'collapse', steps: 1,
    captions: [{ at: 1, text: 'If you can play the board, is it still a planning tool, or a tool for aligning a team’s intent?' }],
    refs: ['genie', 'gamengen', 'wham', 'genie3'], notes: [`Common mistake: ${CONCEPT_EXTRAS.collapse.mistake}`],
  },
  kase('genie2'),
  kase('muse'),
  kase('roblox4d'),
  kase('ghostwriter'),
  {
    id: 'industry', module: 'm4', phase: 'what', type: 'table', title: 'AI in studios today: what is claimed', reveal: 'all', compact: true,
    columns: ['Company', 'Tool', 'Layer', 'What it speeds up', 'Evidence'], rows: INDUSTRY, accentColumn: 4,
    footer: 'Most numbers come from the companies themselves. Ask what was measured: speed, volume, play time or quality?',
    refs: ['robloxCube', 'roblox4d', 'genie2', 'wham', 'ghostwriterNews', 'teammates', 'embark', 'squareEnix'],
    notes: ['Ask the room: which row would you trust most, and what evidence would change your mind?'],
  },
  {
    id: 'acceleration', module: 'm4', phase: 'why', type: 'cards', title: 'Four ways studios use AI to go faster', reveal: 'all', columns: 4,
    cards: ACCELERATION.map((a) => ({ name: a.name, line: a.line, note: a.note })),
    footer: 'Each one saves time somewhere and creates new work somewhere else: review, curation, evaluation.',
  },
  { id: 'risks', module: 'm4', phase: 'why', type: 'risks', title: 'Where AI may hurt', steps: 2, refs: ['doshi', 'buxton', 'catmull'], notes: [`Ask the room: ${CONCEPT_EXTRAS.risks.ask}`] },
  { id: 'split', module: 'm4', phase: 'how', type: 'split', title: 'Mixed initiative: who does what', steps: 1, refs: ['mixedInit', 'sentient'], notes: [`Ask the room: ${CONCEPT_EXTRAS.mixed.ask}`] },
  myths('m4'),
  tryThis('drift'),
  tryThis('critic-test'),
  inquiry('m4'),
  { id: 'check-m4', module: 'm4', type: 'check', title: 'Check yourself', steps: 3 },

  // Synthesis
  { id: 'threads', module: 'syn', type: 'diagram', title: 'Two threads through all four modules', diagram: 'threads', steps: 1 },
  {
    id: 'angles', module: 'syn', type: 'cards', title: 'Four angles for the talk',
    cards: ANGLES.map((a) => ({ name: `${a.key} · ${a.name}`, line: a.line, note: a.note, accent: a.key === 'B' })),
  },
  { id: 'questions', module: 'syn', type: 'questions', title: 'Questions to argue about', steps: 2 },
  { id: 'path', module: 'syn', type: 'readings', title: 'A reading path' },
  { id: 'end', module: 'syn', type: 'end', title: 'Next: distil it into a demo' },
];

// Fill in titles, phases, step counts and speaker notes; number the figures within each module.
const figCount = {};
const MOD_NUM = { intro: 0, m1: 1, m2: 2, m3: 3, ex: 'E', m4: 4, syn: 5 };
const MOD = Object.fromEntries(MODULES.map((m) => [m.id, m]));

export const SLIDES = RAW.map((s) => {
  const out = { ...s };
  if (s.type === 'concept') {
    const c = C(s.concept);
    const x = CONCEPT_EXTRAS[s.concept];
    out.title = c.title;
    out.phase = c.phase;
    out.notes = [`Ask the room: ${x.ask}`, `Common mistake: ${x.mistake}`];
  }
  if (s.type === 'section') {
    const m = MOD[s.module] ?? EX_SECTION;
    out.notes = [`Ask the room: “${m.question}” Take two answers before revealing the one-line answer.`];
  }
  if (s.type === 'exemplar') {
    const e = EXEMPLARS.find((k) => k.id === s.exemplar);
    out.title = e.game;
    out.figure = e.figure;
    out.notes = ['Ask the room: what did this team decide early that shaped everything else?', `Steal: ${e.steal}`];
  }
  if (s.type === 'gallery') {
    out.notes = [`Ask the room: ${GALLERIES[s.gallery].ask}`];
  }
  if (s.type === 'case') {
    const c = CASES.find((k) => k.id === s.case);
    out.title = c.title;
    out.figure = c.figure;
    out.steps = c.figure ? Math.max(1, c.figureSteps ?? 0) : 1;
    out.notes = [`Discuss: ${c.discuss}`];
  }
  if (s.type === 'myths') {
    out.title = 'Myth vs reality';
    out.steps = MYTHS[s.module].length;
    out.notes = ['Read each myth aloud and ask who agrees before revealing the reality.'];
  }
  if (s.type === 'exercise') {
    const e = EXERCISES.find((k) => k.id === s.exercise);
    out.title = `Try this: ${e.title}`;
    out.notes = [`Set a timer for ${e.time}. Output: ${e.output}`];
  }
  if (s.type === 'inquiry') {
    out.title = 'Inquiry';
    out.notes = ['Give each question about a minute. Push for specifics: which board, which panel, which number.'];
  }
  if (s.type === 'standard') {
    out.title = s.standards.map((k) => STANDARDS[k].title).join(' · ');
  }
  if (s.type === 'check') {
    out.notes = ['Take answers from the room before revealing each one.'];
  }
  if (s.type === 'table') {
    out.steps = s.reveal === 'all' ? (s.footer ? 1 : 0) : s.rows.length - 1 + (s.footer ? 1 : 0);
  }
  if (s.type === 'cards') {
    out.steps = s.reveal === 'all' ? (s.footer ? 1 : 0) : s.cards.length - 1 + (s.footer ? 1 : 0);
  }
  const isFigure = s.diagram || out.figure || ['table', 'stack', 'risks', 'cards'].includes(s.type);
  if (isFigure) {
    figCount[s.module] = (figCount[s.module] || 0) + 1;
    out.fig = `FIG ${MOD_NUM[s.module]}.${figCount[s.module]}`;
  }
  out.steps = out.steps ?? 0;
  return out;
});

export const MODULE_ORDER = ['intro', 'm1', 'm2', 'm3', 'ex', 'm4', 'syn'];
export const MODULE_LABEL = {
  intro: 'Introduction',
  m1: 'Game design',
  m2: 'Storyboarding',
  m3: 'Storyboarding for game design',
  ex: 'Exemplars',
  m4: 'How AI helps',
  syn: 'Synthesis',
};

export const firstSlideOf = (module) => SLIDES.findIndex((s) => s.module === module);

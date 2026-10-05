// The one-page game board: feel → happens → do → one moment → one curve.
// Used by Board 02 (worked example and the editable page) and by the critique prompt.

// MDA's eight kinds of fun, with the paper's own one-line glosses.
export const KINDS_OF_FUN = [
  { key: 'sensation', name: 'Sensation', gloss: 'game as sense-pleasure' },
  { key: 'fantasy', name: 'Fantasy', gloss: 'game as make-believe' },
  { key: 'narrative', name: 'Narrative', gloss: 'game as drama' },
  { key: 'challenge', name: 'Challenge', gloss: 'game as obstacle course' },
  { key: 'fellowship', name: 'Fellowship', gloss: 'game as social framework' },
  { key: 'discovery', name: 'Discovery', gloss: 'game as uncharted territory' },
  { key: 'expression', name: 'Expression', gloss: 'game as self-discovery' },
  { key: 'submission', name: 'Submission', gloss: 'game as pastime' },
];

export const EMPTY_SHEET = {
  game: '',
  feel: [],
  happens: '',
  does: '',
  panels: ['', '', ''],
  curve: [3, 4, 5, 4, 6, 7],
};

export const PACMAN = {
  game: 'Pac-Man (Namco, 1980)',
  feel: ['challenge', 'sensation'],
  happens:
    'Chases and near misses. Players learn each ghost’s habits and lure them around corners. They save power pellets for when they are cornered.',
  does:
    'Steer through a maze and eat every dot. Four ghosts chase you, each targeting by its own rule. A power pellet turns them blue, and then you can eat them.',
  panels: [
    'Two ghosts close in from both ends of a corridor.',
    'Pac-Man reaches the power pellet just in time.',
    'The ghosts turn blue and run. The hunted becomes the hunter.',
  ],
  curve: [2, 4, 6, 3, 8, 9],
};

export const PLACEHOLDERS = {
  game: 'Your classic game',
  happens: 'What happens when the rules meet a player? Chases, bluffs, panic, alliances…',
  does: 'The rules and verbs. What can the player do, and what pushes back?',
  panels: ['Setup: what is the player facing?', 'Action: what do they do?', 'Result: what changes?'],
};

const orBlank = (s) => (s && s.trim() ? s.trim() : '(not filled in yet)');

export function buildPrompt(sheet) {
  const feel = sheet.feel.length
    ? sheet.feel.map((k) => KINDS_OF_FUN.find((f) => f.key === k)?.name).filter(Boolean).join(', ')
    : '(not chosen yet)';
  return [
    'You are reviewing a one-page game storyboard. It follows MDA (Hunicke, LeBlanc & Zubek, 2004): aesthetics are what the player should feel, dynamics are what happens in play, and mechanics are the rules and verbs.',
    '',
    `Game: ${orBlank(sheet.game)}`,
    `1. Feel (aesthetics): ${feel}`,
    `2. Happens (dynamics): ${orBlank(sheet.happens)}`,
    `3. Do (mechanics): ${orBlank(sheet.does)}`,
    '4. One moment, in three panels:',
    ...sheet.panels.map((p, i) => `   Panel ${i + 1}: ${orBlank(p)}`),
    `5. Intensity over a session, 0 = calm and 10 = intense, start to end: ${sheet.curve.join(', ')}`,
    '',
    'Please:',
    '- Trace each feeling to a dynamic that produces it, and each dynamic to the mechanics behind it. Name any feeling that nothing produces and any mechanic that serves no feeling.',
    '- Ask the three questions a senior designer would ask about this page.',
    '- Pick the two lenses from Jesse Schell’s The Art of Game Design that fit best, and say what each reveals here.',
    '- Say whether the curve matches the moment in the panels.',
    '',
    'Point at gaps; don’t redesign the game. I will make the calls. Keep it under 250 words.',
  ].join('\n');
}

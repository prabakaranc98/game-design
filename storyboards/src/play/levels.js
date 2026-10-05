// Session 1 as a game: five levels, a boss and a save file.
// One title and one line per screen. Speaker notes stay hidden until N is pressed.

export const ITEMS = [
  { key: 'camera', name: 'Camera', move: 'Board the experience.' },
  { key: 'pictures', name: 'Four pictures', move: 'Map, panels, curve, loop.' },
  { key: 'feeling', name: 'Feeling first', move: 'Start from the feeling.' },
  { key: 'moment', name: 'One moment', move: 'Three panels, one curve.' },
  { key: 'page', name: 'One page', move: 'Feel, happens, do.' },
  { key: 'pencil', name: 'Red pencil', move: 'AI marks gaps. You decide.' },
];

export const LEVELS = [
  {
    id: 'start',
    kind: 'title',
    hud: 'Press start',
    title: 'Storyboarding Games',
    line: 'A 20-minute game. The whole room plays.',
    notes: ['Today the talk is the game, and the room plays it together.', 'Press Enter to start the clock.'],
  },
  {
    id: 'camera',
    kind: 'camera',
    n: 1,
    hud: 'Camera',
    title: 'Who holds the camera?',
    line: 'Move the mouse. Find three things.',
    done: 'You did. So we board the experience, not the shots.',
    item: 'camera',
    notes: ['In film the director picks every shot. In a game the player does.', 'Let the room call out directions while you move.'],
  },
  {
    id: 'match',
    kind: 'match',
    n: 2,
    hud: 'Match',
    title: 'Which picture first?',
    line: 'Match each game to the picture you would draw first.',
    done: 'Story games lean on panels. Systemic games lean on loops.',
    item: 'pictures',
    notes: [
      'Mario was drawn on graph paper. Journey was planned as an emotional curve.',
      'Minecraft is a loop you repeat. The Last of Us is built from moments.',
    ],
  },
  {
    id: 'sort',
    kind: 'sort',
    n: 3,
    hud: 'Sort',
    title: 'Mechanic, dynamic or aesthetic?',
    line: 'Sort six cards.',
    done: 'Games are built rules first. Board them feeling first.',
    item: 'feeling',
    notes: ['Mechanics are the rules you write. Dynamics are what happens in play. Aesthetics are what players feel.', 'MDA: Hunicke, LeBlanc and Zubek, 2004.'],
  },
  {
    id: 'moment',
    kind: 'moment',
    n: 4,
    hud: 'Moment',
    title: 'One moment, one curve',
    line: 'Click to draw the moment.',
    done: 'Three panels and one line. That is a board.',
    item: 'moment',
    notes: ['Board one moment, not the whole game.', 'The curve shows where that moment sits in a session.'],
  },
  {
    id: 'page',
    kind: 'sheet',
    n: 5,
    hud: 'Your page',
    title: 'Your turn',
    line: 'Three minutes. Start at the feeling.',
    item: 'page',
    notes: ['Paper is fine. The feeling and three panels are enough.', 'Ask one volunteer to read theirs.'],
  },
  {
    id: 'boss',
    kind: 'boss',
    hud: 'Boss',
    title: 'Boss: the critic',
    line: 'Paste a page into Claude. Judge every point it makes.',
    done: 'Boss down. AI marked the gaps; you made the calls.',
    item: 'pencil',
    notes: ['AI is the critic, not the author. It finds gaps; you keep taste and the final call.', 'For each point: did it catch something, miss something, or make it up?'],
  },
  {
    id: 'save',
    kind: 'save',
    hud: 'Save file',
    title: 'Save file',
    line: 'One page. Any game. With or without AI.',
    notes: ['Quest for the week: run your page through the critic.'],
  },
];

export const QUEST = 'Quest for this week: run your page past the critic. Bring back one thing it caught and one thing it made up.';

export const CREDITS = [
  { text: 'Hunicke, LeBlanc & Zubek, MDA (2004)', url: 'https://users.cs.northwestern.edu/~hunicke/MDA.pdf' },
  { text: 'Schell, The Art of Game Design (3rd ed., 2019)' },
  { text: 'Cook, Loops and Arcs (2012)', url: 'https://lostgarden.com/2012/04/30/loops-and-arcs/' },
  { text: 'Super Mario Bros. on graph paper (1985)', url: 'https://www.archdaily.com/783657/the-sheets-of-graph-paper-they-used-to-design-super-mario-bros' },
  { text: 'The journey to create Journey (2013)', url: 'https://www.gamedeveloper.com/business/the-journey-to-create-i-journey-i----the-quest-for-emotion' },
  { text: 'Cornell CS 3152 storyboarding lab', url: 'https://www.cs.cornell.edu/courses/cs3152/2021sp/labs/design1/' },
  { text: 'The Pac-Man Dossier', url: 'https://pacman.holenet.info/' },
  { text: 'Anthropic, AI Fluency', url: 'https://www.coursera.org/learn/ai-fluency-framework-foundations' },
];

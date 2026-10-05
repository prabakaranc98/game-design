// Board 01: how AI and games connect.
// All text lives here. Sketches and components read from this file,
// so editing the story never requires touching drawing code.

const doi = (id) => `https://doi.org/${id}`;
const arxiv = (id) => `https://arxiv.org/abs/${id}`;

export const REFS = {
  gameAiBook: {
    text: 'Yannakakis & Togelius, Artificial Intelligence and Games (Springer). Groups game AI into playing games, generating content and modelling players.',
    url: 'http://gameaibook.org/',
  },
  mda: {
    text: 'Hunicke, LeBlanc & Zubek (2004), MDA: A Formal Approach to Game Design and Game Research.',
    url: 'https://users.cs.northwestern.edu/~hunicke/MDA.pdf',
  },
  fullerton: {
    text: 'Fullerton, Game Design Workshop. A playcentric design process built on early prototypes and playtests.',
  },
  gregory: {
    text: 'Gregory, Game Engine Architecture. The standard reference for engine and runtime systems.',
    url: 'https://www.gameenginebook.com/',
  },
  spelunky: {
    text: 'Spelunky (Derek Yu, 2008). Generates a new level layout every run.',
  },
  sentient: {
    text: 'Liapis, Yannakakis & Togelius (2013), Sentient Sketchbook: computer-aided level authoring.',
  },
  ghostwriter: {
    text: 'Ubisoft La Forge (2023), Ghostwriter: first drafts of NPC lines for writers to edit.',
  },
  lmm: {
    text: 'Holden et al. (2020), Learned Motion Matching. Ubisoft La Forge.',
    url: 'https://www.ubisoft.com/en-us/studio/laforge/news/3NWqwcMU9lMfumgfPAEfka/learned-motion-matching',
  },
  king: {
    text: 'Gudmundsson et al. (2018), Human-Like Playtesting with Deep Learning. King, Candy Crush levels.',
  },
  seed: {
    text: 'Gordillo et al. (2021), Improving Playtesting Coverage via Curiosity Driven Reinforcement Learning Agents. EA SEED.',
  },
  wham: {
    text: 'Kanervisto et al. (2025), World and Human Action Models towards gameplay ideation. Nature.',
    url: doi('10.1038/s41586-025-08600-3'),
  },
  pacman: {
    text: 'Pittman, The Pac-Man Dossier. How each ghost picks its target tile.',
    url: 'https://pacman.holenet.info/',
  },
  fear: {
    text: 'Orkin (2006), Three States and a Plan: The A.I. of F.E.A.R. GDC talk on goal-oriented action planning.',
  },
  sophy: {
    text: 'Wurman et al. (2022), Outracing champion Gran Turismo drivers with deep reinforcement learning. Nature.',
    url: doi('10.1038/s41586-021-04357-7'),
  },
  l4d: {
    text: 'Booth (2009), The AI Systems of Left 4 Dead. Valve slides on the AI Director.',
    url: 'https://steamcdn-a.akamaihd.net/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf',
  },
  gamengen: {
    text: 'Valevski et al. (2024), Diffusion Models Are Real-Time Game Engines (GameNGen, DOOM).',
    url: arxiv('2408.14837'),
  },
  genie3: {
    text: 'Google DeepMind (2025), Genie 3: interactive worlds from a text prompt at 24 fps.',
    url: 'https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/',
  },
  trueskill: {
    text: 'Microsoft Research, TrueSkill. Bayesian skill ratings used for Xbox Live matchmaking.',
    url: 'https://www.microsoft.com/en-us/research/project/trueskill-ranking-system/',
  },
  dqn: {
    text: 'Mnih et al. (2015), Human-level control through deep reinforcement learning. Nature.',
    url: doi('10.1038/nature14236'),
  },
  alphago: {
    text: 'Silver et al. (2016), Mastering the game of Go with deep neural networks and tree search. Nature.',
    url: doi('10.1038/nature16961'),
  },
  alphastar: {
    text: 'Vinyals et al. (2019), Grandmaster level in StarCraft II using multi-agent reinforcement learning. Nature.',
    url: doi('10.1038/s41586-019-1724-z'),
  },
  five: {
    text: 'OpenAI (2019), Dota 2 with Large Scale Deep Reinforcement Learning.',
    url: arxiv('1912.06680'),
  },
  pluribus: {
    text: 'Brown & Sandholm (2019), Superhuman AI for multiplayer poker. Science.',
    url: doi('10.1126/science.aay2400'),
  },
  cicero: {
    text: 'Meta FAIR (2022), Human-level play in the game of Diplomacy by combining language models with strategic reasoning. Science.',
    url: doi('10.1126/science.ade9097'),
  },
  voyager: {
    text: 'Wang et al. (2023), Voyager: An Open-Ended Embodied Agent with Large Language Models.',
    url: arxiv('2305.16291'),
  },
  nle: {
    text: 'Küttler et al. (2020), The NetHack Learning Environment.',
    url: arxiv('2006.13760'),
  },
  loops: {
    text: 'Cook (2012), Loops and Arcs. Lostgarden.',
    url: 'https://lostgarden.com/2012/04/30/loops-and-arcs/',
  },
};

// The three parts of making a game. Colors come from CSS tokens of the same key.
export const PILLARS = {
  design: { name: 'Design', tagline: 'What the game is, and why' },
  dev: { name: 'Development', tagline: 'Making the game' },
  eng: { name: 'Engineering', tagline: 'Making it run, everywhere' },
};

export const ROLES = [
  {
    key: 'opponent',
    name: 'Opponent',
    does: 'Challenges the player.',
    examples: [
      'Pac-Man (1980): each ghost chases by its own targeting rule.',
      'F.E.A.R. (2005): soldiers plan their actions toward goals.',
      'Gran Turismo Sophy (2022): beat top human drivers.',
    ],
    note: 'The strongest opponent is rarely the most fun. Designers tune AI to lose well.',
    refs: ['pacman', 'fear', 'sophy'],
  },
  {
    key: 'companion',
    name: 'Companion',
    does: 'Plays alongside the player.',
    examples: ['BioShock Infinite (2013): Elizabeth finds supplies and keeps out of the line of fire.'],
    note: 'A companion is judged by how rarely it gets in the way.',
    refs: [],
  },
  {
    key: 'director',
    name: 'Director',
    does: 'Controls pacing and events.',
    examples: [
      'Left 4 Dead (2008): the AI Director tracks player stress and times the attacks.',
      'RimWorld: storytellers pick events that shape a colony’s story.',
    ],
    note: 'A designer’s pacing curve, carried out live.',
    refs: ['l4d'],
  },
  {
    key: 'world',
    name: 'World builder',
    does: 'Generates the space as people play.',
    examples: [
      'Rogue (1980) and Spelunky (2008): a new level every run.',
      'No Man’s Sky (2016): a generated galaxy.',
      'GameNGen (2024) and Genie 3 (2025): models that generate the frames themselves.',
    ],
    note: 'The designer designs the generator, not each level.',
    refs: ['spelunky', 'gamengen', 'genie3'],
  },
  {
    key: 'talk',
    name: 'Conversation',
    does: 'Talking to a character is the mechanic.',
    examples: [
      'Façade (2005): type English to two characters.',
      'AI Dungeon (2019): a language model as game master.',
      'Ubisoft NEO NPC prototypes (2024).',
    ],
    note: 'Staying in character, on topic and within budget at the same time is still hard.',
    refs: [],
  },
  {
    key: 'model',
    name: 'Player model',
    does: 'Learns about the player and adapts.',
    examples: [
      'Resident Evil 4 (2005): difficulty shifts with how well you play.',
      'TrueSkill (Microsoft Research): skill ratings for matchmaking, used in Halo 3.',
    ],
    note: 'Adaptation that players notice can feel unfair.',
    refs: ['trueskill'],
  },
  {
    key: 'standin',
    name: 'Stand-in player',
    does: 'Plays as a person, or in their place.',
    examples: [
      'Forza Motorsport 5 (2013): Drivatars learn how you drive and race as you in other people’s games.',
      'Bots that fill empty seats in multiplayer matches.',
    ],
    note: 'It should feel like a person, not a perfect machine.',
    refs: [],
  },
  {
    key: 'hood',
    name: 'Under the hood',
    does: 'Runs systems players never see.',
    examples: [
      'NVIDIA DLSS: learned upscaling, so the GPU renders fewer pixels per frame.',
      'Valve VACnet (2018): a neural network flags likely cheaters in CS:GO for review.',
    ],
    note: 'It has to fit inside the frame budget alongside everything else.',
    refs: [],
  },
];

export const MILESTONES = [
  { year: '1959', game: 'Checkers', kind: 'board', text: 'Arthur Samuel’s program improved by playing itself. His paper popularised the term “machine learning”.' },
  { year: '1992', game: 'Backgammon', kind: 'board', text: 'TD-Gammon reached strong human level by learning from self-play.' },
  { year: '1997', game: 'Chess', kind: 'board', text: 'Deep Blue beat world champion Garry Kasparov.' },
  { year: '2015', game: 'Atari', kind: 'video', text: 'DQN learned 49 Atari games from raw pixels with one method.', ref: 'dqn' },
  { year: '2016', game: 'Go', kind: 'board', text: 'AlphaGo beat Lee Sedol.', ref: 'alphago' },
  { year: '2019', game: 'StarCraft · Dota', kind: 'video', text: 'AlphaStar reached Grandmaster in StarCraft II. OpenAI Five beat the Dota 2 world champions.', ref: 'alphastar' },
  { year: '2019', game: 'Poker', kind: 'board', text: 'Pluribus beat top professionals at six-player no-limit hold’em.', ref: 'pluribus' },
  { year: '2022', game: 'Diplomacy · GT', kind: 'video', text: 'Cicero negotiated in plain language. GT Sophy outraced champion drivers.', ref: 'cicero' },
  { year: '2023', game: 'Minecraft', kind: 'video', text: 'Voyager, a language-model agent, wrote and reused its own skills.', ref: 'voyager' },
  { year: '2024–25', game: 'DOOM and beyond', kind: 'generated', text: 'GameNGen and Genie 3 generate the game itself, frame by frame.', ref: 'gamengen' },
  { year: 'open', game: 'NetHack', kind: 'open', text: 'Long, random and unforgiving. Still far from solved by learning agents.', ref: 'nle' },
];

export const MILESTONE_KINDS = {
  board: 'Board and card games',
  video: 'Video games',
  generated: 'AI generates the game',
  open: 'Still open',
};

// Rows are the parts of making a game; columns are when AI shows up.
export const MAP = {
  cols: [
    { key: 'make', name: 'Make-time', sub: 'AI for games: helps the people making it' },
    { key: 'play', name: 'Play-time', sub: 'AI in games: runs while people play' },
  ],
  rows: [
    {
      key: 'design',
      make: ['Brainstorming and references', 'Critique against MDA and design lenses', 'Generated options to choose from', 'Simulated playtests and balancing'],
      play: ['Directors that pace the game', 'Adaptive difficulty', 'Generated levels and worlds', 'Characters you talk to'],
    },
    {
      key: 'dev',
      make: ['Code assistants', 'Dialogue drafts for writers', 'Learned motion matching', 'Agents that playtest levels'],
      play: ['Building the game AI: behaviour trees (Halo 2, 2004), planners (F.E.A.R., 2005), utility scoring, trained agents', 'Tuning it against real players'],
    },
    {
      key: 'eng',
      make: ['Test agents at scale', 'Crash triage', 'Performance analysis', 'Asset and build pipelines'],
      play: ['Inference inside a 16.7 ms frame', 'Learned upscaling (DLSS)', 'Anti-cheat (VACnet)', 'Matchmaking ratings (TrueSkill)'],
    },
  ],
  back: 'Checkers · Backgammon · Chess · Atari · Go · StarCraft II · Dota 2 · Poker · Diplomacy · Gran Turismo · Minecraft · NetHack',
};

export const board = {
  id: '01',
  short: 'AI × Games',
  title: 'AI × Games',
  titleAccent: 'AI',
  subtitle: 'How AI and games connect, before we push in on design',
  fields: [
    { label: 'Project', value: 'AI-based game design & development' },
    { label: 'Next', value: 'Session 1 · Storyboarding games' },
  ],
  refs: REFS,
  frames: [
    {
      id: 'two-worlds',
      shot: 'Establishing',
      title: 'Two worlds meet',
      short: 'Two worlds',
      sketch: 'twoWorlds',
      action: 'Two circles drift together. The overlap is what this course covers.',
      elements: [
        { term: 'AI', text: 'Systems that decide, generate or learn. Hand-written rules and search count, not only trained models.' },
        { term: 'Games', text: 'Designed systems that people play, built through design, development and engineering.' },
        { term: 'The overlap', text: 'Traffic runs both ways. AI changes how games are made and played, and games have long been where AI gets tested.' },
      ],
      refs: ['gameAiBook'],
      question: 'Which parts of this overlap are new since 2022, and which are 1980s ideas running on bigger models?',
    },
    {
      id: 'made-of',
      shot: 'Cutaway',
      title: 'What a game is made of',
      short: 'Made of',
      sketch: 'cutaway',
      action: 'Cut the building open: design on the top floor, development in the walls, engineering in the foundation.',
      pillars: {
        design: ['Purpose and audience: who it is for, what it means to them', 'Player experience: what people should feel', 'Mechanics and systems: rules, verbs, loops', 'Story, world, art direction, sound and feel', 'Taste: what to keep and what to cut', 'Positioning: where it sits among other games'],
        dev: ['Gameplay programming', 'Content: art, animation, audio, levels, writing', 'Tools and pipelines', 'Prototypes and playtests', 'QA and bug fixing', 'Production: milestones, vertical slice, iteration'],
        eng: ['Engine and game loop', 'Rendering, physics and animation systems', 'Memory and streaming', 'Networking and netcode', 'Backend: accounts, matchmaking, live services, telemetry', 'Performance and platforms: at 60 fps every frame gets 16.7 ms'],
      },
      note: 'Here, development means building the game and engineering means the technical systems it runs on. On small teams the same people do both.',
      refs: ['mda', 'fullerton', 'gregory'],
      question: 'Where does taste live in this stack, and can any of it be written down?',
    },
    {
      id: 'directions',
      shot: 'Overhead',
      title: 'Two directions, and a way back',
      short: 'Directions',
      sketch: 'directions',
      action: 'From above: AI feeds the studio and the running game. Games feed back into AI research.',
      elements: [
        { term: 'AI for games', tag: 'make-time', text: 'AI helps the people making the game. Its output is a design, an asset, code or a test report. Players never meet it.' },
        { term: 'AI in games', tag: 'play-time', text: 'AI runs while people play: an opponent, a companion, a director, the world itself. Players meet it directly.' },
        { term: 'Games for AI', text: 'Games give AI research clear goals, scores and safe worlds to fail in. Many landmark AI results came from games.' },
      ],
      note: 'One technique can sit on either side. A level generator inside an editor is make-time. Spelunky builds a new level every run, at play-time.',
      refs: ['gameAiBook', 'spelunky'],
      question: 'When should a generator run in the editor, and when should it run in front of the player?',
    },
    {
      id: 'studio',
      shot: 'Tracking',
      title: 'AI for games: in the studio',
      short: 'In the studio',
      sketch: 'studio',
      action: 'Track one idea down the line. Red marks show where AI helps at each station.',
      pillars: {
        design: ['Brainstorming and references', 'Critique against frameworks such as MDA', 'Generated options for a designer to pick from (Sentient Sketchbook, 2013)', 'Gameplay ideation with world models (Microsoft Muse, 2025)'],
        dev: ['Code assistants', 'First drafts of NPC lines for writers to edit (Ghostwriter, 2023)', 'Animation from motion capture with learned motion matching (2020)', 'Agents that playtest levels (King, Candy Crush, 2018)'],
        eng: ['Test agents that hunt for bugs and unreachable areas (EA SEED, 2021)', 'Crash triage and performance analysis', 'Asset and build pipelines'],
      },
      refs: ['sentient', 'wham', 'ghostwriter', 'lmm', 'king', 'seed'],
      question: 'Which studio steps does AI speed up without making every game look the same?',
    },
    {
      id: 'at-play',
      shot: 'Close-up',
      title: 'AI in games: at play',
      short: 'At play',
      sketch: 'orbit',
      action: 'Close on the player. Each role AI can take during play sits in orbit around them. Pick one.',
      roles: true,
      question: 'When does a smarter opponent make the game worse?',
    },
    {
      id: 'testbeds',
      shot: 'Pan',
      title: 'Games for AI: the testbed line',
      short: 'Testbeds',
      sketch: 'testbeds',
      action: 'Pan across seven decades. Each step is a harder game and a new kind of AI to play it. Spacing shows order, not time.',
      milestones: true,
      refs: ['dqn', 'alphago', 'alphastar', 'five', 'pluribus', 'cicero', 'sophy', 'voyager', 'gamengen', 'nle'],
      question: 'What makes a game a good AI testbed, and why does NetHack still resist?',
    },
    {
      id: 'map',
      shot: 'Master',
      title: 'The whole map',
      short: 'The map',
      sketch: 'map',
      action: 'The master shot: three parts of making games, two times when AI shows up, and the road back to AI research.',
      elements: [
        { term: 'Read across', text: 'One part of game making, at make-time and at play-time.' },
        { term: 'Read down', text: 'Everything AI touches at one time, from design to engineering.' },
        { term: 'Bottom band', text: 'The games that AI research has used as testbeds.' },
      ],
      note: 'At play-time the designer shapes what the AI is allowed to do, not each outcome.',
      refs: ['gameAiBook'],
      question: 'Which cell is changing fastest right now, and which has barely moved since the 2000s?',
    },
    {
      id: 'next',
      shot: 'Push-in',
      title: 'Next: push in on design',
      short: 'Next',
      sketch: 'pushIn',
      action: 'Push in on the top floor. Session 1 opens design itself: storyboarding, starting from MDA.',
      elements: [
        { term: 'MDA', text: 'Designers build mechanics. Mechanics produce dynamics in play. Dynamics produce the aesthetics players feel. Players meet the same chain from the other end.' },
      ],
      upcomingLabel: 'Session 1 covers',
      upcoming: [
        'Who holds the camera',
        'Four pictures designers draw',
        'Mechanics, dynamics, aesthetics: board from the feeling',
        'One moment, one curve, one page',
        'AI as critic, not author',
      ],
      collectQuestions: true,
      refs: ['mda', 'loops'],
    },
  ],
};

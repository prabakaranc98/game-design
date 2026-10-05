// Craft layer: questions to ask, common mistakes, worked cases, myths, standards,
// exercises and inquiry scenarios. Used by both the slides and the study guide.

// Per concept: a question that has no single answer, and the mistake people usually make.
export const CONCEPT_EXTRAS = {
  experience: { ask: 'Name a game you love. What did it make you feel, and which rule made you feel it?', mistake: 'Boarding the content (levels, enemies, cutscenes) without ever stating the feeling it should produce.' },
  'second-order': { ask: 'What is one thing players did in a game that its designers probably never planned?', mistake: 'Treating a storyboard as a script the player will follow.' },
  mda: { ask: 'Pick one aesthetic for your game. Which dynamic produces it, and which rule produces that dynamic?', mistake: 'Reading “aesthetics” as art direction, or listing mechanics without the feeling they serve.' },
  fun: { ask: 'Where in your favourite game did you stop learning, and what did the game do next?', mistake: 'Adding more content without new patterns. More of the same reads as boring, not as more.' },
  iteration: { ask: 'What is the one question your next prototype must answer?', mistake: 'Polishing before the core loop has been proven fun.' },
  lenses: { ask: 'Which single lens would change your current design most if you applied it honestly?', mistake: 'Using lenses as a checklist to pass instead of questions to think with.' },
  storyboard: { ask: 'What is the smallest board that would tell your team whether the idea works?', mistake: 'Jumping to detailed panels before the order of events is agreed.' },
  'fail-cheap': { ask: 'What was the most expensive late change on a project you know, and where could a board have caught it?', mistake: 'Treating the board as a deliverable to perfect instead of a draft to break.' },
  align: { ask: 'If five people read your board, would they all describe the same moment?', mistake: 'Boards that only make sense when their author is in the room to explain them.' },
  shots: { ask: 'At this moment in your game, who decides the framing: you, the camera system or the player?', mistake: 'Boarding gameplay with cinematic framing that the player’s camera will never show.' },
  contrast: { ask: 'Where is the biggest visual contrast in your level, and is it where the biggest moment is?', mistake: 'Keeping intensity high everywhere, so nothing stands out.' },
  closure: { ask: 'Which action in your board should happen in the gutter, left to the player?', mistake: 'Drawing every in-between step, so neither the reader nor the player has anything to fill in.' },
  fidelity: { ask: 'What is the lowest fidelity at which your current question can still be answered?', mistake: 'Polishing early, then defending the polish instead of the idea.' },
  spec: { ask: 'What can the player do in your key panel, and what happens if they don’t?', mistake: 'Drawing the hero doing the right thing, with no input, choice or fail state marked.' },
  architecture: { ask: 'Which of the four kinds of spatial story does your game rely on most?', mistake: 'Putting all the story in cutscenes while the space itself says nothing.' },
  stack: { ask: 'Which layer of the stack is your team missing right now?', mistake: 'Using one artifact, often the script or the cutscene board, to answer every question.' },
  'beat-chart': { ask: 'Where is the first rest in your beat chart, and has the player earned it?', mistake: 'A flat curve, or one that only rises, with no rests.' },
  branching: { ask: 'How many unique scenes would your story need as a time cave, and how many as branch-and-bottleneck?', mistake: 'Equating more branches with more agency. Agency comes from consequences the player can feel.' },
  'four-step': { ask: 'Where does the twist come in your level, and does the conclusion test everything it taught?', mistake: 'Introducing a mechanic in a dangerous spot before it has been taught somewhere safe.' },
  'three-cs': { ask: 'Could an engineer build the controls and camera from your panel alone?', mistake: 'Leaving the camera unmarked, so art and engineering assume different views.' },
  'other-boards': { ask: 'Which question in your design needs a map, and which needs a flow?', mistake: 'Using panels for problems that are really about space or navigation.' },
  studio: { ask: 'Which gate is your project heading for next, and which board will convince the people at it?', mistake: 'A long design document nobody reads, instead of a one-page diagram people can point at.' },
  models: { ask: 'Which layer would you hand to a model first, and why that one?', mistake: 'Expecting one model to handle beats, panels, timing and playability at once.' },
  consistency: { ask: 'What would you check automatically between panel 1 and panel 12?', mistake: 'Judging a generated board panel by panel instead of as one sequence.' },
  control: { ask: 'What input would you give the model so that it cannot ignore your intent?', mistake: 'Prompting from text alone and accepting whatever composition comes back.' },
  evaluation: { ask: 'How would you know an AI board tool made your team’s boards better, not just faster?', mistake: 'Measuring speed or volume and calling it quality.' },
  collapse: { ask: 'If the board is playable, what job is left for a drawn board?', mistake: 'Assuming that playable means designed. A world model can produce play without intent.' },
  mixed: { ask: 'In your workflow, where exactly does the AI’s turn end and yours begin?', mistake: 'Leaving the split implicit, so nobody owns the final call.' },
  risks: { ask: 'Which of the three risks could you test in one afternoon?', mistake: 'Treating hypotheses as findings, in either direction.' },
};

// Worked cases from real games and studios. `figure` names a diagram in diagrams.jsx.
export const CASES = [
  {
    id: 'pacman', module: 'm1', title: 'Pac-Man’s four ghosts', game: 'Pac-Man', studio: 'Namco', year: '1980', figure: 'ghosts', figureSteps: 3,
    did: 'Each ghost picks its target with its own rule. Blinky targets your tile. Pinky aims four tiles ahead of you. Inky doubles the line from Blinky to the tile two ahead of you. Clyde chases when far away and retreats to his corner when close.',
    teaches: 'Four small rule differences produce four readable personalities. The chase becomes something players can learn to play against: MDA in one screen.',
    discuss: 'What would happen to the feeling if all four ghosts simply chased you?',
    refs: ['pacman'],
  },
  {
    id: 'world11', module: 'm1', title: 'World 1-1 teaches without words', game: 'Super Mario Bros.', studio: 'Nintendo', year: '1985', figure: 'world11', figureSteps: 3,
    did: 'The first level was designed so players learn by playing. The Goomba was created as an easier first enemy than the planned Koopa. The first mushroom rolls away, bounces off a pipe and comes back to the player.',
    teaches: 'The first minute of a level is a lesson plan, and it can be boarded as one.',
    discuss: 'Where in your game does the first minute teach the core verb, without any text?',
    refs: ['world11'],
  },
  {
    id: 'reels', module: 'm2', title: 'Pixar’s story reels', game: 'Feature films', studio: 'Pixar', year: 'ongoing',
    did: 'Storyboards are cut together with temporary voices and music into story reels and screened for the Braintrust, a group of directors who give candid notes. Reels are reworked many times before animation starts.',
    teaches: 'A board’s job is to be watched, judged and changed while change is still cheap.',
    discuss: 'What would a story reel be for your game, and who is your Braintrust?',
    refs: ['catmull'],
  },
  {
    id: 'odyssey', module: 'm2', title: 'Cutscene boards at Nintendo', game: 'Super Mario Odyssey', studio: 'Nintendo', year: '2017',
    did: 'The game’s cutscenes were storyboarded as hand-drawn panels before animation. The boards are published in the game’s art book.',
    teaches: 'Game cinematics still use film boards. It is gameplay that needs the other layers of the stack.',
    discuss: 'Which moments in your game must be authored shots, and which must stay in the player’s hands?',
    refs: ['odyssey'],
  },
  {
    id: 'graphpaper', module: 'm3', title: 'Levels on graph paper', game: 'Super Mario Bros.', studio: 'Nintendo', year: '1985',
    did: 'Miyamoto and Tezuka drew levels block by block on graph paper, edited them with tracing paper laid on top, and handed the sheets to the programmers.',
    teaches: 'A level board is a working document between design and engineering, made to be edited.',
    discuss: 'What is your tracing paper: the cheapest way to edit your board?',
    refs: ['mario'],
  },
  {
    id: 'director', module: 'm3', title: 'Left 4 Dead’s AI Director', game: 'Left 4 Dead', studio: 'Valve', year: '2008', figure: 'director', figureSteps: 1,
    did: 'The Director estimates each player’s stress and cycles through four states: build up, sustain peak, peak fade and relax. It spawns threats in build up and holds them back while players recover.',
    teaches: 'A pacing curve can be written as rules and run live, so every session gets its own curve.',
    discuss: 'Which parts of your pacing should be authored, and which should adapt to the player?',
    refs: ['l4d'],
  },
  {
    id: 'journey', module: 'm3', title: 'Journey’s emotional arc', game: 'Journey', studio: 'thatgamecompany', year: '2012',
    did: 'Jenova Chen charted the intended emotion across the whole game, combining three-act structure with the hero’s journey. The team shaped the world’s terrain from that curve.',
    teaches: 'An intensity curve can drive the geography of a level, not only the timing of encounters.',
    discuss: 'Could the layout of your level follow your intensity curve?',
    refs: ['journey', 'chen'],
  },
  {
    id: 'muse', module: 'm4', title: 'Muse: a model of one game', game: 'Bleeding Edge', studio: 'Microsoft Research and Ninja Theory', year: '2025',
    did: 'Muse was trained only on Bleeding Edge: over a billion frames and controller actions, about seven years of play. It continues gameplay from a short input, and creatives can edit what it generates. The weights and a demonstrator were released.',
    teaches: 'A world model can be a gameplay sketchpad, but it only knows the game it was trained on.',
    discuss: 'Would a model trained on your last game help or limit your next one?',
    refs: ['wham', 'museXbox'],
  },
  {
    id: 'genie2', module: 'm4', title: 'Genie 2: concept art you can walk into', game: 'Research model', studio: 'Google DeepMind', year: '2024',
    did: 'Genie 2 turns a single image, including concept art, into an environment that a person or an agent can move through with keyboard and mouse. DeepMind presented it as a way for artists and designers to prototype quickly.',
    teaches: 'The jump from board to playable can now start from one frame. This is the board-to-prototype collapse in practice.',
    discuss: 'If one concept painting becomes playable, what does the storyboard still need to specify?',
    refs: ['genie2'],
  },
  {
    id: 'roblox4d', module: 'm4', title: 'Roblox: objects that come with behaviour', game: 'Roblox', studio: 'Roblox', year: '2025–26',
    did: 'Cube turns a text prompt into a 3D mesh, and Roblox open-sourced the 3D model. In 2026 it added 4D generation: objects built from schemas, such as a five-part car, with behaviour attached so they drive or fly. Roblox reports players generated over 160,000 objects in one game’s early access.',
    teaches: 'The generated unit is moving from a picture to a playable object. In 4D generation the asset carries its own mechanics.',
    discuss: 'Roblox reported 64% more play time among players who used it. Is play time the right measure of a design tool?',
    refs: ['robloxCube', 'roblox4d'],
  },
  {
    id: 'ghostwriter', module: 'm4', title: 'Ghostwriter: drafts for writers', game: 'Open-world games', studio: 'Ubisoft La Forge', year: '2023',
    did: 'Ghostwriter generates first drafts of barks, the short lines NPCs say when something happens. Writers choose and polish drafts instead of writing them from scratch. The announcement also drew criticism about writers’ jobs.',
    teaches: 'AI in production tends to land first on high-volume, low-stakes content, and it raises authorship questions on the way.',
    discuss: 'Which writing in your game would you hand to a model, and which never?',
    refs: ['ghostwriterNews'],
  },
];

export const MYTHS = {
  m1: [
    ['In MDA, aesthetics means the art style.', 'It means what the player feels: challenge, discovery, fellowship and so on.'],
    ['If the rules are right, the experience follows.', 'Rules only make some experiences likely. Playtests show which ones you actually got.'],
  ],
  m2: [
    ['A storyboard needs good drawing.', 'It needs clear order, framing and intent. Stick figures do the job.'],
    ['The more detailed the board, the better.', 'Detail too early slows change and discourages critique.'],
  ],
  m3: [
    ['Game storyboards are cutscene storyboards.', 'Cinematics are one layer of nine. Most game boards are charts, maps, graphs and annotated panels.'],
    ['More branches means more agency.', 'Agency comes from consequences the player can feel. Branches multiply cost; bottlenecks and storylets keep it manageable.'],
  ],
  m4: [
    ['Better image models will make better storyboards.', 'Image quality is the easy part. Consistency, control and evaluation are the hard ones.'],
    ['AI will replace storyboard artists.', 'Current tools draft; people choose, direct and judge. How roles shift is an open question, not a settled one.'],
  ],
};

// Craft standards: the working vocabulary of boards in film and games.
export const STANDARDS = {
  shotSizes: {
    title: 'Shot sizes',
    rows: [
      ['ELS', 'Extreme long shot', 'Place and scale; people are tiny'],
      ['LS', 'Long shot', 'The whole body in its setting'],
      ['MLS', 'Medium long shot', 'From the knees up'],
      ['MS', 'Medium shot', 'From the waist up'],
      ['MCU', 'Medium close-up', 'From the chest up'],
      ['CU', 'Close-up', 'The face'],
      ['ECU', 'Extreme close-up', 'A detail: eyes, a hand, a key'],
    ],
  },
  cameraMoves: {
    title: 'Camera moves',
    rows: [
      ['Pan', 'The camera turns left or right on the spot'],
      ['Tilt', 'The camera turns up or down on the spot'],
      ['Track / dolly', 'The camera itself travels, alongside or towards the subject'],
      ['Crane / pedestal', 'The camera rises or lowers'],
      ['Zoom', 'The lens changes; the camera stays where it is'],
      ['Push-in / pull-out', 'The camera moves closer or further away'],
    ],
    note: 'Notation: arrows inside the frame show subject movement. A frame drawn inside the frame, with arrows between the corners, shows a zoom or push-in.',
  },
  continuity: {
    title: 'Continuity rules',
    rows: [
      ['180° rule', 'Keep the camera on one side of the line between two subjects, so left and right stay consistent.'],
      ['30° rule', 'Between two shots of the same subject, move the camera at least 30°, or the cut looks like a jump.'],
      ['Screen direction', 'Keep travel in a consistent direction across cuts, for example always left to right on a journey.'],
      ['Eyeline match', 'Cut from a look to what is being looked at, and keep the angle believable.'],
      ['Match on action', 'Cut in the middle of a movement so it continues across the cut.'],
    ],
  },
  panel: {
    title: 'Anatomy of a storyboard panel',
    rows: [
      ['ID', 'Scene, shot and panel number, for example SC 04 · SH 12 · P 03'],
      ['Frame', 'What the camera sees, in the project’s aspect ratio (16:9 for most games)'],
      ['Subject movement', 'Arrows inside the frame'],
      ['Camera move', 'End frame drawn inside the frame, or an arrow outside it'],
      ['Action', 'One line: what happens'],
      ['Dialogue and sound', 'Lines, effects and music cues'],
      ['Timing', 'Duration in seconds or frames: 2.5 s is 60 frames at 24 fps'],
      ['Transition', 'Cut, dissolve or fade to the next shot'],
    ],
  },
  gameplayPanel: {
    title: 'Annotating a gameplay panel',
    rows: [
      ['Character', 'What the player character can do here'],
      ['Camera', 'What the player sees, and who controls the view'],
      ['Controls', 'The inputs, as button glyphs'],
      ['Goal', 'What the player is trying to do'],
      ['State', 'Health, inventory, flags that matter here'],
      ['Outcomes', 'What happens on success, and on failure'],
      ['Teaching intent', 'What this panel teaches, if anything'],
    ],
  },
  beatChart: {
    title: 'Beat chart: common rows',
    rows: [
      ['Level and location', 'Where the player is'],
      ['Story beat', 'What changes in the story'],
      ['New mechanic', 'What the player learns or unlocks'],
      ['Threats', 'Enemies and hazards'],
      ['Rewards', 'Pickups, upgrades, secrets'],
      ['Intensity', 'Planned level, low to high'],
      ['Music and mood', 'What it should sound and feel like'],
      ['Play time', 'Estimated minutes'],
    ],
  },
  oneSheet: {
    title: 'One-sheet: typical fields',
    rows: [
      ['Title and genre', 'What the game is called and what kind it is'],
      ['Platforms and audience', 'Where it runs, who it is for'],
      ['Premise', 'The story or situation in two or three lines'],
      ['Core loop', 'What the player does over and over'],
      ['Unique selling points', 'Three reasons it is different'],
      ['Comparables', 'Games it will be compared with'],
    ],
  },
  playtest: {
    title: 'Playtest protocol',
    rows: [
      ['One question', 'Decide what this session must answer before it starts.'],
      ['Right players', 'Recruit people who match the audience, not only the team.'],
      ['Watch, don’t help', 'Let players struggle; note where they stop, look and fail.'],
      ['Think aloud', 'Ask players to say what they are thinking as they play.'],
      ['Ask after', 'Hold questions until the end, so you don’t steer play.'],
      ['Observe, then interpret', 'Write what happened before what it means.'],
      ['Design as hypothesis', 'Treat the design as a hypothesis and the playtest as an experiment (Valve).'],
    ],
  },
  critique: {
    title: 'Critique protocol',
    rows: [
      ['The work, not the person', 'Notes describe the board, never its author.'],
      ['See, then think', 'Say what you see before what you think it means.'],
      ['Tie it to the goal', 'Connect each note to the pillars or the intended feeling.'],
      ['Suggest, don’t prescribe', 'Offer options; the author decides.'],
      ['A simple format', '“I noticed…”, “I wonder…”, “What if…”'],
    ],
  },
};

export const EXERCISES = [
  {
    id: 'mda-teardown', module: 'm1', title: 'MDA teardown', time: '15 min',
    steps: ['Pick a game you know well.', 'Write three chains: mechanic → dynamic → aesthetic.', 'Find one aesthetic that nothing produces, or one mechanic that serves no aesthetic.'],
    output: 'One page: three chains and one gap.',
  },
  {
    id: 'six-thumbnails', module: 'm2', title: 'Six thumbnails', time: '15 min',
    steps: ['Board a ten-second moment in six rough thumbnails.', 'Label each transition using McCloud’s six types.', 'Redraw it with two panels removed. Does the reader still follow?'],
    output: 'Two strips and one note on what the gutter now does.',
  },
  {
    id: 'board-11', module: 'm3', title: 'Board World 1-1', time: '20 min',
    steps: ['Draw the first screen as a gameplay panel.', 'Annotate the 3Cs and the teaching intent.', 'Sketch the intensity curve for the first 30 seconds.'],
    output: 'One annotated panel and one curve.',
  },
  {
    id: 'two-shapes', module: 'm3', title: 'Same story, two shapes', time: '15 min',
    steps: ['Take a scene with three choices in a row.', 'Draw it as a time cave, then as branch-and-bottleneck.', 'Count the scenes and endings each one needs.'],
    output: 'Two graphs and the counts.',
  },
  {
    id: 'drift', module: 'm4', title: 'Drift test', time: '20 min',
    steps: ['Generate the same character in five panels with an image model.', 'List what drifts: face, outfit, proportions, layout.', 'Add one conditioning input (a sketch or reference) and compare.'],
    output: 'A drift table, before and after.',
  },
  {
    id: 'critic-test', module: 'm4', title: 'Critic test', time: '20 min',
    steps: ['Plant three errors in a board: one continuity, one state, one pacing.', 'Ask an AI critic to review the board.', 'Score each error: caught, missed or made up.'],
    output: 'A three-by-three tally.',
  },
];

export const INQUIRY = {
  m1: {
    scenario: 'Your team wants a co-op game that feels like fellowship.',
    questions: ['Which dynamic would produce fellowship?', 'Which mechanic forces that dynamic, instead of just allowing it?', 'How would a playtest tell you that you got fellowship and not frustration?'],
  },
  m2: {
    scenario: 'A lead asks for final-looking boards for a pitch next week.',
    questions: ['What do you gain from polish here?', 'What do you lose in critique?', 'Could you show two fidelities to two audiences?'],
  },
  m3: {
    scenario: 'You are boarding a stealth level the player can enter from three sides.',
    questions: ['Which layer do you board first: the map, the beat chart or the panels?', 'How do you show a guard’s sightline and the player’s choice on one panel?', 'What does the beat chart look like if the player is never seen?'],
  },
  m4: {
    scenario: 'A tool turns your beat sheet into a full animatic in five minutes.',
    questions: ['What would you check before showing it to the team?', 'Who now owns the pacing decisions?', 'How would you test whether the team critiques it less than a rough board?'],
  },
};

// AI in studios today. Evidence says how much weight each claim can carry.
export const INDUSTRY = [
  ['Roblox', 'Cube (2025)', 'Assets for level and space', 'Text to a usable 3D mesh in seconds, instead of hours of modelling', 'Company claim'],
  ['Roblox', '4D generation (2026)', 'Objects with behaviour', '160,000+ objects generated; 64% more play time among players who used it', 'Company metric'],
  ['Google DeepMind', 'Genie 2 (2024)', 'Playable previz', 'Concept art turned into a playable environment', 'Research demo'],
  ['Microsoft, Ninja Theory', 'Muse (2025)', 'Gameplay ideation', 'Generated gameplay that creatives can edit', 'Peer-reviewed'],
  ['Ubisoft', 'Ghostwriter (2023)', 'Narrative: barks', 'First drafts that writers choose and polish', 'Company description'],
  ['Ubisoft', 'Teammates (2025)', 'Play-time NPCs', 'Squadmates that respond to the player’s voice; closed playtest', 'Prototype'],
  ['Embark Studios', 'The Finals (2023)', 'Audio: voice lines', 'Text-to-speech built on contracted actors: lines in hours, not months', 'Developer statement'],
  ['Square Enix', 'QA automation', 'Validation', 'Generative AI to handle 70% of QA and debugging by the end of 2027', 'Target, not result'],
];

export const ACCELERATION = [
  { name: 'Skip the blank page', line: 'Drafts to react to instead of starting from nothing.', note: 'Ghostwriter, Cube' },
  { name: 'Shorten idea to playable', line: 'Ideas you can try in minutes instead of weeks.', note: 'Genie 2, Muse, 4D generation' },
  { name: 'Automate volume', line: 'High-count, repetitive work: lines, barks, test passes.', note: 'The Finals, Square Enix QA' },
  { name: 'Hand creation to players', line: 'Players generate content inside the game.', note: 'Roblox 4D generation' },
];

// Exemplars: contemporary games that did something worth stealing.
// Figures are diagrams of each game's structure, not screenshots.
export const EX_SECTION = {
  id: 'ex',
  title: 'Exemplars: what to steal',
  question: 'What have the best teams done with boards, graphs, worlds and characters?',
  answer: 'Steal the structure, not the surface.',
};

export const EXEMPLARS = [
  {
    id: 'detroit', category: 'Branching, made visible', game: 'Detroit: Become Human', studio: 'Quantic Dream', year: '2018', figure: 'exDetroit',
    did: 'At the end of every chapter the game shows its flowchart: the paths you took, the ones you missed, and what percentage of players worldwide chose each option.',
    steal: 'Keep a branch graph for every chapter, and treat it as a design tool. If you would be proud to show it to players, the structure is probably sound.',
    mda: ['Choices that lock and unlock paths', 'Replays, comparison with other players', 'Responsibility, curiosity'],
    refs: ['detroit'],
  },
  {
    id: 'outerwilds', category: 'Knowledge as progression', game: 'Outer Wilds', studio: 'Mobius Digital', year: '2019', figure: 'exOuterWilds',
    did: 'Nothing unlocks except what you know. The ship log has a Rumor mode that draws your discoveries as a graph, linked by the rumours that connect them; its layout depends on the order you found things.',
    steal: 'Board what the player knows, not only where they are. A knowledge graph can be the level design.',
    mda: ['Clues, a time loop, a log that records them', 'Following leads, forming theories', 'Discovery'],
    refs: ['outerWilds'],
  },
  {
    id: 'hades', category: 'Story told through a loop', game: 'Hades', studio: 'Supergiant Games', year: '2020', figure: 'exHades',
    did: 'Every death sends you home, where characters react to what just happened. More than 22,000 lines of dialogue are chosen by the state of your runs, so failing moves the story forward.',
    steal: 'Attach arcs to your loop. Write scenes as small pieces unlocked by state, so repetition feels like progress.',
    mda: ['Runs, death, a home base, state-keyed dialogue', 'Retrying with something new to hear', 'Narrative, challenge, fellowship'],
    refs: ['hadesGDC', 'hadesGD'],
  },
  {
    id: 'botw', category: 'World building with terrain', game: 'The Legend of Zelda: Breath of the Wild', studio: 'Nintendo', year: '2017', figure: 'exBotW',
    did: 'The field team described a “triangle rule”: large triangles are landmarks, medium ones hide what lies behind them, small ones set the tempo. Triangles give a choice (over or around) and make players wonder what is on the other side.',
    steal: 'Board sightlines. Decide what the player sees, what is hidden and when it is revealed.',
    mda: ['Climbable terrain shaped as triangles', 'Detours, climbs, sudden reveals', 'Discovery'],
    refs: ['botw'],
  },
  {
    id: 'gow', category: 'Camera as a design decision', game: 'God of War', studio: 'Santa Monica Studio', year: '2018', figure: 'exGoW',
    did: 'The whole game is one continuous shot with no camera cuts. Director Cory Barlog wanted to keep players with Kratos and Atreus at every moment; it made transitions much harder to plan and extended production.',
    steal: 'Choose your camera grammar before you board. It changes every panel, transition and cinematic you draw.',
    mda: ['A camera that never cuts', 'Fights, talks and travel flowing together', 'Intimacy with the characters'],
    refs: ['gow'],
  },
  {
    id: 'edith', category: 'Character through mechanics', game: 'What Remains of Edith Finch', studio: 'Giant Sparrow', year: '2017', figure: 'exEdith',
    did: 'You explore a family house, and each family member’s story plays with a different mechanic. In one, a cannery worker chops fish heads while his daydream of a kingdom slowly takes over the screen.',
    steal: 'Give each character a verb. A hub with spokes lets every story have its own rules.',
    mda: ['A different mechanic for each story', 'Learning a new way to play every few minutes', 'Narrative, discovery, empathy'],
    refs: ['edith'],
  },
  {
    id: 'disco', category: 'Stats as characters', game: 'Disco Elysium', studio: 'ZA/UM', year: '2019', figure: 'exDisco',
    did: 'The detective’s 24 skills speak as voices in his head. Logic, Empathy, Half Light and others interrupt conversations with their own views, and the points you invest decide which voices you hear.',
    steal: 'Turn systems into characters. A stat that talks is a stat players care about.',
    mda: ['24 skills grouped under four attributes', 'Inner arguments that open dialogue options', 'Expression, narrative'],
    refs: ['disco'],
  },
  {
    id: 'celeste', category: 'Mechanics carry the theme', game: 'Celeste', studio: 'Maddy Makes Games', year: '2018', figure: 'exCeleste',
    did: 'Madeline climbs a mountain while dealing with anxiety and depression; her doubts appear as a dark copy of herself. Assist Mode lets players slow the game, add stamina or turn on invincibility, because players come in at different skill levels.',
    steal: 'Align the aesthetic with the character’s arc, and let players tune the challenge without changing the story.',
    mda: ['Jump, dash, climb with stamina, instant retry', 'Fail, retry, small wins', 'Challenge, perseverance'],
    refs: ['celeste'],
  },
  {
    id: 'papers', category: 'Small rules, heavy feelings', game: 'Papers, Please', studio: 'Lucas Pope', year: '2013', figure: 'exPapers',
    did: 'You are a border inspector checking documents against rules that grow every day, paid per person processed, with a family to feed. Bribes and desperate stories arrive at the booth.',
    steal: 'Pair a strict rule system with human stakes. The moral weight comes from the mechanics, not from cutscenes.',
    mda: ['Document rules, quotas, wages, family costs', 'Time pressure, bending rules, bribes', 'Tension, guilt, empathy'],
    refs: ['papers'],
  },
];

// Two books for the habits behind good creative work, in games and outside them.
// Photos are the course's own (originals in public/img/steal-like-an-artist-lib.jpeg and improv-wisdom.jpeg).
// `maxims` are the books' own chapter titles, in order. `use` marks the ones this course leans on and says
// what each means for design work. If a cover file is missing, the slide draws a plate instead.
export const BOOKS = [
  {
    id: 'steal', title: 'Steal Like an Artist', subtitle: '10 things nobody told you about being creative',
    author: 'Austin Kleon', year: '2012', cover: 'img/cover-steal-like-an-artist.jpg', course: true,
    maxims: [
      { text: 'Steal like an artist.', use: 'Take the structure of an exemplar, not its surface.' },
      { text: 'Don’t wait until you know who you are to get started.' },
      { text: 'Write the book you want to read.' },
      { text: 'Use your hands.', use: 'Thumbnail on paper before any tool.' },
      { text: 'Side projects and hobbies are important.' },
      { text: 'The secret: do good work and share it with people.', use: 'Show boards early. Critique is the point.' },
      { text: 'Geography is no longer our master.' },
      { text: 'Be nice.', note: 'The world is a small town.' },
      { text: 'Be boring.', note: 'It’s the only way to get work done.' },
      { text: 'Creativity is subtraction.', use: 'Cut panels until each one carries a decision.' },
    ],
    refs: ['kleon'],
  },
  {
    id: 'improv', title: 'Improv Wisdom', subtitle: 'Don’t prepare, just show up',
    author: 'Patricia Ryan Madson', year: '2005', cover: 'img/cover-improv-wisdom.jpg', course: false,
    maxims: [
      { text: 'Say yes.', use: 'Build on a teammate’s idea before judging it.' },
      { text: 'Don’t prepare.' },
      { text: 'Just show up.' },
      { text: 'Start anywhere.', use: 'Any panel can be the first one.' },
      { text: 'Be average.', use: 'A rough thumbnail people change beats a polished one they don’t.' },
      { text: 'Pay attention.' },
      { text: 'Face the facts.' },
      { text: 'Stay on course.' },
      { text: 'Wake up to the gifts.' },
      { text: 'Make mistakes, please.', use: 'Playtests exist to find what breaks.' },
      { text: 'Act now.' },
      { text: 'Take care of each other.' },
      { text: 'Enjoy the ride.' },
    ],
    refs: ['madson'],
  },
];

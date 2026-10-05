// AI and Storyboarding for Game Design: the learning content.
// One source for both the slides and the study guide. Edit text here only.
// Arc: game design → storyboarding → storyboarding for games → how AI helps,
// each answered as what, why and how.

export const TITLE = 'AI and Storyboarding for Game Design';
export const SUBTITLE = 'Graduate course · AI and AI engineering for game design and development';

// ---------------------------------------------------------------- references
// course: true marks readings already on the course syllabus.
export const REFS = {
  // Module 1
  mda: { text: 'Hunicke, LeBlanc & Zubek, MDA: A Formal Approach to Game Design and Game Research (2004)', url: 'https://users.cs.northwestern.edu/~hunicke/MDA.pdf', course: true, free: true },
  schell: { text: 'Schell, The Art of Game Design: A Book of Lenses (3rd ed., 2019)', course: true },
  rulesOfPlay: { text: 'Salen & Zimmerman, Rules of Play: Game Design Fundamentals (2003)', course: true },
  fullerton: { text: 'Fullerton, Game Design Workshop', course: true },
  koster: { text: 'Koster, A Theory of Fun for Game Design (2nd ed., 2013)', course: true },
  flow: { text: 'Csikszentmihalyi, Flow: The Psychology of Optimal Experience (1990)' },
  sylvester: { text: 'Sylvester, Designing Games: A Guide to Engineering Experiences (2013)' },
  anthropy: { text: 'Anthropy & Clark, A Game Design Vocabulary (2014)' },
  swink: { text: 'Swink, Game Feel (2008)' },
  isbister: { text: 'Isbister, How Games Move Us: Emotion by Design (2016)' },
  cookLoops: { text: 'Cook, Loops and Arcs (Lostgarden, 2012)', url: 'https://lostgarden.com/2012/04/30/loops-and-arcs/', free: true },
  cookAtoms: { text: 'Cook, The Chemistry of Game Design (Lostgarden)', url: 'https://lostgarden.com/2021/03/13/the-chemistry-of-game-design-2/', free: true },
  dde: { text: 'Walk, Görlich & Barrett, Design, Dynamics, Experience (DDE): an advancement of the MDA framework (2017)' },
  kleon: { text: 'Kleon, Steal Like an Artist: 10 Things Nobody Told You About Being Creative (Workman, 2012)', course: true },
  madson: { text: 'Madson, Improv Wisdom: Don’t Prepare, Just Show Up (Bell Tower, 2005)' },
  // Module 2
  mccloud: { text: 'McCloud, Understanding Comics (1993)' },
  block: { text: 'Block, The Visual Story' },
  catmull: { text: 'Catmull with Wallace, Creativity, Inc. (2014)', course: true },
  katz: { text: 'Katz, Film Directing Shot by Shot (1991)' },
  simon: { text: 'Simon, Storyboards: Motion in Art' },
  tumminello: { text: 'Tumminello, Exploring Storyboarding (2005)' },
  glebas: { text: 'Glebas, Directing the Story (2008)' },
  snyder: { text: 'Snyder, Save the Cat (2005)' },
  pixar: { text: 'Pixar in a Box: The Art of Storytelling (Khan Academy, free)' },
  buxton: { text: 'Buxton, Sketching User Experiences (2007)' },
  truong: { text: 'Truong, Hayes & Abowd, Storyboarding: An Empirical Determination of Best Practices and Effective Guidelines (DIS 2006)' },
  // Module 3
  jenkins: { text: 'Jenkins, Game Design as Narrative Architecture (2004)', url: 'http://web.mit.edu/~21fms/People/henry3/games&narrative.html', free: true },
  rogers: { text: 'Rogers, Level Up! The Guide to Great Video Game Design (3rd ed.)' },
  ashwell: { text: 'Ashwell, Standard Patterns in Choice-Based Games (2015)', url: 'https://heterogenoustasks.wordpress.com/2015/01/26/standard-patterns-in-choice-based-games/', free: true },
  hayashida: { text: 'Hayashida on four-step level design for Super Mario 3D Land (2012 interview)', url: 'https://www.nintendolife.com/news/2012/04/super_mario_3d_land_director_shares_level_design_inspirations', free: true },
  totten: { text: 'Totten, An Architectural Approach to Level Design' },
  lemarchand: { text: 'Lemarchand, A Playful Production Process (2021)' },
  hodent: { text: 'Hodent, The Gamer’s Brain (2017)' },
  biometric: { text: 'Mirza-Babaei et al., biometric storyboards in games user research (CHI 2013)' },
  machinations: { text: 'Adams & Dormans, Game Mechanics: Advanced Game Design (2012)' },
  emshort: { text: 'Short, Small-Scale Structures in CYOA (2016)', url: 'https://emshort.blog/2016/11/05/small-scale-structures-in-cyoa/', free: true },
  levine: { text: 'Levine, Narrative Legos (GDC 2014)' },
  chen: { text: 'Chen, Designing Journey (GDC 2013)' },
  chandler: { text: 'Chandler, The Game Production Toolbox (2020)', course: true },
  librande: { text: 'Librande, One-Page Designs (GDC 2010)' },
  world11: { text: 'World 1-1 (Wikipedia), drawing on Miyamoto and Tezuka’s 2015 Eurogamer interview', url: 'https://en.wikipedia.org/wiki/World_1-1', free: true },
  odyssey: { text: 'Super Mario Odyssey: cutscene storyboards (Game Anim)', url: 'https://www.gameanim.com/2020/09/14/super-mario-odyssey-cutscene-storyboards/', free: true },
  journey: { text: 'Sheffield, The journey to create Journey: the quest for emotion (Game Developer, 2013)', url: 'https://www.gamedeveloper.com/business/the-journey-to-create-i-journey-i----the-quest-for-emotion', free: true },
  mario: { text: 'These sheets of graph paper were used to design Super Mario Bros. (ArchDaily)', url: 'https://www.archdaily.com/783657/the-sheets-of-graph-paper-they-used-to-design-super-mario-bros', free: true },
  shortBeyond: { text: 'Short, Beyond Branching: Quality-Based, Salience-Based, and Waypoint Narrative Structures (2016)', url: 'https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/', free: true },
  ambinder: { text: 'Ambinder, Valve’s Approach to Playtesting: The Application of Empiricism (GDC 2009)', url: 'https://media.gdcvault.com/gdc09/slides/GDC09_Ambinder_ValvesApproach.pdf', free: true },
  cornell: { text: 'Cornell CS 3152, storyboarding lab', url: 'https://www.cs.cornell.edu/courses/cs3152/2021sp/labs/design1/', free: true },
  l4d: { text: 'Booth, The AI Systems of Left 4 Dead (Valve, 2009)', url: 'https://steamcdn-a.akamaihd.net/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf', free: true },
  pacman: { text: 'Pittman, The Pac-Man Dossier', url: 'https://pacman.holenet.info/', free: true },
  // Module 4
  aiGames: { text: 'Yannakakis & Togelius, Artificial Intelligence and Games (2nd ed., 2025)', url: 'http://gameaibook.org/', course: true },
  gallotta: { text: 'Gallotta et al., Large Language Models and Games: A Survey and Roadmap (2024)', url: 'https://arxiv.org/abs/2402.18659', free: true },
  wham: { text: 'Kanervisto et al., World and Human Action Models towards Gameplay Ideation (Nature, 2025)', url: 'https://doi.org/10.1038/s41586-025-08600-3' },
  genie: { text: 'Bruce et al., Genie: Generative Interactive Environments (2024)', url: 'https://arxiv.org/abs/2402.15391', free: true },
  genie3: { text: 'Google DeepMind, Genie 3 (2025)', url: 'https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/', free: true },
  gamengen: { text: 'Valevski et al., Diffusion Models Are Real-Time Game Engines (GameNGen, 2024)', url: 'https://arxiv.org/abs/2408.14837', free: true },
  dramatron: { text: 'Mirowski et al., Co-Writing Screenplays and Theatre Scripts with Language Models (Dramatron, CHI 2023)', url: 'https://arxiv.org/abs/2209.14958', free: true },
  mixedInit: { text: 'Yannakakis, Liapis & Alexopoulos, Mixed-Initiative Co-Creativity (FDG 2014)' },
  sentient: { text: 'Liapis, Yannakakis & Togelius, Sentient Sketchbook (2013)' },
  riedlYoung: { text: 'Riedl & Young, Narrative Planning: Balancing Plot and Character (JAIR, 2010)' },
  riedlBulitko: { text: 'Riedl & Bulitko, Interactive Narrative: An Intelligent Systems Approach (AI Magazine, 2013)' },
  genAgents: { text: 'Park et al., Generative Agents (2023)', url: 'https://arxiv.org/abs/2304.03442', free: true },
  storyDiffusion: { text: 'Zhou et al., StoryDiffusion: Consistent Self-Attention for Long-Range Image and Video Generation (2024)', url: 'https://arxiv.org/abs/2405.01434', free: true },
  consistory: { text: 'Tewel et al., Training-Free Consistent Text-to-Image Generation (ConsiStory, 2024)', url: 'https://arxiv.org/abs/2402.03286', free: true },
  controlnet: { text: 'Zhang, Rao & Agrawala, Adding Conditional Control to Text-to-Image Diffusion Models (ControlNet, 2023)', url: 'https://arxiv.org/abs/2302.05543', free: true },
  pcg: { text: 'Shaker, Togelius & Nelson, Procedural Content Generation in Games', url: 'http://pcgbook.com/', free: true },
  doshi: { text: 'Doshi & Hauser, Generative AI enhances individual creativity but reduces the collective diversity of novel content (Science Advances, 2024)', url: 'https://doi.org/10.1126/sciadv.adn5290' },
  judge: { text: 'Zheng et al., Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (2023)', url: 'https://arxiv.org/abs/2306.05685', free: true },
  evals: { text: 'Anthropic, Demystifying Evals for AI Agents (2026)', course: true },
  robloxCube: { text: 'Roblox, Introducing Roblox Cube: our core generative AI system for 3D and 4D (2025)', url: 'https://about.roblox.com/newsroom/2025/03/introducing-roblox-cube', free: true },
  roblox4d: { text: 'Roblox, Accelerating creation, powered by Roblox’s Cube foundation model (2026)', url: 'https://about.roblox.com/newsroom/2026/02/accelerating-creation-powered-roblox-cube-foundation-model', free: true },
  genie2: { text: 'Google DeepMind, Genie 2: a large-scale foundation world model (2024)', url: 'https://deepmind.google/blog/genie-2-a-large-scale-foundation-world-model/', free: true },
  squareEnix: { text: 'VGC, Square Enix wants generative AI doing 70% of its QA and debugging by the end of 2027 (2025)', url: 'https://www.videogameschronicle.com/news/square-enix-says-it-wants-generative-ai-to-be-doing-70-of-its-qa-and-debugging-by-the-end-of-2027/', free: true },
  embark: { text: 'Game Developer, Embark Studios: AI let devs “do more with less” when making The Finals (2023)', url: 'https://www.gamedeveloper.com/audio/embark-studios-ai-let-devs-do-more-with-less-when-making-the-finals', free: true },
  teammates: { text: 'Ubisoft, Ubisoft reveals Teammates (2025)', url: 'https://news.ubisoft.com/en-gb/article/3mWlITIuWuu0MoVuR6o8ps', free: true },
  detroit: { text: 'Detroit: Become Human (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Detroit:_Become_Human', free: true },
  outerWilds: { text: 'Outer Wilds ship log: Map and Rumor modes (Outer Wilds wiki)', url: 'https://outerwilds.fandom.com/wiki/Computer', free: true },
  hadesGDC: { text: 'Kasavin & Korb, Breathing Life into Greek Myth: The Dialogue of Hades (GDC 2021)', url: 'https://www.gdcvault.com/play/1026975/Breathing-Life-into-Greek-Myth' },
  hadesGD: { text: 'Game Developer, How Supergiant weaves narrative rewards into Hades’ cycle of perpetual death', url: 'https://www.gamedeveloper.com/design/how-supergiant-weaves-narrative-rewards-into-i-hades-i-cycle-of-perpetual-death', free: true },
  botw: { text: 'Fujibayashi & Yonezu on the field design of Breath of the Wild (CEDEC 2017), via Game Developer', url: 'https://www.gamedeveloper.com/design/enjoy-a-bit-of-fresh-insight-into-how-nintendo-built-i-breath-of-the-wild-i-', free: true },
  gow: { text: 'Variety, Creating God of War’s single-shot cinematography (2018)', url: 'https://variety.com/2018/gaming/features/god-of-war-single-shot-camera-1202793441/', free: true },
  edith: { text: 'What Remains of Edith Finch (Wikipedia)', url: 'https://en.wikipedia.org/wiki/What_Remains_of_Edith_Finch', free: true },
  disco: { text: 'Disco Elysium (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Disco_Elysium', free: true },
  celeste: { text: 'Celeste (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Celeste_(video_game)', free: true },
  papers: { text: 'Papers, Please (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Papers,_Please', free: true },
  museXbox: { text: 'Xbox Wire, Empowering creators and players with Muse (2025)', url: 'https://news.xbox.com/en-us/2025/02/19/muse-ai-xbox-empowering-creators-and-players/', free: true },
  ghostwriterNews: { text: 'Ubisoft, The Convergence of AI and Creativity: Introducing Ghostwriter (2023)', url: 'https://news.ubisoft.com/en-us/article/7Cm07zbBGy4Xml6WgYi25d/the-convergence-of-ai-and-creativity-introducing-ghostwriter', free: true },
};

// ---------------------------------------------------------------- modules
export const MODULES = [
  {
    id: 'm1',
    n: 1,
    title: 'Game design',
    question: 'What are we designing?',
    answer: 'An experience, built indirectly through rules.',
    what: 'A game is a system of rules that produces play. The experience that play creates is the real product.',
    why: 'People play for the experience. Fun is the feeling of learning, so pacing is how fast new things arrive.',
    how: 'Write rules, prototype them, playtest, revise. Look at the design through named questions (lenses).',
  },
  {
    id: 'm2',
    n: 2,
    title: 'Storyboarding',
    question: 'How do we plan time and intent before it gets expensive?',
    answer: 'Draw it in order, roughly, and argue about it.',
    what: 'A sequence of drawings that plans what happens, in what order and how it is framed, before production.',
    why: 'It is the cheapest place to fail, and it turns one person’s intent into something a team can see.',
    how: 'Shot grammar, visual structure (contrast and affinity), closure between panels, and rough before polished.',
  },
  {
    id: 'm3',
    n: 3,
    title: 'Storyboarding for game design',
    question: 'What changes when the viewer has agency?',
    answer: 'You board what the player can do and feel, at many layers.',
    what: 'A plan of the player’s experience, drawn at the layer that answers your question: beat, choice, room, panel, shot or screen.',
    why: 'The player holds the camera, picks the order and fills the gaps with action. A film board cannot show that.',
    how: 'Beat charts and interest curves, branching patterns, four-step levels, panels annotated with the 3Cs, maps and screen flows.',
  },
  {
    id: 'm4',
    n: 4,
    title: 'How AI helps',
    question: 'Which layers can AI take on, and which need a human?',
    answer: 'AI can generate, check and even play the board. Keeping it consistent and judging it are the hard parts.',
    what: 'Each layer has its own representation, so each needs its own kind of model: text, graphs, images, video, world models.',
    why: 'Boards get faster, cheaper, more varied, and possibly playable. That also changes what a board is for.',
    how: 'Generate and condition, keep layers consistent, control camera and timing, critique, and evaluate the critic.',
  },
];

export const PHASES = ['what', 'why', 'how'];

// ---------------------------------------------------------------- concepts
// Each concept: the idea, why it matters for storyboarding, the nuance people miss,
// an example, and where it comes from.
export const CONCEPTS = [
  // Module 1 · Game design
  {
    id: 'experience', module: 'm1', phase: 'what',
    title: 'The experience is the product',
    idea: 'Players do not want the game itself; they want the experience it creates. The game is the machine that makes it.',
    matters: 'A game storyboard should draw the experience, not just the content.',
    nuance: 'The same content can produce very different experiences, depending on how it is paced and played.',
    example: 'Journey’s rules are simple. The awe and companionship it creates are the point.',
    refs: ['schell'],
  },
  {
    id: 'second-order', module: 'm1', phase: 'what',
    title: 'Design is second-order',
    idea: 'Designers write rules, not play. Play emerges when people use the rules.',
    matters: 'You cannot storyboard play directly. You storyboard the conditions that make the play you want likely.',
    nuance: 'That is why boards need playtests: the emergent part only appears in play.',
    example: 'The rules of chess fit on one page. The games played with them do not.',
    refs: ['rulesOfPlay'],
  },
  {
    id: 'mda', module: 'm1', phase: 'what',
    title: 'Mechanics, dynamics, aesthetics',
    idea: 'Mechanics (rules) produce dynamics (behaviour in play), which produce aesthetics (what players feel). Designers work from mechanics outwards; players meet the game from the feeling inwards.',
    matters: 'Start a board from the feeling you want, then work back to the rules that could produce it.',
    nuance: 'In MDA, “aesthetics” means emotional response, not visual style. MDA lists eight: sensation, fantasy, narrative, challenge, fellowship, discovery, expression, submission.',
    example: 'Pac-Man: each ghost targets the player by its own rule (mechanic) → chases and near misses (dynamic) → tension (aesthetic).',
    refs: ['mda'],
  },
  {
    id: 'fun', module: 'm1', phase: 'why',
    title: 'Fun is learning',
    idea: 'Fun is the brain mastering new patterns. Once a pattern is mastered, it turns boring.',
    matters: 'Pacing is the rate at which new patterns arrive, so a storyboard is also a teaching plan.',
    nuance: 'Too much challenge for the player’s skill feels anxious; too little feels boring. The space between is the flow channel.',
    example: 'A Mario level introduces one idea, then varies it until the player has mastered it.',
    refs: ['koster', 'flow'],
  },
  {
    id: 'iteration', module: 'm1', phase: 'how',
    title: 'Playcentric iteration',
    idea: 'Prototype, playtest, evaluate, revise: early and often, with players in the loop from the start.',
    matters: 'A storyboard is the cheapest prototype. You can “playtest” it by walking someone through it.',
    nuance: 'Each round needs a clear question, or iteration turns into churn.',
    example: 'Paper prototypes are tested before any code is written.',
    refs: ['fullerton'],
  },
  {
    id: 'lenses', module: 'm1', phase: 'how',
    title: 'Lenses',
    idea: 'A lens is a set of questions that makes you look at a design from one angle.',
    matters: 'Lenses make storyboard critique concrete: review the board through named questions instead of taste alone.',
    nuance: 'Lenses prompt thinking. They are not rules to satisfy.',
    example: 'The interest curve lens asks how a player’s interest rises and falls over time.',
    refs: ['schell'],
  },

  // Module 2 · Storyboarding
  {
    id: 'storyboard', module: 'm2', phase: 'what',
    title: 'What a storyboard is',
    idea: 'A sequence of drawings that plans what happens, in what order and how it is framed, before anything expensive is made.',
    matters: 'It is a planning tool for time: order, duration and emphasis.',
    nuance: 'Boarding is a pipeline: thumbnails → storyboard → story reel (animatic) → previz. Each step adds timing and fidelity.',
    example: 'Pixar cuts storyboards together with temporary voices and music into story reels and reviews them as a film.',
    refs: ['catmull'],
  },
  {
    id: 'fail-cheap', module: 'm2', phase: 'why',
    title: 'Fail cheaply',
    idea: 'Boards and reels let a team find what does not work while a change costs a pencil stroke.',
    matters: 'The value of a board comes from being cheap to change.',
    nuance: 'Catmull says Pixar’s films are bad early on. The process, including candid notes from the Braintrust, exists to make them better.',
    example: 'A story problem caught in a reel costs a redraw. Caught in final animation, it costs weeks.',
    refs: ['catmull'],
  },
  {
    id: 'align', module: 'm2', phase: 'why',
    title: 'Align the team',
    idea: 'A board turns one person’s intent into something everyone can see, point at and argue about.',
    matters: 'For games, the board is where design, art, engineering and audio agree on the same moment.',
    nuance: 'A board that nobody argues with is usually too polished or too vague.',
    example: 'A director, an animator and a level designer can disagree about panel 3 instead of about a paragraph.',
    refs: ['catmull', 'buxton'],
  },
  {
    id: 'shots', module: 'm2', phase: 'how',
    title: 'Shot grammar',
    idea: 'Shot size, angle, camera movement and continuity rules (such as the 180° rule and screen direction) control what the viewer sees and understands.',
    matters: 'Cutscenes and cinematics still use this grammar.',
    nuance: 'The grammar assumes the director controls the camera. During free-camera play, the player does.',
    example: 'A wide shot establishes the room, a close-up shows the reaction, and the camera stays on one side of the action line.',
    refs: ['katz'],
  },
  {
    id: 'contrast', module: 'm2', phase: 'how',
    title: 'Contrast and affinity',
    idea: 'Visual contrast (in space, line, shape, tone, colour, movement and rhythm) raises intensity. Affinity, or similarity, lowers it.',
    matters: 'Intensity can be planned and drawn, not only felt.',
    nuance: 'Structure comes from changes in intensity over time, not from constant intensity.',
    example: 'Calm, similar shapes and colours, then a sharp break when the threat appears.',
    refs: ['block'],
  },
  {
    id: 'closure', module: 'm2', phase: 'how',
    title: 'Closure',
    idea: 'Readers fill in what happens between panels, in the gutter. McCloud names six transitions: moment-to-moment, action-to-action, subject-to-subject, scene-to-scene, aspect-to-aspect and non-sequitur.',
    matters: 'Choosing what to leave out is as important as choosing what to draw.',
    nuance: 'In a game, the player fills the gutter with their own action. That is the bridge to Module 3.',
    example: 'Panel 1: the sword is raised. Panel 2: the enemy falls. The reader supplies the swing.',
    refs: ['mccloud'],
  },
  {
    id: 'fidelity', module: 'm2', phase: 'how',
    title: 'Fidelity is a choice',
    idea: 'Rough sketches are quick, cheap, disposable and ambiguous, so they invite critique and alternatives. Polished images signal that decisions are made.',
    matters: 'Match fidelity to the question you are asking.',
    nuance: 'This becomes central once AI makes polish cheap (Module 4).',
    example: 'Stick figures for the order of events; finished frames only once the order is settled.',
    refs: ['buxton'],
  },

  // Module 3 · Storyboarding for game design
  {
    id: 'spec', module: 'm3', phase: 'what',
    title: 'A spec for an interaction',
    idea: 'A film storyboard shows what the camera sees. A game storyboard shows what the player can do and feel.',
    matters: 'Every game board needs to mark the player: their choices, inputs and state.',
    nuance: 'A game board is closer to a specification than to a picture of a story.',
    example: 'Instead of “the hero jumps”, a game panel says “the player can jump here; the gap teaches the jump distance”.',
    refs: [],
  },
  {
    id: 'architecture', module: 'm3', phase: 'why',
    title: 'Narrative architecture',
    idea: 'Game stories are often told through space. Jenkins names four kinds: evoked (calls up a story the player already knows), enacted (the player acts it out), embedded (clues placed in the world) and emergent (arises from systems).',
    matters: 'Game boards need maps and paths, not only shots.',
    nuance: 'Designers build worlds that make stories likely, more than they tell stories.',
    example: 'The Sims has no script; its stories emerge from the simulation.',
    refs: ['jenkins'],
  },
  {
    id: 'stack', module: 'm3', phase: 'what',
    title: 'The storyboarding stack',
    idea: 'Game storyboarding is a stack of artifacts, each at its own zoom with its own unit: pitch, beat, choice, intensity, room, panel, shot, screen and playtest.',
    matters: 'Pick the layer that answers the question you have right now.',
    nuance: 'There is no single “game storyboard”. A team uses several, and they must agree with each other.',
    example: 'A beat chart for pacing, a level map for space and annotated panels for one key moment.',
    refs: ['rogers'],
  },
  {
    id: 'beat-chart', module: 'm3', phase: 'how',
    title: 'Beat charts and the interest curve',
    idea: 'A beat chart lists, level by level, what the player does, meets and feels. The interest curve plots engagement over time: a hook, rising peaks with rests, a climax, a resolution.',
    matters: 'This is the board for pacing.',
    nuance: 'A planned curve is a guess. Check it against real playtests, for example with biometric storyboards.',
    example: 'Journey was planned around an emotional arc.',
    refs: ['rogers', 'schell', 'biometric', 'chen'],
  },
  {
    id: 'branching', module: 'm3', phase: 'how',
    title: 'Branching patterns',
    idea: 'Choice structures come in standard shapes: time cave, gauntlet, branch-and-bottleneck, quest, open map, sorting hat, floating modules, loop-and-grow.',
    matters: 'This is the board for agency.',
    nuance: 'Every branch multiplies content and state. The patterns are how designers keep that cost and complexity under control.',
    example: 'Branch-and-bottleneck lets paths diverge, then brings them back together at key events.',
    refs: ['ashwell', 'emshort'],
  },
  {
    id: 'four-step', module: 'm3', phase: 'how',
    title: 'Four-step levels',
    idea: 'Introduce a mechanic safely, develop it, twist it, then conclude with a test. Hayashida described this structure for Super Mario 3D Land, inspired by kishōtenketsu.',
    matters: 'A level board can be a lesson plan.',
    nuance: 'It is pacing by teaching, which links back to “fun is learning”.',
    example: 'A new platform type appears safely, then over a gap, then moving, then all three together.',
    refs: ['hayashida'],
  },
  {
    id: 'three-cs', module: 'm3', phase: 'how',
    title: 'Annotate the 3Cs',
    idea: 'On a gameplay panel, note the character (what they can do), the camera (what the player sees) and the controls (what the player presses).',
    matters: 'This is the board for one moment of play.',
    nuance: 'Without the 3Cs, a gameplay panel is just a cutscene still.',
    example: '“Character can double-jump. Camera: side view, leads the player. Controls: A to jump, A again in the air.”',
    refs: ['cornell'],
  },
  {
    id: 'other-boards', module: 'm3', phase: 'how',
    title: 'Rooms and screens are boards too',
    idea: 'Level maps plan space (gating, lock and key, sightlines). Screen flows plan the interface.',
    matters: 'Spatial and UX boards answer questions panels cannot.',
    nuance: 'Choose the representation by the question: “where?” needs a map, “what next?” needs a flow.',
    example: 'A lock-and-key map shows that the red key must be reachable before the red door.',
    refs: ['totten', 'hodent'],
  },

  {
    id: 'studio', module: 'm3', phase: 'how',
    title: 'In the studio',
    idea: 'Boards live inside a production process: concept, pre-production, production, polish, live. Each phase has its own boards and ends at a gate: greenlight, vertical slice, alpha, beta, gold.',
    matters: 'A board is only useful if the people who read it can act on it: design, art, engineering, audio, UX, QA and production.',
    nuance: 'Studios favour short, visual formats (one-sheets, one-page designs, pillars) over long documents. Phase names and gates vary by studio.',
    example: 'A greybox level and a beat chart reviewed together at the vertical-slice gate.',
    refs: ['chandler', 'lemarchand', 'librande', 'rogers'],
  },

  // Module 4 · How AI helps
  {
    id: 'models', module: 'm4', phase: 'what',
    title: 'One stack, many models',
    idea: 'Beats are text, branches are graphs, panels are images, animatics are video and playable previz is a world model. Each layer needs a different kind of model.',
    matters: 'An AI storyboarding system is a pipeline of models, not one model.',
    nuance: 'The engineering problem is keeping all of these consistent with each other.',
    example: 'An LLM writes beats, an image model draws them and a video model times them: three chances for the same character to drift.',
    refs: ['gallotta', 'aiGames'],
  },
  {
    id: 'consistency', module: 'm4', phase: 'how',
    title: 'Consistency',
    idea: 'The same character, style and world across frames, and the same story state across branches.',
    matters: 'Without it, a board stops being one story.',
    nuance: 'Image models drift between frames; methods like StoryDiffusion and ConsiStory target this. LLMs lose track of state across branches; narrative planning handled state explicitly before LLMs.',
    example: 'The key picked up in branch A must still be in the inventory three scenes later.',
    refs: ['storyDiffusion', 'consistory', 'riedlYoung'],
  },
  {
    id: 'control', module: 'm4', phase: 'how',
    title: 'Control',
    idea: 'Getting the framing, pose, camera and timing you intend, not what the model prefers.',
    matters: 'A board is a set of intentional choices.',
    nuance: 'Conditioning on sketches, poses or references (for example ControlNet) trades freedom for control.',
    example: 'Feed your rough thumbnail as the layout and let the model render it, instead of prompting from text alone.',
    refs: ['controlnet'],
  },
  {
    id: 'evaluation', module: 'm4', phase: 'how',
    title: 'Evaluation',
    idea: 'What makes a storyboard good, and can we measure it? Interviews with game creatives behind Microsoft’s Muse point to three needs: consistency, diversity and persistency.',
    matters: 'Without evaluation, an AI board tool cannot improve.',
    nuance: 'AI critics need checking too: LLM judges show known biases, such as preferring longer answers or a certain position.',
    example: 'Plant three known errors in a board and count how many an AI critic finds.',
    refs: ['wham', 'judge', 'evals'],
  },
  {
    id: 'collapse', module: 'm4', phase: 'why',
    title: 'Board-to-prototype collapse',
    idea: 'World models generate frames you can play: Genie (2024) from internet video, GameNGen (2024) running DOOM, Muse (2025) for gameplay ideation, Genie 3 (2025) in real time.',
    matters: 'A storyboard that can be played is also a prototype.',
    nuance: 'If you can play the board, is it still a planning tool, or does it become a tool for aligning a team’s intent?',
    example: 'Type a scene, then walk through it, instead of drawing it.',
    refs: ['genie', 'gamengen', 'wham', 'genie3'],
  },
  {
    id: 'mixed', module: 'm4', phase: 'how',
    title: 'Mixed initiative',
    idea: 'Human and AI both propose; the human decides. AI generates options, checks consistency and critiques. The human keeps intent, taste, pacing judgement and the final call.',
    matters: 'This is the working model for AI in a design team.',
    nuance: 'The split is a design decision of its own, and it should be explicit.',
    example: 'Sentient Sketchbook suggests level variants while the designer edits.',
    refs: ['mixedInit', 'sentient'],
  },
  {
    id: 'risks', module: 'm4', phase: 'why',
    title: 'Where AI may hurt',
    idea: 'Three risks, with different strength of evidence: premature fidelity, flat pacing and sameness.',
    matters: 'These are where a human must stay in the loop, and where experiments are worth running.',
    nuance: 'Label claims by evidence. Sameness has evidence; the other two are hypotheses to test.',
    example: 'Five teams prompting the same model may get five boards that look alike.',
    refs: ['doshi', 'buxton', 'catmull'],
  },
];

// ---------------------------------------------------------------- in the studio (Module 3)
// How the games industry works with boards. Phase names and gates vary by studio; the order is common.
export const PRODUCTION_PHASES = [
  { phase: 'Concept', goal: 'Is it worth making?', boards: 'One-sheet, ten-pager, mood boards, key art', gate: 'Greenlight' },
  { phase: 'Pre-production', goal: 'Find the fun and prove it can be built', boards: 'Beat charts, paper prototypes, greybox levels, gameplay panels, first animatics', gate: 'Vertical slice' },
  { phase: 'Production', goal: 'Build all the content', boards: 'Cinematic boards → animatic → previz; a map and beat chart per level', gate: 'Alpha: feature complete' },
  { phase: 'Polish and test', goal: 'Make it work and feel right', boards: 'Playtest reports, measured intensity curves, bug lists', gate: 'Beta: content complete → Gold: ship' },
  { phase: 'Live', goal: 'Keep it running and growing', boards: 'Beat charts for events and seasons, analytics', gate: 'Each update' },
];

// Chandler's production functions: who makes the boards and who reads them.
export const ROLES = [
  { role: 'Design', makes: 'Beat charts, level maps, gameplay panels', uses: 'Checks every board against the pillars' },
  { role: 'Art', makes: 'Concept art, cinematic boards, key frames', uses: 'Takes mood, scale and staging from beat charts and maps' },
  { role: 'Engineering', makes: 'Prototypes and greybox tools', uses: 'Turns 3C annotations into controls and camera; flags cost' },
  { role: 'Audio', makes: 'Temp sound for animatics', uses: 'Places music and sound cues on the intensity curve' },
  { role: 'UX', makes: 'Screen flows and wireframes', uses: 'Checks readability and onboarding in panels' },
  { role: 'QA', makes: 'Test plans', uses: 'Turns beat charts and flows into what to test' },
  { role: 'Production', makes: 'Schedules and milestones', uses: 'Reads the stack for scope, dependencies and risk; runs reviews' },
];

export const FORMATS = [
  { name: 'One-sheet', line: 'One page that sells the game: genre, platform, audience, what makes it different.' },
  { name: 'Ten-pager', line: 'The whole game in about ten pages, for the team and for publishers.' },
  { name: 'One-page design', line: 'One annotated diagram per system or level, posted where the team can see it.' },
  { name: 'Design pillars', line: 'Three to five short statements of the intended experience. Decisions are checked against them.' },
  { name: 'Beat chart', line: 'The pacing plan across levels: mechanics, threats, story beats, intensity.' },
  { name: 'Animatic review', line: 'Timed boards reviewed by leads before expensive production starts.' },
  { name: 'Playtest report', line: 'What players did and felt, compared with what was planned.' },
  { name: 'Postmortem', line: 'What went right and wrong, written after shipping and often shared publicly.' },
];

export const NORMS = [
  { name: 'Find the fun first', line: 'Prove the core loop in a cheap prototype before scaling up.' },
  { name: 'Greybox before art', line: 'Block levels out in plain shapes. Art arrives once the space plays well.' },
  { name: 'Vertical slice', line: 'A short section at final quality that proves both the game and the pipeline.' },
  { name: 'Candid critique', line: 'Review the work, not the person. Notes are specific and actionable.' },
  { name: 'Short over long', line: 'A one-page diagram beats a long document nobody reads.' },
  { name: 'Cut to the pillars', line: 'If a feature or scene does not serve the pillars, it goes.' },
];

// Claims in Module 4, tagged by evidence.
export const RISKS = [
  { name: 'Premature fidelity', claim: 'AI makes boards cheap and polished at the same time. Polished boards may attract less critique, which undoes “fail cheaply”.', evidence: 'Hypothesis', basis: 'Inferred from Buxton and Catmull' },
  { name: 'Flat pacing', claim: 'Models produce content easily but have no felt sense of rhythm or tension.', evidence: 'Claim to test', basis: 'Raised in our brainstorm' },
  { name: 'Sameness', claim: 'AI raises individual creativity but lowers the diversity across a group.', evidence: 'Evidence', basis: 'Doshi & Hauser, 2024 (short stories)' },
];

// ---------------------------------------------------------------- reference tables
export const FILM_VS_GAME = [
  ['A linear sequence of shots', 'A graph of states, choices and branches'],
  ['The camera is authored', 'The camera is often driven by the player'],
  ['Tells a story', 'Shows the player’s experience: beats, pacing, feedback loops'],
  ['One output: shots', 'Many outputs: cinematics, gameplay beats, UX flows, level beat charts, tutorials'],
  ['One unit: the shot', 'Many units: beat, choice, room, panel, shot, screen'],
  ['One representation: images', 'Many: text, graph, map, curve, image, video, state machine'],
];

export const STACK = [
  { n: 1, layer: 'Concept', unit: 'The pitch', methods: 'One-sheet, ten-pager', refs: 'Rogers', rep: 'Text', ai: 'Language models' },
  { n: 2, layer: 'Narrative structure', unit: 'The beat', methods: 'Three acts, hero’s journey, Save the Cat beat sheet, kishōtenketsu', refs: 'Campbell, Vogler, Snyder', rep: 'Text', ai: 'Language models' },
  { n: 3, layer: 'Branching structure', unit: 'The choice', methods: 'Time cave, gauntlet, branch-and-bottleneck, quest, open map, loop-and-grow', refs: 'Ashwell', rep: 'Graph', ai: 'Language models + explicit state' },
  { n: 4, layer: 'Experience pacing', unit: 'Intensity over time', methods: 'Interest curve, beat chart, flow channel, MDA', refs: 'Schell, Rogers, Csikszentmihalyi, Hunicke et al.', rep: 'Curve', ai: 'Critics and simulated players' },
  { n: 5, layer: 'Level and space', unit: 'The room', methods: 'Level maps, gating, lock and key, sightlines', refs: 'Rogers, Totten', rep: 'Map', ai: 'Procedural generation, 3D generation' },
  { n: 6, layer: 'Gameplay moment', unit: 'The panel + input', methods: 'Comic-style panels annotated with the 3Cs; panel transitions', refs: 'McCloud, Block', rep: 'Image', ai: 'Image models with conditioning' },
  { n: 7, layer: 'Cinematic', unit: 'The shot', methods: 'Shot sizes, 180° rule, screen direction; animatic, previz', refs: 'Katz, Tumminello', rep: 'Video', ai: 'Video models' },
  { n: 8, layer: 'Interface flow', unit: 'The screen', methods: 'Wireframes, screen-flow diagrams', refs: 'Hodent', rep: 'Flow', ai: 'Interface generation' },
  { n: 9, layer: 'Validation', unit: 'The playtest', methods: 'Paper prototyping, playcentric iteration', refs: 'Fullerton, Lemarchand', rep: 'Play', ai: 'World models, agent playtesters' },
];

export const AI_PIPELINE = [
  { stage: 'Premise → beat sheet', traditional: 'Writer and designer', ai: 'Language models generate beats and branching quests', hard: 'Keeping branches coherent and tracking state' },
  { stage: 'Beats → thumbnails', traditional: 'Concept artist', ai: 'Image models with sketch, pose and reference conditioning', hard: 'The same character, style and world in every frame' },
  { stage: 'Thumbnails → animatic', traditional: 'Editor', ai: 'Video generation models', hard: 'Controlling camera and timing' },
  { stage: 'Animatic → previz', traditional: 'Level designer', ai: '3D generation and playable world models', hard: 'Turning frames into something interactive' },
  { stage: 'Review', traditional: 'Director and playtesters', ai: 'Language or vision models as critics', hard: 'Evaluation: what makes a storyboard good?' },
];

export const BRANCH_PATTERNS = [
  { key: 'timeCave', name: 'Time cave', line: 'Every choice branches and nothing rejoins. Many endings, huge content cost.' },
  { key: 'gauntlet', name: 'Gauntlet', line: 'One main path; side branches end quickly or loop straight back.' },
  { key: 'bottleneck', name: 'Branch and bottleneck', line: 'Paths split, then rejoin at key events. State remembers the difference.' },
  { key: 'quest', name: 'Quest', line: 'Clusters of places and tasks, explored in any order, converging on an ending.' },
  { key: 'sortingHat', name: 'Sorting hat', line: 'Early choices sort the player onto one of a few long tracks.' },
  { key: 'loopGrow', name: 'Loop and grow', line: 'A central loop repeats; each pass, state unlocks new options.' },
];

export const MCCLOUD = [
  ['Moment-to-moment', 'Very little time passes: an eye closing, frame by frame.'],
  ['Action-to-action', 'One subject, one action after another: the swing, then the hit.'],
  ['Subject-to-subject', 'Same scene, different subject: the batter, then the crowd.'],
  ['Scene-to-scene', 'A jump across time or place.'],
  ['Aspect-to-aspect', 'Different parts of one place or mood; time seems to stand still.'],
  ['Non-sequitur', 'No logical link between panels.'],
];

export const JENKINS = [
  { name: 'Evoked', line: 'Calls up a story the player already knows.', example: 'A game set in a famous film’s world.' },
  { name: 'Enacted', line: 'The player acts the story out through their goals.', example: 'A hero’s quest, played step by step.' },
  { name: 'Embedded', line: 'Story clues are placed in the world to be found.', example: 'Notes, bodies and broken rooms that tell what happened.' },
  { name: 'Emergent', line: 'Stories arise from systems as people play.', example: 'The Sims.' },
];

export const WHAM_NEEDS = [
  { name: 'Consistency', line: 'Generated play stays true to the game’s rules and physics.' },
  { name: 'Diversity', line: 'The tool offers genuinely different options, not variations on one.' },
  { name: 'Persistency', line: 'When a creator changes something, the change sticks in what is generated next.' },
];

export const HARD_PROBLEMS = [
  { name: 'Consistency', line: 'Same character, style, world and story state across frames, branches and layers.', refs: ['storyDiffusion', 'consistory', 'riedlYoung'] },
  { name: 'Control', line: 'The framing, camera and timing you intend, not what the model prefers.', refs: ['controlnet'] },
  { name: 'Branching coherence', line: 'Every branch tracks state, and no path contradicts another.', refs: ['riedlBulitko', 'ashwell'] },
  { name: 'Evaluation', line: 'Measuring whether a board is good, and checking the AI critic itself.', refs: ['wham', 'judge'] },
];

export const SPLIT = {
  ai: ['Generate options at every layer', 'Check consistency across frames and branches', 'Critique against named lenses', 'Play the board as a simulated player'],
  human: ['Intent: what the player should feel', 'Taste: what to keep and what to cut', 'Pacing judgement', 'The final call'],
};

export const THREADS = [
  { name: 'Intensity', steps: ['Interest curve (Schell)', 'Contrast and affinity (Block)', 'Beat chart (Rogers)', 'Can AI model intensity?'] },
  { name: 'Cost of failure', steps: ['Fail cheaply (Catmull)', 'Rough invites critique (Buxton)', 'AI makes boards cheap and polished', 'What happens to critique?'] },
];

export const ANGLES = [
  { key: 'A', name: 'Tool survey', line: 'What exists at each stage.', note: 'Useful, but dates quickly.' },
  { key: 'B', name: 'Engineering systems', line: 'Consistency, control, branching and evaluation as open problems.', note: 'Best fit for an AI engineering course: the spine.' },
  { key: 'C', name: 'Storyboard → prototype collapse', line: 'When the board is playable, does storyboarding disappear?', note: 'The provocative one: the hook.' },
  { key: 'D', name: 'Authorship and craft', line: 'What stays human: taste, intent, pacing judgement; artists’ jobs and IP.', note: 'The closing question.' },
];

export const OPEN_QUESTIONS = [
  'If AI can produce a full animatic in minutes, is the storyboard still a planning tool, or a communication tool for aligning a team’s intent?',
  'Which layer of the stack does AI make worse rather than better? (One guess: pacing.)',
  'When the storyboard becomes playable, what is left for the storyboard to do?',
];

// ---------------------------------------------------------------- self-checks
export const CHECKS = {
  m1: [
    { q: 'Why does MDA say designers and players meet a game from opposite ends?', a: 'Designers can only set the mechanics. Players first meet the aesthetics, what they feel, and only later work out the rules behind it.' },
    { q: 'What does “aesthetics” mean in MDA?', a: 'The player’s emotional response, such as challenge or discovery. Not the visual style.' },
    { q: 'Why is game design “second-order”, and what does that mean for a storyboard?', a: 'Designers write rules and play emerges from them. A board can only plan the conditions for the play you want, so it has to be playtested.' },
  ],
  m2: [
    { q: 'Why do studios storyboard at all?', a: 'To fail cheaply, and to give a team one visible version of the intent before expensive production.' },
    { q: 'What is closure, and how does it change in games?', a: 'The reader imagines what happens between panels. In a game, the player fills that gap with their own action.' },
    { q: 'Why can a rough board be better than a polished one?', a: 'Rough boards invite critique and alternatives. Polish signals that decisions are final.' },
  ],
  m3: [
    { q: 'Name three units a game storyboard can use besides the shot.', a: 'Beat, choice node, room, gameplay panel with input, screen, intensity over time.' },
    { q: 'What problem do branching patterns solve?', a: 'Content and state multiply with every branch. Patterns keep the structure coherent and affordable.' },
    { q: 'What do the 3Cs add to a gameplay panel?', a: 'What the character can do, what the camera shows and what the player presses: the interaction, not just the picture.' },
    { q: 'What is a vertical slice for?', a: 'A short section at final quality that proves the game is fun and that the team’s pipeline can produce it, before full production.' },
  ],
  m4: [
    { q: 'Why is consistency the central engineering problem for AI storyboarding?', a: 'Each layer uses a different model and representation, and characters, style, world and story state must agree across frames, branches and layers.' },
    { q: 'What three needs did the Muse study identify for AI ideation tools?', a: 'Consistency, diversity and persistency.' },
    { q: 'What is “premature fidelity”, and how strong is the evidence for it?', a: 'AI makes boards polished early, which may reduce critique and exploration. It is a hypothesis to test, not an established finding.' },
  ],
};

// ---------------------------------------------------------------- readings
export const READINGS = {
  m1: {
    core: [['mda', 'A shared vocabulary; aesthetics means feelings'], ['schell', 'The experience as product; lenses; the interest curve'], ['rulesOfPlay', 'Meaningful play; second-order design'], ['fullerton', 'Playcentric iteration; paper prototypes']],
    shelf: [['koster', 'Fun as learning'], ['sylvester', 'Games as experience engines'], ['anthropy', 'Verbs, objects, scenes: units you can board'], ['swink', 'Moment-to-moment feel'], ['isbister', 'Designing emotion'], ['cookLoops', 'Loops versus authored arcs'], ['dde', 'A critique of MDA']],
  },
  m2: {
    core: [['mccloud', 'Closure and panel transitions'], ['block', 'Contrast and affinity; intensity you can draw'], ['catmull', 'Story reels and the Braintrust'], ['katz', 'Shot grammar']],
    shelf: [['simon', 'A practitioner’s process'], ['tumminello', 'Storyboarding, including games'], ['glebas', 'How studio story artists work'], ['snyder', 'Beat sheets'], ['pixar', 'Short, student-friendly'], ['buxton', 'Fidelity and critique'], ['truong', 'Storyboards for interactions, from HCI']],
  },
  m3: {
    core: [['jenkins', 'Story told through space'], ['rogers', 'One-sheets, beat charts, level maps'], ['ashwell', 'Branching structures'], ['hayashida', 'Four-step levels'], ['chandler', 'Roles, responsibilities and handoffs']],
    shelf: [['shortBeyond', 'Beyond branching: storylets and qualities'], ['ambinder', 'Designs as hypotheses, playtests as experiments'], ['librande', 'One-page designs'], ['totten', 'Spatial boards'], ['lemarchand', 'Where boards sit in production'], ['hodent', 'Interface-flow boards'], ['biometric', 'Planned versus measured experience'], ['machinations', 'Boarding systems, not scenes'], ['emshort', 'Small-scale branching'], ['levine', 'Boarding stories you cannot script'], ['chen', 'An emotional arc as the spine'], ['cornell', 'A ready-made class exercise']],
  },
  m4: {
    core: [['aiGames', 'The field map'], ['gallotta', 'Where language models fit in games'], ['wham', 'AI for gameplay ideation, and what creatives need'], ['genie', 'The storyboard you can play']],
    shelf: [['robloxCube', 'Text to 3D, and the road to 4D'], ['genie2', 'Concept art to playable prototype'], ['dramatron', 'Layered story generation, judged by professionals'], ['mixedInit', 'Human and AI design roles'], ['sentient', 'A mixed-initiative level tool'], ['riedlYoung', 'Coherent plots before language models'], ['genAgents', 'Characters as agents'], ['storyDiffusion', 'Consistent characters across frames'], ['consistory', 'Consistent subjects without training'], ['controlnet', 'Conditioning on sketches and poses'], ['gamengen', 'A neural game engine'], ['genie3', 'Real-time world model'], ['pcg', 'Generating levels'], ['doshi', 'AI and sameness'], ['judge', 'How far to trust an AI critic'], ['evals', 'Evaluating agents']],
  },
};

export const READING_PATH = ['mda', 'schell', 'mccloud', 'block', 'catmull', 'jenkins', 'rogers', 'ashwell', 'wham'];

// ---------------------------------------------------------------- glossary
export const GLOSSARY = [
  ['Aesthetics (MDA)', 'The emotional responses a game evokes in players. Not visual style.'],
  ['Animatic / story reel', 'Storyboard panels cut together with timing, temporary voices and sound.'],
  ['Alpha / beta / gold', 'Milestones: feature complete, content complete, ready to ship. Exact meanings vary by studio.'],
  ['Beat', 'The smallest unit of change in a story or in play.'],
  ['Beat chart', 'A chart planning each level’s beats, mechanics and intensity.'],
  ['Branch and bottleneck', 'A branching pattern where paths split and rejoin at key events.'],
  ['Closure', 'The reader’s act of filling in what happens between panels.'],
  ['Contrast and affinity', 'Block’s principle: visual difference raises intensity; similarity lowers it.'],
  ['Design pillars', 'Three to five short statements of the intended experience; decisions are checked against them.'],
  ['Dynamics (MDA)', 'Behaviour in play that emerges when mechanics meet players.'],
  ['Flow channel', 'The band where challenge matches skill: neither anxious nor bored.'],
  ['Greenlight', 'The decision to fund a game into pre-production or production.'],
  ['Greybox (blockout)', 'A level built from plain shapes to test space and flow before art.'],
  ['Interest curve', 'A player’s engagement plotted over the course of an experience.'],
  ['Kishōtenketsu', 'A four-part structure: introduction, development, twist, conclusion.'],
  ['Lens', 'A set of questions for looking at a design from one angle (Schell).'],
  ['Mechanics (MDA)', 'The rules and verbs of a game.'],
  ['Mixed initiative', 'A design process in which both human and AI propose ideas.'],
  ['One-sheet', 'A single page that pitches a game.'],
  ['Postmortem', 'A review of what went right and wrong, written after a project ships.'],
  ['Previz', 'A rough 3D version of shots or levels, used to plan camera and timing.'],
  ['Second-order design', 'Designing rules that shape play indirectly.'],
  ['3Cs', 'Character, camera, controls: what to annotate on a gameplay panel.'],
  ['Vertical slice', 'A short section at final quality that proves the game and the pipeline.'],
  ['World model', 'A model that generates the next frames of an environment in response to actions.'],
];

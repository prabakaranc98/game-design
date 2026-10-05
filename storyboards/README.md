# Storyboards

Teaching material and presentable boards for the AI-based game design and development course.

## Learn · AI and Storyboarding for Game Design (the default page)

A teaching deck and a study guide built from one content file.

- **Slides** (`#/learn/slides/1`): 99 slides across four modules plus an Exemplars section (game design → storyboarding →
  storyboarding for games, incl. how studios work → how AI helps), each as what / why / how,
  with figures that draw on step by step and a self-check per module.
  Keys: `→` / `←` step, `O` overview, `G` study guide, `T` theme, `F` full screen.
- **Study guide** (`#/learn/guide`): every concept with idea, why it matters for boards, nuance,
  example and source; reference tables; check-yourself questions; glossary; readings
  (course texts marked).
- Edit text in `src/learn/content.js`. Slide order and pacing: `src/learn/slides.js`.
  Figures: `src/learn/diagrams.jsx`.
- Craft layer (`src/learn/craft.js`): an “ask the room” question and a common mistake per concept,
  nine case studies (Pac-Man, World 1-1, Pixar story reels, Nintendo cutscene boards, graph-paper
  levels, Left 4 Dead’s AI Director, Journey, Muse, Ghostwriter), craft standards (shot sizes,
  camera moves, continuity, panel anatomy, gameplay-panel annotation, beat-chart rows, one-sheet,
  playtest and critique protocols), myth vs reality, try-this exercises and inquiry scenarios.
- Exemplars, what to steal: Detroit: Become Human, Outer Wilds, Hades, Breath of the Wild,
  God of War (2018), What Remains of Edith Finch, Disco Elysium, Celeste, Papers, Please. Each has
  a structure diagram (not a screenshot), what to steal, and its MDA chain.
- AI in studios: Roblox Cube and 4D generation, Genie 2, Muse, Ghostwriter, Teammates, Embark,
  Square Enix QA, with each claim tagged by evidence (company claim, research demo, peer-reviewed…).
- Galleries ("Look closer"): Pac-Man, production storyboards, Ryzom board vs game, and a
  which-board-first exercise with free-licensed game screenshots.
- Two books (slide 4): Steal Like an Artist (all 10 chapters) and Improv Wisdom (all 13 maxims). The
  four from each that the course leans on light up on the second step, each with what it means for
  design work. Photos are the course's own: `public/img/cover-*.jpg` are 3:4 crops of
  `steal-like-an-artist-lib.jpeg` and `improv-wisdom.jpeg`. If a cover file is removed, the slide draws
  a plate instead.
- Speaker notes: press `N` in the deck.
- **PDF to share**: `npm run pdf` writes `exports/ai-and-storyboarding-for-game-design.pdf`
  (100 pages, about 11 MB): every slide at its last step on its own 16:9 page, then a page of photo
  credits with links to each source and licence, which CC BY-SA requires when the file travels. It
  prints `#/learn/print` with the installed Google Chrome (`playwright-core`, no browser download).
  Without Chrome, open `#/learn/print` and use the browser's Print → Save as PDF. The PDF is always
  the light theme. Step builds, speaker notes and the study guide are not in it.
- Photos: Wikimedia Commons, stored in `public/img/`, credited on each image and in the guide
  (`src/learn/images.js` lists source page, author and licence).
- Look: tomato red, whitish grey, grey, black; Archivo, Source Sans 3, IBM Plex Mono.

## Session game · Storyboarding Games (`#/play/0`)

The talk is itself a game the room plays: a paper prototype with a HUD
(level, six collectible items, a 20:00 clock).

| Screen | The room does | Item |
| --- | --- | --- |
| Press start | — | |
| 1 · Camera | moves the player; the view follows | Camera |
| 2 · Match | pairs 4 games with map / panels / curve / loop | Four pictures |
| 3 · Sort | sorts 6 cards into mechanics / dynamics / aesthetics | Feeling first |
| 4 · Moment | draws one moment in 3 panels, then its curve | One moment |
| 5 · Your page | fills the one-page board (saved in the browser, printable) | One page |
| Boss | pastes a page into Claude, judges each point | Red pencil |
| Save file | sees the six moves, the quest and credits | |

Keys: `Enter` / `→` next, `←` back, `N` speaker notes, `F` full screen, `T` light/dark.
The playthrough (Pac-Man for now) lives in `src/play/playthrough.js`, so it can be swapped.

**Board 01 · AI × Games** is a reading board at `#/01/1`.

## Run it

```bash
npm install
npm run dev        # opens the teaching deck at #/learn/slides/1
npm run build      # static build in dist/, opens from any folder
```

## Where things live

| Path | What it holds |
| --- | --- |
| `src/boards/aiAndGames.js` | Board 01 text: frames, roles, milestones, map cells, references |
| `src/play/` | Session game: levels, playthrough, shell and styles |
| `src/boards/sheet.js` | The one-page board: kinds of fun, Pac-Man example, critique prompt |
| `src/sketches/play/*.js` | Game screens and HUD icons |
| `src/sketches/*.js` | Board 01 panels |
| `src/sketches/ink.js` | Pencil kit: wobbly lines, hatching, arrows, theme colours |
| `src/components/` | Panel, notes, map grid, sheet, and the p5 mount |
| `src/styles.css` | Tokens and layout; the pencil colours are the CSS variables |

To change wording, edit the board files only. To add a board, add a file in `src/boards/`
and list it in `src/boards/index.js`.

// Photographs from Wikimedia Commons, stored locally in public/img/ so the deck works offline.
// Every entry records its source page, author and licence; credits are shown with the image
// and listed in the study guide.

export const IMAGES = {
  arcade: {
    src: "img/arcade.jpg",
    caption: "A Pac-Man arcade cabinet.",
    alt: "A Pac-Man arcade cabinet with the maze on screen.",
    author: "YosemiteYamper",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Pac-Man_arcade_machine,_De_Notaris_Schaijk.jpg",
  },
  charge: {
    src: "img/charge.jpg",
    caption: "Storyboard and concept frames for Charge, a Blender Studio short film.",
    alt: "Grey pencil storyboard frames of a figure in a ruined city.",
    author: "Andy Goralczyk / Blender Foundation",
    license: "CC BY 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Charge-concept_art-storyboard.png",
  },
  ryzom: {
    src: "img/ryzom.jpg",
    caption: "Storyboard panels for the online game Ryzom.",
    alt: "A page of hand-drawn storyboard panels for a game.",
    author: "Ryzom",
    license: "CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Ryzom_storyboard_1.jpg",
  },
  datacenter: {
    src: "img/datacenter.jpg",
    caption: "Server racks in a data centre.",
    alt: "Rows of server racks lit in blue.",
    author: "BalticServers.com",
    license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:BalticServers_data_center.jpg",
  },
  iwatani: {
    src: "img/iwatani.jpg",
    caption: "Toru Iwatani, creator of Pac-Man, at GDC 2011.",
    alt: "Toru Iwatani speaking on stage.",
    author: "Official GDC",
    license: "CC BY 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Toru_Iwatani,_creator_of_Pac-Man,_at_GDC_2011_(cropped_to_upper_body).jpg",
  },
  nintendo: {
    src: "img/nintendo.jpg",
    caption: "Takashi Tezuka, Shigeru Miyamoto and Koji Kondo. Tezuka and Miyamoto designed Super Mario Bros.; Kondo wrote its music.",
    alt: "Three Nintendo developers posing next to a Mario mascot.",
    author: "Nico Hofmann",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Takashi_Tezuka,_Shigeru_Miyamoto_and_K%C5%8Dji_Kond%C5%8D.jpg",
  },
  catmull: {
    src: "img/catmull.jpg",
    caption: "Ed Catmull, co-founder of Pixar, in 2014.",
    alt: "Ed Catmull talking on stage in conversation.",
    author: "Steve Jurvetson",
    license: "CC BY 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Ed_Catmull,_ETL_2014.jpg",
  },
  miyamoto: {
    src: "img/miyamoto.jpg",
    caption: "Shigeru Miyamoto speaking at GDC 2007.",
    alt: "Shigeru Miyamoto on stage at a conference.",
    author: "Vincent Diamante",
    license: "CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Shigeru_Miyamoto_at_GDC_2007.jpg",
  },
  chen: {
    src: "img/chen.jpg",
    caption: "Jenova Chen at Game Developers Conference China, 2011.",
    alt: "A conference session with Jenova Chen speaking.",
    author: "Official GDC",
    license: "CC BY 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Jenova_Chen_%E2%80%93_Game_Developers_Conference_China_2011_(1).jpg",
  },
  controller: {
    src: "img/controller.jpg",
    caption: "An Xbox One controller. Muse models what the screen shows and what the controller does.",
    alt: "A black Xbox One controller.",
    author: "Evan-Amos",
    license: "Public domain",
    page: "https://commons.wikimedia.org/wiki/File:Microsoft-Xbox-One-controller.jpg",
  },
  sheet: {
    src: "img/sheet.jpg",
    caption: "A hand-drawn storyboard sheet with numbered scenes and shots.",
    alt: "A storyboard sheet with sketched panels and handwritten notes under each.",
    author: "Iván López Fuente",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Storyboard_-_Iv%C3%A1n_L%C3%B3pez_Fuente.jpg",
  },
  pacGameplay: {
    src: "img/pacGameplay.png",
    caption: "Pac-Man (1980). Four ghosts, one maze, every rule on one screen.",
    alt: "A Pac-Man maze with Pac-Man, ghosts and dots.",
    author: "Bandai Namco Entertainment America",
    license: "CC BY 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Pac-Man_gameplay.png",
  },
  ryzomShot: {
    src: "img/ryzomShot.jpg",
    caption: "Ryzom in play: what the boards became.",
    alt: "A Ryzom character standing in a grassy landscape.",
    author: "Ryzom",
    license: "CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Ryzom_screenshot.png",
  },
  ryzomBoard2: {
    src: "img/ryzomBoard2.jpg",
    caption: "A Ryzom storyboard page: numbered panels with notes beside each.",
    alt: "A page of numbered storyboard panels with handwritten notes.",
    author: "Ryzom",
    license: "CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Ryzom_storyboard_2.jpg",
  },
  spring: {
    src: "img/spring.jpg",
    caption: "Storyboard frames for Spring, a Blender Studio short film.",
    alt: "A grid of coloured storyboard frames showing a girl on a mountain.",
    author: "David Revoy / Blender Foundation",
    license: "CC BY 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Spring-concept_art-storyboard.png",
  },
  stk: {
    src: "img/stk.jpg",
    caption: "SuperTuxKart: the track map sits in the corner of the screen.",
    alt: "A kart race on a jungle track with a minimap in the corner.",
    author: "QwertyChouskie",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:SuperTuxKart_in-race_(2018).png",
  },
  minetest: {
    src: "img/minetest.jpg",
    caption: "Minetest: a sandbox where play comes from systems, not scripts.",
    alt: "A blocky landscape with trees in a voxel sandbox game.",
    author: "Perttu Ahola, Vanessa Ezekowitz et al.",
    license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Minetest_screenshot.png",
  },
  zeroad: {
    src: "img/zeroad.jpg",
    caption: "0 A.D.: a strategy game read as a map of territory and resources.",
    alt: "An overhead view of an ancient Greek town in a strategy game.",
    author: "Wildfire Games",
    license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:0_A.D._alpha_25_-_playing_as_Spartans.jpg",
  },
};

// Where each photo is used.
export const SECTION_PHOTOS = { m1: 'arcade', m2: 'charge', m3: 'ryzom', m4: 'datacenter' };
export const CASE_PHOTOS = { pacman: 'pacGameplay', world11: 'nintendo', reels: 'catmull', graphpaper: 'miyamoto', journey: 'chen', muse: 'controller', odyssey: 'sheet' };
export const STANDARD_PHOTOS = { panel: 'sheet' };

// Picture sets that open a discussion. `answers` (if any) appear on the next step.
export const GALLERIES = {
  pacman: {
    module: 'm1', title: 'Pac-Man: the whole system on one screen', items: ['pacGameplay', 'arcade', 'iwatani'],
    ask: 'Which rules can you see on this screen, and which are hidden?',
  },
  production: {
    module: 'm2', title: 'Storyboards in production', items: ['charge', 'spring', 'sheet'],
    ask: 'What does each board leave out, and why is that useful?',
  },
  ryzom: {
    module: 'm3', title: 'From board to game: Ryzom', items: ['ryzomBoard2', 'ryzomShot'],
    ask: 'What changed between the board and the shipped screen? Which decisions did the board settle?',
  },
  firstBoard: {
    module: 'm3', title: 'Which board would you draw first?', items: ['stk', 'minetest', 'zeroad'],
    answers: ['A map: the track is the level.', 'A loop: play comes from systems, not scenes.', 'A map and a loop: territory plus an economy.'],
    ask: 'Decide before the answer appears. There is more than one defensible choice.',
  },
};

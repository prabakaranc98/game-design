// The classic the room plays through. Pac-Man is a stand-in: which game to use is still open.
// Swap this file to change the playthrough; nothing else depends on Pac-Man.

export const PLAYTHROUGH = {
  game: 'Pac-Man',

  // Level 3: sort each card into mechanics (m), dynamics (d) or aesthetics (a).
  sortCards: [
    { text: 'Four ghosts, four chase rules', bin: 'm' },
    { text: 'Near misses in narrow corridors', bin: 'd' },
    { text: 'Tension', bin: 'a' },
    { text: 'Players lure ghosts around corners', bin: 'd' },
    { text: 'A power pellet turns the ghosts blue', bin: 'm' },
    { text: 'The thrill of turning the tables', bin: 'a' },
  ],

  // Level 4: one moment in three panels.
  moment: ['Cornered.', 'Power pellet!', 'Hunter now.'],
};

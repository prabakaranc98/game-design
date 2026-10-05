// FR 03 · Overhead: AI feeds the studio (make-time) and the running game (play-time);
// games feed back into AI research.
import { pointOnQuad } from './ink.js';

const PATHS = {
  forGames: [452, 152, 300, 190, 252, 322],
  inGames: [548, 152, 700, 190, 748, 322],
  back: [912, 330, 935, 92, 566, 100],
};

function flow(ink, path, color, t, speed, n = 3) {
  for (let i = 0; i < n; i++) {
    const [x, y] = pointOnQuad((t * speed + i / n) % 1, ...path);
    ink.dot(x, y, 4.2, color);
  }
}

export default {
  draw({ ink, c, t }) {
    // AI node.
    ink.hatchEllipse(500, 105, 62, 62, { color: c.red, alpha: 0.18, spacing: 8 });
    ink.circle(500, 105, 62, { color: c.red, weight: 2.6, seed: 1 });
    ink.text('AI', 500, 100, { font: 'display', size: 46, color: c.red, bold: true });

    // Studio box.
    ink.rect(90, 330, 300, 210, { color: c.ink, weight: 2.2, seed: 2 });
    ink.text('STUDIO', 240, 366, { font: 'display', size: 30, color: c.ink, bold: true });
    ink.text('make-time', 240, 398, { size: 22, color: c.ink2 });
    ink.poly([[132, 505], [132, 440], [202, 505]], { color: c.design, weight: 1.8, passes: 1, seed: 3 });
    ink.line(238, 505, 300, 446, { color: c.dev, weight: 5, passes: 1, over: 0, seed: 4 });
    ink.line(300, 446, 312, 434, { color: c.ink, weight: 2, passes: 1, over: 0, seed: 5 });
    ink.circle(352, 486, 20, { color: c.eng, weight: 1.8, passes: 1, seed: 6 });
    ink.circle(352, 486, 7, { color: c.eng, weight: 1.4, passes: 1, seed: 7 });

    // Play box.
    ink.rect(610, 330, 300, 210, { color: c.ink, weight: 2.2, seed: 8 });
    ink.text('PLAY', 760, 366, { font: 'display', size: 30, color: c.ink, bold: true });
    ink.text('play-time', 760, 398, { size: 22, color: c.ink2 });
    ink.rect(648, 428, 124, 80, { color: c.ink, weight: 1.6, passes: 1, seed: 9 });
    const hop = Math.abs(Math.sin(t * 2.4)) * 10;
    ink.circle(694, 452 - hop, 7, { color: c.ink, weight: 1.6, passes: 1, seed: 10 });
    ink.line(694, 459 - hop, 694, 482 - hop, { color: c.ink, weight: 1.6, passes: 1, over: 0, seed: 11 });
    ink.line(658, 492, 762, 492, { color: c.ink2, weight: 1.2, passes: 1, seed: 12 });
    const dx = 845;
    const dy = 470;
    const a = 8;
    const l = 22;
    ink.poly(
      [[-a, -l], [a, -l], [a, -a], [l, -a], [l, a], [a, a], [a, l], [-a, l], [-a, a], [-l, a], [-l, -a], [-a, -a]].map(([x, y]) => [dx + x, dy + y]),
      { color: c.ink, weight: 1.4, passes: 1, seed: 13 },
    );

    // Arrows.
    ink.curveArrow(...PATHS.forGames, { color: c.red, weight: 2.4, seed: 20 });
    ink.curveArrow(...PATHS.inGames, { color: c.red, weight: 2.4, seed: 21 });
    ink.arrow(398, 462, 600, 462, { color: c.ink, weight: 2.2, seed: 22 });
    ink.curveArrow(...PATHS.back, { color: c.ink2, weight: 2, dash: [12, 9], passes: 1, seed: 23 });

    flow(ink, PATHS.forGames, c.red, t, 0.4);
    flow(ink, PATHS.inGames, c.red, t, 0.4);
    flow(ink, PATHS.back, c.ink2, t, 0.22, 4);
    for (let i = 0; i < 3; i++) ink.dot(398 + ((t * 0.3 + i / 3) % 1) * 196, 462, 4, c.ink);

    ink.text('AI for games', 205, 222, { size: 24, color: c.red, bold: true });
    ink.text('AI in games', 795, 222, { size: 24, color: c.red, bold: true });
    ink.text('ships', 500, 440, { size: 22, color: c.ink });
    ink.text('games for AI', 872, 118, { size: 22, color: c.ink2 });
  },
};

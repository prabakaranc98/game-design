// Press start: a pencil controller and a blinking prompt.
import { smooth } from '../ink.js';

const BODY = [
  [330, 190], [420, 168], [580, 168], [670, 190], [722, 270], [705, 342], [648, 352],
  [596, 300], [404, 300], [352, 352], [295, 342], [278, 270], [330, 190],
];

export default {
  hit: () => true,
  press: (x, y, state) => state?.onStart?.(),
  draw({ p, ink, c, t }) {
    const bob = Math.sin(t * 1.6) * 5;
    p.push();
    p.translate(0, bob);
    ink.path(smooth(BODY, 8), { color: c.ink, weight: 2.8, seed: 1 });
    const dx = 395;
    const dy = 246;
    const a = 11;
    const l = 30;
    ink.poly(
      [[-a, -l], [a, -l], [a, -a], [l, -a], [l, a], [a, a], [a, l], [-a, l], [-a, a], [-l, a], [-l, -a], [-a, -a]].map(([x, y]) => [dx + x, dy + y]),
      { color: c.ink, weight: 2.2, passes: 1, seed: 2 },
    );
    ink.hatchEllipse(612, 228, 17, 17, { color: c.design, alpha: 0.45, spacing: 5 });
    ink.circle(612, 228, 17, { color: c.ink, weight: 2.2, passes: 1, seed: 3 });
    ink.circle(656, 262, 17, { color: c.ink, weight: 2.2, passes: 1, seed: 4 });
    ink.line(474, 266, 498, 266, { color: c.ink, weight: 3, passes: 1, over: 0, seed: 5 });
    ink.line(512, 266, 536, 266, { color: c.ink, weight: 3, passes: 1, over: 0, seed: 6 });
    p.pop();

    const on = Math.sin(t * 4) > -0.3;
    ink.text('PRESS START', 500, 440, { font: 'display', size: 34, color: c.ink, bold: true, alpha: on ? 1 : 0.15 });
  },
};

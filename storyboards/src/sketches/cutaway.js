// FR 02 · Cutaway: the game as a building. Design on top, development in the walls,
// engineering in the foundation below ground.
import { ease } from './ink.js';

const L = 290;
const R = 710;
const ROOF = 170;
const MID = 302;
const GROUND = 434;
const BASE = 566;

const FLOORS = [
  { key: 'design', y0: ROOF, y1: MID, label: 'DESIGN', sub: 'what & why', note: 'experience · rules · taste' },
  { key: 'dev', y0: MID, y1: GROUND, label: 'DEVELOPMENT', sub: 'making it', note: 'code · content · playtests' },
  { key: 'eng', y0: GROUND, y1: BASE, label: 'ENGINEERING', sub: 'making it run', note: 'engine · memory · netcode' },
];

function gear(ink, cx, cy, r, rot, teeth, color, seed) {
  ink.circle(cx, cy, r, { color, weight: 2, seed });
  ink.circle(cx, cy, r * 0.32, { color, weight: 1.4, passes: 1, seed: seed + 1 });
  for (let k = 0; k < teeth; k++) {
    const a = rot + (k * Math.PI * 2) / teeth;
    ink.line(cx + Math.cos(a) * r, cy + Math.sin(a) * r, cx + Math.cos(a) * (r + 9), cy + Math.sin(a) * (r + 9), {
      color,
      weight: 3.2,
      passes: 1,
      over: 0,
      seed: seed + 10 + k,
    });
  }
}

export default {
  draw({ ink, c, t }) {
    // Ground line with soil ticks outside the building.
    ink.line(70, GROUND, 930, GROUND, { color: c.ink, weight: 2.2, seed: 3 });
    for (let x = 84; x < 930; x += 26) {
      if (x < L - 14 || x > R + 22) ink.line(x, GROUND + 7, x - 12, GROUND + 20, { color: c.ink2, weight: 1, passes: 1, seed: x });
    }

    // Roof.
    ink.line(L - 30, ROOF, 500, 66, { color: c.design, weight: 2.4, seed: 4 });
    ink.line(500, 66, R + 30, ROOF, { color: c.design, weight: 2.4, seed: 5 });

    FLOORS.forEach((f, i) => {
      const col = c[f.key];
      ink.hatchRect(L, f.y0, R - L, f.y1 - f.y0, { color: col, alpha: 0.1, spacing: 12 });
      ink.rect(L, f.y0, R - L, f.y1 - f.y0, { color: col, weight: 2.2, seed: 20 + i });
      const my = (f.y0 + f.y1) / 2;
      ink.text(f.label, L - 22, my - 14, { font: 'display', size: 24, color: col, bold: true, align: 'right' });
      ink.text(f.sub, L - 22, my + 16, { size: 20, color: c.ink2, align: 'right' });
      ink.text(f.note, R + 22, my, { size: 19, color: c.ink2, align: 'left' });
    });

    // Design: a blueprint with a loop on it.
    ink.hatchRect(330, 196, 150, 82, { color: c.blue, alpha: 0.35, spacing: 7 });
    ink.rect(330, 196, 150, 82, { color: c.blue, weight: 1.6, passes: 1, seed: 30 });
    ink.circle(405, 237, 24, { color: c.design, weight: 2, passes: 1, seed: 31 });
    ink.arrow(424, 222, 428, 232, { color: c.design, weight: 2, head: 10, seed: 32 });
    ink.text('M → D → A', 595, 236, { size: 30, color: c.design, bold: true });

    // Development: a wall going up brick by brick.
    const bw = 58;
    const bh = 24;
    const cols = 6;
    const x0 = 500 - (cols * bw) / 2;
    const bricks = [];
    for (let row = 0; row < 4; row++) {
      const odd = row % 2 === 1;
      for (let k = 0; k < (odd ? cols - 1 : cols); k++) {
        bricks.push({ x: x0 + k * bw + (odd ? bw / 2 : 0), y: GROUND - (row + 1) * bh });
      }
    }
    const cycle = bricks.length + 8;
    const stepf = (t * 2.2 + 12) % cycle;
    const placed = Math.floor(stepf);
    const frac = ease(stepf - placed);
    bricks.forEach((b, n) => {
      if (n < placed) ink.rect(b.x, b.y, bw, bh, { color: c.dev, weight: 1.6, passes: 1, over: 1, seed: 100 + n });
      if (n === placed) {
        const drop = Math.min(70, b.y - (MID + 6));
        ink.rect(b.x, b.y - (1 - frac) * drop, bw, bh, { color: c.dev, weight: 1.8, passes: 1, over: 1, seed: 100 + n });
      }
    });

    // Engineering: gears and the frame budget.
    gear(ink, 370, 500, 34, t * 0.9, 10, c.eng, 200);
    gear(ink, 430, 520, 22, -t * 0.9 * (34 / 22) + 0.2, 7, c.eng, 240);
    const bx = 500;
    const by = 482;
    const bwid = 180;
    const sweep = ((t % 0.9) / 0.9) * bwid;
    ink.hatchRect(bx, by, sweep, 22, { color: c.eng, alpha: 0.55, spacing: 5 });
    ink.rect(bx, by, bwid, 22, { color: c.eng, weight: 1.8, passes: 1, seed: 260 });
    [0.38, 0.62, 0.8].forEach((f, i) =>
      ink.line(bx + bwid * f, by + 3, bx + bwid * f, by + 19, { color: c.ink2, weight: 1, passes: 1, over: 0, seed: 270 + i }),
    );
    ink.text('one frame = 16.7 ms', bx + bwid / 2, by + 46, { size: 19, color: c.ink2 });
  },
};

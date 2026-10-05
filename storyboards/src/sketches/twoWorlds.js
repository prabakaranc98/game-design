// FR 01 · Establishing: AI and Games drift together; the overlap carries traffic both ways.
import { pointOnQuad } from './ink.js';

export default {
  draw({ p, ink, c, t }) {
    const cy = 318;
    const r = 200;
    const sep = 120 + 10 * Math.sin(t * 0.45);
    const ax = 500 - sep;
    const gx = 500 + sep;

    // The overlap: clip to the AI circle, hatch inside the games circle.
    const ctx = p.drawingContext;
    ctx.save();
    ctx.beginPath();
    ctx.arc(ax, cy, r, 0, Math.PI * 2);
    ctx.clip();
    ink.hatchEllipse(gx, cy, r, r, { color: c.ink2, spacing: 11, alpha: 0.26 });
    ctx.restore();

    ink.circle(ax, cy, r, { color: c.red, weight: 2.6, seed: 1 });
    ink.circle(gx, cy, r, { color: c.ink, weight: 2.6, seed: 2 });

    ink.text('AI', ax - 92, cy - 10, { font: 'display', size: 78, color: c.red, bold: true });
    ink.text('GAMES', gx + 90, cy - 10, { font: 'display', size: 50, color: c.ink, bold: true });

    // A small network inside AI.
    const g = [[ax - 132, cy + 72], [ax - 96, cy + 50], [ax - 58, cy + 84], [ax - 102, cy + 110]];
    [[0, 1], [1, 2], [1, 3], [2, 3], [0, 3]].forEach(([a, b], i) =>
      ink.line(g[a][0], g[a][1], g[b][0], g[b][1], { color: c.red, weight: 1.4, passes: 1, seed: 40 + i }),
    );
    g.forEach(([x, y]) => ink.dot(x, y, 4.5, c.red));

    // A d-pad inside Games.
    const dx = gx + 90;
    const dy = cy + 80;
    const a = 12;
    const l = 30;
    ink.poly(
      [[-a, -l], [a, -l], [a, -a], [l, -a], [l, a], [a, a], [a, l], [-a, l], [-a, a], [-l, a], [-l, -a], [-a, -a]].map(([x, y]) => [dx + x, dy + y]),
      { color: c.ink, weight: 1.6, passes: 1, seed: 60 },
    );

    // Two-way traffic through the overlap.
    const up = [ax + 68, cy - 24, 500, cy - 104, gx - 68, cy - 24];
    const down = [gx - 68, cy + 24, 500, cy + 104, ax + 68, cy + 24];
    ink.curveArrow(...up, { color: c.red, weight: 2, seed: 70 });
    ink.curveArrow(...down, { color: c.ink, weight: 2, seed: 71 });
    for (let i = 0; i < 3; i++) {
      const u = (t * 0.35 + i / 3) % 1;
      const [ux, uy] = pointOnQuad(u, ...up);
      const [vx, vy] = pointOnQuad(u, ...down);
      ink.dot(ux, uy, 4, c.red);
      ink.dot(vx, vy, 4, c.ink);
    }

    ink.text('rules · search · learning · generation', ax - 40, cy - r - 26, { size: 22, color: c.red });
    ink.text('design · development · engineering', gx + 80, cy + r + 32, { size: 22, color: c.ink2 });

    ink.arrow(500, 566, 500, 490, { color: c.ink2, weight: 1.6, seed: 80 });
    ink.text('this course', 500, 588, { size: 22, color: c.ink });
  },
};

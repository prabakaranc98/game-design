// Level 4 · Moment: click to draw three panels, then the curve that places them in a session.
import { PLAYTHROUGH } from '../../play/playthrough.js';
import { smooth } from '../ink.js';

const PX = [60, 360, 660];
const PY = 10;
const PW = 280;
const PH = 220;
export const MOMENT_STEPS = 4;

const fade = (at, now) => (at ? Math.max(0, Math.min(1, (now - at) / 400)) : 0);

function pacman(ink, x, y, r, mouth, color, alpha, seed) {
  const pts = [[x, y]];
  for (let i = 0; i <= 24; i++) {
    const a = mouth + (i / 24) * (Math.PI * 2 - 2 * mouth);
    pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r]);
  }
  pts.push([x, y]);
  ink.path(pts, { color, weight: 2.6, passes: 1, alpha, seed });
}

function ghost(ink, x, y, r, color, alpha, seed, scared = false) {
  const pts = [];
  for (let i = 0; i <= 12; i++) {
    const a = Math.PI + (i / 12) * Math.PI;
    pts.push([x + Math.cos(a) * r, y - r * 0.2 + Math.sin(a) * r]);
  }
  pts.push([x + r, y + r * 0.9]);
  for (let k = 1; k <= 6; k++) pts.push([x + r - (k * r) / 3, y + (k % 2 ? r * 0.6 : r * 0.9)]);
  pts.push([x - r, y - r * 0.2]);
  ink.path(pts, { color, weight: 2.4, passes: 1, alpha, seed });
  ink.circle(x - r * 0.35, y - r * 0.25, r * 0.17, { color, weight: 1.6, passes: 1, alpha, seed: seed + 1 });
  ink.circle(x + r * 0.35, y - r * 0.25, r * 0.17, { color, weight: 1.6, passes: 1, alpha, seed: seed + 2 });
  if (scared) {
    const m = [];
    for (let k = 0; k <= 6; k++) m.push([x - r * 0.5 + (k * r) / 6, y + r * 0.25 + (k % 2 ? -3 : 3)]);
    ink.path(m, { color, weight: 1.6, passes: 1, alpha, seed: seed + 3 });
  }
}

function corridor(ink, c, px, alpha, seed) {
  ink.line(px + 12, PY + 70, px + PW - 12, PY + 70, { color: c.ink2, weight: 1.6, passes: 1, alpha, seed });
  ink.line(px + 12, PY + 170, px + PW - 12, PY + 170, { color: c.ink2, weight: 1.6, passes: 1, alpha, seed: seed + 1 });
}

export default {
  hit: (x, y, state) => (state?.step ?? 0) < MOMENT_STEPS,
  press: (x, y, state) => state?.onStep?.(),

  draw({ ink, c, t, state }) {
    const step = state?.step ?? 0;
    const at = state?.at ?? [];
    const now = performance.now();
    const mouth = 0.18 + Math.abs(Math.sin(t * 7)) * 0.4;

    PX.forEach((px, k) => {
      const a = step > k ? fade(at[k], now) : 0;
      ink.rect(px, PY, PW, PH, { color: a > 0 ? c.ink : c.ink2, weight: a > 0 ? 2.6 : 1.4, passes: 1, dash: a > 0 ? null : [7, 7], alpha: a > 0 ? 1 : 0.6, seed: 10 + k });
      if (a <= 0) {
        ink.text(String(k + 1), px + PW / 2, PY + PH / 2, { font: 'display', size: 40, color: c.ink2, bold: true, alpha: 0.35 });
        return;
      }
      corridor(ink, c, px, a, 20 + k * 2);
      const cy = PY + 120;
      if (k === 0) {
        pacman(ink, px + 140, cy, 22, mouth, c.ink, a, 30);
        ghost(ink, px + 42 + Math.sin(t * 2) * 6, cy, 20, c.ink, a, 40);
        ghost(ink, px + 238 - Math.sin(t * 2) * 6, cy, 20, c.ink, a, 50);
      } else if (k === 1) {
        [0, 1, 2].forEach((i) => ink.line(px + 40, cy - 12 + i * 12, px + 66, cy - 12 + i * 12, { color: c.ink2, weight: 1.4, passes: 1, alpha: a, over: 0, seed: 60 + i }));
        pacman(ink, px + 105, cy, 22, mouth, c.ink, a, 70);
        ink.hatchEllipse(px + 168, cy, 12, 12, { color: c.design, alpha: 0.7 * a, spacing: 3 });
        ink.circle(px + 168, cy, 12, { color: c.design, weight: 2.2, passes: 1, alpha: a, seed: 71 });
      } else {
        pacman(ink, px + 86, cy, 22, mouth, c.ink, a, 80);
        ghost(ink, px + 182 + Math.sin(t * 3) * 4, cy, 18, c.blue, a, 90, true);
        ghost(ink, px + 242 + Math.sin(t * 3 + 1) * 4, cy - 6, 18, c.blue, a, 100, true);
      }
      ink.text(PLAYTHROUGH.moment[k], px + PW / 2, PY + PH + 28, { size: 30, color: c.ink, alpha: a });
    });

    // The session curve, with the three panels marked on it.
    const ca = step >= MOMENT_STEPS ? fade(at[3], now) : 0;
    if (ca <= 0) return;
    const vals = [1, 2, 2.5, 4, 8.5, 5, 6.5, 7, 9];
    const pts = vals.map((v, i) => [110 + i * 100, 492 - v * 20]);
    ink.line(90, 492, 930, 492, { color: c.ink2, weight: 1.4, passes: 1, alpha: ca, seed: 110 });
    ink.text('intensity', 90, 312, { size: 20, color: c.ink2, align: 'left', alpha: ca });
    ink.path(smooth(pts, 10), { color: c.design, weight: 2.8, alpha: ca, seed: 111 });
    [4, 5, 6].forEach((idx, k) => {
      const [x, y] = pts[idx];
      ink.circle(x, y, 11, { color: c.ink, weight: 2, passes: 1, alpha: ca, seed: 120 + k });
      ink.text(String(k + 1), x, y - 26, { font: 'display', size: 18, color: c.ink, bold: true, alpha: ca });
    });
  },
};

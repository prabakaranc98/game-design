// Level 2 · Match: pair each game with the picture you would draw first.
import { smooth } from '../ink.js';

const GAMES = [
  { key: 'mario', name: 'Super Mario Bros.' },
  { key: 'journey', name: 'Journey' },
  { key: 'minecraft', name: 'Minecraft' },
  { key: 'tlou', name: 'The Last of Us' },
];
const PICTURES = [
  { key: 'curve', name: 'CURVE' },
  { key: 'map', name: 'MAP' },
  { key: 'loop', name: 'LOOP' },
  { key: 'panels', name: 'PANELS' },
];
export const ANSWERS = { mario: 'map', journey: 'curve', minecraft: 'loop', tlou: 'panels' };

const CW = 300;
const CH = 92;
const place = (list, x) => list.map((it, i) => ({ ...it, x, y: 22 + i * 124 }));
const G = place(GAMES, 110);
const P = place(PICTURES, 590);
const inside = (b, x, y) => x > b.x && x < b.x + CW && y > b.y && y < b.y + CH;

function thumb(ink, c, key, x, y) {
  const o = { color: c.ink, weight: 1.5, passes: 1, over: 0 };
  if (key === 'map') {
    for (let gx = x; gx <= x + 110; gx += 11) ink.line(gx, y, gx, y + 70, { ...o, color: c.blue, weight: 0.6, alpha: 0.45, seed: gx });
    for (let gy = y; gy <= y + 70; gy += 11) ink.line(x, gy, x + 110, gy, { ...o, color: c.blue, weight: 0.6, alpha: 0.45, seed: gy });
    ink.hatchRect(x, y + 58, 110, 12, { color: c.ink, alpha: 0.5, spacing: 4 });
    ink.rect(x + 38, y + 32, 16, 26, { ...o, seed: 1 });
    ink.rect(x + 76, y + 46, 12, 12, { ...o, seed: 2 });
    ink.rect(x + 88, y + 34, 12, 24, { ...o, seed: 3 });
  } else if (key === 'panels') {
    [0, 1, 2].forEach((k) => {
      const fx = x + k * 38;
      const lift = k === 1 ? 10 : 0;
      ink.rect(fx, y + 6, 32, 58, { ...o, seed: 10 + k });
      ink.circle(fx + 16, y + 26 - lift, 4, { ...o, seed: 20 + k });
      ink.line(fx + 16, y + 30 - lift, fx + 16, y + 46 - lift, { ...o, seed: 30 + k });
    });
  } else if (key === 'curve') {
    const pts = [[x, y + 60], [x + 20, y + 50], [x + 40, y + 54], [x + 60, y + 36], [x + 80, y + 44], [x + 96, y + 8], [x + 110, y + 52]];
    ink.path(smooth(pts, 6), { ...o, color: c.design, weight: 2.2, seed: 40 });
  } else {
    ink.circle(x + 55, y + 35, 26, { ...o, weight: 1.9, seed: 50 });
    ink.arrow(x + 81, y + 29, x + 80, y + 40, { ...o, head: 9, seed: 51 });
    ink.arrow(x + 29, y + 41, x + 30, y + 30, { ...o, head: 9, seed: 52 });
  }
}

export default {
  hit(x, y) {
    return G.some((b) => inside(b, x, y)) || P.some((b) => inside(b, x, y));
  },

  press(x, y, state) {
    const g = G.find((b) => inside(b, x, y));
    if (g) {
      state.onSelect(g.key);
      return;
    }
    const pic = P.find((b) => inside(b, x, y));
    if (pic && state.selected) state.onTry(state.selected, pic.key);
  },

  draw({ ink, c, state, mx, my, hover }) {
    const matched = state?.matched ?? {};
    const used = Object.values(matched);
    const now = performance.now();

    Object.entries(matched).forEach(([gk, pk], i) => {
      const g = G.find((b) => b.key === gk);
      const pic = P.find((b) => b.key === pk);
      ink.curve(g.x + CW + 6, g.y + CH / 2, 500, (g.y + pic.y) / 2 + CH / 2, pic.x - 6, pic.y + CH / 2, { color: c.design, weight: 2.8, seed: 60 + i });
    });

    if (state?.selected && hover) {
      const g = G.find((b) => b.key === state.selected);
      ink.line(g.x + CW + 6, g.y + CH / 2, mx, my, { color: c.blue, weight: 1.6, passes: 1, dash: [7, 6], over: 0, seed: 70 });
    }

    G.forEach((g, i) => {
      const done = Boolean(matched[g.key]);
      const sel = state?.selected === g.key;
      ink.rect(g.x, g.y, CW, CH, { color: done || sel ? c.design : c.ink, weight: sel ? 3.2 : 2.2, seed: 80 + i });
      ink.text(g.name, g.x + CW / 2, g.y + CH / 2 - 2, { size: 30, color: done ? c.design : c.ink, bold: sel || done });
    });

    P.forEach((pic, i) => {
      const done = used.includes(pic.key);
      const wrong = state?.wrong?.key === pic.key && now - state.wrong.at < 450;
      const sx = wrong ? Math.sin(now / 25) * 7 : 0;
      ink.rect(pic.x + sx, pic.y, CW, CH, { color: done ? c.design : c.ink, weight: 2.2, seed: 90 + i });
      thumb(ink, c, pic.key, pic.x + sx + 18, pic.y + 11);
      ink.text(pic.name, pic.x + sx + 212, pic.y + CH / 2 - 2, { font: 'display', size: 28, color: done ? c.design : c.ink, bold: true });
    });
  },
};

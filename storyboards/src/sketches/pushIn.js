// FR 08 · Push-in: the camera closes in on the MDA chain, where the next board starts.
import { ease } from './ink.js';

const BOXES = [
  { x: 130, label: 'MECHANICS', sub: 'rules, verbs, systems' },
  { x: 390, label: 'DYNAMICS', sub: 'what happens in play' },
  { x: 650, label: 'AESTHETICS', sub: 'what players feel' },
];

const lerp = (a, b, f) => a + (b - a) * f;

export default {
  draw({ ink, c, t }) {
    // Push-in frame: viewfinder corners closing in, then resetting.
    const raw = (t * 0.12) % 1;
    const f = ease(Math.min(1, raw / 0.8));
    const x0 = lerp(46, 104, f);
    const y0 = lerp(46, 150, f);
    const x1 = lerp(954, 896, f);
    const y1 = lerp(579, 470, f);
    const L = 30;
    const o = { color: c.blue, weight: 2, passes: 1, over: 0 };
    ink.line(x0, y0, x0 + L, y0, { ...o, seed: 1 });
    ink.line(x0, y0, x0, y0 + L, { ...o, seed: 2 });
    ink.line(x1, y0, x1 - L, y0, { ...o, seed: 3 });
    ink.line(x1, y0, x1, y0 + L, { ...o, seed: 4 });
    ink.line(x0, y1, x0 + L, y1, { ...o, seed: 5 });
    ink.line(x0, y1, x0, y1 - L, { ...o, seed: 6 });
    ink.line(x1, y1, x1 - L, y1, { ...o, seed: 7 });
    ink.line(x1, y1, x1, y1 - L, { ...o, seed: 8 });
    ink.text('PUSH IN', x0 + 8, y0 + 46, { font: 'display', size: 16, color: c.blue, bold: true, align: 'left' });

    // MDA chain.
    BOXES.forEach((b, i) => {
      ink.hatchRect(b.x, 255, 220, 110, { color: c.design, alpha: 0.1, spacing: 11 });
      ink.rect(b.x, 255, 220, 110, { color: c.ink, weight: 2.4, seed: 20 + i });
      ink.text(b.label, b.x + 110, 296, { font: 'display', size: 28, color: c.ink, bold: true });
      ink.text(b.sub, b.x + 110, 333, { size: 20, color: c.ink2 });
      if (i < BOXES.length - 1) ink.arrow(b.x + 224, 310, b.x + 256, 310, { color: c.ink, weight: 2, head: 10, seed: 30 + i });
    });

    // Two readings of the same chain.
    ink.arrow(150, 212, 850, 212, { color: c.design, weight: 2.4, seed: 40 });
    ink.text('the designer builds this way', 500, 188, { size: 22, color: c.design, bold: true });
    ink.arrow(850, 410, 150, 410, { color: c.ink2, weight: 2.2, seed: 41 });
    ink.text('the player meets it this way', 500, 436, { size: 22, color: c.ink2, bold: true });

    // Travelling marks on both readings.
    const u = (t * 0.18) % 1;
    ink.dot(150 + u * 700, 212, 4.5, c.design);
    ink.dot(850 - u * 700, 410, 4.5, c.ink2);

    ink.text('board 02 starts here', 500, 528, { size: 22, color: c.red });
  },
};

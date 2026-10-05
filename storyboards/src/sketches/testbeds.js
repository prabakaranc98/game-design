// FR 06 · Pan: games that AI research has used as testbeds, in order.
// Spacing shows order, not time.
import { MILESTONES } from '../boards/aiAndGames.js';
import { pointOnPolyline } from './ink.js';

const N = MILESTONES.length;
const pts = MILESTONES.map((m, i) => [90 + (i * 820) / (N - 1), 440 - (i * 270) / (N - 1)]);

function marker(ink, kind, x, y, c, i) {
  if (kind === 'board') {
    ink.hatchRect(x - 9, y - 9, 18, 18, { color: c.ink, alpha: 0.4, spacing: 4 });
    ink.rect(x - 9, y - 9, 18, 18, { color: c.ink, weight: 2, passes: 1, over: 1, seed: 10 + i });
  } else if (kind === 'video') {
    ink.hatchEllipse(x, y, 10, 10, { color: c.ink, alpha: 0.4, spacing: 4 });
    ink.circle(x, y, 10, { color: c.ink, weight: 2, passes: 1, seed: 10 + i });
  } else if (kind === 'generated') {
    ink.circle(x, y, 13, { color: c.red, weight: 2.6, passes: 1, seed: 10 + i });
    ink.dot(x, y, 4, c.red);
  } else {
    ink.circle(x, y, 12, { color: c.ink2, weight: 1.6, passes: 1, dash: [5, 5], seed: 10 + i });
  }
}

export default {
  draw({ ink, c, t }) {
    ink.arrow(60, 56, 940, 56, { color: c.blue, weight: 1.8, passes: 1, seed: 1 });
    ink.text('PAN', 500, 38, { font: 'display', size: 17, color: c.blue, bold: true });

    // Legend.
    const legend = [['board', 'board & card games'], ['video', 'video games'], ['generated', 'AI generates the game'], ['open', 'still open']];
    const legendX = [90, 300, 450, 690];
    legend.forEach(([kind, label], i) => {
      const x = legendX[i];
      marker(ink, kind, x, 104, c, 90 + i);
      ink.text(label, x + 20, 104, { size: 19, color: c.ink2, align: 'left' });
    });

    // The climb.
    for (let i = 1; i < N; i++) {
      const [x1, y1] = pts[i - 1];
      const [x2, y2] = pts[i];
      const last = i === N - 1;
      ink.line(x1, y1, x2, y2, { color: last ? c.ink2 : c.ink, weight: 2, passes: last ? 1 : 2, dash: last ? [6, 6] : null, over: 0, seed: 30 + i });
    }
    const [tx, ty] = pointOnPolyline((t * 0.06) % 1, pts.slice(0, N - 1));
    ink.dot(tx, ty, 5, c.red);
    ink.text('harder games, new kinds of AI', 120, 232, { size: 22, color: c.ink2, align: 'left' });
    ink.arrow(408, 240, 470, 208, { color: c.ink2, weight: 1.4, passes: 1, seed: 5 });

    // Labels in two staggered rows along the bottom, with leader lines.
    MILESTONES.forEach((m, i) => {
      const [x, y] = pts[i];
      const rowY = i % 2 ? 556 : 508;
      ink.line(x, y + 16, x, rowY - 22, { color: c.blue, weight: 1, passes: 1, dash: [4, 4], alpha: 0.8, over: 0, seed: 50 + i });
      marker(ink, m.kind, x, y, c, i);
      ink.text(m.year, x, rowY - 8, { font: 'display', size: 15, color: c.ink2, bold: true });
      ink.text(m.game, x, rowY + 14, { size: 19, color: m.kind === 'generated' ? c.red : c.ink });
    });
  },
};

// The intensity curve on the one-page board. Drag a point (or click its column) to set it.
// state: { points: number[] (0–10), onChange(i, v), readOnly }
import { smooth } from './ink.js';

export const CURVE_VIEW = { W: 1000, H: 150 };

const X0 = 90;
const X1 = 950;
const YT = 32;
const YB = 118;

const xs = (n) => Array.from({ length: n }, (_, i) => X0 + (i * (X1 - X0)) / (n - 1));
const yOf = (v) => YB - (v / 10) * (YB - YT);
const vOf = (y) => Math.max(0, Math.min(10, Math.round(((YB - y) / (YB - YT)) * 10)));

let dragging = null;

function column(x, n) {
  const cols = xs(n);
  let best = null;
  cols.forEach((cx, i) => {
    if (Math.abs(x - cx) < 60 && (best === null || Math.abs(x - cx) < Math.abs(x - cols[best]))) best = i;
  });
  return best;
}

export default {
  hit(x, y, state) {
    return !state?.readOnly && y > YT - 24 && y < YB + 16 && column(x, state.points.length) !== null;
  },

  press(x, y, state) {
    if (state?.readOnly) return;
    const i = column(x, state.points.length);
    if (i === null || y < YT - 24 || y > YB + 16) return;
    dragging = i;
    state.onChange(i, vOf(y));
  },

  drag(x, y, state) {
    if (dragging === null || state?.readOnly) return;
    state.onChange(dragging, vOf(y));
  },

  release() {
    dragging = null;
  },

  draw({ ink, c, state }) {
    const values = state?.points ?? [];
    const cols = xs(values.length);
    const pts = values.map((v, i) => [cols[i], yOf(v)]);

    ink.line(X0 - 20, YB, X1 + 20, YB, { color: c.ink2, weight: 1.6, passes: 1, seed: 1 });
    ink.line(X0 - 20, YT - 10, X0 - 20, YB, { color: c.ink2, weight: 1.6, passes: 1, seed: 2 });
    ink.text('intense', X0 - 30, YT, { size: 19, color: c.ink2, align: 'right' });
    ink.text('calm', X0 - 30, YB - 4, { size: 19, color: c.ink2, align: 'right' });
    ink.text('start', cols[0], YB + 20, { size: 19, color: c.ink2 });
    ink.text('end', cols[cols.length - 1], YB + 20, { size: 19, color: c.ink2 });

    if (pts.length < 2) return;
    const line = smooth(pts, 12).map(([x, y]) => [x, Math.max(YT - 6, Math.min(YB, y))]);
    ink.hatch(
      (ctx) => {
        ctx.moveTo(line[0][0], YB);
        line.forEach(([x, y]) => ctx.lineTo(x, y));
        ctx.lineTo(line[line.length - 1][0], YB);
        ctx.closePath();
      },
      X0,
      YT - 10,
      X1 - X0,
      YB - YT + 10,
      { color: c.design, alpha: 0.28, spacing: 8 },
    );
    ink.path(line, { color: c.design, weight: 2.6, seed: 3 });

    pts.forEach(([x, y], i) => {
      ink.circle(x, y, 9, { color: state.readOnly ? c.design : c.ink, weight: 2.2, passes: 1, seed: 10 + i });
      ink.text(String(values[i]), x, y - 19, { font: 'display', size: 17, color: c.ink2, bold: true });
    });
  },
};

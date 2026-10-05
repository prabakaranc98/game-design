// Level 1 · Camera: the player follows the mouse and the view cone goes where they look.
// Three things are hidden in the room; they only appear inside the cone.

const ROOM = [170, 20, 660, 480];
const BLOCKS = [[262, 106, 120, 68], [566, 86, 76, 160], [296, 322, 180, 58], [636, 340, 112, 66]];
const THINGS = [
  { key: 'key', x: 470, y: 232, label: 'key' },
  { key: 'star', x: 772, y: 80, label: 'secret' },
  { key: 'door', x: 214, y: 440, label: 'door' },
];
export const CAMERA_THINGS = THINGS.length;

const R = 210;
const HALF = 0.46;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

let pos = [500, 260];
let heading = -0.4;

function thing(ink, c, th) {
  const o = { color: c.design, weight: 2.4, passes: 1, over: 0 };
  if (th.key === 'key') {
    ink.circle(th.x - 10, th.y, 9, { ...o, seed: 1 });
    ink.line(th.x - 1, th.y, th.x + 24, th.y, { ...o, seed: 2 });
    ink.line(th.x + 17, th.y, th.x + 17, th.y + 9, { ...o, seed: 3 });
  } else if (th.key === 'star') {
    for (let k = 0; k < 3; k++) {
      const a = (k * Math.PI) / 3 + 0.3;
      ink.line(th.x - Math.cos(a) * 15, th.y - Math.sin(a) * 15, th.x + Math.cos(a) * 15, th.y + Math.sin(a) * 15, { ...o, seed: 4 + k });
    }
  } else {
    ink.rect(th.x - 13, th.y - 24, 26, 48, { ...o, seed: 8 });
    ink.dot(th.x + 6, th.y, 2.6, c.design);
  }
  ink.text(th.label, th.x, th.y + 38, { size: 22, color: c.design, bold: true });
}

export default {
  draw({ p, ink, c, t, state, mx, my, hover }) {
    const [rx, ry, rw, rh] = ROOM;
    const playing = hover && mx > rx && mx < rx + rw && my > ry && my < ry + rh;
    const tx = playing ? mx : 500 + Math.cos(t * 0.35) * 230;
    const ty = playing ? my : 250 + Math.sin(t * 0.5) * 170;
    const dx = tx - pos[0];
    const dy = ty - pos[1];
    const d = Math.hypot(dx, dy);
    if (d > 3) {
      heading += wrap(Math.atan2(dy, dx) - heading) * 0.12;
      const step = Math.min(d, playing ? Math.max(2, d * 0.08) : 2.2);
      pos = [pos[0] + (dx / d) * step, pos[1] + (dy / d) * step];
    }
    pos = [clamp(pos[0], rx + 16, rx + rw - 16), clamp(pos[1], ry + 16, ry + rh - 16)];
    const [px, py] = pos;

    ink.rect(rx, ry, rw, rh, { color: c.ink, weight: 2.6, seed: 1 });
    BLOCKS.forEach(([x, y, w, h], i) => {
      ink.hatchRect(x, y, w, h, { color: c.ink, alpha: 0.22, spacing: 8 });
      ink.rect(x, y, w, h, { color: c.ink, weight: 2, passes: 1, seed: 20 + i });
    });

    const ctx = p.drawingContext;
    ctx.save();
    ctx.beginPath();
    ctx.rect(rx, ry, rw, rh);
    ctx.clip();
    ink.hatch(
      (g) => {
        g.moveTo(px, py);
        g.arc(px, py, R, heading - HALF, heading + HALF);
        g.closePath();
      },
      px - R,
      py - R,
      R * 2,
      R * 2,
      { color: c.blue, alpha: 0.55, spacing: 8 },
    );
    ink.line(px, py, px + Math.cos(heading - HALF) * R, py + Math.sin(heading - HALF) * R, { color: c.blue, weight: 1.6, passes: 1, over: 0, seed: 40 });
    ink.line(px, py, px + Math.cos(heading + HALF) * R, py + Math.sin(heading + HALF) * R, { color: c.blue, weight: 1.6, passes: 1, over: 0, seed: 41 });
    ctx.restore();

    const found = state?.found ?? [];
    THINGS.forEach((th) => {
      const dist = Math.hypot(th.x - px, th.y - py);
      const ang = Math.abs(wrap(Math.atan2(th.y - py, th.x - px) - heading));
      const seen = playing && dist < R && ang < HALF;
      if (seen && !found.includes(th.key)) state?.onFind?.(th.key);
      if (seen || found.includes(th.key)) thing(ink, c, th);
    });

    ink.circle(px, py, 13, { color: c.ink, weight: 2.8, seed: 50 });
    ink.dot(px + Math.cos(heading) * 7, py + Math.sin(heading) * 7, 3.5, c.ink);

    const all = found.length === THINGS.length;
    ink.text(`${found.length} / ${THINGS.length}`, rx + rw + 26, ry + 22, { font: 'display', size: 28, color: all ? c.design : c.ink2, bold: true, align: 'left' });
  },
};

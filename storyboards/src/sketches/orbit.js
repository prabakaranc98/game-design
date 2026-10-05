// FR 05 · Close-up: the roles AI can play during play, in orbit around the player.
// Clicking a role selects it; the notes column shows the details.
import { ROLES } from '../boards/aiAndGames.js';
import { pointOnPolyline } from './ink.js';

const CX = 500;
const CY = 316;
const RX = 300;
const RY = 212;
const NODE_R = 22;

const nodes = ROLES.map((role, i) => {
  const a = -Math.PI / 2 + (i * Math.PI * 2) / ROLES.length;
  const x = CX + Math.cos(a) * RX;
  const y = CY + Math.sin(a) * RY;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return {
    key: role.key,
    name: role.name,
    n: i + 1,
    x,
    y,
    lx: x + cos * 40,
    ly: y + sin * 36,
    align: cos > 0.3 ? 'left' : cos < -0.3 ? 'right' : 'center',
    valign: sin < -0.3 ? 'bottom' : sin > 0.3 ? 'top' : 'center',
  };
});

function hit(mx, my) {
  const found = nodes.find((n) => Math.hypot(mx - n.x, my - n.y) < NODE_R + 14 || Math.hypot(mx - n.lx, my - n.ly) < 40);
  return found ? found.key : null;
}

export default {
  hit,
  draw({ ink, c, t, state, mx, my, hover }) {
    const selected = state?.selected;
    const hovered = hover ? hit(mx, my) : null;

    ink.ellipse(CX, CY, RX, RY, { color: c.blue, weight: 1.4, passes: 1, dash: [10, 8], alpha: 0.8, seed: 1 });

    nodes.forEach((n, i) => {
      const on = n.key === selected;
      const ang = Math.atan2(n.y - CY, n.x - CX);
      const sx = CX + Math.cos(ang) * 62;
      const sy = CY + Math.sin(ang) * 62;
      const ex = n.x - Math.cos(ang) * (NODE_R + 6);
      const ey = n.y - Math.sin(ang) * (NODE_R + 6);
      if (on) {
        ink.line(sx, sy, ex, ey, { color: c.red, weight: 2.2, seed: 10 + i });
        for (let k = 0; k < 3; k++) {
          const u = (t * 0.45 + k / 3) % 1;
          const [ox, oy] = pointOnPolyline(u, [[sx, sy], [ex, ey]]);
          const [bx, by] = pointOnPolyline(1 - u, [[sx, sy], [ex, ey]]);
          ink.dot(ox, oy, 4, c.red);
          ink.dot(bx, by, 3, c.ink);
        }
      } else {
        ink.line(sx, sy, ex, ey, { color: c.blue, weight: 1, passes: 1, alpha: 0.45, seed: 10 + i });
      }

      const col = on ? c.red : n.key === hovered ? c.ink : c.ink2;
      if (on) ink.hatchEllipse(n.x, n.y, NODE_R, NODE_R, { color: c.red, alpha: 0.3, spacing: 6 });
      ink.circle(n.x, n.y, NODE_R, { color: col, weight: on ? 3 : 1.8, seed: 30 + i });
      ink.text(String(n.n), n.x, n.y - 2, { font: 'display', size: 18, color: col, bold: true });
      ink.text(n.name, n.lx, n.ly, { size: 22, color: on ? c.red : c.ink, align: n.align, valign: n.valign, bold: on });
    });

    // The player.
    ink.hatchEllipse(CX, CY, 56, 56, { color: c.ink, alpha: 0.12, spacing: 8 });
    ink.circle(CX, CY, 56, { color: c.ink, weight: 2.8, seed: 2 });
    ink.text('PLAYER', CX, CY - 2, { font: 'display', size: 22, color: c.ink, bold: true });
  },
};
